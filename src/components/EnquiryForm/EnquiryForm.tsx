"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const INTERESTS = ["Term Life Insurance", "Health Insurance", "Corporate Plans", "Motor Insurance", "Not sure yet"];

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

const field =
  "w-full rounded-xl border border-primary/15 bg-white px-4 py-3.5 text-base text-primary placeholder:text-primary/40 outline-none transition focus:border-primary focus:ring-2 focus:ring-cta";

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

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
        body: JSON.stringify({ ...data, page: window.location.pathname, utm }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        form.reset();
        setStatus({ kind: "sent" });
      } else {
        setStatus({ kind: "error", message: json.message || "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ kind: "error", message: "Network error. Please check your connection and try again." });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="mt-10 w-full max-w-xl rounded-[1.75rem] bg-white p-8 text-center text-primary shadow-2xl md:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cta">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="mt-5 text-2xl font-semibold">Thank you! We&apos;ve got your request.</h3>
        <p className="mt-3 text-text-muted">A QURA expert will call you shortly on the number you shared.</p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="mt-6 text-sm font-semibold underline underline-offset-4">
          Send another enquiry
        </button>
      </div>
    );
  }

  const sending = status.kind === "sending";
  return (
    <form onSubmit={onSubmit} noValidate={false} className="mt-10 w-full max-w-xl rounded-[1.75rem] bg-white p-6 text-left text-primary shadow-2xl md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold">Full name *</span>
          <input name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label>
          <span className="mb-1.5 block text-sm font-semibold">Mobile number *</span>
          <input name="mobile" required type="tel" inputMode="tel" autoComplete="tel" pattern="^(\+?91)?[\s\-]?[6-9]\d{4}[\s\-]?\d{5}$" maxLength={16} placeholder="98XXXXXXXX" className={field} />
        </label>
        <label>
          <span className="mb-1.5 block text-sm font-semibold">Email</span>
          <input name="email" type="email" autoComplete="email" maxLength={200} placeholder="you@example.com" className={field} />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold">Interested in</span>
          <select name="productInterest" defaultValue="" className={field}>
            <option value="" disabled>Choose a plan type</option>
            {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </label>
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold">Anything we should know?</span>
          <textarea name="message" rows={3} maxLength={1000} placeholder="E.g. family of 4, looking for health cover" className={`${field} resize-none`} />
        </label>
        {/* Honeypot: hidden from people, filled by bots. */}
        <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      </div>
      {status.kind === "error" && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{status.message}</p>}
      <button type="submit" disabled={sending} className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cta px-8 py-4 font-bold text-primary transition hover:bg-cta-hover disabled:opacity-70">
        {sending ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : <>Book a free call <ArrowRight size={18} className="transition group-hover:translate-x-1" /></>}
      </button>
      <p className="mt-3 text-center text-xs text-text-muted">No spam. We only use your details to call you back about insurance.</p>
    </form>
  );
}
