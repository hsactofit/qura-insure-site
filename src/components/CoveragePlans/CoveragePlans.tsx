"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Ambulance, ArrowRight, Briefcase, Building2, Car, Check, HeartPulse, House, LockKeyhole, Plane, ShieldCheck } from "lucide-react";
import QuraCornerBrackets from "@/components/Common/QuraCornerBrackets";

// Card photos: Unsplash (term: 1lKYd8M9MRE, corporate: cW4lLTavU80, business: bAKYjjvAQIE, cyber: MFbp96h9r88,
// accident: AlKE7i2yvuw) and Pexels (health: 14558557, motor: 12937789 plate blurred, home: 14825428, travel: 31804744), free licences.
const plans = [
  {
    number: "01",
    short: "Term Life",
    href: "/insurance/term-life",
    title: "Term Life Insurance",
    label: "Income protection",
    icon: ShieldCheck,
    description: "Protect your family's lifestyle, goals, and financial commitments with high-value cover designed around your responsibilities.",
    benefits: ["Flexible policy terms", "Critical illness add-ons", "Tax-efficient protection", "Guidance on ideal cover"],
    figure: "Your needs",
    figureLabel: "guide your cover amount",
    idealFor: "Parents, homeowners and primary earners",
    image: { src: "/qura-plan-term-family.jpg", alt: "A smiling family of four sitting together at home" },
  },
  {
    number: "02",
    short: "Health",
    href: "/insurance/health",
    title: "Health Insurance",
    label: "Medical security",
    icon: HeartPulse,
    description: "Stay prepared for rising healthcare costs with carefully researched plans, cashless treatment access, and practical claims support.",
    benefits: ["Cashless hospital access", "Family floater options", "No-claim bonus review", "Room-rent clarity"],
    figure: "Claims support",
    figureLabel: "guidance when you need to claim",
    idealFor: "Individuals, couples and growing families",
    image: { src: "/qura-plan-health-doctor.jpg", alt: "A doctor checking a patient with a stethoscope in a clinic" },
  },
  {
    number: "03",
    short: "Corporate",
    href: "/insurance/corporate",
    title: "Corporate Plans",
    label: "Employee wellbeing",
    icon: Building2,
    description: "Build benefits your team will genuinely value with flexible group health and life protection supported by simpler administration.",
    benefits: ["Custom benefit design", "Digital employee onboarding", "Dedicated account support", "Clear utilization insights"],
    figure: "One plan",
    figureLabel: "built for your workforce",
    idealFor: "Startups, SMEs and established teams",
    image: { src: "/qura-plan-corporate-team.jpg", alt: "A team meeting in an office in Bengaluru" },
  },
  {
    number: "04",
    short: "Motor",
    href: "/insurance/motor",
    title: "Motor Insurance",
    label: "Vehicle protection",
    icon: Car,
    description: "Cover your car or two-wheeler against accidents, theft and third-party liability, with the right add-ons and support when you need to claim.",
    benefits: ["Comprehensive or third-party", "Zero depreciation add-on", "No-claim bonus protection", "Cashless garage network"],
    figure: "Up to 50%",
    figureLabel: "no-claim bonus on own-damage premium",
    idealFor: "Car and two-wheeler owners, new or used",
    image: { src: "/qura-plan-motor-car.jpg", alt: "A man standing through the sunroof of his SUV on a hill road" },
  },
  {
    number: "05",
    short: "Home",
    href: "/insurance/home",
    title: "Home Insurance",
    label: "Property protection",
    icon: House,
    description: "Protect your home and everything in it against fire, floods, earthquakes and burglary, whether you own it or rent it.",
    benefits: ["Building and contents cover", "Natural disaster protection", "Cover for valuables", "Rebuilding-cost guidance"],
    figure: "Rebuild cost",
    figureLabel: "not market value, guides your cover",
    idealFor: "Homeowners, tenants and families with a home loan",
    image: { src: "/qura-plan-home-family.jpg", alt: "A multi-generation family together outside their home" },
  },
  {
    number: "06",
    short: "Travel",
    href: "/insurance/travel",
    title: "Travel Insurance",
    label: "Trip protection",
    icon: Plane,
    description: "Travel with cover for medical emergencies, cancellations, lost baggage and passports, in India and abroad.",
    benefits: ["Overseas medical cover", "Trip cancellation and delay", "Baggage and passport loss", "24×7 emergency assistance"],
    figure: "€30,000",
    figureLabel: "minimum medical cover for a Schengen visa",
    idealFor: "Holidaymakers, students and frequent business travellers",
    image: { src: "/qura-plan-travel-station.jpg", alt: "Passengers with luggage on a railway platform in India" },
  },
  {
    number: "07",
    short: "Business",
    href: "/insurance/business",
    title: "Business Insurance",
    label: "Business continuity",
    icon: Briefcase,
    description: "Protect your premises, stock and income, and your liability to customers and the public, so one bad day doesn't close your business.",
    benefits: ["Property and stock cover", "Business interruption", "Public and product liability", "Burglary and money cover"],
    figure: "One package",
    figureLabel: "built around how you operate",
    idealFor: "Shops, offices, factories and professional firms",
    image: { src: "/qura-plan-business-kirana.jpg", alt: "Shopkeepers at the counter of a neighbourhood kirana store" },
  },
  {
    number: "08",
    short: "Cyber",
    href: "/insurance/cyber",
    title: "Cyber Insurance",
    label: "Digital protection",
    icon: LockKeyhole,
    description: "Cover against online fraud, identity theft and data breaches, for your bank accounts, UPI and cards, or your whole business.",
    benefits: ["UPI and card fraud cover", "Identity theft support", "Ransomware and extortion", "Breach response for businesses"],
    figure: "1930",
    figureLabel: "national helpline to report cyber fraud",
    idealFor: "Anyone banking online, and businesses holding customer data",
    image: { src: "/qura-plan-cyber-phone.jpg", alt: "A young man using his smartphone on a metro train" },
  },
  {
    number: "09",
    short: "Accident",
    href: "/insurance/personal-accident",
    title: "Personal Accident Insurance",
    label: "Accident protection",
    icon: Ambulance,
    description: "A lump sum for accidental death or disability, and a weekly benefit if an accident keeps you from working.",
    benefits: ["Accidental death cover", "Permanent disability payouts", "Weekly income benefit", "Worldwide, 24×7 cover"],
    figure: "Low cost",
    figureLabel: "cover that works alongside term and health",
    idealFor: "Commuters, two-wheeler riders and self-employed earners",
    image: { src: "/qura-plan-accident-rider.jpg", alt: "A rider in a helmet and gloves on a motorcycle" },
  },
];

