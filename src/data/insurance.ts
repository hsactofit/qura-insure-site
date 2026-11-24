// Content for the /insurance/[slug] product pages.
// Figures reflect Indian regulations and published data as of 2025-26; review
// them whenever IRDAI, tax or GST rules change.

export type InsuranceStat = { value: string; label: string; source: string };
export type InsuranceFaq = { question: string; answer: string };
export type InsuranceSource = { name: string; url: string };

export type InsuranceProduct = {
  slug: "term-life" | "health" | "corporate" | "motor" | "home" | "travel" | "business" | "cyber" | "personal-accident";
  icon: "ShieldCheck" | "HeartPulse" | "Building2" | "Car" | "House" | "Plane" | "Briefcase" | "LockKeyhole" | "Ambulance";
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
  {
    slug: "home",
    icon: "House",
    name: "Home Insurance",
    eyebrow: "Property protection",
    headline: "The home you built,",
    headlineEmphasis: "protected properly.",
    intro:
      "Home insurance pays to repair or rebuild your house and replace your belongings after fire, floods, earthquakes, burglary and other events. Whether you own or rent, it protects what is often a family's biggest asset for a small yearly premium.",
    metaDescription:
      "Home insurance in India explained: Bharat Griha Raksha, building vs contents cover, what's covered, how to set the sum insured, and add-ons for valuables.",
    image: { src: "/qura-plan-home-family.jpg", alt: "A multi-generation family together outside their home" },
    stats: [
      { value: "Apr 2021", label: "Bharat Griha Raksha became the standard home policy every general insurer must offer", source: "IRDAI" },
      { value: "20%", label: "Of the building sum insured, up to ₹10 lakh, covers general contents in Bharat Griha Raksha without a list of items", source: "IRDAI — Bharat Griha Raksha policy wording" },
      { value: "Owners & tenants", label: "Owners can insure building and contents. Tenants can insure just their contents", source: "Typical home policy terms" },
      { value: "Multi-year", label: "Policies can be bought for several years at once, locking in the premium", source: "Typical home policy terms" },
    ],
    covered: [
      { title: "Fire and allied perils", text: "Fire, lightning, explosion, aircraft damage, riots and malicious damage." },
      { title: "Natural disasters", text: "Earthquake, flood, storm, cyclone, landslide and subsidence." },
      { title: "Contents", text: "Furniture, appliances, electronics and other household items, with jewellery and valuables covered if declared." },
      { title: "Burglary and theft", text: "Loss of contents from break-ins, usually as an add-on to the base policy." },
    ],
    notCovered: [
      "Wear and tear, gradual deterioration and poor maintenance.",
      "Damage while the home has been left unoccupied for a long period, beyond the limit in your policy.",
      "Jewellery, art and cash unless specifically declared and covered.",
      "Losses from war, nuclear risk or intentional damage.",
    ],
    keyTerms: [
      { term: "Building cover", text: "Pays to repair or rebuild the structure. Based on construction cost, not market value, so land isn't included." },
      { term: "Contents cover", text: "Pays to repair or replace household items and personal belongings." },
      { term: "Reinstatement value", text: "The cost of rebuilding at today's prices. Insuring for this avoids a reduced payout." },
      { term: "Under-insurance", text: "If the sum insured is lower than the real value, claims may be paid only in proportion." },
      { term: "Rent for alternative accommodation", text: "Pays your rent while your home is being repaired after an insured loss." },
      { term: "Valuables schedule", text: "A list of declared high-value items like jewellery or art, each with its own sum insured." },
    ],
    addOns: [
      { title: "Burglary and theft", text: "Covers loss of contents from break-ins and theft." },
      { title: "Jewellery and valuables", text: "Covers declared items, sometimes outside the home as well." },
      { title: "Portable electronics", text: "Laptops, phones and cameras against accidental damage and theft." },
      { title: "Public liability", text: "Covers your legal liability if a visitor is injured or a neighbour's property is damaged." },
    ],
    sizing: {
      title: "How much home cover do you need?",
      points: [
        "Insure the building for its rebuilding cost: built-up area multiplied by the current construction cost per square foot.",
        "Don't use market value. It includes land, which can't be destroyed.",
        "List your contents room by room and add up their replacement cost.",
        "Declare jewellery, art and other valuables separately, with bills or valuations.",
        "Review the sum insured after renovations, extensions or big purchases.",
      ],
    },
    tax: [
      { title: "Self-occupied homes", text: "Home insurance premiums for your own home aren't tax-deductible." },
      { title: "Let-out property", text: "Premiums are covered by the 30% standard deduction on rental income, not claimed separately." },
      { title: "GST", text: "Home insurance premiums attract 18% GST." },
    ],
    checklist: [
      "Insure the building for rebuilding cost, not market value.",
      "Check that earthquake and flood are included if you live in a high-risk zone.",
      "Declare valuables with bills or valuations so claims aren't disputed.",
      "Keep photos and receipts of major items stored safely online.",
      "If you have a home loan, check whether the lender's policy covers contents. Most cover only the building.",
      "Renew before expiry and update the sum insured as costs rise.",
    ],
    faqs: [
      { question: "My bank already insured my home. Is that enough?", answer: "Usually not. Lender policies typically cover only the building, up to the loan amount, and protect the bank first. You'll still need cover for contents and for the full rebuilding cost." },
      { question: "Can tenants buy home insurance?", answer: "Yes. Tenants can insure their own contents and valuables, even though the building belongs to the landlord." },
      { question: "Is my house covered for earthquakes and floods?", answer: "Standard policies like Bharat Griha Raksha include earthquake, flood, storm and landslide. Always check the policy wording for your plan." },
      { question: "How are claims settled?", answer: "Report the loss to the insurer quickly, file an FIR for theft or burglary, and keep the damaged items for the surveyor. The insurer assesses the loss and pays for repair or replacement, minus any excess." },
    ],
    sources: [IRDAI, INCOME_TAX, { name: "GST Council", url: "https://gstcouncil.gov.in" }],
  },
  {
    slug: "travel",
    icon: "Plane",
    name: "Travel Insurance",
    eyebrow: "Trip protection",
    headline: "Travel far, knowing",
    headlineEmphasis: "you're covered.",
    intro:
      "Travel insurance covers medical emergencies, trip cancellations, lost baggage and other problems while you're away. Treatment abroad can cost many times more than in India, and some countries require cover before they issue a visa.",
    metaDescription:
      "Travel insurance for Indians explained: medical cover abroad, Schengen visa requirements, trip cancellation, baggage, single vs multi-trip, and what's excluded.",
    image: { src: "/qura-plan-travel-station.jpg", alt: "Passengers with luggage on a railway platform in India" },
    stats: [
      { value: "€30,000", label: "Minimum medical cover required for a Schengen visa", source: "EU Visa Code" },
      { value: "24×7", label: "Emergency assistance helpline offered with international travel policies", source: "Typical travel policy terms" },
      { value: "Single / annual", label: "Buy cover for one trip, or an annual multi-trip plan if you travel often", source: "Typical travel policy terms" },
      { value: "18%", label: "GST on travel insurance premiums", source: "GST Council" },
    ],
    covered: [
      { title: "Medical emergencies", text: "Hospitalisation, treatment and emergency dental care for illness or injury during the trip." },
      { title: "Emergency evacuation", text: "Medical evacuation and, if needed, repatriation to India." },
      { title: "Trip problems", text: "Cancellation, interruption, missed connections and flight delays, as listed in your plan." },
      { title: "Baggage and documents", text: "Lost or delayed checked baggage and the cost of replacing a lost passport." },
    ],
    notCovered: [
      "Pre-existing conditions, unless the plan covers them or for life-threatening emergencies only.",
      "Adventure sports such as scuba diving or skiing, unless you've added cover for them.",
      "Incidents under the influence of alcohol or drugs.",
      "Travelling against medical advice, or to get treatment abroad.",
    ],
    keyTerms: [
      { term: "Sum insured", text: "The maximum medical payout. Choose higher cover for countries like the US and Canada." },
      { term: "Cashless hospitalisation", text: "The insurer's assistance partner pays the hospital directly, so you don't have to pay upfront." },
      { term: "Deductible", text: "The amount you pay before the insurer pays, applied to each claim in many plans." },
      { term: "Trip cancellation", text: "Refunds non-refundable bookings if you cancel for a covered reason, such as illness or a family emergency." },
      { term: "Single-trip vs multi-trip", text: "Single-trip covers one journey. Multi-trip covers every trip in a year, with a maximum length for each trip." },
      { term: "Personal liability", text: "Covers your legal liability if you accidentally injure someone or damage their property abroad." },
    ],
    addOns: [
      { title: "Adventure sports", text: "Covers injuries from listed activities like skiing, trekking or scuba diving." },
      { title: "Pre-existing conditions", text: "Extends cover to known conditions, sometimes up to a limit." },
      { title: "Home burglary while away", text: "Covers your home in India while you're travelling." },
      { title: "Student and senior plans", text: "Plans built for long stays abroad or for travellers over 60." },
    ],
    sizing: {
      title: "How to choose the right travel cover",
      points: [
        "Pick a medical sum insured that matches your destination: higher for the US, Canada and Europe.",
        "Check the visa requirements for your destination, such as the €30,000 minimum for Schengen countries.",
        "Cover the full length of your trip, including any extensions.",
        "Add trip cancellation if you've paid for expensive non-refundable bookings.",
        "Consider an annual multi-trip plan if you travel abroad more than two or three times a year.",
      ],
    },
    tax: [
      { title: "Personal travel", text: "Premiums for personal trips aren't tax-deductible." },
      { title: "Business travel", text: "Premiums for business trips are generally deductible as a business expense." },
      { title: "GST", text: "Travel insurance premiums attract 18% GST." },
    ],
    checklist: [
      "Buy cover as soon as you book, so trip cancellation applies from the start.",
      "Disclose pre-existing conditions and check how they're covered.",
      "Save the insurer's emergency helpline number and policy number on your phone.",
      "Carry a printed or digital copy of the policy, as visa officers may ask for it.",
      "Keep receipts, medical reports and airline letters for any claim.",
      "Check that planned activities like trekking or skiing are covered.",
    ],
    faqs: [
      { question: "Is travel insurance mandatory?", answer: "For some destinations, yes. Schengen countries require at least €30,000 of medical cover for a visa, and several other countries require proof of insurance. Even where it isn't required, it's strongly recommended." },
      { question: "Does my health policy cover me abroad?", answer: "Most Indian health policies cover treatment only in India. Some premium plans include global cover, but often only for planned treatment or with limits, so check before relying on it." },
      { question: "Do I need travel insurance for trips within India?", answer: "It's optional. Domestic travel plans cover trip cancellation, baggage and accidents, which can be useful for expensive or long trips." },
      { question: "How do I claim when I'm abroad?", answer: "Call the insurer's 24×7 assistance number first. They can arrange cashless treatment at a network hospital, or guide you on documents for a reimbursement claim." },
    ],
    sources: [
      IRDAI,
      { name: "European Commission — Schengen visa requirements", url: "https://home-affairs.ec.europa.eu" },
      { name: "GST Council", url: "https://gstcouncil.gov.in" },
    ],
  },
  {
    slug: "business",
    icon: "Briefcase",
    name: "Business Insurance",
    eyebrow: "Business continuity",
    headline: "Keep your business running,",
    headlineEmphasis: "whatever happens.",
    intro:
      "Business insurance protects your premises, stock, machinery and income, and your liability to customers, employees and the public. We help shops, offices, factories and professional firms build cover that fits how they actually operate.",
    metaDescription:
      "Business insurance in India: fire and property cover, Bharat Sookshma and Laghu Udyam Suraksha, business interruption, liability, and how to build the right package.",
    image: { src: "/qura-plan-business-kirana.jpg", alt: "Shopkeepers at the counter of a neighbourhood kirana store" },
    stats: [
      { value: "₹5 crore", label: "Maximum sum insured for Bharat Sookshma Udyam Suraksha, the standard policy for micro enterprises", source: "IRDAI" },
      { value: "₹5–50 crore", label: "Sum insured range for Bharat Laghu Udyam Suraksha, the standard policy for small enterprises", source: "IRDAI" },
      { value: "Mandatory", label: "Public liability insurance for businesses handling hazardous substances", source: "Public Liability Insurance Act, 1991" },
      { value: "18%", label: "GST on business insurance premiums, usually claimable as input tax credit", source: "GST Council" },
    ],
    covered: [
      { title: "Property", text: "Buildings, plant, machinery, stock, furniture and fittings against fire, natural disasters and other perils." },
      { title: "Business interruption", text: "Lost profit and fixed costs while you recover from an insured property loss." },
      { title: "Liability", text: "Claims from customers, visitors or the public for injury or property damage, and product liability." },
      { title: "Money and theft", text: "Cash in transit and on the premises, burglary, and employee dishonesty (fidelity)." },
    ],
    notCovered: [
      "Gradual wear and tear, and machinery breakdown unless you add cover for it.",
      "Losses from stock or assets you didn't declare, or that are under-insured.",
      "Contractual liabilities you accepted beyond what the law requires.",
      "Fines, penalties and deliberate acts.",
    ],
    keyTerms: [
      { term: "Fire and special perils", text: "The core property policy for businesses, covering fire, natural disasters, riots and more." },
      { term: "Business interruption", text: "Also called consequential loss. It pays lost profit after an insured property loss." },
      { term: "Indemnity period", text: "How long business interruption cover pays while you get back to normal, for example 6 or 12 months." },
      { term: "Declaration policy", text: "For stock that changes in value. You declare levels monthly and pay premium on the average." },
      { term: "Professional indemnity", text: "Covers claims of negligence or errors in the professional services you provide." },
      { term: "Employees' compensation", text: "Covers your liability for employee injury or death at work under the Employees' Compensation Act, 1923." },
    ],
    addOns: [
      { title: "Machinery breakdown", text: "Repairs or replaces critical machinery after sudden breakdown." },
      { title: "Marine cargo", text: "Protects goods in transit by road, rail, sea or air." },
      { title: "Directors' and officers' liability", text: "Protects directors' personal assets from claims about their management decisions." },
      { title: "Cyber cover", text: "Covers data breaches, ransomware and business email fraud." },
    ],
    sizing: {
      title: "How we build your business cover",
      points: [
        "Understand your business: premises, assets, stock, revenue, contracts and risks.",
        "Value assets at replacement cost, and stock at its highest likely level or on a declaration basis.",
        "Estimate how long recovery would take to set the business interruption cover.",
        "Add the liability covers your contracts, clients and regulators require.",
        "Compare quotes across insurers, then review cover every year as the business grows.",
      ],
    },
    tax: [
      { title: "Business expense", text: "Premiums are generally deductible as a business expense under Section 37(1)." },
      { title: "GST", text: "Premiums attract 18% GST, which registered businesses can usually claim as input tax credit, subject to GST rules." },
    ],
    checklist: [
      "Insure assets at replacement cost so claims aren't reduced for under-insurance.",
      "Include business interruption. Many businesses fail after a fire because of lost income, not the damage itself.",
      "Declare all locations, including warehouses and stock held elsewhere.",
      "Check client contracts for the insurance they require.",
      "Keep stock records and asset registers up to date and stored off-site.",
      "Review cover every year and when you add premises or major assets.",
    ],
    faqs: [
      { question: "Which policy does a small business need first?", answer: "Most start with a property policy covering fire and natural disasters, plus burglary. Add business interruption and liability cover based on your size, contracts and risks." },
      { question: "What are Bharat Sookshma and Laghu Udyam Suraksha?", answer: "They're standard property policies introduced by IRDAI in 2021 for micro and small enterprises. They make it easier to compare cover across insurers." },
      { question: "Do I need insurance for my employees?", answer: "Employers can be liable under the Employees' Compensation Act for work-related injuries. An employees' compensation policy covers this, and group health cover is a valued extra benefit." },
      { question: "Can I get one policy for everything?", answer: "Many insurers offer packaged policies for shops, offices and SMEs that combine property, burglary, money and liability cover in one place." },
    ],
    sources: [
      IRDAI,
      { name: "Ministry of Environment — Public Liability Insurance Act, 1991", url: "https://moef.gov.in" },
      { name: "GST Council", url: "https://gstcouncil.gov.in" },
    ],
  },
  {
    slug: "cyber",
    icon: "LockKeyhole",
    name: "Cyber Insurance",
    eyebrow: "Digital protection",
    headline: "Your money and data,",
    headlineEmphasis: "safe online.",
    intro:
      "Cyber insurance covers financial loss from online fraud, identity theft, data breaches and ransomware. Individual plans protect your bank accounts, UPI and cards. Business plans pay for breach response, legal costs and lost income.",
    metaDescription:
      "Cyber insurance in India for individuals and businesses: online fraud, identity theft, ransomware, data breach costs, the DPDP Act, and how to claim.",
    image: { src: "/qura-plan-cyber-phone.jpg", alt: "A young man using his smartphone on a metro train" },
    stats: [
      { value: "1930", label: "National cyber crime helpline for reporting online financial fraud", source: "Ministry of Home Affairs — I4C" },
      { value: "6 hours", label: "Deadline for organisations to report specified cyber incidents to CERT-In", source: "CERT-In Directions, April 2022" },
      { value: "₹250 crore", label: "Maximum penalty for failing to protect personal data", source: "Digital Personal Data Protection Act, 2023" },
      { value: "3 days", label: "Report an unauthorised electronic transaction to your bank within 3 working days to limit your liability", source: "RBI circular on customer liability, 2017" },
    ],
    covered: [
      { title: "Online financial fraud", text: "Unauthorised transactions from your bank account, cards, UPI or e-wallets." },
      { title: "Identity theft", text: "Costs to restore your identity and records, and legal costs after misuse of your personal data." },
      { title: "Cyber extortion and ransomware", text: "Response costs and, where the law allows, ransom demands after an attack." },
      { title: "Data breach response", text: "For businesses: forensics, customer notification, legal advice and liability claims." },
    ],
    notCovered: [
      "Losses where you knowingly shared your OTP, PIN or password, in many policies.",
      "Losses you don't report to the police, your bank and the insurer within the time limits.",
      "Fixing security weaknesses or upgrading systems after an incident.",
      "Losses from incidents that started before the policy began.",
    ],
    keyTerms: [
      { term: "First-party cover", text: "Your own losses, such as stolen money, recovery costs and lost income." },
      { term: "Third-party cover", text: "Claims against you from others, such as customers whose data was leaked." },
      { term: "Phishing and spoofing", text: "Fake emails, messages or websites designed to trick you into sharing details or sending money." },
      { term: "Social media cover", text: "Legal costs to deal with cyber bullying, stalking or defamation online." },
      { term: "Waiting period", text: "Some plans don't cover incidents in the first few days after purchase." },
      { term: "Sub-limit", text: "A lower limit for a particular type of loss within the overall sum insured." },
    ],
    addOns: [
      { title: "Family cover", text: "Extends protection to your spouse, children and parents." },
      { title: "Counselling support", text: "Pays for psychological counselling after cyber bullying or identity theft." },
      { title: "Business interruption", text: "For businesses: lost income while systems are down after an attack." },
      { title: "Social engineering fraud", text: "For businesses: payments made to fraudsters impersonating suppliers or executives." },
    ],
    sizing: {
      title: "How much cyber cover do you need?",
      points: [
        "For individuals, start with the balance you typically keep across bank accounts, cards and wallets.",
        "Add more if you handle large transactions online or manage accounts for family members.",
        "For businesses, estimate breach response costs and the income you'd lose per day of downtime.",
        "Consider the number of customer records you hold and your obligations under the DPDP Act.",
        "Check sub-limits for the risks that matter most to you, such as UPI fraud or ransomware.",
      ],
    },
    tax: [
      { title: "Individuals", text: "Premiums for personal cyber cover aren't tax-deductible." },
      { title: "Businesses", text: "Premiums are generally deductible as a business expense under Section 37(1)." },
      { title: "GST", text: "Cyber insurance premiums attract 18% GST." },
    ],
    checklist: [
      "Report fraud immediately to 1930 or cybercrime.gov.in, and to your bank.",
      "Check that UPI and e-wallet fraud are covered, not just cards and net banking.",
      "Look at sub-limits for each type of loss, not just the headline sum insured.",
      "Turn on two-factor authentication and keep devices updated. Some policies require it.",
      "For businesses, keep offline backups and an incident response plan.",
      "Keep records of every report, complaint number and bank communication for your claim.",
    ],
    faqs: [
      { question: "Won't my bank refund fraudulent transactions?", answer: "Under RBI rules, your liability is zero if a fraud is due to the bank's fault, or a third-party breach reported within 3 working days. Delays, or fraud where you shared details, can leave you bearing the loss. Cyber insurance helps cover those gaps." },
      { question: "Is cyber insurance only for businesses?", answer: "No. Individual and family cyber plans are widely available and affordable. They cover online fraud, identity theft and cyber bullying." },
      { question: "Does it cover UPI fraud?", answer: "Many individual plans do. Check the wording for UPI and e-wallet cover, and any sub-limit on it." },
      { question: "What should I do if I'm a victim?", answer: "Call 1930 or report on cybercrime.gov.in straight away, inform your bank to block cards and accounts, file a police complaint, and then notify your insurer with the reference numbers." },
    ],
    sources: [
      IRDAI,
      { name: "National Cyber Crime Reporting Portal", url: "https://cybercrime.gov.in" },
      { name: "CERT-In — Indian Computer Emergency Response Team", url: "https://www.cert-in.org.in" },
      { name: "MeitY — Digital Personal Data Protection Act, 2023", url: "https://www.meity.gov.in" },
      { name: "Reserve Bank of India", url: "https://www.rbi.org.in" },
    ],
  },
  {
    slug: "personal-accident",
    icon: "Ambulance",
    name: "Personal Accident Insurance",
    eyebrow: "Accident protection",
    headline: "When accidents happen,",
    headlineEmphasis: "your income doesn't stop.",
    intro:
      "Personal accident insurance pays a lump sum if an accident causes death or disability, and a weekly benefit if you can't work for a while. It's low-cost cover that works alongside your health and term life policies.",
    metaDescription:
      "Personal accident insurance in India explained: accidental death, permanent and temporary disability, Saral Suraksha Bima, PMSBY, and how much cover you need.",
    image: { src: "/qura-plan-accident-rider.jpg", alt: "A rider in a helmet and gloves on a motorcycle" },
    stats: [
      { value: "1.68 lakh", label: "Deaths from road accidents in India in 2022", source: "MoRTH — Road Accidents in India 2022" },
      { value: "₹2.5L–₹1Cr", label: "Sum insured range for Saral Suraksha Bima, the standard personal accident policy", source: "IRDAI" },
      { value: "₹20 / year", label: "Premium for ₹2 lakh of accidental death cover under PMSBY, for ages 18–70", source: "Pradhan Mantri Suraksha Bima Yojana" },
      { value: "Worldwide", label: "Most personal accident policies cover accidents anywhere, at any time", source: "Typical policy terms" },
    ],
    covered: [
      { title: "Accidental death", text: "100% of the sum insured is paid to your nominee." },
      { title: "Permanent total disability", text: "A lump sum if an accident leaves you permanently unable to work, such as losing both eyes or limbs." },
      { title: "Permanent partial disability", text: "A percentage of the sum insured for partial disabilities, as listed in the policy." },
      { title: "Temporary total disability", text: "A weekly benefit while an accident keeps you from working, in plans that include it." },
    ],
    notCovered: [
      "Death or disability from illness. That's what term and health insurance are for.",
      "Self-inflicted injury, and accidents under the influence of alcohol or drugs.",
      "Hazardous sports and activities, unless declared and covered.",
      "Accidents while committing a crime, and war or nuclear risks.",
    ],
    keyTerms: [
      { term: "Sum insured", text: "The amount paid for accidental death. Disability payouts are a percentage of it." },
      { term: "Disability table", text: "The schedule in the policy that sets how much is paid for each type of disability." },
      { term: "Weekly benefit", text: "A fixed amount paid each week during temporary total disability, up to a maximum number of weeks." },
      { term: "Occupation class", text: "Your job's risk level, which affects premium and cover." },
      { term: "Cumulative bonus", text: "An increase in sum insured for each claim-free year, in some plans." },
      { term: "Education benefit", text: "An extra payout for children's education after accidental death or permanent disability." },
    ],
    addOns: [
      { title: "Accidental hospitalisation", text: "Pays medical bills for treatment after an accident." },
      { title: "Loan protector", text: "Pays outstanding EMIs after accidental death or disability." },
      { title: "Family cover", text: "Extends cover to your spouse and children." },
      { title: "Adventure sports", text: "Extends cover to declared adventure activities." },
    ],
    sizing: {
      title: "How much accident cover do you need?",
      points: [
        "Start with enough to replace your income for several years if you couldn't work again.",
        "Add outstanding loans so your family isn't left with debt.",
        "Include a weekly benefit if you're self-employed or have no paid sick leave.",
        "Check any accident cover you already have through your employer, credit card or PMSBY.",
        "Insurers usually cap cover as a multiple of income, so disclose your income accurately.",
      ],
    },
    tax: [
      { title: "Income tax", text: "Personal accident premiums don't qualify for deductions under Section 80C or 80D." },
      { title: "Business expense", text: "Premiums paid by employers for employees are generally deductible as a business expense." },
      { title: "GST", text: "GST treatment can differ from life and health policies, so check the final premium with your insurer." },
    ],
    checklist: [
      "Make sure the plan covers temporary disability if you rely on your monthly income.",
      "Read the disability table to see what's paid for each type of injury.",
      "Declare your occupation and any risky hobbies accurately.",
      "Don't rely only on employer cover. It ends when you change jobs.",
      "Enrol in PMSBY through your bank for low-cost basic cover, and buy more on top.",
      "Keep hospital records, FIRs and medical certificates for any claim.",
    ],
    faqs: [
      { question: "I already have term insurance. Do I need accident cover?", answer: "Term insurance pays on death but not for disability. Personal accident cover pays if an accident leaves you unable to work, which can be financially harder for a family than death." },
      { question: "Is personal accident the same as health insurance?", answer: "No. Health insurance pays hospital bills. Personal accident pays a fixed lump sum or weekly benefit for death or disability, however much the treatment costs." },
      { question: "Can I hold more than one accident policy?", answer: "Yes. Personal accident policies are benefit policies, so each one pays its full benefit, as long as you disclose existing cover." },
      { question: "What is PMSBY?", answer: "Pradhan Mantri Suraksha Bima Yojana is a government scheme offering ₹2 lakh of accidental death and permanent total disability cover for ₹20 a year, auto-debited from your bank account." },
    ],
    sources: [
      IRDAI,
      { name: "Ministry of Road Transport & Highways — Road Accidents in India", url: "https://morth.nic.in" },
      { name: "Jan Suraksha — Pradhan Mantri Suraksha Bima Yojana", url: "https://jansuraksha.gov.in" },
      INCOME_TAX,
    ],
  },
];

export const getInsuranceProduct = (slug: string) => INSURANCE_PRODUCTS.find((p) => p.slug === slug);
