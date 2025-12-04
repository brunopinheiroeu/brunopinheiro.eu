"use client";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import MarkdownContent from "./MarkdownContent";

interface MarkdownWithEmbedsProps {
  content: string;
  className?: string;
  inline?: boolean;
}

export default function MarkdownWithEmbeds({ content, className, inline = false }: MarkdownWithEmbedsProps) {
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

  // If no embeds found, just render as markdown
  if (embeds.length === 0) {
    return (
      <div ref={containerRef} className={className}>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 mt-6 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 mt-5 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-bold mb-2 mt-4 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h3>,
            h4: ({ children }) => <h4 className="text-lg font-bold mb-2 mt-3 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h4>,
            h5: ({ children }) => <h5 className="text-base font-bold mb-1 mt-2 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h5>,
            h6: ({ children }) => <h6 className="text-sm font-bold mb-1 mt-2 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h6>,
            p: ({ children }) => <p className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-slate-700 dark:text-slate-300 ml-4">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-slate-700 dark:text-slate-300 ml-4">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            blockquote: ({ children }) => <blockquote className="border-l-4 border-indigo-500 dark:border-indigo-400 pl-4 italic my-4 text-slate-600 dark:text-slate-400">{children}</blockquote>,
            strong: ({ children }) => <strong className="font-bold text-slate-900 dark:text-slate-100">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => <code className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800 dark:text-slate-200">{children}</code>,
            a: ({ href, children }) => <a href={href} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline">{children}</a>,
            br: () => <br />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  }

  // Render markdown and embeds interleaved
  return (
    <div ref={containerRef} className={className}>
      {parts.map((part, index) => (
        <div key={index}>
          {part && (
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 mt-6 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 mt-5 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold mb-2 mt-4 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h3>,
                h4: ({ children }) => <h4 className="text-lg font-bold mb-2 mt-3 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h4>,
                h5: ({ children }) => <h5 className="text-base font-bold mb-1 mt-2 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h5>,
                h6: ({ children }) => <h6 className="text-sm font-bold mb-1 mt-2 text-slate-900 dark:text-slate-100 first:mt-0">{children}</h6>,
                p: ({ children }) => <p className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-slate-700 dark:text-slate-300 ml-4">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-slate-700 dark:text-slate-300 ml-4">{children}</ol>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-indigo-500 dark:border-indigo-400 pl-4 italic my-4 text-slate-600 dark:text-slate-400">{children}</blockquote>,
                strong: ({ children }) => <strong className="font-bold text-slate-900 dark:text-slate-100">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                code: ({ children }) => <code className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800 dark:text-slate-200">{children}</code>,
                a: ({ href, children }) => <a href={href} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline">{children}</a>,
                br: () => <br />,
              }}
            >
              {part}
            </ReactMarkdown>
          )}
          {embeds[index] && (
            <div 
              className="my-4"
              dangerouslySetInnerHTML={{ __html: embeds[index] }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
