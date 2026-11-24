"use client";

import Image from "next/image";
import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, BadgeCheck, HeartHandshake, LifeBuoy, PhoneOff, RotateCcw, Scale } from "lucide-react";
import { BENEFITS } from "@/data/content";
import QuraCornerBrackets from "@/components/Common/QuraCornerBrackets";

const BENEFIT_ICONS = { PhoneOff, Scale, LifeBuoy, BadgeCheck };

const TILES = [
  {
    icon: HeartHandshake,
    title: "Human advice",
    subtitle: "Real experts, zero pressure.",
    detail: "Speak to a qualified advisor who explains your options in plain language and never pushes a product.",
    tone: "dark" as const,
  },
  {
    icon: LifeBuoy,
    title: "Ongoing help",
    subtitle: "Support beyond the sale.",
    detail: "Renewals, policy changes and claims: the same team stays with you for as long as you hold the policy.",
    tone: "lime" as const,
  },
];

type Ripple = { id: number; x: number; y: number };

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// Cards fly in from alternating sides with a slight tilt.
const cardIn: Variants = {
  hidden: (i: number) => ({ opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 40, rotate: i % 2 === 0 ? -4 : 4 }),
  show: { opacity: 1, x: 0, y: 0, rotate: 0, transition: { duration: 0.8, ease: EASE } },
};

const riseIn: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

const wordIn: Variants = {
  hidden: { opacity: 0, y: "110%" },
  show: { opacity: 1, y: "0%", transition: { duration: 0.6, ease: EASE } },
};

/** Splits text into words that slide up one after another. */
function RevealWords({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span variants={wordIn} className={`inline-block ${className ?? ""}`}>
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </>
  );
}

