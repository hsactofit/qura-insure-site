"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ArrowRight, HeartPulse, Info, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CITY_LABELS,
  HEALTH_DEFAULTS,
  LIFE_DEFAULTS,
  calculateHealthCover,
  calculateLifeCover,
  formatINR,
  type CityTier,
  type HealthInputs,
  type LifeInputs,
} from "@/lib/coverage";

const LAKH = 100_000;

type Tab = "life" | "health";

export default function CoverageCalculator() {
  const [tab, setTab] = useState<Tab>("life");

  return (
    <div>
      <div role="tablist" aria-label="Coverage type" className="mx-auto grid max-w-md grid-cols-2 gap-2 rounded-full border border-primary/10 bg-white p-1.5 shadow-sm">
        {([
          ["life", "Life cover", ShieldCheck],
          ["health", "Health cover", HeartPulse],
        ] as const).map(([key, label, Icon]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition",
              tab === key ? "bg-primary text-white" : "text-primary hover:bg-bg-main"
            )}
          >
            <Icon size={17} /> {label}
          </button>
        ))}
      </div>

      <div className="mt-10">{tab === "life" ? <LifeCalculator /> : <HealthCalculator />}</div>
    </div>
  );
}

// ---------------- Life ----------------

function LifeCalculator() {
  const [v, setV] = useState<LifeInputs>(LIFE_DEFAULTS);
  const r = useMemo(() => calculateLifeCover(v), [v]);
  const set = <K extends keyof LifeInputs>(key: K) => (value: LifeInputs[K]) => setV((s) => ({ ...s, [key]: value }));

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
      <Panel>
        <FieldGroup title="About you">
          <NumberField label="Your age" suffix="years" value={v.age} min={18} max={65} onChange={set("age")} />
          <NumberField label="Retirement age" suffix="years" value={v.retirementAge} min={v.age} max={75} onChange={set("retirementAge")} />
          <LakhField label="Annual income" value={v.annualIncome} onChange={set("annualIncome")} />
          <LakhField label="Family's yearly expenses" hint="What your family would need each year without your income" value={v.annualExpenses} onChange={set("annualExpenses")} />
        </FieldGroup>
        <FieldGroup title="Liabilities and goals">
          <LakhField label="Outstanding loans" hint="Home, car, personal and education loans" value={v.loans} onChange={set("loans")} />
          <LakhField label="Future goals" hint="Children's education, marriage and similar, at today's cost" value={v.goals} onChange={set("goals")} />
        </FieldGroup>
        <FieldGroup title="What you already have">
          <LakhField label="Existing life cover" hint="Term, group and endowment cover" value={v.existingCover} onChange={set("existingCover")} />
          <LakhField label="Savings and investments" hint="FDs, mutual funds and stocks your family could use" value={v.savings} onChange={set("savings")} />
        </FieldGroup>
        <FieldGroup title="Assumptions">
          <NumberField label="Inflation" suffix="% / yr" value={v.inflation} min={0} max={15} step={0.5} onChange={set("inflation")} />
          <NumberField label="Return on payout" suffix="% / yr" value={v.returnRate} min={0} max={15} step={0.5} onChange={set("returnRate")} />
        </FieldGroup>
      </Panel>

      <Result
        label="Recommended term cover"
        amount={r.recommended}
        caption={r.recommended > 0 ? `Cover until age ${v.retirementAge} (${r.years} years)` : "Your savings and existing cover already meet the estimated need."}
        rows={[
          ["Income replacement", r.incomeReplacement, `${formatINR(v.annualExpenses)} a year for ${r.years} years, rising with inflation`],
          ["Outstanding loans", r.loans],
          ["Future goals", r.goals],
          ["Emergency fund", r.emergencyFund, "Six months of expenses"],
          ["Less: existing cover and savings", -r.offsets],
          ["Estimated need", r.need],
        ]}
        notes={[
          `Rule of thumb: 10–15× income = ${formatINR(r.ruleOfThumb.low)} – ${formatINR(r.ruleOfThumb.high)}.`,
          r.exceedsInsurerLimit
            ? `At age ${v.age}, many insurers cap cover at about ${r.insurerMultiple}× income (${formatINR(r.insurerLimit)}). You may need to split cover across insurers or show higher income.`
            : `At age ${v.age}, insurers typically allow up to about ${r.insurerMultiple}× income (${formatINR(r.insurerLimit)}).`,
          "Rounded up to the next ₹25 lakh, with a ₹50 lakh minimum, because term plans are usually sold in these steps.",
        ]}
        ctaHref="/insurance/term-life"
        ctaLabel="Learn about term life insurance"
      />
    </div>
  );
}

