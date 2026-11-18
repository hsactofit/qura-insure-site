import type { Metadata } from "next";
import ContactLine from "@/components/Legal/ContactLine";
import StaticPage from "@/components/Legal/StaticPage";
import { BUSINESS, STATIC_PAGES_LAST_MODIFIED, OG_IMAGE } from "@/data/site";

const PATH = "/privacy-policy";
const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Qura Insure collects, uses, shares and protects personal data submitted through qurainsure.com, and how to exercise your rights under India's DPDP Act.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: `${TITLE} | Qura Insure`, description: DESCRIPTION, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: `${TITLE} | Qura Insure`, description: DESCRIPTION, images: ["/og.png"] },
};

export default function PrivacyPolicyPage() {
  return (
    <StaticPage path={PATH} eyebrow="Legal" title={TITLE} intro={DESCRIPTION} updated={STATIC_PAGES_LAST_MODIFIED}>
      <p>
        This policy explains how {BUSINESS.legalName ?? "Qura Insure"} (&ldquo;Qura Insure&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
        handles personal data when you use qurainsure.com or contact us about insurance. We process personal data in line with the
        Digital Personal Data Protection Act, 2023 and the data-protection requirements that IRDAI places on insurance intermediaries.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Enquiry details you submit:</strong> your name, mobile number, email address (optional), the type of insurance you are interested in, and any message you write.</li>
        <li><strong>Campaign information:</strong> marketing parameters in the page address, such as UTM tags, that tell us which advertisement or link brought you to the site.</li>
        <li><strong>Usage data:</strong> pages visited, device and browser type, approximate location and referring site, collected through Google Analytics and our website analytics provider using cookies and similar technologies.</li>
        <li><strong>Information for a policy:</strong> if you go on to buy insurance, the insurer&apos;s proposal form will ask for details such as date of birth, health history, income and nominee information. We collect these only for that proposal.</li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your enquiry and give you insurance advice you have asked for.</li>
        <li>To prepare and submit proposals to insurers you choose, service your policy and help with claims.</li>
        <li>To meet legal and regulatory obligations, including IRDAI record-keeping and KYC requirements.</li>
        <li>To understand how the website is used and improve it.</li>
      </ul>
      <p>We do not sell your personal data, and we do not send unsolicited marketing calls or messages.</p>

      <h2>Who we share it with</h2>
      <ul>
        <li><strong>Insurers and their third-party administrators (TPAs)</strong>, only for the products you ask us to arrange or the claims you ask us to support.</li>
        <li><strong>Service providers</strong> who host our website, run our customer relationship management system and provide analytics, under contracts that restrict their use of the data.</li>
        <li><strong>Regulators and authorities</strong>, including IRDAI, when the law requires it.</li>
      </ul>

      <h2>Cookies and analytics</h2>
      <p>
        We use Google Analytics and a first-party analytics script to measure visits. These set cookies or use similar storage in your
        browser. You can block or delete cookies in your browser settings, or install Google&apos;s opt-out add-on, without losing access to the site.
      </p>

      <h2>How long we keep data</h2>
      <p>
        We keep enquiry data for as long as needed to respond to you and follow up on your request. Policy and claim records are kept
        for the period required by IRDAI regulations and other applicable law, after which they are deleted or anonymised.
      </p>

      <h2>Security</h2>
      <p>
        The website is served only over HTTPS, and access to customer records is limited to staff who need it to serve you. No method of
        transmission or storage is completely secure, but we take reasonable steps to protect your data.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to access, correct, update or erase your personal data, withdraw consent you have given, or nominate another person to
        exercise these rights for you. Withdrawing consent may mean we can no longer service a policy arranged through us. To make a request, <ContactLine />.
      </p>

      <h2>Grievances</h2>
      {BUSINESS.grievanceOfficer ? (
        <p>
          Our Grievance Redressal Officer is {BUSINESS.grievanceOfficer.name}, reachable at{" "}
          <a href={`mailto:${BUSINESS.grievanceOfficer.email}`}>{BUSINESS.grievanceOfficer.email}</a>. If you are not satisfied with our
          response, you may approach the Data Protection Board of India.
        </p>
      ) : (
        <p>
          To raise a privacy complaint, <ContactLine /> and mark your message &ldquo;Privacy grievance&rdquo;. If you are not satisfied
          with our response, you may approach the Data Protection Board of India.
        </p>
      )}

      <h2>Changes to this policy</h2>
      <p>We will update this page when our practices change. The &ldquo;Last updated&rdquo; date above shows the latest version.</p>
    </StaticPage>
  );
}
