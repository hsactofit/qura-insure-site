"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { X, Check } from "lucide-react";


const TRADITIONAL_ITEMS = [
  "Confusing jargon",
  "Too many options",
  "Pushy sales calls",
  "Hidden complexity",
  "Zero claims support"
];

const QURA_ITEMS = [
  "Expert guidance",
  "Transparent comparison",
  "Zero spam policy",
  "No hidden fees",
  "Lifetime claims support"
];

export default function Comparison() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth color transitions
  const backgroundColor = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["#F7F4EA", "#101A16", "#101A16", "#F7F4EA"]);
  const headingColor = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["#101A16", "#FFFFFF", "#FFFFFF", "#101A16"]);
  const subtextColor = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["#66716B", "#FFFFFFb3", "#FFFFFFb3", "#66716B"]);

  return (
    <motion.section 
      ref={containerRef} 
      style={{ backgroundColor }}
      className="relative h-[250vh]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Decorative Blur Backgrounds */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]) }}
          className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" 
        />
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]) }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" 
        />

        <div className="container mx-auto px-6 max-w-5xl relative z-10 w-full">
          <div className="text-center mb-16">
            <motion.h2 style={{ color: headingColor }} className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Insurance doesn&apos;t have to be hard
            </motion.h2>
            <motion.p style={{ color: subtextColor }} className="text-lg font-medium">
              See why thousands are choosing the QURA way.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-12 relative">
            
            {/* VS Badge */}
            <motion.div 
              style={{ scale: useTransform(scrollYProgress, [0.2, 0.4], [0, 1]), opacity: useTransform(scrollYProgress, [0.2, 0.3], [0, 1]) }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-surface rounded-full flex items-center justify-center text-primary font-bold shadow-xl border border-border-subtle z-20 hidden md:flex"
            >
              VS
            </motion.div>

            {/* Traditional Insurance */}
            <motion.div 
              style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]) }}
              className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white/50 mb-8 pb-4 border-b border-white/10">Traditional Platforms</h3>
              <ul className="space-y-6">
                {TRADITIONAL_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/70">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                      <X size={14} className="text-red-400" />
                    </div>
                    <span className="font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* QURA */}
            <motion.div 
              style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]) }}
              className="bg-surface rounded-3xl p-8 md:p-10 shadow-2xl border border-accent/30 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <h3 className="text-xl font-bold text-primary mb-8 pb-4 border-b border-border-subtle">The QURA Way</h3>
              <ul className="space-y-6">
                {QURA_ITEMS.map((item, i) => (
                  <ComparisonItem key={item} item={item} index={i} progress={scrollYProgress} />
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ComparisonItem({ item, index, progress }: { item: string; index: number; progress: MotionValue<number> }) {
  const start = 0.3 + index * 0.08;
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1]);
  const y = useTransform(progress, [start, start + 0.1], [20, 0]);
  return (
    <motion.li style={{ opacity, y }} className="flex items-center gap-4 text-primary">
      <div className="w-6 h-6 rounded-full bg-cta text-primary flex items-center justify-center shrink-0 shadow-sm shadow-accent/30"><Check size={14} strokeWidth={3} /></div>
      <span className="font-bold text-lg">{item}</span>
    </motion.li>
  );
}