function BenefitCard({
  index,
  active,
  onSelect,
}: {
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  const benefit = BENEFITS[index];
  const Icon = BENEFIT_ICONS[benefit.icon as keyof typeof BENEFIT_ICONS] ?? BadgeCheck;
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple = { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top };
    setRipples((current) => [...current, ripple]);
    onSelect();
  };

  return (
    <motion.button
      type="button"
      variants={cardIn}
      custom={index}
      aria-pressed={active}
      onClick={handleClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-primary/10 bg-[#F4FAFD] p-6 text-left outline-none transition-shadow hover:shadow-xl focus-visible:ring-2 focus-visible:ring-cta"
    >
      {active && (
        <motion.span
          layoutId="why-us-active"
          className="absolute inset-0 bg-primary"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.45 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onAnimationComplete={() => setRipples((current) => current.filter((x) => x.id !== r.id))}
          style={{ left: r.x - 200, top: r.y - 200 }}
          className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-cta"
        />
      ))}

      <span className="relative flex items-center justify-between">
        <motion.span
          key={active ? "on" : "off"}
          initial={active ? { rotate: -180, scale: 0.4 } : false}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
          className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-300 ${
            active ? "bg-cta text-primary" : "bg-surface-sage text-primary group-hover:bg-cta"
          }`}
        >
          <Icon size={22} />
        </motion.span>
        <span className={`text-xs font-bold tracking-[.18em] transition-colors ${active ? "text-cta" : "text-text-muted"}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>

      <span className={`relative mt-6 block text-xl font-semibold transition-colors ${active ? "text-white" : "text-primary"}`}>
        {benefit.title}
      </span>
      <span className={`relative mt-2 block text-sm leading-relaxed transition-colors ${active ? "text-white/75" : "text-text-muted"}`}>
        {benefit.description}
      </span>
    </motion.button>
  );
}

function FlipTile({ tile }: { tile: (typeof TILES)[number] }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = tile.icon;
  const dark = tile.tone === "dark";
  const face = `absolute inset-0 flex flex-col rounded-[1.5rem] p-6 [backface-visibility:hidden] ${
    dark ? "bg-primary text-white" : "bg-cta text-primary"
  }`;

  return (
    <motion.button
      type="button"
      aria-pressed={flipped}
      aria-label={`${tile.title}: ${flipped ? tile.detail : tile.subtitle}`}
      onClick={() => setFlipped((f) => !f)}
      variants={riseIn}
      whileTap={{ scale: 0.95 }}
      className="relative h-52 w-full text-left outline-none [perspective:1000px] focus-visible:ring-2 focus-visible:ring-cta rounded-[1.5rem]"
    >
      <motion.span
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="relative block h-full w-full [transform-style:preserve-3d]"
      >
        <span className={face}>
          <motion.span whileHover={{ rotate: [0, -12, 12, 0] }} transition={{ duration: 0.5 }} className="inline-flex">
            <Icon className={dark ? "text-cta" : ""} />
          </motion.span>
          <span className="mt-auto text-2xl font-semibold md:text-3xl">{tile.title}</span>
          <span className={`mt-2 text-sm ${dark ? "text-white/65" : "text-primary/70"}`}>{tile.subtitle}</span>
          <span className={`absolute right-5 top-5 text-[10px] font-bold uppercase tracking-[.18em] ${dark ? "text-white/40" : "text-primary/50"}`}>
            Tap
          </span>
        </span>
        <span className={`${face} [transform:rotateY(180deg)]`}>
          <RotateCcw size={18} className={dark ? "text-cta" : ""} />
          <span className="mt-auto text-base leading-relaxed">{tile.detail}</span>
        </span>
      </motion.span>
    </motion.button>
  );
}

export default function WhyUs() {
  const [active, setActive] = useState(0);
  const benefit = BENEFITS[active];
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  // Parallax: photo drifts inside its frame, the grid backdrop slides, the logomark turns, a glow sweeps across.
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const markRotate = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const glowX = useTransform(scrollYProgress, [0, 1], ["-20%", "120%"]);

  return (
    <section id="why-us" ref={sectionRef} className="px-4 py-6 sm:px-6 md:py-10">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] border border-primary/10 bg-white px-6 py-14 md:px-12 md:py-20">
        <motion.div style={{ y: gridY }} className="pointer-events-none absolute -inset-y-20 inset-x-0 bg-grid-pattern opacity-[0.06]" />
        <motion.div style={{ left: glowX }} className="pointer-events-none absolute top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cta/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="grid gap-6 lg:grid-cols-2 lg:items-end"
          >
            <div>
              <motion.span variants={wordIn} className="inline-block text-sm font-bold uppercase tracking-[.2em] text-secondary">Why Qura</motion.span>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">
                <RevealWords text="Protecting what matters most for" />
                <RevealWords text="your family." className="font-brand-emphasis" />
              </h2>
            </div>
            <motion.p variants={riseIn} className="max-w-xl text-lg leading-relaxed text-text-muted lg:justify-self-end">
              Every recommendation is built around your income, responsibilities, health needs, and future goals, so your cover fits real life, not a generic checklist.
            </motion.p>
          </motion.div>

          {/* Body */}
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid auto-rows-fr gap-4 sm:grid-cols-2"
            >
              {BENEFITS.map((item, index) => (
                <BenefitCard key={item.title} index={index} active={active === index} onSelect={() => setActive(index)} />
              ))}
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-4">
              <motion.div
                variants={{
                  hidden: { clipPath: "inset(0 0 100% 0 round 1.5rem)" },
                  show: { clipPath: "inset(0 0 0% 0 round 1.5rem)", transition: { duration: 1, ease: EASE } },
                }}
                className="group relative min-h-[320px] overflow-hidden rounded-[1.5rem] sm:min-h-[360px]"
              >
                <motion.div style={{ y: imageY }} className="absolute -inset-y-[14%] inset-x-0">
                  <Image
                  src="/qura-advisor-consultation.png"
                  alt="A Qura advisor guiding a couple"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                <QuraCornerBrackets color="lime" size="md" />
                <motion.div style={{ rotate: markRotate }} className="absolute right-5 top-5 z-10">
                  <Image src="/logos/Colour Logomark.svg" alt="" width={64} height={64} className="h-14 w-14" />
                </motion.div>
                <div className="absolute inset-x-5 bottom-5 z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                      transition={{ duration: 0.3 }}
                      className="rounded-2xl bg-white/92 px-5 py-4 shadow-xl backdrop-blur"
                    >
                      <div className="flex items-center gap-2 text-sm font-bold text-primary">
                        <span className="text-xs tracking-[.18em] text-secondary">{String(active + 1).padStart(2, "0")}</span>
                        {benefit.title}
                        <ArrowRight size={15} className="ml-auto text-secondary" />
                      </div>
                      <div className="mt-1 line-clamp-2 text-xs leading-relaxed text-text-muted">{benefit.description}</div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2">
                {TILES.map((tile) => (
                  <FlipTile key={tile.title} tile={tile} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
