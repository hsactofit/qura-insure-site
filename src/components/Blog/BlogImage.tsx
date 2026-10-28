"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** Remote RankMesh image (any host); hides itself if the URL is broken. */
export default function BlogImage({ src, alt, className, priority = false }: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- arbitrary remote hosts from RankMesh
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      referrerPolicy="no-referrer-when-downgrade"
      onError={() => setFailed(true)}
      className={cn("w-full h-full object-cover", className)}
    />
  );
}
