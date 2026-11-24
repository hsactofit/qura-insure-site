import Link from "next/link";
import type { ReactNode } from "react";
import { IRDAI_REGISTRATION, LEGAL_ENTITY } from "@/data/content";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Shared layout for the Privacy Policy and Terms of Use pages. */
export default function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <div className="bg-bg-main text-primary">
      <section className="pt-32 pb-10 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <span className="text-sm font-bold uppercase tracking-[.2em] text-secondary">{eyebrow}</span>
          <h1 className="mt-5 text-[clamp(2.2rem,6vw,4.25rem)] font-semibold leading-[1.04] tracking-[-.045em]">{title}</h1>
          <p className="mt-4 text-sm text-text-muted">Last updated: {LEGAL_ENTITY.lastUpdated}</p>
          <div className="mt-6 max-w-3xl text-lg leading-relaxed text-text-muted">{intro}</div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[16rem_1fr]">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28 rounded-3xl border border-primary/10 bg-white p-6">
              <p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-primary/60">On this page</p>
              <ol className="space-y-2.5 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-text-muted transition-colors hover:text-primary">
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="min-w-0 rounded-[2rem] border border-primary/10 bg-white p-6 sm:p-10">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-primary/10 py-8 first:pt-0 last:border-0 last:pb-0">
                <h2 className="text-xl font-semibold tracking-[-.02em] md:text-2xl">
                  {i + 1}. {s.title}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-text-muted [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_strong]:text-primary [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                  {s.body}
                </div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
}

/** Contact block used by both pages; omits any detail that hasn't been filled in. */
export function LegalContact() {
  const e = LEGAL_ENTITY;
  const g = e.grievanceOfficer;
  const hasOfficer = Boolean(g.name || g.email || g.phone);
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-bg-main p-5 text-sm">
        <p className="font-semibold text-primary">{e.legalName || e.brandName}</p>
        {e.cin && <p>CIN: {e.cin}</p>}
        {IRDAI_REGISTRATION.registrationNumber && <p>IRDAI Corporate Agent Registration No.: {IRDAI_REGISTRATION.registrationNumber}</p>}
        {e.registeredAddress && <p>Registered office: {e.registeredAddress}</p>}
        {e.supportEmail && (
          <p>
            Email: <a href={`mailto:${e.supportEmail}`}>{e.supportEmail}</a>
          </p>
        )}
        {e.supportPhone && (
          <p>
            Phone: <a href={`tel:${e.supportPhone.replace(/\s/g, "")}`}>{e.supportPhone}</a>
          </p>
        )}
        {!e.supportEmail && !e.supportPhone && (
          <p>
            Contact us through the <Link href="/#contact">enquiry form</Link> on our website.
          </p>
        )}
      </div>
      {hasOfficer && (
        <div className="rounded-2xl bg-bg-main p-5 text-sm">
          <p className="font-semibold text-primary">Grievance Officer</p>
          {g.name && <p>{g.name}</p>}
          {g.email && (
            <p>
              Email: <a href={`mailto:${g.email}`}>{g.email}</a>
            </p>
          )}
          {g.phone && <p>Phone: {g.phone}</p>}
        </div>
      )}
    </div>
  );
}
