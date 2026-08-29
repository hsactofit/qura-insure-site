"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Compass, HelpCircle, Layers, Lightbulb, Shield, Sparkles, Target } from "lucide-react";
import QuraCornerBrackets from "@/components/Common/QuraCornerBrackets";

const brandPillars = [
  {
    title: "Research",
    tagline: "Evidence before opinion",
    desc: "We analyze hundreds of policy terms, exclusions, and claim ratios so you never have to guess.",
    icon: SearchIcon,
  },
  {
    title: "Curation",
    tagline: "The right options, thoughtfully selected",
    desc: "We filter out low-value clutter and present only top-tier plans that match your exact life stage.",
    icon: Layers,
  },
  {
    title: "Clarity",
    tagline: "Complex insurance, made simple",
    desc: "No jargon, hidden fine print, or sales pitch. Plain language explanations every step of the way.",
    icon: Lightbulb,
  },
  {
    title: "Guidance",
    tagline: "Helping you navigate with confidence",
    desc: "Personalized advice before buying, dedicated support during issuance, and advocacy during claims.",
    icon: Compass,
  },
];

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

const transformationItems = [
  {
    before: "I don't understand insurance",
    after: "I understand my options clearly",
    step: "Research",
  },
  {
    before: "I don't know who to trust",
    after: "I know why this recommendation fits me",
    step: "Curation",
  },
  {
    before: "I'm afraid of making the wrong decision",
    after: "I feel confident moving forward",
    step: "Confidence",
  },
];

const reveal = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: "easeOut" as const },
};

