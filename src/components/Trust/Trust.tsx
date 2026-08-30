"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const providerLogos: { name: string; src: string }[] = [
  // TODO: replace with real partner/underwriter logos once supplied by the client
];

export default function Trust() {
  // Duplicate logos for seamless looping
  const marqueeLogos = [...providerLogos, ...providerLogos];

  return (
    <section className="py-10 border-b border-border-subtle bg-surface overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <p className="text-center text-xs font-bold text-text-muted uppercase tracking-widest mb-10">
          Trusted by leading brands & providers
        </p>

        <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-white after:to-transparent">
          <div
            className="flex items-center gap-16 md:gap-24 w-max opacity-70 hover:opacity-100 transition-opacity duration-300 animate-marquee"
          >
            {marqueeLogos.map((logo, idx) => (
              <div key={`${logo.name}-${idx}`} className="relative w-28 h-10 md:w-36 md:h-12 transition-all duration-300 hover:scale-105">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 112px, 144px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
