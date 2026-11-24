"use client";

import { useRef, useSyncExternalStore } from "react";

const WIDE_QUERY = "(min-width: 1024px)";
/** True at the lg breakpoint and up, where problem and answer cards sit side by side. */
function useIsWide() {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(WIDE_QUERY);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(WIDE_QUERY).matches,
    () => true,
  );
}
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Compass,
  FileText,
  HelpCircle,
  Layers,
  Lightbulb,
  Search,
  ShieldCheck,
  Shuffle,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import QuraCornerBrackets from "@/components/Common/QuraCornerBrackets";

type Side = { title: string; desc: string; icon: LucideIcon };

// Each problem sits opposite the part of the QURA approach that resolves it.
const PAIRS: { problem: Side; answer: Side }[] = [
  {
    problem: { title: "Chaos", desc: "250+ products and 1,000+ policy variations", icon: Shuffle },
    answer: { title: "Research", desc: "Evidence before opinion: we analyse the policies that matter", icon: Search },
  },
  {
    problem: { title: "Information overload", desc: "Endless technical fine print and sales calls", icon: FileText },
    answer: { title: "Curation", desc: "Low-value clutter filtered out, leaving a short list of top choices", icon: Layers },
  },
  {
    problem: { title: "Confusion", desc: "No context on what actually covers you", icon: HelpCircle },
    answer: { title: "Clarity", desc: "Plain-language explanations of terms and exclusions", icon: Lightbulb },
  },
  {
    problem: { title: "Uncertainty", desc: "Fear of making a costly mistake", icon: AlertTriangle },
    answer: { title: "Guidance", desc: "Personalised advice tailored to your life stage", icon: Compass },
  },
  {
    problem: { title: "Bad decisions", desc: "Buying the wrong plan under pressure", icon: XCircle },
    answer: { title: "Confidence", desc: "Deciding with a complete understanding of your cover", icon: ShieldCheck },
  },
];

function PairRow({ pair, index }: { pair: (typeof PAIRS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // 0 when the row enters the lower part of the screen, 1 once it reaches the middle.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.45"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  const problemOpacity = useTransform(p, [0, 1], [1, 0.55]);
  // Sideways slides only where the cards sit side by side; on phones they stack and would clip.
  const isWide = useIsWide();
  const problemX = useTransform(p, [0, 1], isWide ? [0, -10] : [0, 0]);
  const strike = useTransform(p, [0.3, 1], ["0%", "100%"]);
  const answerX = useTransform(p, [0, 1], isWide ? [40, 0] : [0, 0]);
  const answerScale = useTransform(p, [0, 1], [0.96, 1]);
  const nodeScale = useTransform(p, [0.4, 1], [0.7, 1]);

  const ProblemIcon = pair.problem.icon;
  const AnswerIcon = pair.answer.icon;

  return (
    <div ref={ref} className="group/row grid items-center gap-3 lg:grid-cols-[1fr_72px_1fr] lg:gap-0">
      {/* Problem */}
      <motion.div
        style={{ opacity: problemOpacity, x: problemX }}
        className="relative flex items-center gap-4 rounded-2xl border border-rose-200/70 bg-white p-4 shadow-sm transition-[box-shadow,transform] duration-300 group-hover/row:-translate-y-1 group-hover/row:shadow-lg md:p-5"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
          <ProblemIcon size={20} />
        </span>
        <div className="min-w-0">
          <div className="relative inline-block whitespace-nowrap text-xs font-bold uppercase tracking-[.1em] text-rose-700 sm:tracking-[.16em]">
            {pair.problem.title}
            <motion.span style={{ width: strike }} className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-rose-500" />
          </div>
          <div className="mt-1 text-sm text-primary/70">{pair.problem.desc}</div>
        </div>
      </motion.div>

      {/* Spine node (desktop) / arrow (mobile) */}
      <div className="flex justify-center">
        <motion.span
          style={{ scale: nodeScale }}
          className="relative z-10 hidden h-11 w-11 items-center justify-center rounded-full border-4 border-bg-main bg-primary text-xs font-bold text-cta shadow-md transition-transform duration-300 group-hover/row:scale-110 lg:flex"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
        <ArrowDown size={18} className="text-secondary lg:hidden" />
      </div>

      {/* QURA answer */}
      <motion.div
        style={{ x: answerX, scale: answerScale }}
        className="relative flex items-center gap-4 overflow-hidden rounded-2xl bg-primary p-4 text-white shadow-lg transition-[box-shadow,transform] duration-300 group-hover/row:-translate-y-1 group-hover/row:shadow-2xl md:p-5"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cta text-primary transition-transform duration-300 group-hover/row:rotate-6 group-hover/row:scale-110">
          <AnswerIcon size={20} />
        </span>
        <div className="min-w-0">
          <div className="text-xs font-bold uppercase tracking-[.16em] text-cta">{pair.answer.title}</div>
          <div className="mt-1 text-sm text-white/85">{pair.answer.desc}</div>
        </div>
        <ArrowRight size={18} className="ml-auto hidden shrink-0 text-cta opacity-0 transition-all duration-300 group-hover/row:translate-x-1 group-hover/row:opacity-100 sm:block" />
      </motion.div>
    </div>
  );
}

function Spine({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 top-6 hidden w-1 -translate-x-1/2 rounded-full bg-primary/10 lg:block">
      <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top rounded-full bg-primary" />
    </div>
  );
}

export default function ChaosToConfidence() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.8", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-primary/10 bg-white/60 p-5 shadow-[0_24px_70px_rgba(17,37,65,.08)] backdrop-blur sm:p-8 md:p-12">
      <QuraCornerBrackets color="navy" size="md" />

      {/* Column headings */}
      <div className="mb-8 hidden grid-cols-[1fr_72px_1fr] items-end lg:grid">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-xs font-bold uppercase tracking-[.2em] text-rose-600">The traditional path</div>
          <div className="mt-2 font-heading text-2xl font-bold text-primary">Information overload</div>
        </motion.div>
        <div />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <div className="text-xs font-bold uppercase tracking-[.2em] text-secondary">The QURA way</div>
          <div className="mt-2 font-heading text-2xl font-bold text-primary">Curation and clarity</div>
        </motion.div>
      </div>

      <div ref={listRef} className="relative space-y-6 lg:space-y-5">
        <Spine progress={progress} />
        {PAIRS.map((pair, index) => (
          <PairRow key={pair.problem.title} pair={pair} index={index} />
        ))}
      </div>
    </div>
  );
}
