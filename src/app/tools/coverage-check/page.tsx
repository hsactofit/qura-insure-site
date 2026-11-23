import type { Metadata } from "next";
import Image from "next/image";
import CoverageCalculator from "@/components/CoverageCalculator/CoverageCalculator";

const TITLE = "Coverage Check: Life & Health Cover Calculator | Qura Insure";
const DESCRIPTION =
  "Work out how much term life and health insurance you need in India, using income replacement, loans, goals, city tier, family size and age.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/tools/coverage-check" },
  openGraph: { type: "website", url: "/tools/coverage-check", title: TITLE, description: DESCRIPTION },
};

const METHOD = [
  {
    title: "Life cover: needs-based method",
    points: [
      "Income replacement: the present value of your family's yearly expenses until your retirement age, growing with inflation (default 6%) and discounted at the return the payout could earn (default 8%).",
      "Plus outstanding loans, future goals at today's cost, and an emergency fund of six months' expenses.",
      "Minus existing life cover and liquid savings.",
      "Checked against the 10–15× income rule of thumb and the income multiples Indian insurers typically allow by age (about 25× up to 35, falling to 10× by your early 50s).",
    ],
  },
  {
    title: "Health cover: city, family and age",
    points: [
      "Starts from a base for one adult under 35: ₹10 lakh in metros, ₹7.5 lakh in tier 2 and ₹5 lakh in tier 3 cities, reflecting typical hospitalisation costs.",
      "Adjusted for a shared family floater: +50% for a spouse and +25% per child.",
      "Adjusted for the eldest member's age (×1.25 from 35, ×1.5 from 46, ×2 from 56) and ×1.25 for pre-existing conditions.",
      "Rounded to standard Indian sum insured options. Larger covers are split into a base policy plus a super top-up. Parents are sized as a separate policy.",
    ],
  },
];

export default function CoverageCheckPage() {
  return (
    <div className="bg-bg-main text-primary">
      <section className="pt-32 pb-10 md:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <span className="text-sm font-bold uppercase tracking-[.2em] text-secondary">Coverage check</span>
            <h1 className="mt-5 text-[clamp(2.2rem,6vw,4.25rem)] font-semibold leading-[1.04] tracking-[-.045em]">
              How much cover do you <span className="font-brand-emphasis text-secondary">really need?</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
              Estimate the term life and health cover that fits your income, family and city, using the methods Indian advisors and insurers commonly use. It takes two minutes, and nothing you enter leaves your browser.
            </p>
          </div>
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(17,37,65,.14)] lg:block">
            <Image src="/qura-policy-guidance.png" alt="Policy documents, a calculator and a laptop on a desk" fill priority sizes="35vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <CoverageCalculator />
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <span className="text-sm font-bold uppercase tracking-[.2em] text-secondary">Methodology</span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-.03em] md:text-5xl">How we calculate</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {METHOD.map((m) => (
              <div key={m.title} className="rounded-3xl border border-primary/10 bg-bg-main p-7">
                <h3 className="text-lg font-semibold">{m.title}</h3>
                <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-text-muted">
                  {m.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-4xl text-sm leading-relaxed text-text-muted">
            These are planning estimates, not an offer of insurance or financial advice. The cover you can buy depends on each insurer&apos;s underwriting, including income proof, medical tests and policy terms. Please speak with a Qura advisor before you decide.
          </p>
        </div>
      </section>
    </div>
  );
}
