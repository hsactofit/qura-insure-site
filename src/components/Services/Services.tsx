"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, HeartPulse, Building, CheckCircle2 } from "lucide-react";
import Link from "next/link";


export default function Services() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Dynamic transforms for the nested UI elements
  const uiTranslateY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const statScale = useTransform(scrollYProgress, [0.2, 0.8], [0.9, 1.05]);

  return (
    <section id="products" ref={containerRef} className="py-32 bg-bg-main overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] hidden -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 tracking-tight leading-[1.1]">
              Smart coverage for <br className="hidden md:block" /> every stage of life.
            </h2>
            <p className="text-lg text-text-muted font-medium max-w-lg">
              We replace complex policies and hidden clauses with clear, curated options designed entirely around your needs.
            </p>
          </div>
          <Link
            href="#all-products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface text-primary font-semibold rounded-xl border border-border-subtle hover:border-accent hover:text-accent transition-all duration-300 shadow-sm active:scale-95 whitespace-nowrap"
          >
            View all coverage
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 auto-rows-[minmax(300px,_auto)]">
          {/* Featured Bento Card (Term Life) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group md:col-span-12 lg:col-span-8 relative rounded-3xl p-8 md:p-12 border border-border-subtle shadow-sm hover:shadow-xl hover:border-accent/40 bg-surface flex flex-col md:flex-row gap-8 items-center overflow-hidden transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-bg-main to-surface-sage/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex-1 flex flex-col items-start w-full">
              <div className="w-14 h-14 rounded-2xl bg-bg-main text-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                <Shield size={28} strokeWidth={2} />
              </div>
              <h3 className="text-3xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                Term Life Insurance
              </h3>
              <p className="text-text-muted text-lg leading-relaxed mb-8 max-w-md">
                Secure your family&apos;s financial future with comprehensive term life coverage. We strip away the jargon to give you transparent protection.
              </p>
              
              <ul className="space-y-3 mb-10">
                {["Up to \u20B92 Crore coverage", "Zero hidden clauses", "Premium locked for life"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-text-main font-medium">
                    <CheckCircle2 size={18} className="text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="#term-life"
                className="mt-auto text-primary font-bold inline-flex items-center gap-2 group-hover:text-accent transition-colors"
              >
                Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <motion.div 
              style={{ y: uiTranslateY }}
              className="relative z-10 w-full md:w-[320px] shrink-0"
            >
              <div className="bg-white rounded-2xl p-5 border border-border-subtle shadow-2xl relative">
                <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">Live Demo</div>
                <div className="flex justify-between items-start mb-6 pt-2">
                  <div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Total Coverage</div>
                    <div className="text-3xl font-extrabold text-primary">{"\u20B9"}2.0 Cr</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-bg-main p-4 rounded-xl border border-border-subtle">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-primary">Base Cover</span>
                      <span className="text-sm font-bold text-accent">{"\u20B9"}1.5 Cr</span>
                    </div>
                    <div className="w-full h-1.5 bg-border-subtle rounded-full overflow-hidden">
                      <div className="w-[75%] h-full bg-primary" />
                    </div>
                  </div>
                  
                  <div className="bg-surface-sage p-4 rounded-xl border border-accent/20 relative overflow-hidden group-hover:border-accent/40 transition-colors">
                    <div className="flex justify-between items-center mb-2 relative z-10">
                      <span className="text-sm font-bold text-primary flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-accent" /> Critical Illness
                      </span>
                      <span className="text-sm font-bold text-accent">{"\u20B9"}50 L</span>
                    </div>
                    <div className="w-full h-1.5 bg-accent/20 rounded-full overflow-hidden relative z-10">
                      <div className="w-full h-full bg-accent" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Medium Bento Card (Health) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="group md:col-span-6 lg:col-span-4 relative rounded-3xl p-8 md:p-10 border border-border-subtle shadow-sm hover:shadow-xl hover:border-accent/40 bg-surface flex flex-col transition-all duration-500"
          >
            <div className="w-12 h-12 rounded-xl bg-bg-main text-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500">
              <HeartPulse size={24} strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
              Health Insurance
            </h3>
            <p className="text-text-muted leading-relaxed font-medium mb-8">
              Comprehensive health coverage with zero room rent capping and lifetime renewability.
            </p>
            <Link
              href="#health"
              className="mt-auto text-primary font-bold inline-flex items-center gap-2 group-hover:text-accent transition-colors"
            >
              Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Stat Card */}
          <motion.div
            style={{ scale: statScale }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="group md:col-span-6 lg:col-span-4 relative rounded-3xl p-8 md:p-10 shadow-lg border border-primary/20 bg-primary text-white flex flex-col justify-end overflow-hidden hover:shadow-2xl transition-all duration-500"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/20 to-transparent opacity-80" />
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/40 transition-colors duration-500" />
            
            <div className="relative z-10 mt-auto pt-12">
              <div className="text-[4rem] leading-none font-extrabold tracking-tight mb-2 text-white">99.2<span className="text-accent">%</span></div>
              <div className="text-sm font-bold text-accent-lime uppercase tracking-widest mb-4">Claim Settlement Ratio</div>
              <p className="text-white/70 font-medium text-sm">Our partners are vetted strictly for their claim support history.</p>
            </div>
          </motion.div>

          {/* Medium Bento Card (Corporate) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="group md:col-span-12 lg:col-span-8 relative rounded-3xl p-8 md:p-10 border border-border-subtle shadow-sm hover:shadow-xl hover:border-accent/40 bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-8 transition-all duration-500"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-bg-main text-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                <Building size={24} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                Corporate Group Cover
              </h3>
              <p className="text-text-muted leading-relaxed font-medium max-w-sm">
                Tailored health and wellness benefits for modern teams, built to scale with your company.
              </p>
            </div>
            <Link
              href="#corporate"
              className="mt-auto sm:mt-0 whitespace-nowrap px-6 py-3 bg-bg-main text-primary font-bold rounded-xl border border-border-subtle group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 active:scale-95"
            >
              Get a quote
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

