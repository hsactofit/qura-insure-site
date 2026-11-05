"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-primary relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-accent/10 to-transparent opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-surface-mint/5 to-transparent opacity-40" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center flex flex-col items-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="flex flex-col items-center w-full"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1 } }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-8"
          >
            <Image src="/logos/White Logomark.svg" alt="Qura" width={32} height={32} className="opacity-80" />
          </motion.div>
          
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 leading-[1.05] tracking-tight text-white text-balance"
          >
            Not sure which insurance <br className="hidden md:block"/> is right for you?
          </motion.h2>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-lg md:text-xl text-surface-sage mb-12 leading-relaxed font-medium max-w-2xl mx-auto"
          >
            Stop guessing and start planning. Get unbiased, expert recommendations tailored specifically to your family&apos;s financial needs.
          </motion.p>
          
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#consultation"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-cta text-primary text-lg font-bold rounded-full hover:bg-cta-hover transition-all duration-300 shadow-xl shadow-cta/20 hover:-translate-y-1 active:scale-95"
            >
              Talk to a QURA expert
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
          
          {/* Subtle Floating UI */}
          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.9, x: 20 }, visible: { opacity: 1, scale: 1, x: 0 } }}
            className="hidden md:flex absolute top-12 right-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-2xl items-center gap-3 animate-float"
          >
            <div className="w-10 h-10 rounded-full bg-accent border-2 border-white/20 flex items-center justify-center overflow-hidden">
               <Image src="/logos/White Logomark.svg" alt="Advisor" width={16} height={16} />
            </div>
            <div className="text-left">
               <div className="text-white text-sm font-bold">Expert Available</div>
               <div className="text-accent-lime text-[10px] font-bold uppercase tracking-widest">Free Consultation</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

