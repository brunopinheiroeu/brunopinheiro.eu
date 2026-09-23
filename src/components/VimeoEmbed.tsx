import type { VimeoEmbedData } from "@/lib/vimeo";

interface VimeoEmbedProps {
  url: string;
  data: VimeoEmbedData | null;
}

// Renders a Vimeo video at its real aspect ratio (from oEmbed metadata) -
// vertical videos are capped at 400px and centered, horizontal/square ones
// use the full content width. No autoplay/loop; controls and audio are the
// iframe's own defaults. If metadata couldn't be fetched, falls back to a
// plain accessible link instead of a broken embed.
export default function VimeoEmbed({ url, data }: VimeoEmbedProps) {
  if (!data) {
    return (
      <p className="my-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Watch the video on Vimeo ↗
        </a>
      </p>
    );
  }

  const isVertical = data.height > data.width;

  return (
    <div className={["my-6", isVertical ? "mx-auto max-w-[400px]" : "w-full"].join(" ")}>
      <iframe
        src={data.src}
        title={data.title || "Vimeo video"}
        style={{ aspectRatio: `${data.width} / ${data.height}` }}
        className="h-auto w-full rounded-2xl shadow-md"
        allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
