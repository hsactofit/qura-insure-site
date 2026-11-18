import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import StaticPage from "@/components/Legal/StaticPage";
import { SITE_URL, STATIC_PAGES_LAST_MODIFIED, OG_IMAGE } from "@/data/site";
import { TEAM, findTeamMember, personNode, teamPath, type TeamMember } from "@/data/team";

export const dynamicParams = false;

export function generateStaticParams() {
  return TEAM.map((member) => ({ slug: member.slug }));
}

const describe = (m: TeamMember) => `${m.name}, ${m.jobTitle} at Qura Insure. ${m.bio}`.slice(0, 158).replace(/\s+\S*$/, "") + "…";

export async function generateMetadata({ params }: PageProps<"/team/[slug]">): Promise<Metadata> {
  const member = findTeamMember((await params).slug);
  if (!member) return {};
  const path = teamPath(member.slug);
  const title = `${member.name}, ${member.jobTitle}`;
  return {
    title,
    description: describe(member),
    alternates: { canonical: path },
    openGraph: { type: "profile", url: path, title: `${title} | Qura Insure`, description: describe(member), images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: `${title} | Qura Insure`, description: describe(member), images: ["/og.png"] },
  };
}

export default async function TeamMemberPage({ params }: PageProps<"/team/[slug]">) {
  const member = findTeamMember((await params).slug);
  if (!member) notFound();
  const path = teamPath(member.slug);

  return (
    <StaticPage
      path={path}
      eyebrow="Qura Insure team"
      title={member.name}
      intro={member.jobTitle}
      updated={STATIC_PAGES_LAST_MODIFIED}
      extraJsonLd={[
        { "@type": "ProfilePage", "@id": `${SITE_URL}${path}#profile`, url: `${SITE_URL}${path}`, mainEntity: { "@id": `${SITE_URL}${path}#person` } },
        personNode(member),
      ]}
    >
      {member.image && (
        <Image src={member.image} alt={`${member.name}, ${member.jobTitle}`} width={320} height={320} className="rounded-[1.5rem] object-cover aspect-square" />
      )}
      <h2>About {member.name.split(" ")[0]}</h2>
      <p>{member.bio}</p>
      {member.detail && <p>{member.detail}</p>}

      <h2>Credentials and experience</h2>
      <ul>
        <li><strong>Role:</strong> {member.jobTitle}, Qura Insure</li>
        {member.credential && <li><strong>Certification:</strong> {member.credential}</li>}
        {member.qualification && <li><strong>Qualification:</strong> {member.qualification}</li>}
        {member.experience && <li><strong>Experience:</strong> {member.experience}</li>}
        {member.strengths?.length ? <li><strong>Focus areas:</strong> {member.strengths.join(", ")}</li> : null}
      </ul>

      {member.sameAs.length > 0 && (
        <>
          <h2>Profiles</h2>
          <ul>{member.sameAs.map((url) => <li key={url}><a href={url} rel="me noopener" target="_blank">{url.includes("linkedin.com") ? "LinkedIn" : url}</a></li>)}</ul>
        </>
      )}

      <h2>Meet the rest of the team</h2>
      <ul>
        {TEAM.filter((m) => m.slug !== member.slug).map((m) => (
          <li key={m.slug}><Link href={teamPath(m.slug)}>{m.name}</Link>, {m.jobTitle}</li>
        ))}
      </ul>
    </StaticPage>
  );
}
