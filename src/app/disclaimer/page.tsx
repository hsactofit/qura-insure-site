import type { Metadata } from "next";
import Link from "next/link";
import StaticPage from "@/components/Legal/StaticPage";
import { STATIC_PAGES_LAST_MODIFIED, irdaiRegistration, OG_IMAGE } from "@/data/site";

const PATH = "/disclaimer";
const TITLE = "Disclaimer";
const DESCRIPTION =
  "Important regulatory information about Qura Insure's role as an insurance intermediary, policy terms, claims and tax benefits.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: `${TITLE} | Qura Insure`, description: DESCRIPTION, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: `${TITLE} | Qura Insure`, description: DESCRIPTION, images: ["/og.png"] },
};

export default function DisclaimerPage() {
  const reg = irdaiRegistration();
  return (
    <StaticPage path={PATH} eyebrow="Legal" title={TITLE} intro={DESCRIPTION} updated={STATIC_PAGES_LAST_MODIFIED}>
      <p><strong>Insurance is the subject matter of solicitation.</strong></p>
      {reg && (
        <p>
          Qura Insure is registered with the Insurance Regulatory and Development Authority of India (IRDAI) as a Corporate Agent
          ({reg.category}), Registration No. {reg.registrationNumber}, valid from {reg.validFrom} to {reg.validTill}.
        </p>
      )}

      <h2>Our role</h2>
      <p>
        Qura Insure is an insurance intermediary, not an insurance company. Policies are issued by the insurers we work with, and the
        insurer is responsible for underwriting, premiums, policy servicing and the final decision on every claim.
      </p>

      <h2>Read the policy documents</h2>
      <p>
        Before you buy, read the insurer&apos;s sales brochure, policy wording and benefit illustration carefully. Benefits, exclusions,
        waiting periods and sub-limits described on this website are summaries; the policy document always prevails.
      </p>

      <h2>Tax benefits</h2>
      <p>
        Any tax benefits mentioned, for example under sections 80C or 80D of the Income-tax Act, depend on the tax regime you choose and
        are subject to changes in tax law. Please consult a tax advisor about your situation.
      </p>

      <h2>Beware of spurious calls</h2>
      <p>
        IRDAI is not involved in selling insurance policies, announcing bonuses or investing premiums. If you receive such a call or
        message, you can lodge a police complaint. Qura Insure staff will never ask you to pay a premium into a personal bank account.
      </p>

      <h2>Website content</h2>
      <p>
        Guides and articles on this site are for general information and are not personalised advice. See our{" "}
        <Link href="/terms">Terms of Use</Link> and <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </StaticPage>
  );
}
