import type { Metadata } from "next";
import Link from "next/link";
import ContactLine from "@/components/Legal/ContactLine";
import StaticPage from "@/components/Legal/StaticPage";
import { BUSINESS, STATIC_PAGES_LAST_MODIFIED, OG_IMAGE } from "@/data/site";

const PATH = "/terms";
const TITLE = "Terms of Use";
const DESCRIPTION =
  "The terms that apply when you browse qurainsure.com, read our insurance guides or submit an enquiry to Qura Insure.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: `${TITLE} | Qura Insure`, description: DESCRIPTION, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: `${TITLE} | Qura Insure`, description: DESCRIPTION, images: ["/og.png"] },
};

export default function TermsPage() {
  return (
    <StaticPage path={PATH} eyebrow="Legal" title={TITLE} intro={DESCRIPTION} updated={STATIC_PAGES_LAST_MODIFIED}>
      <p>
        qurainsure.com is operated by {BUSINESS.legalName ?? "Qura Insure"}. By using this website you agree to these terms. If you do not
        agree, please do not use the site.
      </p>

      <h2>Information only</h2>
      <p>
        Articles, guides, comparisons and examples on this site are general information to help you understand insurance. They are not a
        recommendation to buy a particular policy. Advice specific to you is given only after an advisor has understood your needs.
        Policy benefits, exclusions, premiums and claim decisions are set by the insurer in the policy document, which always prevails.
      </p>

      <h2>Your enquiries</h2>
      <p>
        When you submit an enquiry you confirm that the details are yours (or that you have permission to share them) and are accurate.
        We use them as described in our <Link href="/privacy-policy">Privacy Policy</Link>. Submitting an enquiry does not create an
        insurance contract; cover starts only when an insurer accepts a proposal and issues a policy.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not misuse the site, attempt to gain unauthorised access, or interfere with its operation.</li>
        <li>Do not submit false, misleading or someone else&apos;s information without their consent.</li>
        <li>Do not copy or republish site content for commercial use without our written permission.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The Qura Insure name, logos, text, graphics and design are owned by or licensed to us. Insurer names and product names belong to
        their respective owners.
      </p>

      <h2>Third-party links</h2>
      <p>
        The site links to insurers, regulators and other websites for reference. We are not responsible for their content or privacy practices.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        We take care to keep information accurate and current, but we do not guarantee that the site is error-free or always available.
        To the extent permitted by law, we are not liable for losses arising from reliance on general website content.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India. Courts in India have jurisdiction over any dispute.</p>

      <h2>Contact</h2>
      <p>For questions about these terms, <ContactLine />. See also our <Link href="/disclaimer">Disclaimer</Link>.</p>
    </StaticPage>
  );
}
