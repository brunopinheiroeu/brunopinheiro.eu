// Vimeo oEmbed integration for lone-URL video embeds in case markdown.
// The URL-matching helpers here are plain/pure (safe to import from client
// components); the actual oEmbed fetch must only ever be called from a
// server component so it benefits from Next's server-side fetch cache.

export type VimeoEmbedData = {
  url: string;
  // Canonical player src (including any private-video hash) taken straight
  // from Vimeo's own oEmbed response, with autoplay/loop/muted stripped.
  src: string;
  width: number;
  height: number;
  title?: string;
};

const VIMEO_HOST_RE = /^https?:\/\/(?:www\.)?(?:player\.)?vimeo\.com\/\S+$/i;

export function isVimeoUrl(url: string): boolean {
  return VIMEO_HOST_RE.test(url.trim());
}

// A markdown paragraph is "just a Vimeo URL" if, once trimmed, it's nothing
// but the URL - bare, angle-bracket autolink <url>, or a single [text](url)
// link. Anything else on the line (surrounding text, multiple links) means
// it's not a lone embed and should render as normal markdown.
export function parseLoneVimeoUrl(block: string): string | null {
  const trimmed = block.trim();
  if (!trimmed || trimmed.includes("\n")) return null;

  let candidate = trimmed;

  const angle = /^<(\S+)>$/.exec(trimmed);
  if (angle) {
    candidate = angle[1];
  } else {
    const link = /^\[[^\]]*\]\((\S+?)(?:\s+"[^"]*")?\)$/.exec(trimmed);
    if (link) candidate = link[1];
  }

  return isVimeoUrl(candidate) ? candidate : null;
}

// Scans full markdown content for every lone-Vimeo-URL paragraph (blocks
// separated by a blank line) and returns the unique URLs found, in order.
export function extractLoneVimeoUrls(content: string): string[] {
  const blocks = content.split(/\n{2,}/);
  const seen = new Set<string>();
  for (const block of blocks) {
    const url = parseLoneVimeoUrl(block);
    if (url) seen.add(url);
  }
  return Array.from(seen);
}

// Server-only: fetches Vimeo's oEmbed metadata for one URL, cached via
// Next's fetch data cache. Returns null on any failure so callers can fall
// back to a plain link instead of breaking the page.
export async function getVimeoEmbed(
  url: string
): Promise<VimeoEmbedData | null> {
  try {
    const oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(
      url
    )}`;
    const res = await fetch(oembedUrl, {
      // Metadata for a given video essentially never changes; refresh daily.
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as {
      html?: string;
      width?: number;
      height?: number;
      title?: string;
    };

    const width = Number(data.width);
    const height = Number(data.height);
    if (!width || !height) return null;

    const srcMatch = /src="([^"]+)"/.exec(String(data.html ?? ""));
    if (!srcMatch) return null;

    const srcUrl = new URL(srcMatch[1].replace(/&amp;/g, "&"));
    srcUrl.searchParams.delete("autoplay");
    srcUrl.searchParams.delete("loop");
    srcUrl.searchParams.delete("muted");

    return {
      url,
      src: srcUrl.toString(),
      width,
      height,
      title: typeof data.title === "string" ? data.title : undefined,
    };
  } catch (error) {
    console.error("[Vimeo] oEmbed fetch failed for", url, error);
    return null;
  }
}

// Server-only: resolves every URL in parallel, keyed by the original URL so
// callers can look each one up while walking the markdown again.
export async function getVimeoEmbeds(
  urls: string[]
): Promise<Record<string, VimeoEmbedData | null>> {
  const entries = await Promise.all(
    urls.map(async (url) => [url, await getVimeoEmbed(url)] as const)
  );
  return Object.fromEntries(entries);
}
