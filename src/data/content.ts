export const NAV_LINKS = [
  { name: "Products", href: "#products" },
  { name: "How it Works", href: "#how-it-works" },
  { name: "Why Us", href: "#why-us" },
  { name: "About Us", href: "#team" },
  { name: "FAQ", href: "#faq" },
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
    description: "Our advisors curate the best policies from top insurers, explaining the pros and cons clearly.",
  },
  {
    step: "03",
    title: "Seamless Onboarding",
    description: "We handle all the paperwork and ensure a smooth, hassle-free policy issuance process.",
  },
  {
    step: "04",
    title: "Lifetime Support",
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
    description: "Our dedicated claims team ensures you get your money when you need it the most.",
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
    answer: "Buying through us costs exactly the same as buying directly. However, we provide unbiased advice, help you compare across insurers, and offer dedicated lifetime claims support.",
  },
  {
    question: "How long does the policy issuance take?",
    answer: "Most health and term insurance policies are issued within 2-3 working days, provided all required documents and medical checks (if any) are completed.",
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
