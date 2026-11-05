import Image from "next/image";
import Link from "next/link";
import { IRDAI_REGISTRATION, isRegistrationComplete } from "@/data/content";

export default function Footer() {
  return (
    <footer className="bg-primary text-surface-sage pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6 max-w-7xl">
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
              <li><Link href="/#products" className="text-surface-sage hover:text-cta transition-colors">Term Life Insurance</Link></li>
              <li><Link href="/#products" className="text-surface-sage hover:text-cta transition-colors">Health Insurance</Link></li>
              <li><Link href="/#products" className="text-surface-sage hover:text-cta transition-colors">Corporate Plans</Link></li>
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
          <p>&copy; {new Date().getFullYear()} Qura Insure. All rights reserved.</p>
          <p>
            {isRegistrationComplete() &&
              `IRDAI Corporate Agent (${IRDAI_REGISTRATION.category}) Reg. No. ${IRDAI_REGISTRATION.registrationNumber}, valid till ${IRDAI_REGISTRATION.validTill}. `}
            Insurance is the subject matter of solicitation.
          </p>
        </div>
      </div>
    </footer>
  );
}


