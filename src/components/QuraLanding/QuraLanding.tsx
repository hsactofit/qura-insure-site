"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, HelpCircle, Plus } from "lucide-react";
import { FAQS, PROCESS_STEPS } from "@/data/content";
import AboutUs from "@/components/AboutUs/AboutUs";
import CoveragePlans from "@/components/CoveragePlans/CoveragePlans";
import BrandIdentity from "@/components/BrandIdentity/BrandIdentity";
import QuraCornerBrackets from "@/components/Common/QuraCornerBrackets";
import EnquiryForm from "@/components/EnquiryForm/EnquiryForm";
import WhyUs from "@/components/WhyUs/WhyUs";
import { ScrollProgressBar, ScrollReveal } from "@/components/Common/ScrollReveal";

const reveal = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: "easeOut" as const },
};

const HERO_TITLES = [
  { lead: "Confidence,", emphasis: "Curated." },
  { lead: "Protection,", emphasis: "Personalised." },
  { lead: "Clarity,", emphasis: "Delivered." },
  { lead: "Coverage,", emphasis: "Simplified." },
  { lead: "Futures,", emphasis: "Secured." },
];

/** Hero headline that cycles through HERO_TITLES every 3s (static for reduced-motion users). */
function HeroTitle() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_TITLES.length), 3000);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const { lead, emphasis } = HERO_TITLES[index];

  return (
    <h1 className="max-w-5xl text-[clamp(2rem,10vw,3rem)] font-semibold leading-[1.02] tracking-[-.045em] sm:text-6xl md:text-7xl lg:text-[clamp(4.5rem,11svh,5.6rem)]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="block"
        >
          {lead}
          <br />
          <span className="font-brand-emphasis text-cta">{emphasis}</span>
        </motion.span>
      </AnimatePresence>
    </h1>
  );
}

