/** Content for the indexable service pages. Keep statements factual and general; insurer terms always prevail. */
export type ServiceContent = {
  path: "/term-life-insurance" | "/health-insurance" | "/corporate-insurance";
  name: string;
  serviceType: string;
  title: string;
  metaDescription: string;
  h1: string;
  definition: string;
  sections: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
};

const ADVISORY_PROCESS = (product: string) => [
  { title: "Understand your needs", description: `A free conversation about your family, income, existing cover and goals so the ${product} recommendation fits real life.` },
  { title: "Compare across insurers", description: "Your advisor shortlists suitable plans from several insurers and explains benefits, exclusions, waiting periods and premiums side by side." },
  { title: "Apply with guidance", description: "We help you complete the proposal form accurately, including full health and income disclosures, and track it until the insurer issues the policy." },
  { title: "Support after purchase", description: "Renewals, nominee or address changes, and claims: your advisor helps with documents and follows up with the insurer." },
];

export const SERVICES_CONTENT: ServiceContent[] = [
  {
    path: "/term-life-insurance",
    name: "Term Life Insurance",
    serviceType: "Term life insurance advisory",
    title: "Term Life Insurance Advice in India",
    metaDescription:
      "Compare term life insurance plans across insurers with Qura Insure. Work out the right cover, riders and policy term, with no advisory fee and claims support.",
    h1: "Term life insurance advice for Indian families",
    definition:
      "Term life insurance is a pure protection life policy: if the insured person dies during the policy term, the insurer pays the sum assured to the nominee. A basic term plan has no maturity or savings value, which is why it gives the highest life cover for each rupee of premium and suits anyone whose family depends on their income.",
    sections: [
      {
        heading: "How much term cover do you need?",
        paragraphs: [
          "A common starting point is 10 to 15 times your annual income, plus outstanding loans and the cost of major goals such as children's education, minus savings already set aside. Your advisor builds this number from your actual income, liabilities and dependants rather than a fixed multiple.",
        ],
      },
      {
        heading: "What we compare for you",
        bullets: [
          "Claim settlement ratio and claim-paid amounts published by IRDAI for each life insurer",
          "Policy term, so cover lasts at least until your planned retirement",
          "Riders such as critical illness, accidental death benefit and waiver of premium",
          "Premium payment options: regular, limited pay or single premium",
          "Medical and income-proof requirements for the cover amount you need",
        ],
      },
    ],
    process: ADVISORY_PROCESS("term life"),
    faqs: [
      {
        question: "Is term insurance worth it if I get nothing back at maturity?",
        answer: "Yes, for most people with dependants. A basic term plan pays nothing at maturity because it is pure protection, which keeps the premium low enough to buy cover that can genuinely replace your income. Return-of-premium versions exist, but they cost significantly more for the same sum assured.",
      },
      {
        question: "Why does accurate disclosure on the proposal form matter?",
        answer: "Insurers decide claims on the basis of the information given in the proposal. Not disclosing health conditions, smoking or existing policies can lead to a claim being rejected, so your advisor helps you answer every question completely before you sign.",
      },
      {
        question: "Does Qura Insure charge a fee for term insurance advice?",
        answer: "No. Advice is free. Qura Insure is paid a commission by the insurer when a policy is issued, and that commission is already part of the insurer's premium, so you pay the same as buying directly.",
      },
    ],
  },
  {
    path: "/health-insurance",
    name: "Health Insurance",
    serviceType: "Health insurance advisory",
    title: "Health Insurance Advice in India",
    metaDescription:
      "Choose the right individual or family floater health insurance with Qura Insure. We compare room-rent limits, waiting periods and networks, and help with claims.",
    h1: "Health insurance advice for individuals and families",
    definition:
      "Health insurance pays for hospital treatment up to the sum insured, either cashless at a network hospital or by reimbursing bills you have paid. Each policy sets its own room-rent limits, co-payments, sub-limits and waiting periods, and these details, more than the premium, decide how much of a hospital bill the insurer actually pays.",
    sections: [
      {
        heading: "Details that change what a claim pays",
        bullets: [
          "Room-rent limits, which can proportionately reduce other charges if you choose a costlier room",
          "Waiting periods for pre-existing diseases and specific illnesses",
          "Co-payment clauses, especially in plans for senior citizens",
          "Disease-wise sub-limits, for example on cataract or joint replacement",
          "The insurer's cashless hospital network in your city",
          "No-claim bonus, restoration benefit and annual health check-ups",
        ],
      },
      {
        heading: "Individual or family floater?",
        paragraphs: [
          "A family floater shares one sum insured across the family and usually costs less than separate policies for young families. Individual policies, or a separate plan for parents, often work better when members differ widely in age or health. Your advisor compares both before you decide.",
        ],
      },
    ],
    process: ADVISORY_PROCESS("health insurance"),
    faqs: [
      {
        question: "How long is the waiting period for pre-existing diseases?",
        answer: "It depends on the policy, but IRDAI's health insurance rules cap the waiting period for pre-existing diseases at three years. Some plans offer shorter waiting periods, sometimes for an extra premium. Your advisor shows the waiting periods side by side when comparing plans.",
      },
      {
        question: "What is the difference between cashless and reimbursement claims?",
        answer: "In a cashless claim the insurer or its TPA settles the bill directly with a network hospital after approving the treatment. In a reimbursement claim you pay the hospital first and then submit bills and documents to the insurer. We help you prepare documents for both.",
      },
      {
        question: "Can I get a tax deduction on health insurance premiums?",
        answer: "Under the old tax regime, premiums paid for yourself, your family and your parents can be claimed under section 80D of the Income-tax Act, within the limits set by law. The new tax regime does not offer this deduction. Check your situation with a tax advisor.",
      },
    ],
  },
  {
    path: "/corporate-insurance",
    name: "Corporate Insurance",
    serviceType: "Group and employee benefits insurance advisory",
    title: "Corporate & Group Insurance for Employers",
    metaDescription:
      "Qura Insure helps Indian employers design group health, group term life and group accident cover, onboard employees and support their claims.",
    h1: "Corporate and group insurance for employers",
    definition:
      "Corporate insurance, also called group insurance, is a single policy bought by an employer that covers its employees and, optionally, their families. The most common types are group health insurance for hospitalisation, group term life insurance and group personal accident cover. Group plans are usually priced on the whole team's profile rather than individual medical tests.",
    sections: [
      {
        heading: "What we help employers set up",
        bullets: [
          "Group health insurance (group mediclaim) for employees, spouses, children and optionally parents",
          "Group term life insurance with a cover amount linked to salary or grade",
          "Group personal accident cover for accidental death and disability",
          "Benefit design: sum insured, room-rent caps, maternity cover and waiting-period waivers",
        ],
      },
      {
        heading: "Ongoing support for HR teams",
        paragraphs: [
          "After the policy starts we help with employee additions and deletions, e-cards, claim queries and the annual renewal review, using the claims experience to adjust benefits and premium.",
        ],
      },
    ],
    process: ADVISORY_PROCESS("group insurance"),
    faqs: [
      {
        question: "How many employees are needed for a group health policy?",
        answer: "The minimum group size is set by each insurer and varies by product. Many insurers offer group health cover for small teams, so startups and SMEs can usually find a suitable plan. Your advisor checks eligibility with several insurers.",
      },
      {
        question: "Are pre-existing diseases covered in group health insurance?",
        answer: "Group policies can waive waiting periods, including for pre-existing diseases, from the first day, but this is a benefit the employer chooses and it affects the premium. We explain the cost of each waiver before you decide.",
      },
      {
        question: "Can employees buy extra cover on top of the group policy?",
        answer: "Yes. Employees can add an individual or family health policy, or a super top-up, for cover that continues if they leave the company. Our advisors can help employees with this separately.",
      },
    ],
  },
];

export const findService = (path: ServiceContent["path"]) => SERVICES_CONTENT.find((s) => s.path === path)!;
