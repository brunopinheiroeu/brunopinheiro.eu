"use client";
import { useEffect, useRef, Fragment } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import MarkdownContent from "./MarkdownContent";
import VimeoEmbed from "./VimeoEmbed";
import { parseLoneVimeoUrl, type VimeoEmbedData } from "@/lib/vimeo";

interface MarkdownWithEmbedsProps {
  content: string;
  className?: string;
  inline?: boolean;
  // Pre-fetched (server-side) Vimeo oEmbed data, keyed by the exact URL
  // found in the markdown. A missing/null entry falls back to a plain
  // link. Omit entirely for content that's never expected to carry a
  // Vimeo URL - the markdown renders exactly as before.
  vimeoEmbeds?: Record<string, VimeoEmbedData | null>;
}

const getExternalLinkProps = (href?: string) => {
  if (!href || !/^https?:\/\//i.test(href)) {
    return {};
  }

  return {
    target: "_blank",
    rel: "noopener noreferrer",
  };
};

const markdownComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => <h1 className="text-3xl font-bold mb-4 mt-6 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h1>,
  h2: ({ children }: { children?: React.ReactNode }) => <h2 className="text-2xl font-bold mb-3 mt-5 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h2>,
  h3: ({ children }: { children?: React.ReactNode }) => <h3 className="text-xl font-bold mb-2 mt-4 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h3>,
  h4: ({ children }: { children?: React.ReactNode }) => <h4 className="text-lg font-bold mb-2 mt-3 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h4>,
  h5: ({ children }: { children?: React.ReactNode }) => <h5 className="text-base font-bold mb-1 mt-2 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h5>,
  h6: ({ children }: { children?: React.ReactNode }) => <h6 className="text-sm font-bold mb-1 mt-2 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h6>,
  p: ({ children }: { children?: React.ReactNode }) => <p className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">{children}</p>,
  ul: ({ children }: { children?: React.ReactNode }) => <ul className="list-disc list-inside mb-4 space-y-1 text-slate-700 dark:text-slate-300 ml-4">{children}</ul>,
  ol: ({ children }: { children?: React.ReactNode }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-slate-700 dark:text-slate-300 ml-4">{children}</ol>,
  li: ({ children }: { children?: React.ReactNode }) => <li className="mb-1">{children}</li>,
  blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="border-l-4 border-indigo-500 dark:border-indigo-400 pl-4 italic my-4 text-slate-600 dark:text-slate-400">{children}</blockquote>,
  strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-bold text-slate-900 dark:text-slate-100">{children}</strong>,
  em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
  code: ({ children }: { children?: React.ReactNode }) => <code className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-2xl text-sm font-mono text-slate-800 dark:text-slate-200">{children}</code>,
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => <a href={href} {...getExternalLinkProps(href)} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline">{children}</a>,
  br: () => <br />,
};

// Splits a markdown chunk into its own text runs and any lone-Vimeo-URL
// paragraphs, rendering the latter as <VimeoEmbed>. When no vimeoEmbeds map
// is passed, renders the whole chunk as plain markdown (no behavior change
// for callers that never carry Vimeo links).
function MarkdownBlock({
  text,
  vimeoEmbeds,
}: {
  text: string;
  vimeoEmbeds?: Record<string, VimeoEmbedData | null>;
}) {
  if (!text) return null;

  if (!vimeoEmbeds) {
    return (
      <ReactMarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
        {text}
      </ReactMarkdown>
    );
  }

  const blocks = text.split(/\n{2,}/);
  const runs: Array<{ type: "text"; text: string } | { type: "vimeo"; url: string }> = [];
  let buffer: string[] = [];

  const flush = () => {
    if (buffer.length) {
      runs.push({ type: "text", text: buffer.join("\n\n") });
      buffer = [];
    }
  };

  for (const block of blocks) {
    const url = parseLoneVimeoUrl(block);
    if (url && url in vimeoEmbeds) {
      flush();
      runs.push({ type: "vimeo", url });
    } else {
      buffer.push(block);
    }
  }
  flush();

  // Nothing to split out - render as a single markdown pass, same as before.
  if (runs.length <= 1 && runs[0]?.type === "text") {
    return (
      <ReactMarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
        {text}
      </ReactMarkdown>
    );
  }

  return (
    <>
      {runs.map((run, i) =>
        run.type === "vimeo" ? (
          <VimeoEmbed key={i} url={run.url} data={vimeoEmbeds[run.url] ?? null} />
        ) : (
          <ReactMarkdown key={i} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
            {run.text}
          </ReactMarkdown>
        )
      )}
    </>
  );
}

export default function MarkdownWithEmbeds({
  content,
  className,
  inline = false,
  vimeoEmbeds,
}: MarkdownWithEmbedsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // For inline rendering, delegate to MarkdownContent
  if (inline) {
    return <MarkdownContent content={content} className={className} inline={inline} />;
  }

  // Trigger Embedly to process cards after content is rendered
  useEffect(() => {
    const processEmbeds = () => {
      if (typeof window !== "undefined") {
        const embedlyFunc = (window as any).embedly;

        if (embedlyFunc) {
          console.log("Embedly found, processing cards in:", containerRef.current);

          // Find all embedly-card elements
          const cards = containerRef.current?.querySelectorAll('.embedly-card');
          console.log("Found embedly-card elements:", cards?.length);

          // Try different API methods
          try {
            // Method 1: Call embedly as a function
            if (typeof embedlyFunc === 'function') {
              embedlyFunc('card', containerRef.current);
            }
            // Method 2: Use embedly.card if available
            else if (embedlyFunc.card && typeof embedlyFunc.card === 'function') {
              embedlyFunc.card();
            }
            console.log("Embedly processing triggered");
            return true;
          } catch (error) {
            console.error("Error calling Embedly:", error);
          }
        } else {
          console.log("Embedly not loaded yet");
        }
      }
      return false;
    };

    // Small delay to ensure DOM is ready
    const initialTimeout = setTimeout(() => {
      // Try immediately
      if (!processEmbeds()) {
        // If Embedly isn't loaded yet, wait for it
        const checkInterval = setInterval(() => {
          if (processEmbeds()) {
            clearInterval(checkInterval);
          }
        }, 200);

        // Clean up after 10 seconds
        const timeout = setTimeout(() => {
          console.warn("Embedly timeout - script may not have loaded properly");
          clearInterval(checkInterval);
        }, 10000);

        return () => {
          clearInterval(checkInterval);
          clearTimeout(timeout);
        };
      }
    }, 100);

    return () => clearTimeout(initialTimeout);
  }, [content]);

  // Split content by embedly blocks - using [\s\S] instead of 's' flag for ES2015 compatibility
  const embedlyRegex = /<a[^>]*class="embedly-card"[^>]*>[\s\S]*?<\/a>/g;
  const parts = content.split(embedlyRegex);
  const embeds = content.match(embedlyRegex) || [];

  // If no embeds found, just render as markdown (still Vimeo-aware)
  if (embeds.length === 0) {
    return (
      <div ref={containerRef} className={className}>
        <MarkdownBlock text={content} vimeoEmbeds={vimeoEmbeds} />
      </div>
    );
  }

  // Render markdown and embeds interleaved
  return (
    <div ref={containerRef} className={className}>
      {parts.map((part, index) => (
        <Fragment key={index}>
          <MarkdownBlock text={part} vimeoEmbeds={vimeoEmbeds} />
          {embeds[index] && (
            <div
              className="my-4"
              dangerouslySetInnerHTML={{ __html: embeds[index] }}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
