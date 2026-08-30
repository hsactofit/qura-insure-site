"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, Activity, Users, User } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  const uiScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const uiY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-10%"]);
  
  const leftCardX = useTransform(scrollYProgress, [0, 0.5], ["0px", "50px"]);
  const leftCardY = useTransform(scrollYProgress, [0, 0.5], ["0px", "-20px"]);
  
  const rightCardX = useTransform(scrollYProgress, [0, 0.5], ["0px", "-50px"]);
  const rightCardY = useTransform(scrollYProgress, [0, 0.5], ["0px", "-30px"]);

  // Sequential typography
  const words = "Insurance that actually makes sense.".split(" ");

  return (
    <section ref={containerRef} className="relative pt-32 md:pt-40 pb-0 overflow-hidden bg-bg-main min-h-screen">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] hidden pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.15] mix-blend-multiply pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="flex flex-col items-center w-full relative z-20"
        >
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 border border-border-subtle shadow-sm mb-7"
          >
            <div className="flex -space-x-1.5">
               {[1,2,3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border border-surface bg-surface-sage flex items-center justify-center overflow-hidden">
                     <User size={12} className="text-primary/50" />
                  </div>
               ))}
            </div>
            <span className="text-xs font-bold text-primary">Trusted by 10,000+ families</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5.7rem] font-extrabold tracking-[-.055em] text-primary leading-[.98] mb-7 max-w-5xl text-balance flex flex-wrap justify-center gap-x-3 gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                className={word === "actually" || word === "makes" || word === "sense." ? "font-editorial text-accent" : "text-primary"}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl font-medium leading-relaxed"
          >
            No spam. No jargon. Just honest, expert advice to help you pick the best term and health insurance for your family.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-16 justify-center w-full sm:w-auto"
          >
            <Link
              href="#consultation"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-dark transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 active:scale-95"
            >
              Talk to a QURA expert
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        {/* The Overlapping Product UI */}
        <motion.div 
          style={{ scale: uiScale, y: uiY }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100, damping: 20 }}
          className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[600px] -mb-20 md:-mb-32 z-20"
        >
          {/* Floating UI Card: Coverage â€” white card on cream bg */}
          <motion.div 
            style={{ x: leftCardX, y: leftCardY }}
            className="absolute -left-6 md:-left-12 top-20 md:top-32 bg-surface rounded-2xl p-4 md:p-5 shadow-xl border border-border-subtle z-30 w-48 md:w-64 hidden sm:block"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-surface-sage flex items-center justify-center text-accent">
                <Shield size={20} />
              </div>
              <div>
                <div className="text-xs text-text-muted font-bold uppercase tracking-wider">Total Cover</div>
                <div className="text-lg font-extrabold text-primary">{"\u20B9"}3.5 Cr</div>
              </div>
            </div>
            <div className="h-2 w-full bg-border-subtle rounded-full overflow-hidden">
               <div className="h-full bg-cta w-[85%]" />
            </div>
          </motion.div>

          {/* Floating UI Card: Advisor */}
          <motion.div 
            style={{ x: rightCardX, y: rightCardY }}
            className="absolute -right-6 md:-right-12 top-40 md:top-56 bg-surface rounded-2xl p-4 md:p-5 shadow-2xl border border-border-subtle z-30 w-56 md:w-72 hidden sm:flex items-center gap-4"
          >
             <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-border-subtle bg-surface-sage flex items-center justify-center overflow-hidden">
                   <User size={24} className="text-primary/60" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-accent border-2 border-surface" />
             </div>
             <div>
                <div className="text-sm font-bold text-primary">Your QURA Advisor</div>
                <div className="text-xs text-text-muted font-medium">Reviewing options...</div>
             </div>
          </motion.div>

          {/* Main Dashboard Window */}
          <div className="absolute inset-0 bg-white rounded-t-[2rem] md:rounded-t-[3rem] border-[8px] border-white shadow-[0_30px_90px_rgba(11,36,66,.22)] overflow-hidden flex flex-col">
            {/* Window Header */}
            <div className="h-12 border-b border-border-subtle flex items-center px-6 bg-bg-main gap-2 shrink-0">
               <div className="flex gap-1.5">
                 <div className="w-3 h-3 rounded-full bg-red-400" />
                 <div className="w-3 h-3 rounded-full bg-amber-400" />
                 <div className="w-3 h-3 rounded-full bg-emerald-400" />
               </div>
               <div className="mx-auto bg-surface border border-border-subtle text-text-muted text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-md hidden md:block">
                 Qura Advisory Platform
               </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="flex-1 bg-surface p-6 md:p-10 flex gap-8">
               {/* Sidebar (Hidden on mobile) */}
               <div className="w-48 shrink-0 hidden lg:flex flex-col gap-2">
                  {['Overview', 'Recommendations', 'Comparisons', 'Benefits', 'Family Profile'].map((item, i) => (
                    <div key={item} className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${i === 1 ? 'bg-surface-sage text-primary' : 'text-text-muted hover:text-primary'}`}>
                      {item}
                    </div>
                  ))}
               </div>
               
               {/* Main View */}
               <div className="flex-1 flex flex-col gap-6">
                  <div className="flex justify-between items-end">
                     <div>
                       <h2 className="text-2xl font-bold text-primary mb-1">Top Recommendations</h2>
                       <p className="text-sm text-text-muted font-medium">Based on your income and dependents</p>
                     </div>
                     <div className="hidden sm:flex items-center gap-2 bg-bg-main px-3 py-1.5 rounded-lg border border-border-subtle">
                       <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
                       <span className="text-xs font-bold text-primary">Live Analysis</span>
                     </div>
                  </div>
                  
                  {/* Cards inside dashboard */}
                  <div className="grid sm:grid-cols-2 gap-4">
                     {/* Top match card â€” white with sage-bordered accent */}
                     <div className="bg-surface border-2 border-accent/30 rounded-xl p-5 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">98% Match</div>
                        <div className="w-8 h-8 rounded bg-surface-sage text-accent flex items-center justify-center mb-4">
                           <Activity size={16} />
                        </div>
                        <h3 className="font-bold text-primary mb-1">HDFC Optima Secure</h3>
                        <p className="text-xs text-text-muted font-medium mb-4">Health Insurance Â· {"\u20B9"}20L Cover</p>
                        <div className="flex justify-between items-center pt-3 border-t border-border-subtle">
                           <div className="text-sm font-bold text-primary">{"\u20B9"}1,450<span className="text-[10px] text-text-muted">/mo</span></div>
                           <button className="text-[10px] font-bold bg-cta text-primary px-3 py-1.5 rounded hover:bg-cta-hover transition-colors">Select</button>
                        </div>
                     </div>
                     
                     {/* Secondary card â€” white */}
                     <div className="bg-surface border border-border-subtle rounded-xl p-5 shadow-sm">
                        <div className="w-8 h-8 rounded bg-bg-main text-accent-muted flex items-center justify-center mb-4">
                           <Users size={16} />
                        </div>
                        <h3 className="font-bold text-primary mb-1">Max Life Smart Secure</h3>
                        <p className="text-xs text-text-muted font-medium mb-4">Term Life · {"\u20B9"}2 Cr Cover</p>
                        <div className="flex justify-between items-center pt-3 border-t border-border-subtle">
                           <div className="text-sm font-bold text-primary">{"\u20B9"}2,100<span className="text-[10px] text-text-muted">/mo</span></div>
                           <button className="text-[10px] font-bold border border-border-subtle text-primary px-3 py-1.5 rounded hover:bg-bg-main transition-colors">Compare</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
