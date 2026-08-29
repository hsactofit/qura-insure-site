"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Building2, Check, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import QuraCornerBrackets from "@/components/Common/QuraCornerBrackets";

const plans = [
  {
    number: "01",
    short: "Term Life",
    title: "Term Life Insurance",
    label: "Income protection",
    icon: ShieldCheck,
    description: "Protect your family's lifestyle, goals, and financial commitments with high-value cover designed around your responsibilities.",
    benefits: ["Flexible policy terms", "Critical illness add-ons", "Tax-efficient protection", "Guidance on ideal cover"],
    figure: "₹1–5 Cr",
    figureLabel: "typical cover range",
    idealFor: "Parents, homeowners and primary earners",
    signal: 92,
  },
  {
    number: "02",
    short: "Health",
    title: "Health Insurance",
    label: "Medical security",
    icon: HeartPulse,
    description: "Stay prepared for rising healthcare costs with carefully compared plans, cashless treatment access, and practical claims support.",
    benefits: ["Cashless hospital access", "Family floater options", "No-claim bonus review", "Room-rent clarity"],
    figure: "24/7",
    figureLabel: "claims assistance",
    idealFor: "Individuals, couples and growing families",
    signal: 86,
  },
  {
    number: "03",
    short: "Corporate",
    title: "Corporate Plans",
    label: "Employee wellbeing",
    icon: Building2,
    description: "Build benefits your team will genuinely value with flexible group health and life protection supported by simpler administration.",
    benefits: ["Custom benefit design", "Digital employee onboarding", "Dedicated account support", "Clear utilization insights"],
    figure: "One plan",
    figureLabel: "built for your workforce",
    idealFor: "Startups, SMEs and established teams",
    signal: 89,
  },
];

export default function CoveragePlans() {
  const [active, setActive] = useState(0);
  const plan = plans[active];
  const Icon = plan.icon;

  return (
    <section id="products" className="overflow-hidden py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[.2em] text-accent">Coverage, simplified</span>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">One place to find the <span className="font-editorial">right protection</span></h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">Choose a protection goal to see what matters, who it suits, and how QURA helps you compare confidently.</p>
        </motion.div>

        <div role="tablist" aria-label="Insurance coverage types" className="mx-auto mt-14 grid max-w-4xl gap-3 rounded-[1.5rem] border border-primary/10 bg-white p-2 shadow-[0_16px_45px_rgba(11,36,66,.07)] sm:grid-cols-3">
          {plans.map((item, index) => {
            const TabIcon = item.icon;
            const selected = active === index;
            return (
              <button key={item.title} role="tab" aria-selected={selected} onClick={() => setActive(index)} className={`relative flex items-center gap-3 overflow-hidden rounded-[1.1rem] px-5 py-4 text-left transition ${selected ? "text-white" : "text-primary hover:bg-bg-main"}`}>
                {selected && <motion.div layoutId="coverage-tab" className="absolute inset-0 bg-primary" transition={{ type: "spring", stiffness: 320, damping: 30 }} />}
                <span className={`relative flex h-10 w-10 items-center justify-center rounded-xl ${selected ? "bg-cta text-primary" : "bg-surface-sage text-accent"}`}><TabIcon size={20} /></span>
                <span className="relative"><span className={`block text-[10px] font-bold tracking-[.18em] ${selected ? "text-cta" : "text-text-muted"}`}>{item.number}</span><span className="mt-1 block font-bold">{item.short}</span></span>
              </button>
            );
          })}
        </div>

        <div className="relative mt-6 min-h-[590px] overflow-hidden rounded-none md:rounded-sm bg-primary text-white shadow-[0_34px_90px_rgba(11,36,66,.18)]">
          <QuraCornerBrackets color="lime" size="lg" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[.08]" />
          <motion.div animate={{ x: [0, 35, 0], y: [0, -24, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-cta/15 blur-3xl" />
          <AnimatePresence mode="wait">
            <motion.div key={plan.title} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: .35 }} className="relative grid min-h-[590px] gap-10 p-7 md:p-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:p-16">
              <div>
                <div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cta text-primary"><Icon size={24} /></span><span className="text-xs font-bold uppercase tracking-[.2em] text-cta">{plan.label}</span></div>
                <h3 className="mt-8 max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-.04em] md:text-6xl">{plan.title}</h3>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/68">{plan.description}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">{plan.benefits.map((benefit, index) => <motion.div key={benefit} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .12 + index * .07 }} className="flex items-center gap-3 text-sm font-semibold text-white/88"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cta/35 bg-cta/10 text-cta"><Check size={14} /></span>{benefit}</motion.div>)}</div>
                <Link href="#contact" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-cta px-7 py-4 font-bold text-primary transition hover:-translate-y-1 hover:bg-cta-hover">Compare suitable plans <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></Link>
              </div>

              <motion.div initial={{ opacity: 0, scale: .94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .45 }} className="relative">
                <div className="absolute -inset-5 rounded-[2rem] border border-white/10" />
                <div className="relative overflow-hidden rounded-none md:rounded-sm bg-[#f8f8f3] p-7 text-primary shadow-2xl md:p-9">
                  <QuraCornerBrackets color="navy" size="md" />
                  <div className="flex items-center justify-between"><div><div className="text-xs font-bold uppercase tracking-[.18em] text-text-muted">Protection snapshot</div><div className="mt-2 text-sm font-semibold">Personalized by QURA</div></div></div>
                  <div className="my-8 h-px bg-primary/10" />
                  <div className="text-5xl font-semibold tracking-[-.05em] md:text-6xl">{plan.figure}</div>
                  <div className="mt-2 text-sm text-text-muted">{plan.figureLabel}</div>
                  <div className="mt-9 rounded-2xl border border-primary/10 bg-white p-5"><div className="text-[10px] font-bold uppercase tracking-[.18em] text-text-muted">Ideal for</div><div className="mt-2 font-semibold leading-relaxed">{plan.idealFor}</div></div>
                  <div className="mt-7"><div className="text-[10px] font-bold uppercase tracking-[.18em] text-text-muted">Plan fit signal</div><div className="mt-1 text-2xl font-bold">{plan.signal}%</div></div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
