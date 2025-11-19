"use client";
import { useEffect, useState } from "react";

interface FormattedDateProps {
  dateString: string;
  className?: string;
}

// Format date deterministically to avoid hydration mismatches
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  
  return `${month} ${day}, ${year}`;
}

export default function FormattedDate({ dateString, className }: FormattedDateProps) {
  const [formatted, setFormatted] = useState<string>(() => formatDate(dateString));

  useEffect(() => {
    // Update on client side to ensure consistency
    setFormatted(formatDate(dateString));
  }, [dateString]);

  return <span className={className} suppressHydrationWarning>{formatted}</span>;
}