// ---------------- Health ----------------

function HealthCalculator() {
  const [v, setV] = useState<HealthInputs>(HEALTH_DEFAULTS);
  const r = useMemo(() => calculateHealthCover(v), [v]);
  const set = <K extends keyof HealthInputs>(key: K) => (value: HealthInputs[K]) => setV((s) => ({ ...s, [key]: value }));

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
      <Panel>
        <FieldGroup title="Where you live">
          <SelectField
            label="City"
            value={v.city}
            options={Object.entries(CITY_LABELS) as [CityTier, string][]}
            onChange={(value) => set("city")(value as CityTier)}
          />
        </FieldGroup>
        <FieldGroup title="Your family floater">
          <NumberField label="Adults" hint="You and your spouse" value={v.adults} min={1} max={2} onChange={set("adults")} />
          <NumberField label="Children" value={v.children} min={0} max={4} onChange={set("children")} />
          <NumberField label="Age of eldest member" suffix="years" value={v.eldestAge} min={18} max={80} onChange={set("eldestAge")} />
          <ToggleField label="Anyone has a pre-existing condition" hint="For example diabetes, high blood pressure or thyroid" checked={v.preExisting} onChange={set("preExisting")} />
          <LakhField label="Employer health cover" hint="Shown for reference, but not deducted" value={v.employerCover} onChange={set("employerCover")} />
        </FieldGroup>
        <FieldGroup title="Parents (separate policy)">
          <NumberField label="Parents to insure" value={v.parents} min={0} max={2} onChange={set("parents")} />
          {v.parents > 0 && <NumberField label="Age of elder parent" suffix="years" value={v.eldestParentAge} min={40} max={95} onChange={set("eldestParentAge")} />}
        </FieldGroup>
      </Panel>

      <Result
        label="Recommended family floater"
        amount={r.recommended}
        caption={
          r.superTopUp > 0
            ? `Suggested structure: ${formatINR(r.basePolicy)} base policy + ${formatINR(r.superTopUp)} super top-up`
            : `A single ${formatINR(r.basePolicy)} policy`
        }
        rows={[
          ["City base (1 adult under 35)", r.base],
          ["Family size factor", null, `× ${r.familyFactor.toFixed(2)}`],
          ["Age factor (eldest member)", null, `× ${r.ageFactor.toFixed(2)}`],
          ["Pre-existing condition factor", null, `× ${r.pedFactor.toFixed(2)}`],
          ["Estimated need", r.raw],
          ...(r.parentsCover > 0 ? ([["Parents' separate policy", r.parentsCover]] as Row[]) : []),
        ]}
        notes={[
          "Rounded up to the next standard sum insured sold in India (₹5 L, ₹7.5 L, ₹10 L, ₹15 L, ₹20 L, ₹25 L…).",
          r.superTopUp > 0
            ? "A super top-up with a deductible equal to your base cover is usually far cheaper than a larger base plan."
            : "As your family grows or ages, add a super top-up instead of a bigger base plan.",
          r.employerCover > 0
            ? `Your employer cover of ${formatINR(r.employerCover)} is a useful buffer, but it ends when you change jobs or retire, so we don't deduct it.`
            : "Employer cover, if you get it later, is a buffer. It ends when you leave the job.",
        ]}
        ctaHref="/insurance/health"
        ctaLabel="Learn about health insurance"
      />
    </div>
  );
}

// ---------------- Shared UI ----------------

type Row = [string, number | null, string?];

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="space-y-8 rounded-[2rem] border border-primary/10 bg-white p-6 md:p-8">{children}</div>;
}

