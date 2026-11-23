// Content for the /insurance/[slug] product pages.
// Figures reflect Indian regulations and published data as of 2025-26; review
// them whenever IRDAI, tax or GST rules change.

export type InsuranceStat = { value: string; label: string; source: string };
export type InsuranceFaq = { question: string; answer: string };
export type InsuranceSource = { name: string; url: string };

export type InsuranceProduct = {
  slug: "term-life" | "health" | "corporate" | "motor";
  icon: "ShieldCheck" | "HeartPulse" | "Building2" | "Car";
  name: string;
  eyebrow: string;
  headline: string;
  headlineEmphasis: string;
  intro: string;
  metaDescription: string;
  image: { src: string; alt: string };
  stats: InsuranceStat[];
  covered: { title: string; text: string }[];
  notCovered: string[];
  keyTerms: { term: string; text: string }[];
  addOns: { title: string; text: string }[];
  sizing: { title: string; points: string[]; toolCta?: boolean };
  tax: { title: string; text: string }[];
  checklist: string[];
  faqs: InsuranceFaq[];
  sources: InsuranceSource[];
};

const IRDAI = { name: "IRDAI — Insurance Regulatory and Development Authority of India", url: "https://irdai.gov.in" };
const INCOME_TAX = { name: "Income Tax Department — deductions under 80C / 80D", url: "https://www.incometax.gov.in" };

