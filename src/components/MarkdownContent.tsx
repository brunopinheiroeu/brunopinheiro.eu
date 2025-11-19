"use client";
import ReactMarkdown from "react-markdown";

interface MarkdownContentProps {
  content: string;
  className?: string;
  inline?: boolean; // If true, renders inline markdown (for excerpts in cards/headers)
}

export default function MarkdownContent({ 
  content, 
  className, 
  inline = false 
}: MarkdownContentProps) {
  // For inline rendering, use span and convert block elements to inline
  if (inline) {
    return (
      <span className={className}>
        <ReactMarkdown
          components={{
            // Convert all block elements to inline spans, preserving content
            p: ({ children }) => <span>{children}</span>,
            h1: ({ children }) => <span className="font-bold">{children}</span>,
            h2: ({ children }) => <span className="font-bold">{children}</span>,
            h3: ({ children }) => <span className="font-bold">{children}</span>,
            h4: ({ children }) => <span className="font-bold">{children}</span>,
            h5: ({ children }) => <span className="font-bold">{children}</span>,
            h6: ({ children }) => <span className="font-bold">{children}</span>,
            ul: ({ children }) => <span>{children}</span>,
            ol: ({ children }) => <span>{children}</span>,
            li: ({ children }) => <span>{children} </span>,
            blockquote: ({ children }) => <span>{children}</span>,
            // Preserve line breaks as spaces
            br: () => <span> </span>,
            // Keep other inline elements as-is (strong, em, code, links, etc.)
          }}
        >
          {content}
        </ReactMarkdown>
      </span>
    );
  }

  // Default block rendering with proper styling
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          // Ensure headings are properly rendered with correct styling
          h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 mt-6 text-slate-900 first:mt-0">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 mt-5 text-slate-900 first:mt-0">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-bold mb-2 mt-4 text-slate-900 first:mt-0">{children}</h3>,
          h4: ({ children }) => <h4 className="text-lg font-bold mb-2 mt-3 text-slate-900 first:mt-0">{children}</h4>,
          h5: ({ children }) => <h5 className="text-base font-bold mb-1 mt-2 text-slate-900 first:mt-0">{children}</h5>,
          h6: ({ children }) => <h6 className="text-sm font-bold mb-1 mt-2 text-slate-900 first:mt-0">{children}</h6>,
          p: ({ children }) => <p className="mb-4 text-slate-700 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-slate-700 ml-4">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-slate-700 ml-4">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          blockquote: ({ children }) => <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-4 text-slate-600">{children}</blockquote>,
          strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          code: ({ children }) => <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">{children}</code>,
          a: ({ href, children }) => <a href={href} className="text-indigo-600 hover:text-indigo-800 underline">{children}</a>,
          // Preserve line breaks
          br: () => <br />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
