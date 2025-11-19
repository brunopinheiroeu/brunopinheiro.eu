"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/scroll";
import type { ReactNode } from "react";

interface BackButtonProps {
  href: string;
  sectionId: string;
  className?: string;
  children?: ReactNode;
}

export default function BackButton({
  href,
  sectionId,
  className,
  children,
}: BackButtonProps) {
  const pathname = usePathname();
  const isOnMainPage = pathname === "/" || pathname?.startsWith("/#");

  const handleClick = (e: React.MouseEvent) => {
    if (isOnMainPage) {
      scrollToSection(e, sectionId);
    }
    // When not on the main page, allow the default Link navigation
    // to take the user back to /#products where HashScrollHandler handles scrolling.
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      <ArrowLeft className="h-4 w-4" />
      {children || "Back to Products"}
    </Link>
  );
}
