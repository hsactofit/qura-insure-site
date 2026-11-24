"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Ambulance,
  ArrowRight,
  Briefcase,
  Building2,
  Car,
  Check,
  HeartPulse,
  HelpCircle,
  House,
  Loader2,
  LockKeyhole,
  Plane,
  ShieldCheck,
} from "lucide-react";
import { INSURANCE_MENU } from "@/data/content";

const ICONS = { ShieldCheck, HeartPulse, Building2, Car, House, Plane, Briefcase, LockKeyhole, Ambulance };

// Plan chips: value is what the API expects, label is the short text shown on the chip.
const INTERESTS = [
  ...INSURANCE_MENU.map((item) => ({
    value: item.title,
    label: item.title.replace(/ Insurance$/, "").replace(/^Personal /, ""),
    Icon: ICONS[item.icon],
  })),
  { value: "Not sure yet", label: "Not sure yet", Icon: HelpCircle },
];

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

const field =
  "w-full rounded-xl border border-primary/15 bg-bg-main/60 px-4 py-3 text-base text-primary placeholder:text-primary/35 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-cta/40";
const labelText = "mb-1.5 block text-xs font-bold uppercase tracking-[.14em] text-primary/70";

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [interest, setInterest] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    params.forEach((value, key) => {
      if (/^(utm_[a-z]+|gclid|fbclid)$/.test(key)) utm[key] = value;
    });

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, productInterest: interest, page: window.location.pathname, utm }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        form.reset();
        setInterest("");
        setStatus({ kind: "sent" });
      } else {
        setStatus({ kind: "error", message: json.message || "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ kind: "error", message: "Network error. Please check your connection and try again." });
    }
  }

  const sending = status.kind === "sending";

  return (
    <div className="relative w-full rounded-[1.5rem] bg-white p-5 text-left sm:rounded-[1.75rem] text-primary shadow-[0_30px_80px_rgba(0,0,0,.25)] sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status.kind === "sent" ? (
          <motion.div
            key="sent"
            role="status"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-cta"
            >
              <Check size={32} strokeWidth={3} />
            </motion.div>
            <h3 className="mt-6 text-2xl font-semibold">Thank you! We&apos;ve got your request.</h3>
            <p className="mt-3 max-w-sm text-text-muted">A QURA expert will call you shortly on the number you shared.</p>
            <button
              type="button"
              onClick={() => setStatus({ kind: "idle" })}
              className="mt-6 text-sm font-semibold underline underline-offset-4 hover:text-secondary"
            >
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold tracking-[-.02em]">Book a free call</h3>
              <p className="mt-1 text-sm text-text-muted">Takes under a minute. Fields marked * are required.</p>
            </div>

            <fieldset>
              <legend className={labelText}>What are you looking for?</legend>
              <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {INTERESTS.map(({ value, label, Icon }) => {
                  const selected = interest === value;
                  return (
                    <motion.button
                      key={value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setInterest(selected ? "" : value)}
                      whileTap={{ scale: 0.94 }}
                      className={`flex min-w-0 items-center gap-2 rounded-xl border px-2.5 py-2.5 text-left text-[13px] font-semibold leading-tight transition-colors sm:px-3 sm:text-sm ${
                        value === "Not sure yet" ? "sm:col-span-3 sm:justify-center" : ""
                      } ${
                        selected
                          ? "border-primary bg-primary text-white"
                          : "border-primary/12 bg-white text-primary hover:border-primary/40 hover:bg-bg-main"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                          selected ? "bg-cta text-primary" : "bg-surface-sage text-primary"
                        }`}
                      >
                        <Icon size={15} />
                      </span>
                      <span className="min-w-0 break-words">{label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className={labelText}>Full name *</span>
                <input name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder="Your name" className={field} />
              </label>
              <label>
                <span className={labelText}>Mobile number *</span>
                <span className="flex">
                  <span className="flex items-center rounded-l-xl border border-r-0 border-primary/15 bg-surface-sage px-3 text-sm font-semibold">+91</span>
                  <input
                    name="mobile"
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    pattern="^(\+?91)?[\s\-]?[6-9]\d{4}[\s\-]?\d{5}$"
                    maxLength={16}
                    placeholder="98XXXXXXXX"
                    className={`${field} rounded-l-none`}
                  />
                </span>
              </label>
              <label>
                <span className={labelText}>Email</span>
                <input name="email" type="email" autoComplete="email" maxLength={200} placeholder="you@example.com" className={field} />
              </label>
              <label className="sm:col-span-2">
                <span className={labelText}>Anything we should know?</span>
                <textarea
                  name="message"
                  rows={3}
                  maxLength={1000}
                  placeholder="E.g. family of 4, looking for health cover"
                  className={`${field} resize-none`}
                />
              </label>
              {/* Honeypot: hidden from people, filled by bots. */}
              <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            </div>

            <AnimatePresence>
              {status.kind === "error" && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {status.message}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={sending}
              whileTap={{ scale: 0.98 }}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-white transition hover:bg-dark disabled:opacity-70"
            >
              {sending ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Book my free call
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cta text-primary transition group-hover:translate-x-1">
                    <ArrowRight size={16} />
                  </span>
                </>
              )}
            </motion.button>
            <p className="mt-3 text-center text-xs text-text-muted">No spam. We only use your details to call you back about insurance.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
