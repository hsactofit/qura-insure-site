"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROCESS_STEPS } from "@/data/content";

import { Check, ShieldCheck, HeartPulse, ShieldAlert } from "lucide-react";

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Opacity transforms for each step's UI on the right
  const uiOpacity0 = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]);
  const uiOpacity1 = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const uiOpacity2 = useTransform(scrollYProgress, [0.45, 0.55, 0.75, 0.85], [0, 1, 1, 0]);
  const uiOpacity3 = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);

  // Opacity for the text descriptions on the left
  const textOpacities = [
    useTransform(scrollYProgress, [0, 0.1, 0.25], [1, 1, 0.3]),
    useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.55], [0.3, 1, 1, 0.3]),
    useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.85], [0.3, 1, 1, 0.3]),
    useTransform(scrollYProgress, [0.75, 0.85, 1], [0.3, 1, 1])
  ];

  const scaleTransforms = [
    useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0.95]),
    useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0.95, 1, 1, 0.95]),
    useTransform(scrollYProgress, [0.45, 0.55, 0.75, 0.85], [0.95, 1, 1, 0.95]),
    useTransform(scrollYProgress, [0.7, 0.8, 1], [0.95, 1, 1])
  ];

  return (
    <section id="how-it-works" ref={containerRef} className="relative bg-surface border-t border-border-subtle h-[400vh]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative w-full h-full pt-20">
          
          <div className="text-center md:text-left mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
              How QURA works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 h-[70vh]">
            {/* Left side: Steps text */}
            <div className="flex flex-col justify-center h-full gap-16 relative">
               <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-border-subtle rounded-full hidden md:block">
                  <motion.div 
                    className="w-full bg-accent rounded-full origin-top"
                    style={{ scaleY: scrollYProgress, height: "100%" }}
                  />
               </div>

               {PROCESS_STEPS.map((step, i) => (
                  <motion.div 
                    key={i} 
                    className="relative pl-16 group"
                    style={{ opacity: textOpacities[i] }}
                  >
                     <div className="absolute left-3.5 -translate-x-1/2 top-1 w-5 h-5 rounded-full border-2 border-surface bg-surface-mint z-10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                     </div>
                     <h3 className="text-2xl font-bold text-primary mb-2">{step.title}</h3>
                     <p className="text-lg text-text-muted font-medium leading-relaxed max-w-md">{step.description}</p>
                  </motion.div>
               ))}
            </div>

            {/* Right side: Pinned Visual UI Storytelling */}
            <div className="relative h-full flex items-center justify-center">
              
              {/* Step 0: Profile */}
              <motion.div 
                style={{ opacity: uiOpacity0, scale: scaleTransforms[0] }}
                className="absolute inset-x-0 mx-auto max-w-sm bg-surface p-6 rounded-[2rem] shadow-2xl border border-border-subtle flex flex-col gap-4 origin-center"
              >
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border-subtle">
                  <div className="w-12 h-12 bg-bg-main rounded-full flex items-center justify-center text-primary font-bold">AJ</div>
                  <div>
                    <h4 className="font-bold text-primary">Your Family Profile</h4>
                    <p className="text-xs text-text-muted">Analyzing needs...</p>
                  </div>
                </div>
                {["Age: 32, Spouse: 30", "Income: \u20B925L/year", "Dependents: 1 Child", "Existing Cover: \u20B95L Corporate"].map((item, i) => (
                  <div key={i} className="bg-bg-main p-3 rounded-xl text-sm font-medium text-text-main flex items-center gap-3">
                     <Check size={16} className="text-accent" /> {item}
                  </div>
                ))}
              </motion.div>

              {/* Step 1: Recommendations */}
              <motion.div 
                style={{ opacity: uiOpacity1, scale: scaleTransforms[1] }}
                className="absolute inset-x-0 mx-auto max-w-md bg-primary p-6 rounded-[2rem] shadow-2xl border border-primary origin-center"
              >
                 <div className="bg-[#10251C] p-6 rounded-2xl border border-white/10">
                   <div className="flex justify-between mb-6">
                      <div className="text-white/80 text-xs font-bold uppercase">Top Match Found</div>
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
                   </div>
                   <h4 className="text-2xl font-bold text-white mb-2">HDFC Optima Restore</h4>
                   <p className="text-accent-lime text-sm font-medium mb-6">Optimal based on your city tier</p>
                   
                   <div className="space-y-3">
                     <div className="flex justify-between text-white/90 text-sm">
                       <span>Coverage</span>
                       <span className="font-bold">{"\u20B9"}20 Lakhs</span>
                     </div>
                     <div className="h-px bg-white/10 w-full" />
                     <div className="flex justify-between text-white/90 text-sm">
                       <span>Premium</span>
                       <span className="font-bold">{"\u20B9"}1,250/mo</span>
                     </div>
                   </div>
                 </div>
              </motion.div>

              {/* Step 2: Compare Plans */}
              <motion.div 
                style={{ opacity: uiOpacity2, scale: scaleTransforms[2] }}
                className="absolute inset-x-0 mx-auto w-full max-w-lg bg-surface p-6 rounded-[2rem] shadow-2xl border border-border-subtle origin-center flex gap-4"
              >
                 <div className="flex-1 bg-bg-main p-4 rounded-xl border border-border-subtle relative">
                    <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">QURA Pick</div>
                    <div className="w-8 h-8 rounded bg-surface text-accent flex items-center justify-center shadow-sm mb-3"><HeartPulse size={16} /></div>
                    <div className="font-bold text-primary text-sm mb-1">Max Secure</div>
                    <div className="text-xs text-text-muted mb-4">Zero copay</div>
                    <button className="w-full bg-primary text-white text-xs py-2 rounded-lg font-bold">Select</button>
                 </div>
                 
                 <div className="flex-1 bg-surface p-4 rounded-xl border border-border-subtle opacity-70 scale-95 origin-left">
                    <div className="w-8 h-8 rounded bg-surface-sage text-text-muted flex items-center justify-center shadow-sm mb-3"><ShieldAlert size={16} /></div>
                    <div className="font-bold text-text-muted text-sm mb-1">Standard Plan</div>
                    <div className="text-xs text-text-muted mb-4">20% copay</div>
                    <button className="w-full bg-bg-main text-text-muted text-xs py-2 rounded-lg font-bold">Compare</button>
                 </div>
              </motion.div>

              {/* Step 3: Success */}
              <motion.div 
                style={{ opacity: uiOpacity3, scale: scaleTransforms[3] }}
                className="absolute inset-x-0 mx-auto max-w-sm bg-surface-sage p-8 rounded-[2rem] shadow-2xl border border-accent/20 origin-center text-center"
              >
                <div className="w-20 h-20 bg-accent rounded-full text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/30">
                  <ShieldCheck size={40} />
                </div>
                <h4 className="text-2xl font-bold text-primary mb-2">Family Secured</h4>
                <p className="text-text-muted font-medium mb-6">Your policy is active and stored in your QURA vault.</p>
                <div className="bg-white rounded-xl p-4 shadow-sm text-left">
                   <div className="text-xs text-text-muted mb-1">Next steps</div>
                   <div className="font-bold text-primary text-sm flex items-center gap-2">
                     <Check size={14} className="text-accent" /> Advisory support active
                   </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