export const INSURANCE_PRODUCTS: InsuranceProduct[] = [
  {
    slug: "term-life",
    icon: "ShieldCheck",
    name: "Term Life Insurance",
    eyebrow: "Income protection",
    headline: "Protect the life your family is",
    headlineEmphasis: "building with you.",
    intro:
      "Term insurance is the simplest and lowest-cost way to protect your family's income. If something happens to you during the policy term, your nominee receives the sum assured to pay for daily expenses, loans and future goals.",
    metaDescription:
      "Understand term life insurance in India: how much cover you need, what's covered, riders, tax benefits under 80C and 10(10D), and how to choose an insurer.",
    image: { src: "/qura-family-hero.png", alt: "A family together outdoors, protected by term life cover" },
    stats: [
      { value: "~83%", label: "India's mortality protection gap: the share of needed life cover that households don't have", source: "Swiss Re Institute" },
      { value: "2.8%", label: "Life insurance penetration in India (premium as a share of GDP), FY2023-24", source: "IRDAI Annual Report 2023-24" },
      { value: "10–15×", label: "Annual income: the commonly recommended minimum term cover", source: "Industry rule of thumb" },
      { value: "30 days", label: "Free-look period to return a new policy for a refund", source: "IRDAI (Protection of Policyholders' Interests) Regulations, 2024" },
    ],
    covered: [
      { title: "Death from any cause", text: "Illness, accident or natural causes during the policy term, subject to full and honest disclosure at purchase." },
      { title: "Flexible payouts", text: "Nominees can receive a lump sum, a monthly income, or a mix of both, depending on the plan you choose." },
      { title: "Terminal illness", text: "Many plans pay the sum assured early if you're diagnosed with a terminal illness." },
      { title: "COVID-19 and pandemics", text: "Death due to illness, including pandemics, is covered like any other cause." },
    ],
    notCovered: [
      "Suicide within the first 12 months. The nominee receives at least 80% of the premiums paid, as required by IRDAI.",
      "Claims where health, habits, income or existing policies weren't disclosed at purchase.",
      "Death during hazardous activities or occupations that weren't declared, if the plan excludes them.",
      "Death after the policy term ends, because a pure term plan has no maturity value.",
    ],
    keyTerms: [
      { term: "Sum assured", text: "The amount paid to your nominee. Choose it based on income replacement, loans and goals." },
      { term: "Policy term", text: "How long you're covered. Ideally until your planned retirement age, usually 60–65." },
      { term: "Claim settlement ratio", text: "The share of claims an insurer pays. Look at the last 3–5 years, together with the amount settled ratio." },
      { term: "Section 45 protection", text: "Under the Insurance Act, a claim can't be rejected for misstatement once a policy has run for 3 years, except in proven fraud." },
      { term: "Grace period", text: "30 days to pay a missed premium (15 days for monthly payments) without the cover lapsing." },
      { term: "MWPA policy", text: "A policy under the Married Women's Property Act keeps the payout safe from creditors and ring-fenced for your spouse and children." },
    ],
    addOns: [
      { title: "Accidental death benefit", text: "An additional payout if death is caused by an accident." },
      { title: "Critical illness", text: "A lump sum when you're diagnosed with a listed illness such as cancer, heart attack or stroke." },
      { title: "Waiver of premium", text: "Future premiums are waived after disability or critical illness, and the cover continues." },
      { title: "Accidental disability", text: "Income support if an accident leaves you permanently disabled." },
    ],
    sizing: {
      title: "How much term cover do you need?",
      points: [
        "Start with what your family would spend every year until your retirement age, adjusted for inflation.",
        "Add outstanding loans (home, car, personal) so your family doesn't inherit debt.",
        "Add future goals such as children's education and marriage, at today's cost.",
        "Subtract existing life cover and liquid savings you'd want your family to use.",
        "Check the result against the 10–15× income rule. Insurers also cap cover as a multiple of income that falls with age.",
      ],
      toolCta: true,
    },
    tax: [
      { title: "Section 80C", text: "Premiums are deductible up to ₹1.5 lakh a year under the old tax regime." },
      { title: "Section 10(10D)", text: "The death benefit paid to your nominee is fully tax-free." },
      { title: "GST", text: "Individual life insurance premiums are exempt from GST from 22 September 2025." },
    ],
    checklist: [
      "Buy early. Premiums are locked in for the whole term and rise with age and health changes.",
      "Choose a term that ends around your retirement, not at 85 or 99, unless you have a specific reason.",
      "Disclose everything: smoking, alcohol, medical history, income and other policies.",
      "Compare claim settlement and amount settled ratios over several years, not one.",
      "Add a nominee, and consider an MWPA policy if you're married.",
      "Review your cover after marriage, a child, a new home loan or a big jump in income.",
    ],
    faqs: [
      { question: "Is term insurance a waste of money if I survive the term?", answer: "No. You're paying for protection, the same way you pay for home or car insurance. Because there's no savings component, term plans give the highest cover for the lowest premium. Return-of-premium variants exist but cost much more." },
      { question: "Can I have more than one term policy?", answer: "Yes. You can hold policies from several insurers, as long as you disclose existing cover in each proposal. Your nominee can claim from all of them." },
      { question: "Do I need a medical test?", answer: "Usually, especially for higher covers or older applicants. Tests are typically arranged and paid for by the insurer, and they make claims more secure later." },
      { question: "What happens if I stop paying premiums?", answer: "After the grace period the policy lapses and the cover stops. Most insurers allow you to revive it within a set period, usually with back-premiums and a health declaration." },
    ],
    sources: [IRDAI, { name: "Swiss Re Institute — India protection gap research", url: "https://www.swissre.com/institute/" }, INCOME_TAX],
  },
  {
    slug: "health",
    icon: "HeartPulse",
    name: "Health Insurance",
    eyebrow: "Medical security",
    headline: "Quality treatment, without",
    headlineEmphasis: "draining your savings.",
    intro:
      "A good health policy pays for hospitalisation, surgery and treatment so a medical emergency doesn't become a financial one. With healthcare costs rising faster than incomes, the right sum insured matters as much as having a policy at all.",
    metaDescription:
      "Health insurance in India explained: how much sum insured you need by city, what's covered, waiting periods, IRDAI 2024 rules, and Section 80D tax benefits.",
    image: { src: "/qura-claims-support.png", alt: "A family on a video call with a Qura advisor about their health cover" },
    stats: [
      { value: "~39%", label: "Share of India's health spending paid out of pocket by households, 2021-22", source: "National Health Accounts Estimates, MoHFW" },
      { value: "12–14%", label: "Estimated annual medical cost inflation in India", source: "Industry medical trend surveys" },
      { value: "5 years", label: "Moratorium: after 60 months of continuous cover, claims can't be contested except for fraud", source: "IRDAI Master Circular on Health Insurance, 2024" },
      { value: "1 hour", label: "Target for insurers to decide on cashless authorisation requests", source: "IRDAI Master Circular on Health Insurance, 2024" },
    ],
    covered: [
      { title: "Hospitalisation", text: "Room, ICU, doctor fees, surgery, medicines and diagnostics for stays of 24 hours or more." },
      { title: "Pre and post hospitalisation", text: "Related tests and treatment typically 30–60 days before and 60–180 days after admission." },
      { title: "Day-care procedures", text: "Treatments like cataract surgery, dialysis and chemotherapy that don't need a 24-hour stay." },
      { title: "AYUSH and more", text: "Ayurveda, homeopathy and other AYUSH treatment, ambulance costs, organ donor expenses and home treatment in many plans." },
    ],
    notCovered: [
      "Claims in the first 30 days, except accidents (initial waiting period).",
      "Pre-existing diseases until their waiting period ends, which IRDAI caps at 3 years.",
      "Specific listed illnesses (for example, hernia or cataract) during their waiting period.",
      "Cosmetic treatment, and maternity or OPD unless your plan or an add-on includes them.",
    ],
    keyTerms: [
      { term: "Sum insured", text: "The maximum the policy pays in a year. In a family floater, all members share it." },
      { term: "Room rent limit", text: "A cap on room charges. Picking a costlier room can reduce the whole claim proportionately, so prefer plans with no room rent cap." },
      { term: "Co-payment", text: "The share of each claim you pay yourself, common in senior citizen plans. Lower is better." },
      { term: "Restoration benefit", text: "Refills your sum insured after it's used up within the year, useful for families on a floater." },
      { term: "No-claim bonus", text: "Increases your sum insured, often by 10–50% a year, for every claim-free year." },
      { term: "Super top-up", text: "Extra cover that starts after a deductible. It's a low-cost way to raise total cover above your base policy." },
    ],
    addOns: [
      { title: "Super top-up", text: "Raise total cover to ₹50 lakh or more for a fraction of the cost of a bigger base plan." },
      { title: "Room rent waiver", text: "Removes the room rent cap and proportionate deductions." },
      { title: "Consumables cover", text: "Pays for gloves, PPE kits and other non-medical items that are otherwise excluded." },
      { title: "Maternity and newborn", text: "Covers delivery costs and newborn care, usually after a 2–4 year waiting period." },
    ],
    sizing: {
      title: "How much health cover do you need?",
      points: [
        "Metro cities: at least ₹10 lakh for an individual and ₹15–25 lakh for a family floater.",
        "Tier 2 and tier 3 cities: at least ₹5–10 lakh, more for a family or older members.",
        "Add more if anyone has a pre-existing condition, or as the eldest member gets older.",
        "Insure parents on a separate policy so their claims don't use up your family's cover.",
        "Don't rely only on employer cover. It ends when you change jobs or retire.",
      ],
      toolCta: true,
    },
    tax: [
      { title: "Section 80D: self and family", text: "Up to ₹25,000 a year, or ₹50,000 if you're a senior citizen (old tax regime)." },
      { title: "Section 80D: parents", text: "A further ₹25,000, or ₹50,000 if your parents are senior citizens." },
      { title: "Preventive check-ups", text: "Up to ₹5,000 for health check-ups, within the overall 80D limit." },
      { title: "GST", text: "Individual health insurance premiums are exempt from GST from 22 September 2025." },
    ],
    checklist: [
      "Prefer plans with no room rent cap and no co-payment for members under 60.",
      "Check that hospitals near you are in the insurer's cashless network.",
      "Compare waiting periods for pre-existing and specific diseases.",
      "Look for restoration and a no-claim bonus that doesn't reduce after a claim.",
      "Disclose every existing condition. The 5-year moratorium protects honest policyholders.",
      "Port to a better insurer at renewal if needed. Your waiting period credit carries over.",
    ],
    faqs: [
      { question: "I have health cover from my employer. Do I need my own policy?", answer: "Yes. Group cover usually ends when you leave the job, and buying later means new waiting periods and higher premiums. Your own policy gives continuous protection, and you can use both for a large claim." },
      { question: "Family floater or individual policies?", answer: "A floater is cost-effective for young families because members share one sum insured. Older members, especially parents, are better on separate policies so one large claim doesn't exhaust everyone's cover." },
      { question: "Is there an age limit to buy health insurance?", answer: "No. Since April 2024 IRDAI has removed the upper age limit for buying a new health policy, though premiums, waiting periods and co-pays are higher for older buyers." },
      { question: "What is portability?", answer: "You can move your policy to another insurer at renewal and keep the waiting period you've already served, for the same sum insured." },
    ],
    sources: [
      IRDAI,
      { name: "National Health Accounts Estimates for India — Ministry of Health & Family Welfare", url: "https://mohfw.gov.in" },
      INCOME_TAX,
    ],
  },
  {
    slug: "corporate",
    icon: "Building2",
    name: "Corporate Plans",
    eyebrow: "Employee wellbeing",
    headline: "Benefits your team values,",
    headlineEmphasis: "made simple to run.",
    intro:
      "Group insurance helps companies of every size attract and keep good people. We design group health, life and accident cover around your workforce and budget, then help with onboarding, renewals and claims.",
    metaDescription:
      "Group health, group term life and group accident insurance for Indian businesses: what to cover, plan design, tax treatment, and how to manage renewals.",
    image: { src: "/qura-advisor-consultation.png", alt: "A Qura advisor reviewing a benefits plan with clients" },
    stats: [
      { value: "Day 1", label: "Pre-existing diseases and maternity can be covered from the start, with no waiting periods", source: "Typical group health policy terms" },
      { value: "₹7 lakh", label: "Maximum EDLI life cover for EPF members, often well below what families need", source: "EPFO — EDLI Scheme" },
      { value: "18%", label: "GST on group insurance premiums. Individual policies are exempt from 22 September 2025", source: "GST Council, 56th meeting" },
      { value: "₹21,000", label: "Monthly wage threshold for mandatory ESIC coverage in covered establishments", source: "ESIC" },
    ],
    covered: [
      { title: "Group health (GMC)", text: "Hospitalisation cover for employees, with options for spouse, children and parents." },
      { title: "Group term life (GTL)", text: "Life cover as a flat amount or a multiple of salary, paid to the employee's nominee." },
      { title: "Group personal accident (GPA)", text: "Payouts for accidental death and permanent or temporary disability, around the clock." },
      { title: "Wellness and OPD", text: "Teleconsultations, outpatient cover, health check-ups and mental health support." },
    ],
    notCovered: [
      "Cover usually ends when an employee leaves, unless the policy offers a conversion option.",
      "Exclusions such as cosmetic treatment still apply, as in individual plans.",
      "Enhancements like maternity or parental cover must be built into the plan design.",
      "A high claims ratio can raise premiums sharply at renewal.",
    ],
    keyTerms: [
      { term: "Family definition", text: "Who is covered: employee only, or with spouse, children and parents (for example, E+S+2C+2P)." },
      { term: "Grade-based sum insured", text: "Different cover levels by role or salary band, or one flat amount for everyone." },
      { term: "Corporate buffer", text: "A shared pool of extra cover the employer can release for serious or high-cost claims." },
      { term: "Claims ratio", text: "Claims paid as a share of premium. It's the biggest factor in your renewal pricing." },
      { term: "TPA", text: "The third-party administrator that handles cashless approvals and reimbursements for employees." },
      { term: "Voluntary top-up", text: "Extra cover employees can buy for themselves or parents at group rates." },
    ],
    addOns: [
      { title: "Parental cover", text: "Often the most valued benefit, usually with a co-pay or sub-limits to manage cost." },
      { title: "Maternity benefit", text: "Delivery and newborn cover from day one, often a fixed amount per delivery." },
      { title: "Room rent flexibility", text: "Higher room limits or none at all, so employees aren't hit with proportionate deductions." },
      { title: "Group critical illness", text: "A lump sum on diagnosis of a listed critical illness, alongside the health cover." },
    ],
    sizing: {
      title: "How we design your plan",
      points: [
        "Understand your team: headcount, age mix, locations, families and current benefits.",
        "Set the core: sum insured, family definition, room rent and maternity terms.",
        "Add life and accident cover, often as a multiple of annual CTC.",
        "Get quotes from several insurers and compare price, terms and claims service.",
        "Onboard employees digitally, issue e-cards, and support claims and renewals all year.",
      ],
    },
    tax: [
      { title: "For the employer", text: "Group insurance premiums are generally deductible as a business expense under Section 37(1)." },
      { title: "For employees", text: "Employer-paid group health premiums are generally not treated as a taxable perquisite." },
      { title: "GST", text: "Group policies attract 18% GST, which registered businesses may be able to claim as input tax credit, subject to GST rules." },
    ],
    checklist: [
      "Include parents if you can. It's one of the most valued benefits for Indian employees.",
      "Avoid tight room rent caps. They cause more employee complaints than anything else.",
      "Keep a corporate buffer for serious illnesses.",
      "Track claims through the year so renewal pricing isn't a surprise.",
      "Explain the benefits clearly to employees with a short guide and a contact for claims.",
      "Review the plan every year as your team grows and changes.",
    ],
    faqs: [
      { question: "What's the minimum team size for group insurance?", answer: "Many insurers offer group plans for teams as small as 7–10 employees. Terms and pricing improve as the group grows." },
      { question: "Can employees add parents or increase their cover?", answer: "Yes. Parents can be part of the core plan or added as a voluntary benefit, and employees can buy top-ups at group rates, often through payroll deduction." },
      { question: "What happens to cover when an employee leaves?", answer: "Group cover usually ends on exit. Some insurers let employees convert to an individual policy with continuity benefits, which we can help arrange." },
      { question: "How are renewal premiums decided?", answer: "Mostly by your claims ratio, along with headcount, age mix and medical inflation. Managing claims and plan design through the year keeps renewals predictable." },
    ],
    sources: [
      IRDAI,
      { name: "EPFO — Employees' Deposit Linked Insurance Scheme", url: "https://www.epfindia.gov.in" },
      { name: "ESIC — Employees' State Insurance Corporation", url: "https://www.esic.gov.in" },
      { name: "GST Council", url: "https://gstcouncil.gov.in" },
    ],
  },
  {
    slug: "motor",
    icon: "Car",
    name: "Motor Insurance",
    eyebrow: "Vehicle protection",
    headline: "Drive with cover that",
    headlineEmphasis: "actually pays out.",
    intro:
      "Motor insurance protects you against damage to your car or two-wheeler, theft, and your legal liability to others on the road. Third-party cover is mandatory in India. A comprehensive policy with the right add-ons protects your own vehicle too.",
    metaDescription:
      "Car and two-wheeler insurance in India explained: third-party vs comprehensive, IDV, no-claim bonus, zero depreciation and other add-ons, and how to claim.",
    image: { src: "/qura-plan-motor-car.jpg", alt: "A man standing through the sunroof of his SUV on a hill road" },
    stats: [
      { value: "Mandatory", label: "Third-party cover for every vehicle on a public road. Driving uninsured can mean a ₹2,000 fine and/or up to 3 months in jail, more for repeat offences", source: "Motor Vehicles Act, 1988 (amended 2019)" },
      { value: "3 / 5 yrs", label: "Long-term third-party cover required when buying a new car / two-wheeler", source: "Supreme Court order, effective September 2018" },
      { value: "₹15 lakh", label: "Compulsory personal accident cover for the owner-driver", source: "IRDAI" },
      { value: "Up to 50%", label: "No-claim bonus discount on own-damage premium after 5 claim-free years", source: "Indian Motor Tariff NCB slabs" },
    ],
    covered: [
      { title: "Third-party liability", text: "Unlimited cover for death or injury to others, and up to ₹7.5 lakh for damage to their property." },
      { title: "Own damage", text: "Repairs after accidents, fire, explosion, self-ignition, riots and natural disasters like floods and cyclones (comprehensive plans)." },
      { title: "Theft", text: "The vehicle's insured declared value (IDV) is paid if it's stolen and not recovered." },
      { title: "Personal accident", text: "₹15 lakh cover for the owner-driver, with optional cover for passengers and paid drivers." },
    ],
    notCovered: [
      "Driving under the influence of alcohol or drugs, or without a valid licence.",
      "Normal wear and tear, and mechanical or electrical breakdown.",
      "Engine damage from driving through water, unless you have an engine protection add-on.",
      "Using a private vehicle commercially, such as for ride-hailing, unless declared.",
    ],
    keyTerms: [
      { term: "Third-party vs comprehensive", text: "Third-party covers only damage you cause to others. Comprehensive adds own damage and theft, and is what most owners should buy." },
      { term: "IDV", text: "Insured declared value: roughly the vehicle's current market value, and the maximum paid for total loss or theft. Don't lower it just to cut premium." },
      { term: "IDV depreciation", text: "Ex-showroom price less 5% (under 6 months), 15% (up to 1 year), 20%, 30%, 40% and 50% (4–5 years). Older vehicles are valued by agreement." },
      { term: "No-claim bonus (NCB)", text: "20%, 25%, 35%, 45% and 50% off own-damage premium for 1 to 5 claim-free years. It belongs to you, not the car, and transfers to your next vehicle." },
      { term: "Compulsory deductible", text: "A fixed amount you pay on each own-damage claim, typically ₹1,000–₹2,000 for private cars depending on engine size." },
      { term: "Cashless garage", text: "A network garage where the insurer settles the bill directly. You pay only deductibles and items not covered." },
    ],
    addOns: [
      { title: "Zero depreciation", text: "Pays the full cost of replaced parts with no deduction for depreciation on plastic, rubber and metal. Best for vehicles up to about 5 years old." },
      { title: "Engine protection", text: "Covers engine and gearbox damage from water ingress or oil leakage, which is essential in flood-prone cities." },
      { title: "Return to invoice", text: "Pays the full invoice value, including road tax and registration, if the vehicle is stolen or written off." },
      { title: "NCB protector and roadside assistance", text: "Keep your no-claim bonus after a small claim, and get towing, battery jump-starts and flat-tyre help 24×7." },
    ],
    sizing: {
      title: "How to choose the right motor cover",
      points: [
        "Buy comprehensive cover unless the vehicle is very old or low value. Third-party alone won't pay for your own repairs.",
        "Set the IDV close to the real market value so a total loss or theft is fully paid.",
        "Add zero depreciation for new and newer vehicles, and engine protection if you live where roads flood.",
        "Carry your no-claim bonus over when you switch insurer or buy a new vehicle. It's valid for 90 days after your policy expires.",
        "Renew before expiry. A lapsed policy may need an inspection, and you can lose your NCB.",
      ],
    },
    tax: [
      { title: "Personal vehicles", text: "Premiums for privately used vehicles aren't tax-deductible." },
      { title: "Business vehicles", text: "Premiums for vehicles used in your business are generally deductible as a business expense." },
      { title: "GST", text: "Motor insurance premiums attract 18% GST. The 2025 exemption applies only to individual life and health policies." },
    ],
    checklist: [
      "Compare the insurer's cashless garage network near your home and workplace.",
      "Check the IDV offered. A low premium often means a low IDV.",
      "Choose add-ons for your vehicle's age and where you drive, not every add-on on the list.",
      "Declare CNG kits, modifications and accessories so they're covered.",
      "Keep your policy, RC and licence handy, digitally on DigiLocker or mParivahan.",
      "Report accidents and theft to the insurer promptly, and file an FIR for theft or third-party injury.",
    ],
    faqs: [
      { question: "Is third-party insurance enough?", answer: "It meets the legal requirement, but it pays nothing towards your own vehicle. For most cars and two-wheelers, a comprehensive policy is worth the extra premium." },
      { question: "Will a small claim affect my premium?", answer: "Any own-damage claim resets your no-claim bonus at renewal unless you have an NCB protector. For minor scratches, paying yourself can work out cheaper." },
      { question: "Can I transfer my NCB to a new car?", answer: "Yes. The NCB belongs to you, so you can carry it to a new vehicle of the same class by getting an NCB retention letter when you sell the old one." },
      { question: "What should I do after an accident?", answer: "Make sure everyone is safe, take photos, and inform your insurer immediately. File an FIR if anyone is injured or another vehicle is involved, and don't move the vehicle for repairs before the insurer approves." },
    ],
    sources: [
      IRDAI,
      { name: "Ministry of Road Transport & Highways — Motor Vehicles Act", url: "https://morth.nic.in" },
      { name: "GST Council", url: "https://gstcouncil.gov.in" },
    ],
  },
];

export const getInsuranceProduct = (slug: string) => INSURANCE_PRODUCTS.find((p) => p.slug === slug);
