"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ImageContent() {
  return (
    <section className="py-24 bg-surface overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Block 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden bg-bg-main border border-slate-100 flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-grid-pattern opacity-50 mix-blend-multiply" />
              
              {/* Mock UI Card */}
              <div className="relative z-10 w-full max-w-sm bg-surface rounded-2xl shadow-xl border border-border-subtle p-6">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border-subtle">
                  <div className="w-12 h-12 bg-bg-main rounded-full flex items-center justify-center">
                    <CheckCircle2 size={24} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary">Claim Approved</div>
                    <div className="text-xs text-text-muted font-medium">Processed in 24 hours</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-text-muted">Hospital Bill</span>
                    <span className="text-primary">₹45,000</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-text-muted">Qura Support</span>
                    <span className="text-accent">-₹45,000</span>
                  </div>
                  <div className="pt-4 border-t border-border-subtle flex justify-between items-center font-bold">
                    <span className="text-primary">You Pay</span>
                    <span className="text-primary text-xl">₹0</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 tracking-tight">
              A dedicated team that fights for your claims
            </h2>
            <p className="text-lg text-text-muted mb-8 font-medium">
              Buying insurance is easy, but getting claims approved can be a nightmare. We have a dedicated team that steps in when you need it the most, ensuring your claims are processed smoothly.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "24/7 dedicated support desk",
                "Assistance with paperwork and documentation",
                "Direct coordination with hospital TPAs",
                "Escalation of unfairly rejected claims"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-bg-main flex items-center justify-center shrink-0">
                     <CheckCircle2 size={12} className="text-accent" />
                  </div>
                  <span className="text-text-muted font-medium">{item}</span>
                </li>
              ))}
            </ul>
            
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-bg-main text-accent text-base font-semibold rounded-xl hover:bg-bg-main transition-colors shadow-sm"
            >
              Learn about our claim support
            </Link>
          </motion.div>
        </div>

        {/* Block 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden bg-bg-main border border-slate-100 flex items-center justify-center p-8">
               <div className="absolute inset-0 bg-dot-pattern opacity-30 mix-blend-multiply" />
               
               {/* Mock UI Card */}
               <div className="relative z-10 w-full max-w-sm bg-surface rounded-2xl shadow-xl border border-border-subtle overflow-hidden">
                 <div className="bg-primary px-6 py-4">
                   <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Policy Document</div>
                   <div className="text-white font-bold text-lg">Simplified Terms</div>
                 </div>
                 <div className="p-6 space-y-4">
                   <div className="flex gap-4">
                     <div className="w-1 bg-red-400 rounded-full shrink-0" />
                     <div>
                       <div className="text-xs text-white/70 font-bold mb-1 line-through">Jargon: Sub-limits applicable on room rent.</div>
                       <div className="text-sm text-primary font-medium">Simple: You can choose any hospital room without extra charges.</div>
                     </div>
                   </div>
                   <div className="flex gap-4">
                     <div className="w-1 bg-accent-lime rounded-full shrink-0" />
                     <div>
                       <div className="text-xs text-white/70 font-bold mb-1 line-through">Jargon: PED waiting period of 36 months.</div>
                       <div className="text-sm text-primary font-medium">Simple: Pre-existing diseases are covered after 3 years.</div>
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 tracking-tight">
              No jargon. No hidden clauses. Just clarity.
            </h2>
            <p className="text-lg text-text-muted mb-8 font-medium">
              Insurance documents are notoriously difficult to read. Our advisors break down complex policies into simple, understandable terms so you know exactly what you&apos;re buying.
            </p>
            
            <ul className="space-y-4">
              {[
                "Clear explanation of what's covered and what's not",
                "Highlighting of waiting periods and sub-limits",
                "Unbiased comparison across multiple insurers",
                "Personalized recommendations based on your profile"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-bg-main flex items-center justify-center shrink-0">
                     <CheckCircle2 size={12} className="text-accent" />
                  </div>
                  <span className="text-text-muted font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
