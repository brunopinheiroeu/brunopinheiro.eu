"use client";
import { useEffect, useRef } from "react";

interface EmbedlyContentProps {
  html: string;
  className?: string;
}

export default function EmbedlyContent({ html, className }: EmbedlyContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const processEmbeds = () => {
      if (typeof window !== "undefined" && (window as any).embedly) {
        console.log("Embedly found, processing cards...");
        // Process all embedly cards in the container
        (window as any).embedly("card", containerRef.current);
        return true;
      }
      console.log("Embedly not found yet...");
      return false;
    };

    // Try immediately
    if (!processEmbeds()) {
      // If Embedly isn't loaded yet, wait for it
      const checkInterval = setInterval(() => {
        if (processEmbeds()) {
          clearInterval(checkInterval);
        }
      }, 100);

      // Clean up after 10 seconds
      const timeout = setTimeout(() => {
        console.log("Embedly timeout - script may not have loaded");
        clearInterval(checkInterval);
      }, 10000);

      return () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
      };
    }
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