function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="text-xs font-bold uppercase tracking-[.18em] text-text-muted">{title}</legend>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Label({ id, label, hint }: { id: string; label: string; hint?: string }) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-sm font-semibold">{label}</span>
      {hint && <span className="mt-0.5 block text-xs leading-snug text-text-muted">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-primary/15 bg-bg-main px-4 py-3 text-base font-semibold outline-none transition focus:border-secondary focus:bg-white focus:ring-2 focus:ring-accent";

function NumberField({ label, hint, suffix, value, min, max, step = 1, onChange }: { label: string; hint?: string; suffix?: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void }) {
  const id = useId();
  // Keep the raw text while typing so partial values (e.g. "3" on the way to "35") aren't clamped.
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <div className="flex flex-col justify-between gap-2">
      <Label id={id} label={label} hint={hint} />
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={draft ?? value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            setDraft(e.target.value);
            const n = Number(e.target.value);
            if (e.target.value !== "" && n >= min && n <= max) onChange(n);
          }}
          onBlur={() => {
            if (draft !== null) onChange(clamp(Number(draft), min, max));
            setDraft(null);
          }}
          className={cn(inputClass, suffix && "pr-20")}
        />
        {suffix && <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-muted">{suffix}</span>}
      </div>
    </div>
  );
}

function LakhField({ label, hint, value, onChange }: { label: string; hint?: string; value: number; onChange: (v: number) => void }) {
  const id = useId();
  return (
    <div className="flex flex-col justify-between gap-2">
      <Label id={id} label={label} hint={hint} />
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-text-muted">₹</span>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step={0.5}
          value={Number((value / LAKH).toFixed(2))}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0) * LAKH)}
          className={cn(inputClass, "pl-9 pr-16")}
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-muted">lakh</span>
      </div>
    </div>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: [string, string][]; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2 sm:col-span-2">
      <Label id={id} label={label} />
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        {options.map(([key, text]) => (
          <option key={key} value={key}>{text}</option>
        ))}
      </select>
    </div>
  );
}

function ToggleField({ label, hint, checked, onChange }: { label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void }) {
  const id = useId();
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-primary/15 bg-bg-main p-4 sm:col-span-2">
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-4 w-4 accent-[var(--color-primary)]" />
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        {hint && <span className="mt-0.5 block text-xs text-text-muted">{hint}</span>}
      </span>
    </label>
  );
}

function Result({ label, amount, caption, rows, notes, ctaHref, ctaLabel }: { label: string; amount: number; caption: string; rows: Row[]; notes: string[]; ctaHref: string; ctaLabel: string }) {
  return (
    <div className="lg:sticky lg:top-32 lg:self-start">
      <div className="rounded-[2rem] bg-primary p-7 text-white md:p-9" aria-live="polite">
        <div className="text-xs font-bold uppercase tracking-[.2em] text-cta">{label}</div>
        <div className="mt-3 text-5xl font-semibold tracking-[-.05em] md:text-6xl">{formatINR(amount)}</div>
        <p className="mt-3 text-sm leading-relaxed text-white/75">{caption}</p>

        <dl className="mt-7 divide-y divide-white/10 border-t border-white/10">
          {rows.map(([name, value, detail]) => (
            <div key={name} className="flex items-start justify-between gap-4 py-3 text-sm">
              <dt>
                <span className="text-white/85">{name}</span>
                {detail && value !== null && <span className="mt-0.5 block text-xs text-white/50">{detail}</span>}
              </dt>
              <dd className="shrink-0 font-semibold">{value === null ? detail : formatINR(value)}</dd>
            </div>
          ))}
        </dl>

        <Link href="/#contact" className="group mt-7 flex items-center justify-center gap-3 rounded-full bg-cta px-6 py-4 font-bold text-primary transition hover:bg-cta-hover">
          Get this reviewed by an advisor <ArrowRight size={18} className="transition group-hover:translate-x-1" />
        </Link>
        <Link href={ctaHref} className="mt-3 block text-center text-sm font-semibold text-white/80 hover:text-cta">{ctaLabel}</Link>
      </div>

      <ul className="mt-5 space-y-3">
        {notes.map((note) => (
          <li key={note} className="flex gap-3 text-sm leading-relaxed text-text-muted">
            <Info size={16} className="mt-0.5 shrink-0 text-secondary" /> {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

const clamp = (n: number, min: number, max: number) => (Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min);
