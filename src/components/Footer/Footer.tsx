import Image from "next/image";
import Link from "next/link";
import { BUSINESS, LEGAL_PAGES, SERVICE_PAGES, formatAddress, irdaiRegistration } from "@/data/site";

export default function Footer() {
  const reg = irdaiRegistration();
  return (
    <footer className="bg-primary text-surface-sage pt-20 pb-10 border-t border-white/10">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-3 p-3 -ml-3">
              <Image
                src="/logos/White Primary Logo.svg"
                alt="Qura Insure Logo"
                width={174}
                height={50}
                className="h-12 w-auto"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Confidence, Curated. Research-led recommendations, transparent guidance, and ongoing claims support.
            </p>
            {(BUSINESS.legalName || BUSINESS.address || BUSINESS.telephone || BUSINESS.email) && (
              <address className="not-italic text-sm leading-relaxed space-y-1">
                {BUSINESS.legalName && <p className="text-white font-semibold">{BUSINESS.legalName}</p>}
                {BUSINESS.address && <p>{formatAddress(BUSINESS.address)}</p>}
                {BUSINESS.telephone && <p>Phone: <a href={`tel:${BUSINESS.telephone}`} className="hover:text-cta transition-colors">{BUSINESS.telephone}</a></p>}
                {BUSINESS.email && <p>Email: <a href={`mailto:${BUSINESS.email}`} className="hover:text-cta transition-colors">{BUSINESS.email}</a></p>}
              </address>
            )}

          </div>
          
          <div>
            <p className="text-white font-bold mb-6">Products</p>
            <ul className="space-y-4 text-sm">
              {SERVICE_PAGES.map((service) => (
                <li key={service.path}><Link href={service.path} className="text-surface-sage hover:text-cta transition-colors">{service.name}</Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <p className="text-white font-bold mb-6">Company</p>
            <ul className="space-y-4 text-sm">
              <li><Link href="/#team" className="text-surface-sage hover:text-cta transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="text-surface-sage hover:text-cta transition-colors">Blog</Link></li>
              <li><Link href="/#contact" className="text-surface-sage hover:text-cta transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <p className="text-white font-bold mb-6">Help & Guidance</p>
            <ul className="space-y-4 text-sm">
              <li><Link href="/#faq" className="text-surface-sage hover:text-cta transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/#our-approach" className="text-surface-sage hover:text-cta transition-colors">Our Approach</Link></li>
              <li><Link href="/#how-it-works" className="text-surface-sage hover:text-cta transition-colors">How Guidance Works</Link></li>
              {LEGAL_PAGES.map((page) => (
                <li key={page.path}><Link href={page.path} className="text-surface-sage hover:text-cta transition-colors">{page.name}</Link></li>
              ))}
            </ul>
          </div>
          
        </div>
        
        {BUSINESS.grievanceOfficer && (
          <div className="mb-8 text-xs leading-relaxed">
            <span className="text-white font-semibold">Grievance Redressal Officer:</span> {BUSINESS.grievanceOfficer.name}
            {" · "}<a href={`mailto:${BUSINESS.grievanceOfficer.email}`} className="hover:text-cta transition-colors">{BUSINESS.grievanceOfficer.email}</a>
            {BUSINESS.grievanceOfficer.telephone && <>{" · "}<a href={`tel:${BUSINESS.grievanceOfficer.telephone}`} className="hover:text-cta transition-colors">{BUSINESS.grievanceOfficer.telephone}</a></>}
            . Unresolved complaints can be escalated to IRDAI&apos;s Bima Bharosa portal (bimabharosa.irdai.gov.in).
          </div>
        )}

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} {BUSINESS.legalName ?? "Qura Insure"}. All rights reserved.</p>
          <p className="text-center md:text-right">
            {reg &&
              `IRDAI Corporate Agent (${reg.category}) Reg. No. ${reg.registrationNumber}, valid till ${reg.validTill}. `}
            Insurance is the subject matter of solicitation.
          </p>
        </div>
      </div>
    </footer>
  );
}


