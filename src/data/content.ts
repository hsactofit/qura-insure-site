// Supply the approved appointment destination before enabling direct booking.
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || null;

export const NAV_LINKS = [
  { name: "Term Life", href: "/term-life-insurance" },
  { name: "Health", href: "/health-insurance" },
  { name: "Corporate", href: "/corporate-insurance" },
  { name: "How it Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#team" },
  { name: "FAQ", href: "/#faq" },
  { name: "Blog", href: "/blog" },
];

export const SERVICES = [
  {
    title: "Term Life Insurance",
    description: "Secure your family's financial future with comprehensive term life coverage tailored to your needs.",
    icon: "Shield",
    href: "/term-life-insurance",
  },
  {
    title: "Health Insurance",
    description: "Access the best healthcare facilities without worrying about exorbitant medical bills.",
    icon: "HeartPulse",
    href: "/health-insurance",
  },
  {
    title: "Corporate Plans",
    description: "Protect your employees with premium health and life coverage packages.",
    icon: "Building",
    href: "/corporate-insurance",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discover & Analyze",
    description: "We start by understanding your unique needs, financial goals, and current coverage.",
  },
  {
    step: "02",
    title: "Expert Recommendations",
    description: "Our advisors research suitable policies, explaining their benefits, exclusions, and trade-offs clearly.",
  },
  {
    step: "03",
    title: "Seamless Onboarding",
    description: "We handle all the paperwork and ensure a smooth, hassle-free policy issuance process.",
  },
  {
    step: "04",
    title: "Ongoing Support",
    description: "From claim settlements to policy renewals, we are always by your side.",
  },
];

export const BENEFITS = [
  {
    title: "Spam-Free Promise",
    description: "We never spam you with unwanted calls or emails. Your privacy is our priority.",
    icon: "PhoneOff",
  },
  {
    title: "Unbiased Advice",
    description: "We don't push products for higher commissions. We recommend what's best for you.",
    icon: "Scale",
  },
];

/** Self-contained definition shown under the hero (40-60 words). */
export const ABOUT_DEFINITION =
  "Qura Insure is an IRDAI-registered insurance advisory based in India that helps individuals, families and businesses choose term life, health and corporate group insurance. Certified advisors compare plans across insurers, explain benefits, exclusions and waiting periods in plain language, and support policyholders through renewals and claims at no extra cost.";

/** Merged pricing + claims passage answering "How does Qura Insure get paid and what support do I get?" */
export const PRICING_AND_SUPPORT = {
  question: "How does Qura Insure get paid and what support do I get?",
  answer: [
    "Qura Insure does not charge customers an advisory fee. As an IRDAI corporate agent, it is paid a commission by the insurer when a policy is issued, and that commission is already built into the insurer's filed premium. You therefore pay the same premium as you would when buying the same plan directly from the insurance company.",
    "Support continues after purchase. When you need to claim, your advisor helps in four steps: confirming what the policy covers, preparing the claim form and documents the insurer asks for, submitting and tracking the claim with the insurer or its TPA, and escalating through the insurer's grievance process if a decision appears unjustified. The final claim decision always rests with the insurer under your policy terms.",
  ],
};

export const FAQS = [
  {
    question: "Do you charge any advisory fees?",
    answer: "No. Qura Insure charges no advisory fee for comparing plans, recommending cover or helping with claims. We earn a standard commission from the insurance company only when a policy is issued through us. That commission is already included in the insurer's premium, so you pay the same price as buying the identical policy directly from the insurer.",
  },
  {
    question: "Why shouldn't I just buy directly from the insurer?",
    answer: "Buying through Qura Insure costs the same premium as buying directly, but you get more than one insurer's view. Our certified advisors compare plans across several insurers, explain exclusions, waiting periods and sub-limits in plain language, and stay with you after purchase to help with renewals, policy changes and claims, which a single insurer's sales team does not do.",
  },
  {
    question: "How long does the policy issuance take?",
    answer: "Policy issuance time depends on the insurer and the plan. Policies that need no medical tests are usually quicker once a complete proposal is accepted, while larger covers that need medical checks or underwriting review take longer. Your advisor tells you which documents and tests apply and tracks the proposal until the policy is issued.",
  },
  {
    question: "Will you help me if my claim gets rejected?",
    answer: "Yes. If an insurer rejects or partly settles your claim, your Qura Insure advisor reviews the decision against your policy wording, helps you gather any missing documents, and files a reconsideration or complaint with the insurer's grievance team. If the issue stays unresolved, we explain how to escalate to the Insurance Ombudsman or IRDAI's Bima Bharosa portal.",
  },
];

// IRDAI requires a corporate agent to display its registration number, category,
// validity and the insurers it has tie-ups with. Fill these from the IRDAI
// certificate of registration; the compliance block and footer line stay hidden
// until every field is filled, so nothing incorrect is ever shown.
export type CorporateAgentCategory = "Life" | "General" | "Health" | "Composite";

export const IRDAI_REGISTRATION: {
  registrationNumber: string;
  category: CorporateAgentCategory | "";
  validFrom: string;
  validTill: string;
  insurerPartners: { name: string; line: "Life" | "General" | "Health" }[];
} = {
  registrationNumber: "",
  category: "",
  validFrom: "",
  validTill: "",
  insurerPartners: [],
};

export const isRegistrationComplete = () =>
  Boolean(
    IRDAI_REGISTRATION.registrationNumber &&
      IRDAI_REGISTRATION.category &&
      IRDAI_REGISTRATION.validFrom &&
      IRDAI_REGISTRATION.validTill &&
      IRDAI_REGISTRATION.insurerPartners.length > 0,
  );
