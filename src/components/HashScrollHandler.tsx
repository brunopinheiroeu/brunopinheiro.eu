"use client";
import { useEffect } from "react";

export default function HashScrollHandler() {
  useEffect(() => {
    // Handle hash from URL (e.g., /#products)
    const hash = window.location.hash.slice(1); // Remove the #
    
    if (hash) {
      // Small delay to ensure page is fully loaded and sections are rendered
      const timeoutId = setTimeout(() => {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  return null;
}