export default function BrandIdentity() {
  return (
    <section id="why-us" className="relative py-28 md:py-36 bg-bg-main overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* 1. Core Brand Manifesto Header */}
        <motion.div {...reveal} className="text-center max-w-4xl mx-auto flex flex-col items-center">
          <Image
            src="/logos/Colour Primary Logo.svg"
            alt="QURA INSURE Primary Logo"
            width={160}
            height={140}
            className="h-28 w-auto mb-6"
            priority
          />
          <span className="text-sm font-bold uppercase tracking-[.2em] text-secondary">The QURA Identity</span>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-.04em] md:text-6xl text-primary font-heading">
            Confidence isn&apos;t found. <span className="font-editorial text-cta bg-primary px-3 py-1 rounded-xl inline-block mt-2 md:mt-0">It&apos;s curated.</span>
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-secondary max-w-2xl mx-auto">
            Insurance has become increasingly accessible, but making the right decision has become increasingly difficult. QURA exists to transform complexity into clarity.
          </p>
        </motion.div>

        {/* 2. Signature Visual Banner Grid (With Corner Brackets) */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {/* Card 1: Navy Card with White Brackets */}
          <motion.div
            {...reveal}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-none bg-primary p-9 text-white shadow-xl min-h-[320px] flex flex-col justify-between"
          >
            <QuraCornerBrackets color="white" size="md" />
            <div>
              <div className="text-xs font-bold uppercase tracking-[.2em] text-cta">Brand Philosophy</div>
              <h3 className="mt-6 text-3xl font-semibold leading-snug font-heading">
                We don&apos;t sell insurance.
              </h3>
              <p className="mt-3 text-2xl font-editorial text-cta">
                We help people choose it.
              </p>
            </div>
            <div className="mt-8 text-sm text-white/65 border-t border-white/10 pt-5">
              Thoughtful curation over sales pressure.
            </div>
          </motion.div>

          {/* Card 2: Lime Accent Card with Navy Brackets */}
          <motion.div
            {...reveal}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-none bg-cta p-9 text-primary shadow-xl min-h-[320px] flex flex-col justify-between"
          >
            <QuraCornerBrackets color="navy" size="md" />
            <div>
              <div className="text-xs font-bold uppercase tracking-[.2em] text-primary/70">Our Purpose</div>
              <h3 className="mt-6 text-3xl font-semibold leading-snug font-heading text-primary">
                We don&apos;t compare.
              </h3>
              <p className="mt-3 text-2xl font-editorial text-primary font-bold">
                We curate clarity.
              </p>
            </div>
            <div className="mt-8 text-sm text-primary/80 border-t border-primary/15 pt-5 font-medium">
              Translating 1000+ policy variations into 1 right plan.
            </div>
          </motion.div>

          {/* Card 3: Primary Navy Card (Matched with Card 1) */}
          <motion.div
            {...reveal}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-none bg-primary p-9 text-white shadow-xl min-h-[320px] flex flex-col justify-between"
          >
            <QuraCornerBrackets color="white" size="md" />
            <div>
              <div className="text-xs font-bold uppercase tracking-[.2em] text-cta">The QURA Difference</div>
              <h3 className="mt-6 text-3xl font-semibold leading-snug font-heading">
                We don&apos;t create urgency.
              </h3>
              <p className="mt-3 text-2xl font-editorial text-cta">
                We create confidence.
              </p>
            </div>
            <div className="mt-8 text-sm text-white/65 border-t border-white/10 pt-5">
              Evidence before opinion, always.
            </div>
          </motion.div>
        </div>

        {/* 3. Customer Transformation (Before vs After QURA) */}
        <div className="mt-24 rounded-none bg-primary p-8 md:p-14 text-white shadow-2xl relative overflow-hidden">
          <QuraCornerBrackets color="white" size="lg" />
          <motion.div {...reveal} className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[.2em] text-cta">Customer Transformation</span>
            <h3 className="mt-3 text-3xl font-semibold text-white md:text-5xl font-heading">
              From uncertainty to <span className="font-editorial text-cta">understanding.</span>
            </h3>
            <p className="mt-4 text-lg text-white/80">
              Understanding why you are protected matters just as much as being protected.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {transformationItems.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative rounded-2xl border border-primary/10 bg-bg-main p-7 flex flex-col justify-between shadow-sm transition-all duration-300 hover:border-cta hover:shadow-xl hover:bg-white cursor-pointer group/stage"
              >
                <div>
                  <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary mb-4 transition-colors group-hover/stage:bg-primary group-hover/stage:text-cta">
                    Stage 0{index + 1} • {item.step}
                  </div>
                  
                  {/* Before state */}
                  <div className="flex items-start gap-3 text-secondary/70">
                    <HelpCircle className="w-5 h-5 shrink-0 text-secondary/50 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[.14em] text-secondary/50">Before QURA</div>
                      <p className="mt-1 text-sm font-medium italic">&ldquo;{item.before}&rdquo;</p>
                    </div>
                  </div>

                  <div className="my-5 flex justify-center text-primary/30 transition-transform duration-300 group-hover/stage:translate-y-1 group-hover/stage:text-cta">
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </div>

                  {/* After state */}
                  <div className="flex items-start gap-3 text-primary">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-cta bg-primary rounded-full p-0.5 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[.14em] text-cta bg-primary px-2 py-0.5 rounded inline-block">After QURA</div>
                      <p className="mt-1.5 text-base font-semibold">&ldquo;{item.after}&rdquo;</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. The Challenge: Chaos vs QURA Flow (Page 6 of Brand Book) */}
        <div className="mt-24">
          <motion.div {...reveal} className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[.2em] text-secondary">The Problem & Solution</span>
            <h3 className="mt-3 text-3xl font-semibold text-primary md:text-5xl font-heading">
              Why traditional insurance <span className="font-editorial text-secondary">fails.</span>
            </h3>
            <p className="mt-4 text-lg text-secondary">
              Consumers have never had more information, yet confidence continues to decline. QURA exists to transform chaos into confidence.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Chaos Pathway */}
            <motion.div
              {...reveal}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-none bg-white p-8 md:p-10 border border-primary/10 shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30 group/card"
            >
              <QuraCornerBrackets color="navy" size="md" />
              <div className="text-xs font-bold uppercase tracking-[.2em] text-red-600">The Traditional Path</div>
              <h4 className="mt-3 text-2xl font-bold text-primary font-heading">Information Overload & Chaos</h4>
              <div className="mt-8 space-y-4">
                {[
                  { title: "CHAOS", desc: "250+ products & 1000+ policy variations" },
                  { title: "INFORMATION", desc: "Endless technical fine print & sales calls" },
                  { title: "CONFUSION", desc: "No context on what actually covers you" },
                  { title: "UNCERTAINTY", desc: "Fear of making a costly mistake" },
                  { title: "BAD DECISIONS", desc: "Buying the wrong plan under pressure" },
                ].map((step, idx) => (
                  <motion.div
                    key={step.title}
                    whileHover={{ x: 6, scale: 1.015 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 p-3.5 rounded-xl bg-red-50/60 border border-red-100/80 transition-all duration-300 hover:bg-red-100/90 hover:border-red-300 hover:shadow-md cursor-pointer group/step"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700 transition-all duration-300 group-hover/step:bg-red-600 group-hover/step:text-white group-hover/step:scale-110">0{idx + 1}</span>
                    <div>
                      <div className="text-xs font-bold text-red-800 tracking-wider transition-colors group-hover/step:text-red-950">{step.title}</div>
                      <div className="text-sm text-red-900/80 transition-colors group-hover/step:text-red-950">{step.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* QURA Pathway */}
            <motion.div
              {...reveal}
              transition={{ delay: 0.15 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-none bg-primary p-8 md:p-10 text-white shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-white/30 border border-transparent group/card"
            >
              <QuraCornerBrackets color="white" size="md" />
              <div className="text-xs font-bold uppercase tracking-[.2em] text-cta">The QURA Way</div>
              <h4 className="mt-3 text-2xl font-bold text-white font-heading">Thoughtful Curation & Clarity</h4>
              <div className="mt-8 space-y-4">
                {[
                  { title: "RESEARCH", desc: "Evidence before opinion, analyzing top policies" },
                  { title: "CURATION", desc: "Filtering out low-value clutter to top choices" },
                  { title: "CLARITY", desc: "Plain language explanations of terms & exclusions" },
                  { title: "GUIDANCE", desc: "Personalized advice tailored to your life stage" },
                  { title: "CONFIDENCE", desc: "Deciding with complete understanding" },
                ].map((step, idx) => (
                  <motion.div
                    key={step.title}
                    whileHover={{ x: 6, scale: 1.015 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 p-3.5 rounded-xl bg-white/10 border border-white/15 transition-all duration-300 hover:bg-white/20 hover:border-cta/50 hover:shadow-lg hover:shadow-black/20 cursor-pointer group/step"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cta text-xs font-bold text-primary transition-all duration-300 group-hover/step:scale-110 group-hover/step:bg-cta-hover group-hover/step:shadow-md">0{idx + 1}</span>
                    <div>
                      <div className="text-xs font-bold text-cta tracking-wider transition-colors group-hover/step:text-white">{step.title}</div>
                      <div className="text-sm text-white/90 transition-colors group-hover/step:text-white">{step.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 5. Purpose, Mission & Vision (Page 10 of Brand Book) */}
        <div className="mt-24">
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              {...reveal}
              whileHover={{ y: -6, scale: 1.015 }}
              className="rounded-none bg-white p-8 border border-primary/10 shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30 group"
            >
              <QuraCornerBrackets color="navy" size="sm" />
              <div className="text-xs font-bold uppercase tracking-[.2em] text-cta bg-primary px-2.5 py-1 rounded inline-block">Brand Purpose</div>
              <h4 className="mt-5 text-3xl font-bold text-primary font-heading">Purpose</h4>
              <p className="mt-4 leading-relaxed text-secondary text-base">
                To help people make confident insurance decisions through thoughtful curation, trusted research, and transparent guidance.
              </p>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="rounded-none bg-primary p-8 text-white shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-white/30 border border-transparent group"
            >
              <QuraCornerBrackets color="white" size="sm" />
              <div className="text-xs font-bold uppercase tracking-[.2em] text-cta">Brand Mission</div>
              <h4 className="mt-5 text-3xl font-bold text-white font-heading">Mission</h4>
              <p className="mt-4 leading-relaxed text-white/85 text-base">
                To simplify insurance by combining expert research, intuitive technology, and personalized advisory into one trusted experience.
              </p>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="rounded-none bg-cta p-8 text-primary shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30 border border-transparent group"
            >
              <QuraCornerBrackets color="navy" size="sm" />
              <div className="text-xs font-bold uppercase tracking-[.2em] text-primary/70">Brand Vision</div>
              <h4 className="mt-5 text-3xl font-bold text-primary font-heading">Vision</h4>
              <p className="mt-4 leading-relaxed text-primary/90 text-base font-medium">
                To become India&apos;s most trusted research-led insurance advisory platform.
              </p>
            </motion.div>
          </div>
        </div>

        {/* 6. Logo Story & Compass Symbolism (Pages 32 & 34 of Brand Book) */}
        <div className="mt-24 rounded-none bg-primary p-8 md:p-14 text-white shadow-2xl relative overflow-hidden">
          <QuraCornerBrackets color="white" size="lg" />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[.2em] text-cta">Logo Story & Symbolism</span>
              <h3 className="mt-3 text-3xl font-semibold text-white md:text-5xl font-heading">
                Inspired by the <span className="font-editorial text-cta">compass needle.</span>
              </h3>
              <p className="mt-5 text-lg leading-relaxed text-white/85">
                Finding the right insurance isn&apos;t about having more options—it&apos;s about having the right direction. Inspired by a compass needle, the QURA symbol represents guidance, confidence, and purposeful decision-making.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: "The Compass Needle", detail: "Bold directional form representing guidance and purposeful decision-making." },
                  { title: "The Circular Geometry", detail: "Signifies protection, continuity, and completeness." },
                  { title: "The Letter Q", detail: "Subtly forms the letter Q, connecting directly to our brand name." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cta shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-cta">{item.title}: </span>
                      <span className="text-white/80 text-sm">{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur">
              <Image
                src="/logos/White Primary Logo.svg"
                alt="QURA INSURE Logo Symbolism"
                width={280}
                height={280}
                className="h-56 w-auto drop-shadow-2xl"
              />
              <div className="mt-6 text-center text-sm font-semibold text-cta tracking-widest uppercase">
                Direction • Clarity • Protection
              </div>
            </div>
          </div>
        </div>

        {/* 7. Core Brand Pillars */}
        <div className="mt-24">
          <motion.div {...reveal} className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[.2em] text-secondary">Our Foundation</span>
            <h3 className="mt-3 text-3xl font-semibold text-primary md:text-5xl font-heading">
              Built on 4 core <span className="font-editorial text-secondary">brand pillars</span>
            </h3>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {brandPillars.map((pillar, index) => {
              const IconComp = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  className="rounded-none border border-primary/10 bg-white p-7 shadow-lg flex flex-col justify-between transition-all duration-300 hover:border-primary/30 hover:shadow-2xl relative overflow-hidden group/pillar cursor-pointer"
                >
                  <QuraCornerBrackets color="navy" size="sm" />
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-cta shadow-md transition-transform duration-300 group-hover/pillar:scale-110 group-hover/pillar:bg-cta group-hover/pillar:text-primary">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h4 className="mt-6 text-2xl font-semibold text-primary font-heading transition-colors group-hover/pillar:text-primary">{pillar.title}</h4>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[.14em] text-secondary">{pillar.tagline}</div>
                    <p className="mt-4 text-sm leading-relaxed text-secondary">{pillar.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
