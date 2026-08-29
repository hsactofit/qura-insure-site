"use client";

import { cn } from "@/lib/utils";

interface QuraCornerBracketsProps {
  color?: "lime" | "white" | "navy" | "blue" | "current";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function QuraCornerBrackets({
  color = "white",
  size = "md",
  className,
}: QuraCornerBracketsProps) {
  const colorMap = {
    lime: "text-accent",
    white: "text-white",
    navy: "text-primary",
    blue: "text-primary",
    current: "text-current",
  };

  const sizeMap = {
    sm: "w-5 h-5 top-2 left-2 right-2 bottom-2",
    md: "w-7 h-7 top-3 left-3 right-3 bottom-3",
    lg: "w-9 h-9 top-4 left-4 right-4 bottom-4",
  };

  const colorClass = colorMap[color];
  const isSm = size === "sm";
  const isLg = size === "lg";

  const posTopLeft = isSm ? "top-2 left-2 w-5 h-5" : isLg ? "top-4 left-4 w-9 h-9" : "top-3 left-3 w-7 h-7";
  const posTopRight = isSm ? "top-2 right-2 w-5 h-5" : isLg ? "top-4 right-4 w-9 h-9" : "top-3 right-3 w-7 h-7";
  const posBottomLeft = isSm ? "bottom-2 left-2 w-5 h-5" : isLg ? "bottom-4 left-4 w-9 h-9" : "bottom-3 left-3 w-7 h-7";
  const posBottomRight = isSm ? "bottom-2 right-2 w-5 h-5" : isLg ? "bottom-4 right-4 w-9 h-9" : "bottom-3 right-3 w-7 h-7";

  return (
    <div className={cn("pointer-events-none absolute inset-0 z-20 overflow-hidden", className)}>
      {/* Top-Left Official QURA Corner Wedge */}
      <svg viewBox="0 0 100 100" className={cn("absolute", posTopLeft, colorClass)}>
        <path d="M 0 100 L 0 14 A 14 14 0 0 1 14 0 L 100 0 C 52 14, 14 52, 0 100 Z" fill="currentColor" />
      </svg>

      {/* Top-Right Official QURA Corner Wedge (Mirrored Horizontally) */}
      <svg viewBox="0 0 100 100" className={cn("absolute -scale-x-100", posTopRight, colorClass)}>
        <path d="M 0 100 L 0 14 A 14 14 0 0 1 14 0 L 100 0 C 52 14, 14 52, 0 100 Z" fill="currentColor" />
      </svg>

      {/* Bottom-Left Official QURA Corner Wedge (Mirrored Vertically) */}
      <svg viewBox="0 0 100 100" className={cn("absolute -scale-y-100", posBottomLeft, colorClass)}>
        <path d="M 0 100 L 0 14 A 14 14 0 0 1 14 0 L 100 0 C 52 14, 14 52, 0 100 Z" fill="currentColor" />
      </svg>

      {/* Bottom-Right Official QURA Corner Wedge (Mirrored Both Axes) */}
      <svg viewBox="0 0 100 100" className={cn("absolute -scale-x-100 -scale-y-100", posBottomRight, colorClass)}>
        <path d="M 0 100 L 0 14 A 14 14 0 0 1 14 0 L 100 0 C 52 14, 14 52, 0 100 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