export default function QuraLanding() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, 110]);
  const heroScale = useTransform(scrollY, [0, 900], [1.04, 1.14]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="bg-bg-main text-primary">
      <ScrollProgressBar />
      <section className="relative min-h-[max(640px,100svh)] overflow-hidden bg-primary">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute -inset-8"><Image src="/qura-family-hero.png" alt="A happy family protected by Qura Insure" fill priority className="object-cover object-center" /></motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#112541] via-[#112541]/40 to-[#112541]/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#112541]/50 via-transparent to-transparent" />
        <QuraCornerBrackets color="lime" size="lg" className="inset-x-2 top-1 bottom-6 md:inset-x-4 md:top-2" />
        <div className="relative z-10 mx-auto flex min-h-[max(640px,100svh)] max-w-7xl items-end px-6 pb-24 pt-36 sm:pb-32 sm:pt-40 md:px-10 md:pb-40">
          <motion.div {...reveal} className="max-w-5xl text-white">
            <HeroTitle />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/82 sm:mt-7 md:text-xl">Research-led insurance advice, thoughtfully curated around your family. Understand your options, why they fit, and what to do next.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="#contact" className="group inline-flex items-center gap-3 rounded-full bg-cta px-7 py-4 font-bold text-primary shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:bg-cta-hover">Talk to a QURA expert <ArrowRight size={19} className="transition group-hover:translate-x-1" /></Link>
              <Link href="/tools/coverage-check" className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/20">Explore coverage</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ScrollReveal><CoveragePlans /></ScrollReveal>

      <ScrollReveal>
      <section id="how-it-works" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10"><motion.div {...reveal} className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-start"><div className="lg:sticky lg:top-32"><span className="text-sm font-bold uppercase tracking-[.2em] text-secondary">How it works</span><h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">From confused to <span className="font-brand-emphasis">confident</span></h2><p className="mt-6 max-w-lg text-lg leading-relaxed text-text-muted">A thoughtful process that makes choosing and using insurance feel refreshingly simple—from your first conversation to every future claim.</p><div className="mt-8 space-y-3 text-sm font-semibold">{["Free needs assessment", "Research-led recommendations", "Ongoing claims support"].map((item) => <div key={item} className="flex items-center gap-3"><CheckCircle2 className="text-accent" size={19} />{item}</div>)}</div><Link href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-bold text-white">Start your plan <ArrowRight size={18} /></Link></div><div className="space-y-4">{PROCESS_STEPS.map((step, index) => <motion.div key={`step-${step.step || index}`} initial={{ opacity: 0, x: 45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="group grid gap-5 rounded-[1.75rem] border border-primary/10 bg-[#F5F5F5] p-7 transition hover:-translate-y-1 hover:shadow-xl md:grid-cols-[76px_1fr] md:p-9"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-semibold text-cta transition duration-500 group-hover:rotate-6 group-hover:scale-110">{step.step}</div><div><h3 className="text-2xl font-semibold">{step.title}</h3><p className="mt-3 leading-relaxed text-text-muted">{step.description}</p></div></motion.div>)}</div></motion.div></div>
      </section>
      </ScrollReveal>

      <WhyUs />

      <ScrollReveal>
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:px-10 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="group relative min-h-[400px] overflow-hidden sm:min-h-[560px]">
            <Image src="/qura-claims-support.png" alt="A family receiving claims support from Qura" fill className="object-cover transition duration-700 group-hover:scale-105" /><QuraCornerBrackets color="lime" size="lg" />
            <div className="absolute top-6 left-6 z-10 p-3">
              <Image src="/logos/Colour Logomark.svg" alt="QURA Logomark" width={96} height={96} className="h-20 w-20 md:h-24 md:w-24" />
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-6 right-6 max-w-[calc(100%-3rem)] rounded-2xl border border-white/50 bg-white/90 p-4 shadow-2xl backdrop-blur sm:p-5"><div className="flex items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cta"><CheckCircle2 size={21} /></div><div><div className="text-sm font-bold">Claims advocate connected</div><div className="text-xs text-text-muted">Here when it matters most</div></div></div></motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><span className="text-sm font-bold uppercase tracking-[.2em] text-accent">Support beyond the policy</span><h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">You&apos;re never alone during a <span className="font-brand-emphasis">claim.</span></h2><p className="mt-6 text-lg leading-relaxed text-text-muted">Buying the right plan is only the beginning. When you need to make a claim, your QURA advisor helps you understand the documents, coordinate with the insurer, and follow the case through to resolution.</p><div className="mt-8 space-y-4">{["A dedicated person who knows your policy", "Clear document and timeline guidance", "Escalation support when a case gets stuck"].map((item, index) => <motion.div key={`support-${index}-${item}`} whileHover={{ x: 8 }} className="flex items-center gap-3 rounded-xl border border-primary/10 bg-[#F5F5F5] px-5 py-4 font-semibold"><CheckCircle2 className="text-accent" size={20} />{item}</motion.div>)}</div></motion.div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal><BrandIdentity /></ScrollReveal>

      <ScrollReveal><AboutUs /></ScrollReveal>

      <ScrollReveal>
      <section id="faq" className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 md:px-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          {/* Intro column, pinned while the questions scroll past on desktop */}
          <div className="lg:sticky lg:top-32">
            <span className="text-sm font-bold uppercase tracking-[.2em] text-secondary">Need to know</span>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-.04em] md:text-5xl">
              Frequently asked <span className="font-brand-emphasis">questions</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-text-muted">
              Straight answers about advice, pricing, policy issuance, and the support you receive after buying.
            </p>

            <div className="relative mt-8 overflow-hidden rounded-[1.5rem] bg-primary p-6 text-white md:p-7">
              <QuraCornerBrackets color="lime" size="sm" />
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cta text-primary">
                  <HelpCircle size={22} />
                </span>
                <div>
                  <div className="text-lg font-semibold">Still have questions?</div>
                  <div className="text-sm text-white/70">Talk to a Qura advisor, with no pressure and no spam.</div>
                </div>
              </div>
              <Link
                href="#contact"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-bold text-primary transition hover:-translate-y-0.5 hover:bg-cta-hover"
              >
                Ask an advisor <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const open = activeFaq === index;
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-[1.25rem] border bg-white transition-all duration-300 ${
                    open ? "border-primary/20 shadow-lg" : "border-primary/10 hover:border-primary/20 hover:shadow-md"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setActiveFaq(open ? -1 : index)}
                    className="flex w-full items-center gap-4 p-5 text-left md:gap-5 md:p-6"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                        open ? "bg-primary text-cta" : "bg-surface-sage text-primary"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-base font-semibold md:text-lg">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                        open ? "bg-cta text-primary" : "bg-bg-main text-primary"
                      }`}
                    >
                      <Plus size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="pb-6 pl-[4.25rem] pr-6 leading-relaxed text-text-muted md:pl-[4.75rem] md:pr-8">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section id="contact" className="px-4 pb-5 sm:px-6">
        <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-white md:px-12 md:py-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <QuraCornerBrackets color="lime" size="lg" />
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            {/* Pitch + what happens next */}
            <motion.div {...reveal}>
              <Image src="/logos/White Secondary Logo.svg" alt="QURA INSURE" width={120} height={105} className="h-16 w-auto md:h-20" />
              <span className="mt-8 block text-sm font-bold uppercase tracking-[.2em] text-cta">Get in touch</span>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-.04em] md:text-5xl xl:text-6xl">
                Thoughtfully researched.<br />
                <span className="font-brand-emphasis text-cta">Chosen around you.</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
                Clear answers, thoughtful recommendations, and support whenever you need it.
              </p>

              <ol className="mt-10 space-y-5">
                {[
                  { title: "Share a few details", text: "Tell us what you'd like to protect. It takes under a minute." },
                  { title: "An advisor calls you", text: "A Qura expert understands your needs. No scripts, no pressure." },
                  { title: "Get curated options", text: "Compare a short list of suitable plans, with the trade-offs explained." },
                ].map((step, i) => (
                  <motion.li
                    key={step.title}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
                    className="flex gap-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cta/40 bg-cta/10 text-sm font-bold text-cta">
                      {i + 1}
                    </span>
                    <div>
                      <div className="font-semibold">{step.title}</div>
                      <div className="mt-0.5 text-sm text-white/65">{step.text}</div>
                    </div>
                  </motion.li>
                ))}
              </ol>

              <div className="mt-10 flex flex-wrap gap-2">
                {["Free advice", "No spam calls", "Claims support"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/85">
                    <CheckCircle2 size={14} className="text-cta" /> {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <EnquiryForm />
            </motion.div>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </div>
    </MotionConfig>
  );
}