export default function CoveragePlans() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Select a tab and keep it visible when the strip scrolls on narrow screens.
  const selectTab = (index: number, focus = false) => {
    setActive(index);
    const tab = tabsRef.current?.children[index] as HTMLElement | undefined;
    tab?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    if (focus) tab?.focus();
  };

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const step = e.key === "ArrowRight" ? 1 : -1;
    selectTab((active + step + plans.length) % plans.length, true);
  };
  const plan = plans[active];
  const Icon = plan.icon;

  return (
    <section id="products" className="overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[.2em] text-secondary">Coverage, simplified</span>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">One place to find the <span className="font-brand-emphasis">right protection</span></h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">Choose a protection goal to see what matters, who it suits, and how QURA researches and curates suitable options.</p>
        </motion.div>

        <div className="mx-auto mt-10 max-w-7xl rounded-full border border-primary/10 bg-white p-1.5 shadow-[0_16px_45px_rgba(17,37,65,.07)]">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Insurance coverage types"
            onKeyDown={onTabKeyDown}
            className="flex snap-x snap-mandatory gap-1 overflow-x-auto [scrollbar-width:none] xl:justify-between [&::-webkit-scrollbar]:hidden"
          >
            {plans.map((item, index) => {
              const TabIcon = item.icon;
              const selected = active === index;
              return (
                <motion.button
                  key={item.title}
                  role="tab"
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(index)}
                  whileTap={{ scale: 0.94 }}
                  className={`group relative flex shrink-0 snap-start items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-cta ${
                    selected ? "text-white" : "text-primary/75 hover:bg-bg-main hover:text-primary"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="coverage-tab"
                      className="absolute inset-0 rounded-full bg-primary shadow-md"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      selected ? "bg-cta text-primary" : "bg-surface-sage text-primary group-hover:bg-cta"
                    }`}
                  >
                    <TabIcon size={15} />
                  </span>
                  <span className="relative whitespace-nowrap">{item.short}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden lg:min-h-[590px] rounded-none md:rounded-sm bg-primary text-white shadow-[0_34px_90px_rgba(17,37,65,.18)]">
          <QuraCornerBrackets color="lime" size="lg" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[.08]" />
          <motion.div animate={{ x: [0, 35, 0], y: [0, -24, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-cta/15 blur-3xl" />
          <AnimatePresence mode="wait">
            <motion.div key={plan.title} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: .35 }} className="relative grid gap-10 p-7 md:p-12 lg:min-h-[590px] lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:p-16">
              <div>
                <div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cta text-primary"><Icon size={24} /></span><span className="text-xs font-bold uppercase tracking-[.2em] text-cta">{plan.label}</span></div>
                <h3 className="mt-8 max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-.04em] md:text-6xl">{plan.title}</h3>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/68">{plan.description}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">{plan.benefits.map((benefit, index) => <motion.div key={benefit} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .12 + index * .07 }} className="flex items-center gap-3 text-sm font-semibold text-white/88"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cta/35 bg-cta/10 text-cta"><Check size={14} /></span>{benefit}</motion.div>)}</div>
                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Link href="#contact" className="group inline-flex items-center gap-3 rounded-full bg-cta px-7 py-4 font-bold text-center text-primary transition hover:-translate-y-1 hover:bg-cta-hover">Get a curated recommendation <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></Link>
                  <Link href={plan.href} className="font-semibold text-white/85 underline-offset-4 transition hover:text-cta hover:underline">Learn more about {plan.short.toLowerCase()} cover</Link>
                </div>
              </div>

              <motion.div initial={{ opacity: 0, scale: .94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .45 }} className="relative">
                <div className="absolute -inset-3 rounded-[2rem] border border-white/10 sm:-inset-5" />
                <div className="relative overflow-hidden rounded-none md:rounded-sm bg-[#F4FAFD] p-7 text-primary shadow-2xl md:p-9">
                  <QuraCornerBrackets color="navy" size="md" />
                  <div className="flex items-center justify-between"><div><div className="text-xs font-bold uppercase tracking-[.18em] text-text-muted">Protection snapshot</div><div className="mt-2 text-sm font-semibold">Guidance from QURA</div></div></div>
                  <div className="relative my-6 aspect-[16/7] overflow-hidden rounded-2xl bg-primary/5">
                    <Image src={plan.image.src} alt={plan.image.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                  </div>
                  <div className="text-4xl font-semibold tracking-[-.05em] md:text-6xl lg:text-5xl xl:text-6xl">{plan.figure}</div>
                  <div className="mt-2 text-sm text-text-muted">{plan.figureLabel}</div>
                  <div className="mt-9 rounded-2xl border border-primary/10 bg-white p-5"><div className="text-[10px] font-bold uppercase tracking-[.18em] text-text-muted">Ideal for</div><div className="mt-2 font-semibold leading-relaxed">{plan.idealFor}</div></div>
                  <p className="mt-7 text-sm leading-relaxed text-text-muted">Your advisor explains the benefits, exclusions, and trade-offs before you choose. Final cover and terms depend on the insurer and policy.</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
