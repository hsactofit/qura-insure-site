import Image from "next/image";
import Link from "next/link";
import { INSURANCE_MENU, IRDAI_REGISTRATION, isRegistrationComplete } from "@/data/content";

export default function Footer() {
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

          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Products</h4>
            <ul className="space-y-4 text-sm">
              {INSURANCE_MENU.map((item) => (
                <li key={item.slug}><Link href={`/insurance/${item.slug}`} className="text-surface-sage hover:text-cta transition-colors">{item.title}</Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/#team" className="text-surface-sage hover:text-cta transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="text-surface-sage hover:text-cta transition-colors">Blog</Link></li>
              <li><Link href="/#contact" className="text-surface-sage hover:text-cta transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Help & Guidance</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/#faq" className="text-surface-sage hover:text-cta transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/#our-approach" className="text-surface-sage hover:text-cta transition-colors">Our Approach</Link></li>
              <li><Link href="/#how-it-works" className="text-surface-sage hover:text-cta transition-colors">How Guidance Works</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
            <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Qura Insure. All rights reserved.</p>
            <nav aria-label="Legal" className="flex gap-5">
              <Link href="/privacy" className="text-surface-sage hover:text-cta transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-surface-sage hover:text-cta transition-colors">Terms of Use</Link>
            </nav>
          </div>
          <p className="text-center md:text-right">
            {isRegistrationComplete()
              ? `IRDAI Corporate Agent (${IRDAI_REGISTRATION.category}) Reg. No. ${IRDAI_REGISTRATION.registrationNumber}, valid till ${IRDAI_REGISTRATION.validTill}. `
              : IRDAI_REGISTRATION.registrationNumber && `IRDAI Registration No. ${IRDAI_REGISTRATION.registrationNumber}. `}
            Insurance is the subject matter of solicitation.
          </p>
        </div>
      </div>
    </footer>
  );
}


