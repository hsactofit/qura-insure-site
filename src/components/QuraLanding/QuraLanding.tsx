"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BadgeCheck, CheckCircle2, ChevronLeft, ChevronRight, HeartHandshake, LifeBuoy, Minus, Plus, Quote, ShieldCheck, Sparkles } from "lucide-react";
import { BENEFITS, FAQS, PROCESS_STEPS, STATS, TESTIMONIALS } from "@/data/content";
import AboutUs from "@/components/AboutUs/AboutUs";
import CoveragePlans from "@/components/CoveragePlans/CoveragePlans";
import CountUp from "@/components/Stats/CountUp";

const reveal = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: "easeOut" as const },
};

export default function QuraLanding() {
  const [activeFaq, setActiveFaq] = useState(-1);
  const [activeTestimonial, setActiveTestimonial] = useState(1);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, 110]);
  const heroScale = useTransform(scrollY, [0, 900], [1.04, 1.14]);
  const moveTestimonial = (direction: number) => setActiveTestimonial((current) => (current + direction + TESTIMONIALS.length) % TESTIMONIALS.length);

  const whyUsRef = useRef<HTMLElement>(null);
  const { scrollYProgress: whyUsScroll } = useScroll({
    target: whyUsRef,
    offset: ["start end", "center center"],
  });

  // Background shrink & fit container scroll transforms
  const sectionScale = useTransform(whyUsScroll, [0, 1], [1.05, 0.92]);
  const sectionRadius = useTransform(whyUsScroll, [0, 1], [0, 44]);
  const sectionY = useTransform(whyUsScroll, [0, 1], [50, 0]);

  return (
    <div className="bg-bg-main text-primary">
      <section className="relative min-h-[880px] overflow-hidden bg-primary md:min-h-[920px]">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute -inset-8"><Image src="/qura-family-hero.png" alt="A happy family protected by Qura Insure" fill priority className="object-cover object-center" /></motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342] via-[#0A2342]/40 to-[#0A2342]/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2342]/50 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[880px] max-w-7xl items-end px-6 pb-20 pt-40 md:min-h-[920px] md:px-10 md:pb-24">
          <motion.div {...reveal} className="max-w-5xl text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md"><ShieldCheck size={17} className="text-cta" /> Protection designed around your family</div>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-.045em] sm:text-6xl md:text-7xl lg:text-[5.6rem]">Insurance that <span className="font-editorial text-cta">actually makes sense.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/82 md:text-xl">No spam. No jargon. Just honest, expert advice to help you pick the best term and health insurance for your family.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="#contact" className="group inline-flex items-center gap-3 rounded-full bg-cta px-7 py-4 font-bold text-primary shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:bg-cta-hover">Talk to a QURA expert <ArrowRight size={19} className="transition group-hover:translate-x-1" /></Link>
              <Link href="#products" className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/20">Explore coverage</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-primary/10 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.p {...reveal} className="text-center text-3xl font-semibold md:text-4xl">Trusted by families, backed by <span className="font-editorial">clarity and care</span></motion.p>
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3 md:items-stretch">
            {STATS.slice(0, 3).map((stat, index) => (
              <motion.div
                key={`stat-${stat.label || index}`}
                {...reveal}
                whileHover={{ y: -10, scale: 1.025 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="qura-glow group flex min-h-[260px] cursor-pointer flex-col justify-between overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white p-8 transition-all duration-300 hover:border-primary/25 hover:shadow-[0_22px_55px_rgba(10,35,66,0.13)]"
              >
                <div className="text-sm font-semibold text-text-muted transition-colors duration-300 group-hover:text-primary">{stat.label}</div>
                <div className="my-auto text-center text-5xl font-semibold tracking-[-.05em] text-primary transition-transform duration-300 group-hover:scale-105 md:text-6xl">
                  <CountUp value={stat.value} />
                </div>
                <p className="text-sm leading-relaxed text-text-muted">Reliable protection supported by expert guidance and transparent recommendations.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CoveragePlans />

      <section id="how-it-works" className="bg-white py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10"><motion.div {...reveal} className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-start"><div className="lg:sticky lg:top-32"><span className="text-sm font-bold uppercase tracking-[.2em] text-accent">How it works</span><h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">From confused to <span className="font-editorial">confident</span></h2><p className="mt-6 max-w-lg text-lg leading-relaxed text-text-muted">A thoughtful process that makes choosing and using insurance feel refreshingly simple—from your first conversation to every future claim.</p><div className="mt-8 space-y-3 text-sm font-semibold">{["Free needs assessment", "Side-by-side plan comparison", "Ongoing claims support"].map((item) => <div key={item} className="flex items-center gap-3"><CheckCircle2 className="text-accent" size={19} />{item}</div>)}</div><Link href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-bold text-white">Start your plan <ArrowRight size={18} /></Link></div><div className="space-y-4">{PROCESS_STEPS.map((step, index) => <motion.div key={`step-${step.step || index}`} initial={{ opacity: 0, x: 45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="group grid gap-5 rounded-[1.75rem] border border-primary/10 bg-[#f8f8f5] p-7 transition hover:-translate-y-1 hover:shadow-xl md:grid-cols-[76px_1fr] md:p-9"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-semibold text-cta transition duration-500 group-hover:rotate-6 group-hover:scale-110">{step.step}</div><div><h3 className="text-2xl font-semibold">{step.title}</h3><p className="mt-3 leading-relaxed text-text-muted">{step.description}</p></div></motion.div>)}</div></motion.div></div>
      </section>

      <section id="why-us" ref={whyUsRef} className="relative py-12 md:py-24 overflow-hidden">
        {/* Inner Synced White Card Container */}
        <motion.div
          style={{
            scale: sectionScale,
            borderRadius: sectionRadius,
            y: sectionY,
          }}
          className="relative mx-auto max-w-[1400px] overflow-hidden border border-primary/10 bg-white/95 shadow-[0_30px_90px_rgba(11,36,66,0.08)] backdrop-blur-xl px-6 py-20 md:px-12 md:py-28"
        >
          <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.06]" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <motion.div {...reveal} className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-4xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">
                  Protecting what matters most for <span className="font-editorial">your family.</span>
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                  Every recommendation is built around your income, responsibilities, health needs, and future goals—so your cover fits real life, not a generic checklist.
                </p>
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {BENEFITS.map((benefit, index) => (
                    <motion.div
                      key={`benefit-${benefit.title || index}`}
                      whileHover={{ y: -6 }}
                      className="group rounded-[1.5rem] border border-primary/10 bg-[#fbfbfa] p-6 transition-all duration-300 hover:bg-white hover:shadow-xl"
                    >
                      <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-surface-sage text-accent transition duration-500 group-hover:rotate-6 group-hover:bg-cta group-hover:text-primary">
                        <BadgeCheck size={22} />
                      </div>
                      <h3 className="text-xl font-semibold">{benefit.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-text-muted">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:pt-10">
                <motion.div whileHover={{ scale: 1.015 }} className="group relative min-h-[520px] overflow-hidden rounded-[2rem] sm:col-span-2">
                  <Image src="/qura-advisor-consultation.png" alt="A Qura advisor guiding a couple" fill className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 px-5 py-4 shadow-xl backdrop-blur">
                    <div className="text-sm font-bold">Advice built around you</div>
                    <div className="mt-1 text-xs text-text-muted">Clear options. No sales pressure.</div>
                  </div>
                </motion.div>
                <div className="rounded-[1.5rem] bg-primary p-7 text-white">
                  <HeartHandshake className="text-cta" />
                  <div className="mt-12 text-3xl font-semibold">Human advice</div>
                  <p className="mt-3 text-white/65">Real experts, zero pressure.</p>
                </div>
                <div className="rounded-[1.5rem] bg-cta p-7">
                  <LifeBuoy />
                  <div className="mt-12 text-3xl font-semibold">Lifetime help</div>
                  <p className="mt-3 text-primary/70">Support beyond the sale.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="bg-white py-28 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:px-10 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="group relative min-h-[560px] overflow-hidden rounded-[2rem]"><Image src="/qura-claims-support.png" alt="A family receiving claims support from Qura" fill className="object-cover transition duration-700 group-hover:scale-105" /><motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-6 right-6 rounded-2xl border border-white/50 bg-white/90 p-5 shadow-2xl backdrop-blur"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-cta"><CheckCircle2 size={21} /></div><div><div className="text-sm font-bold">Claims advocate connected</div><div className="text-xs text-text-muted">Here when it matters most</div></div></div></motion.div></motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><span className="text-sm font-bold uppercase tracking-[.2em] text-accent">Support beyond the policy</span><h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">You&apos;re never alone during a <span className="font-editorial">claim.</span></h2><p className="mt-6 text-lg leading-relaxed text-text-muted">Buying the right plan is only the beginning. When you need to make a claim, your QURA advisor helps you understand the documents, coordinate with the insurer, and follow the case through to resolution.</p><div className="mt-8 space-y-4">{["A dedicated person who knows your policy", "Clear document and timeline guidance", "Escalation support when a case gets stuck"].map((item, index) => <motion.div key={`support-${index}-${item}`} whileHover={{ x: 8 }} className="flex items-center gap-3 rounded-xl border border-primary/10 bg-[#f8f8f5] px-5 py-4 font-semibold"><CheckCircle2 className="text-accent" size={20} />{item}</motion.div>)}</div></motion.div>
        </div>
      </section>

      <AboutUs />

      <section id="reviews" className="overflow-hidden bg-[#edf1f4] py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div>
            <span className="text-sm font-bold uppercase tracking-[.2em] text-accent">Client stories</span>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">
              Straight from the families <span className="font-editorial">we help every day</span>
            </h2>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-center">
            {TESTIMONIALS.map((testimonial, index) => {
              const selected = index === activeTestimonial;
              return (
                <motion.article
                  key={`testimonial-${testimonial.name || index}`}
                  onMouseEnter={() => setActiveTestimonial(index)}
                  animate={{
                    scale: selected ? 1.05 : 0.90,
                    rotate: selected ? 0 : index < activeTestimonial ? -5 : 5,
                    opacity: selected ? 1 : 0.52,
                    y: selected ? -10 : 10,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`relative cursor-pointer rounded-[1.75rem] border p-8 transition-all duration-300 ${
                    selected
                      ? "z-20 border-primary/20 bg-white shadow-[0_25px_60px_rgba(10,35,66,0.14)]"
                      : "z-0 border-primary/10 bg-[#f8f6f1]/80 shadow-md"
                  }`}
                >
                  <Quote className={selected ? "text-accent" : "text-accent/60"} size={38} />
                  <p className={`mt-8 text-lg leading-relaxed transition-colors duration-300 ${selected ? "text-primary font-medium" : "text-text-muted"}`}>
                    {testimonial.quote}
                  </p>
                  <div className="mt-9 border-t border-primary/10 pt-6">
                    <div className="font-bold text-primary">{testimonial.name}</div>
                    <div className="mt-1 text-sm text-text-muted">{testimonial.designation}</div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="faq" className="py-28 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:px-10 lg:grid-cols-[.8fr_1.2fr]"><div><span className="text-sm font-bold uppercase tracking-[.2em] text-accent">Need to know</span><h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">Frequently asked <span className="font-editorial">questions</span></h2><p className="mt-6 text-lg leading-relaxed text-text-muted">Straight answers about advice, pricing, policy issuance, and the support you receive after buying.</p><motion.div whileHover={{ rotate: -1, scale: 1.015 }} className="group relative mt-10 aspect-[4/3] overflow-hidden rounded-[1.75rem]"><Image src="/qura-policy-guidance.png" alt="Simple policy comparison and guidance" fill className="object-cover transition duration-700 group-hover:scale-105" /></motion.div></div><div className="space-y-4">{FAQS.map((faq, index) => { const open = activeFaq === index; return <div key={faq.question} className="overflow-hidden rounded-[1.5rem] border border-primary/10 bg-white transition-shadow hover:shadow-lg"><button onClick={() => setActiveFaq(open ? -1 : index)} className="flex w-full items-center justify-between gap-6 p-6 text-left text-lg font-semibold md:p-7 md:text-xl"><span>{faq.question}</span><motion.span animate={{ rotate: open ? 180 : 0 }}>{open ? <Minus /> : <Plus />}</motion.span></button><AnimatePresence initial={false}>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p className="px-6 pb-7 leading-relaxed text-text-muted md:px-7">{faq.answer}</p></motion.div>}</AnimatePresence></div>; })}</div></div>
      </section>

      <section id="contact" className="px-4 pb-5 sm:px-6"><div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[2rem] bg-primary px-6 py-24 text-white md:px-12 md:py-32"><div className="absolute inset-0 bg-grid-pattern opacity-20" /><div className="absolute -bottom-36 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-600/30 blur-3xl" /><motion.div {...reveal} className="relative z-10 mx-auto max-w-4xl text-center"><h2 className="text-4xl font-semibold leading-tight tracking-[-.04em] md:text-7xl">We&apos;ll discover the perfect <span className="font-editorial text-cta">insurance for you</span></h2><p className="mx-auto mt-7 max-w-2xl text-lg text-white/70">Clear answers, thoughtful recommendations, and support whenever you need it.</p><Link href="#" className="mt-9 inline-flex items-center gap-2 rounded-full bg-cta px-8 py-4 font-bold text-primary">Book a free call <ArrowRight size={18} /></Link></motion.div></div></section>
    </div>
  );
}
