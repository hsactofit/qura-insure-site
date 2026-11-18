/**
 * Team members shown on the homepage and on /team/[slug] author pages.
 * Add a member's real LinkedIn URL to `sameAs` only once it is confirmed.
 */
import { ORGANIZATION_ID, SITE_URL } from "@/data/site";

export type TeamMember = {
  slug: string;
  name: string;
  jobTitle: string;
  qualification?: string;
  experience?: string;
  /** IRDAI certification held for this role, if any. */
  credential?: string;
  bio: string;
  detail?: string;
  strengths?: string[];
  image?: string;
  sameAs: string[];
};

export const promoter: TeamMember = {
  slug: "devendra-ghodnadikar",
  name: "Devendra Ghodnadikar",
  jobTitle: "Promoter & Director",
  qualification: "MBA",
  experience: "35+ Years in Financial Markets",
  bio: "Mr. Ghodnadikar holds an MBA and brings over 35 years of deep-rooted experience in financial markets, stock broking, and insurance. As a founding member since incorporation, he stands as the cornerstone of Qura Insure's foundation, embodying the profound expertise that forms the bedrock of our client-focused approach. His commitment to excellence ensures clients receive bespoke, dependable financial services.",
  strengths: ["Financial Markets", "35+ Yrs Leadership", "Founding Director"],
  sameAs: [],
};

export const keyOfficers: (TeamMember & { badge: "shield" | "award" | "user" })[] = [
  {
    slug: "harsh-shah",
    name: "Harsh Shah",
    jobTitle: "Principal Officer (PO)",
    qualification: "B.Com, pursuing MBA",
    experience: "2 Years Experience",
    credential: "IRDAI Principal Officer certification",
    bio: "Experienced in client servicing, backoffice operations, and vendor management. Leads IRDAI compliance and customer operations.",
    badge: "shield",
    sameAs: [],
  },
  {
    slug: "harshad-nagtilak",
    name: "Harshad Nagtilak",
    jobTitle: "Specified Person (SP)",
    qualification: "B.Com",
    experience: "9+ Years Experience",
    credential: "IRDAI Specified Person certification",
    bio: "9+ years total experience in premier banking institutions (HDFC Bank, IDFC First Bank & Kotak Bank) as Relationship Manager & Wealth Manager.",
    badge: "award",
    sameAs: [],
  },
  {
    slug: "siyaa-deshmukh",
    name: "Siyaa Deshmukh",
    jobTitle: "Specified Person (SP)",
    qualification: "B.Com",
    experience: "2 Years Experience",
    credential: "IRDAI Specified Person certification",
    bio: "Specializes in backend client handling, policy servicing, and seamless customer support.",
    badge: "user",
    sameAs: [],
  },
];

export const operationalLeaders: TeamMember[] = [
  {
    slug: "jigar-maniar",
    name: "Jigar Maniar",
    jobTitle: "Sales Head",
    image: "/team/jigar-maniar.jpeg",
    experience: "17+ Years Experience",
    bio: "Jigar brings more than 17 years of experience across contact-center management, insurance, refinancing, lead management, and MIS.",
    detail: "He leads sales & client experience with a focus on efficient workflows and practical data-led decisions. His career includes work with Mercedes-Benz, Audi, Volkswagen, Kia, Hyundai, Honda Cars, Ashok Leyland, and Ducati.",
    strengths: ["Sales Leadership", "17+ Yrs Experience", "Client Servicing"],
    sameAs: [],
  },
  {
    slug: "akanksha-patel",
    name: "Akanksha Patel",
    jobTitle: "Operations Head",
    image: "/team/aakansha-patel.jpeg",
    bio: "Akanksha combines operations leadership with deep experience in data analysis, helping teams turn complex information into confident action.",
    detail: "Her analytical approach improves operational efficiency and effectiveness across projects, translating data insights into reliable day-to-day decisions.",
    strengths: ["Operations Strategy", "Data Analytics", "Team Development"],
    sameAs: [],
  },
];

export const TEAM: TeamMember[] = [promoter, ...keyOfficers, ...operationalLeaders];

export const teamPath = (slug: string) => `/team/${slug}`;
export const findTeamMember = (slug: string) => TEAM.find((m) => m.slug === slug) ?? null;

/**
 * Optional blog bylines. Set a slug only once that person actually writes or
 * reviews the articles; until then posts are attributed to the organisation.
 */
export const BLOG_AUTHOR_SLUG: string | null = null;
export const BLOG_REVIEWER_SLUG: string | null = null;

/** schema.org Person node for a team member (author/reviewer/profile pages). */
export function personNode(member: TeamMember) {
  const url = `${SITE_URL}${teamPath(member.slug)}`;
  return {
    "@type": "Person",
    "@id": `${url}#person`,
    name: member.name,
    jobTitle: member.jobTitle,
    url,
    image: member.image ? `${SITE_URL}${member.image}` : undefined,
    description: member.bio,
    worksFor: { "@id": ORGANIZATION_ID },
    hasCredential: member.credential
      ? {
          "@type": "EducationalOccupationalCredential",
          name: member.credential,
          credentialCategory: "certification",
          recognizedBy: { "@type": "GovernmentOrganization", name: "Insurance Regulatory and Development Authority of India", url: "https://irdai.gov.in/" },
        }
      : undefined,
    sameAs: member.sameAs.length ? member.sameAs : undefined,
  };
}

