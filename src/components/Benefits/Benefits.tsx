"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Shield, HeartPulse, Building, Lock, PhoneOff, Scale, LifeBuoy, BadgeCheck, User } from "lucide-react";
import { BENEFITS } from "@/data/content";
import { cn } from "@/lib/utils";

const iconMap = {
  PhoneOff: PhoneOff,
  Scale: Scale,
  LifeBuoy: LifeBuoy,
  BadgeCheck: BadgeCheck,
};

export default function Benefits() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      if (v < 0.25) setActiveIndex(0);
      else if (v < 0.5) setActiveIndex(1);
      else if (v < 0.75) setActiveIndex(2);
      else setActiveIndex(3);
    });
  }, [smoothProgress]);

  return (
    <section id="why-us" ref={containerRef} className="py-32 bg-bg-main overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-primary mb-6 tracking-tight leading-[1.1]">
            Why you'll love <br /> working with us
          </h2>
          <p className="text-lg text-text-muted font-medium">
            We've redesigned the insurance experience from the ground up to be exactly what it should be: transparent, helpful, and stress-free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 auto-rows-[minmax(240px,_auto)]">
          {BENEFITS.map((benefit, index) => {
            const isFeatured = index === 0;
            const isStatCard = index === 3;
            const Icon = iconMap[benefit.icon as keyof typeof iconMap] || Shield;
            const isActive = activeIndex === index;
            const isSubdued = !isActive && activeIndex !== -1;
            
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 100, damping: 20 }}
                animate={{ 
                  scale: isActive ? 1.02 : (isSubdued ? 0.98 : 1),
                  opacity: isSubdued ? 0.7 : 1,
                  filter: isSubdued ? "blur(2px)" : "blur(0px)",
                  borderColor: isActive ? (isStatCard ? "#ffffff" : "#438B68") : "transparent"
                }}
                className={cn(
                  "relative rounded-3xl p-8 md:p-10 shadow-sm border-2 overflow-hidden flex flex-col transition-shadow duration-500",
                  isActive ? "shadow-2xl z-10" : "z-0",
                  isFeatured ? "md:col-span-12 lg:col-span-7 lg:row-span-2 bg-surface-mint" : 
                  isStatCard ? "md:col-span-12 lg:col-span-5 bg-primary text-white" : 
                  "md:col-span-6 lg:col-span-5 bg-surface"
                )}
              >
                {/* Background decorative element */}
                <motion.div 
                  className={cn(
                    "absolute right-0 bottom-0 w-64 h-64 rounded-full blur-3xl translate-y-1/3 translate-x-1/3 transition-opacity duration-500",
                    isStatCard ? "bg-accent/20" : "bg-accent/10",
                    isActive ? "opacity-100" : "opacity-30"
                  )} 
                />

                <div className="relative z-10 flex flex-col h-full">
                  <motion.div 
                    animate={{ rotate: isActive ? [0, -10, 0] : 0, scale: isActive ? 1.1 : 1 }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shrink-0",
                    isFeatured ? "bg-accent text-white shadow-lg shadow-accent/20" : 
                    isStatCard ? "bg-white/10 text-white" : 
                    "bg-surface-sage text-accent"
                  )}>
                    <Icon size={24} strokeWidth={2} />
                  </motion.div>
                  
                  <h3 className={cn(
                    "text-2xl font-bold mb-3 transition-colors",
                    isStatCard ? "text-white" : "text-primary"
                  )}>
                    {benefit.title}
                  </h3>
                  
                  <p className={cn(
                    "leading-relaxed font-medium text-[15px]",
                    isStatCard ? "text-white/70" : "text-text-muted",
                    isFeatured && "text-lg max-w-sm"
                  )}>
                    {benefit.description}
                  </p>
                  
                  {isStatCard && (
                    <div className="mt-auto pt-8">
                      <div className="text-[3.5rem] leading-none font-extrabold tracking-tight mb-2 text-white">0%</div>
                      <div className="text-sm font-bold text-accent-lime uppercase tracking-widest">Hidden Fees</div>
                    </div>
                  )}
                  
                  {isFeatured && (
                    <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 relative">
                       <div className="flex -space-x-3">
                          {[1,2,3,4].map((i) => (
                             <div key={i} className="w-10 h-10 rounded-full border-2 border-surface-mint bg-white flex items-center justify-center text-xs font-bold text-primary overflow-hidden">
                               <User size={20} className="text-primary/50" />
                             </div>
                          ))}
                          <div className="w-10 h-10 rounded-full border-2 border-surface-mint bg-surface-sage flex items-center justify-center text-xs font-bold text-accent">+</div>
                       </div>
                       
                       <div className="relative">
                          {/* Floating Advisor UI */}
                          <div className="animate-float-fast bg-surface p-4 rounded-xl shadow-xl border border-border-subtle flex items-center gap-3 w-max relative z-10">
                            <div className="w-10 h-10 rounded-full bg-accent border-2 border-surface flex items-center justify-center text-white shrink-0 overflow-hidden">
                               <User size={16} className="text-white" />
                            </div>
                            <div>
                               <div className="text-xs font-bold text-primary">Your Dedicated Advisor</div>
                               <div className="text-[11px] text-text-muted">Zero spam policy enforced</div>
                            </div>
                          </div>
                       </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

