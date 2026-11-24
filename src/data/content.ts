// Supply the approved appointment destination before enabling direct booking.
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || null;

export const NAV_LINKS = [
  { name: "Blog", href: "/blog" },
];

// Each slug is a page under /insurance/[slug] (content in src/data/insurance.ts).
export const INSURANCE_MENU = [
  {
    slug: "term-life",
    title: "Term Life Insurance",
    description: "Secure your family's financial future",
    icon: "ShieldCheck",
  },
  {
    slug: "health",
    title: "Health Insurance",
    description: "Medical cover for you and your family",
    icon: "HeartPulse",
  },
  {
    slug: "corporate",
    title: "Corporate Plans",
    description: "Group health and life cover for your team",
    icon: "Building2",
  },
  {
    slug: "motor",
    title: "Motor Insurance",
    description: "Car and two-wheeler protection",
    icon: "Car",
  },
  {
    slug: "home",
    title: "Home Insurance",
    description: "Protect your home and belongings",
    icon: "House",
  },
  {
    slug: "travel",
    title: "Travel Insurance",
    description: "Medical and trip cover, in India and abroad",
    icon: "Plane",
  },
  {
    slug: "business",
    title: "Business Insurance",
    description: "Property, liability and income cover for your business",
    icon: "Briefcase",
  },
  {
    slug: "cyber",
    title: "Cyber Insurance",
    description: "Cover against online fraud and data breaches",
    icon: "LockKeyhole",
  },
  {
    slug: "personal-accident",
    title: "Personal Accident Insurance",
    description: "Payouts for accidental death and disability",
    icon: "Ambulance",
  },
] as const;

export const TOOLS_MENU = [
  { name: "Coverage Check", href: "/tools/coverage-check" },
  { name: "Claim Assistance", href: "/#contact" },
  { name: "Insurance Guides", href: "/blog" },
];

export const SERVICES = [
  {
    title: "Term Life Insurance",
    description: "Secure your family's financial future with comprehensive term life coverage tailored to your needs.",
    icon: "Shield",
    href: "#",
  },
  {
    title: "Health Insurance",
    description: "Access the best healthcare facilities without worrying about exorbitant medical bills.",
    icon: "HeartPulse",
    href: "#",
  },
  {
    title: "Corporate Plans",
    description: "Protect your employees with premium health and life coverage packages.",
    icon: "Building",
    href: "#",
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
  {
    title: "Claim Assistance",
    description: "Our claims team helps you prepare documents, understand the process, and follow up with your insurer. Claims are assessed by the insurer under your policy terms.",
    icon: "LifeBuoy",
  },
  {
    title: "Transparent Pricing",
    description: "No hidden fees. You get the exact same price as buying directly from the insurer.",
    icon: "BadgeCheck",
  },
];

export const FAQS = [
  {
    question: "Do you charge any advisory fees?",
    answer: "No, our advisory services are completely free for you. We earn a standard commission from the insurance companies when you buy a policy through us, which does not affect your premium.",
  },
  {
    question: "Why shouldn't I just buy directly from the insurer?",
    answer: "Buying through us costs exactly the same as buying directly. However, we provide unbiased advice, help you compare across insurers, and offer ongoing claims guidance.",
  },
  {
    question: "How long does the policy issuance take?",
    answer: "Issuance timelines depend on the insurer, the policy, underwriting, and any required documents or medical checks. Your advisor will explain the steps and help you track progress.",
  },
  {
    question: "Will you help me if my claim gets rejected?",
    answer: "Absolutely. We have a dedicated claims assistance team that will advocate on your behalf and help resolve any unjustified claim rejections.",
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
  registrationNumber: "CA1139",
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
