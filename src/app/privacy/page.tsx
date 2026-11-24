import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalContact, type LegalSection } from "@/components/Legal/LegalPage";
import { LEGAL_ENTITY } from "@/data/content";

const TITLE = "Privacy Policy | Qura Insure";
const DESCRIPTION =
  "How Qura Insure collects, uses, shares and protects your personal data, and your rights under India's Digital Personal Data Protection Act, 2023.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: { type: "website", url: "/privacy", title: TITLE, description: DESCRIPTION },
};

const name = LEGAL_ENTITY.legalName || LEGAL_ENTITY.brandName;

const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          {name} (&quot;Qura&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is an insurance intermediary registered with the
          Insurance Regulatory and Development Authority of India (IRDAI) as a Corporate Agent. We help people and businesses understand,
          compare and buy insurance from the insurers we are tied up with, and we support them with servicing and claims afterwards.
        </p>
        <p>
          For the personal data described in this policy, we are the <strong>Data Fiduciary</strong> under the Digital Personal Data
          Protection Act, 2023 (&quot;DPDP Act&quot;). When you buy a policy, the insurer also becomes a Data Fiduciary for the data it
          receives and handles it under its own privacy policy.
        </p>
        <p>
          This policy applies to {LEGAL_ENTITY.website.replace(/^https?:\/\//, "")}, its sub-domains (including our client and employee
          portals), and to calls, messages and emails we exchange with you. It should be read with our{" "}
          <Link href="/terms">Terms of Use</Link>.
        </p>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "Personal data we collect",
    body: (
      <>
        <p>We collect only what we need for the purposes in section 3. Depending on how you deal with us, this may include:</p>
        <ul>
          <li>
            <strong>Enquiry details</strong>: your name, mobile number, email address (optional), the type of insurance you&apos;re
            interested in, and anything you choose to tell us in the message box.
          </li>
          <li>
            <strong>Advisory and proposal details</strong>: date of birth, gender, address, occupation, income, family members to be
            covered, existing policies and claims history, nominee details, and vehicle, property, travel or business details, depending
            on the product.
          </li>
          <li>
            <strong>Know-Your-Customer (KYC) data</strong>: identity and address proof such as PAN, Aadhaar (masked where possible),
            passport or other officially valid documents, photographs and, where an insurer requires it, Central KYC (CKYC) numbers.
          </li>
          <li>
            <strong>Health data</strong>: medical history, lifestyle habits and medical test reports that insurers need to underwrite
            life, health and personal accident cover, and hospital and treatment records needed for a claim.
          </li>
          <li>
            <strong>Financial data</strong>: bank account details for premium payments, refunds and claim settlements, and income
            proofs where required for underwriting. Card and UPI payments are processed directly by the insurer or a regulated payment
            gateway; we do not store your full card details.
          </li>
          <li>
            <strong>Communication records</strong>: notes and, where you have been told in advance, recordings of calls; and the
            messages and emails you exchange with us.
          </li>
          <li>
            <strong>Technical and usage data</strong>: IP address, device and browser type, pages viewed, referring page, campaign tags
            (such as UTM, gclid or fbclid parameters in the link you followed) and similar data collected through cookies and analytics
            tools (see section 7).
          </li>
        </ul>
        <p>
          The <Link href="/tools/coverage-check">Coverage Check</Link> calculator runs entirely in your browser. The figures you enter
          there are not sent to us or stored by us.
        </p>
        <p>
          We do not knowingly collect data directly from children. Where a child is to be covered under a policy, we collect their
          details from, and with the verifiable consent of, their parent or lawful guardian.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your data",
    body: (
      <>
        <p>We use personal data for these purposes:</p>
        <ol>
          <li>To respond to your enquiry and call you back about the insurance you asked about.</li>
          <li>To understand your needs and recommend suitable products, as IRDAI requires of insurance intermediaries.</li>
          <li>To prepare and submit proposal forms, complete KYC and arrange medical tests on behalf of the insurer you choose.</li>
          <li>To service your policy: renewals, endorsements, reminders, portability, nominee changes and other requests.</li>
          <li>To assist you with claims: helping you prepare documents, submitting them and following up with the insurer or its TPA.</li>
          <li>To handle complaints and grievances.</li>
          <li>To meet our legal and regulatory obligations, including IRDAI record-keeping, anti-money-laundering rules and tax law.</li>
          <li>To keep our website and systems secure, prevent fraud and misuse, and fix problems.</li>
          <li>To understand how our website is used and improve it, using aggregated or pseudonymised analytics.</li>
          <li>
            To tell you about other insurance products or reminders that may be relevant, only where you have agreed and never if you
            have opted out.
          </li>
        </ol>
        <p>
          We do not use your data for automated decisions that produce legal effects for you. Decisions to accept a proposal, set a
          premium or settle a claim are made by the insurer.
        </p>
      </>
    ),
  },
  {
    id: "legal-basis",
    title: "Consent and legal basis",
    body: (
      <>
        <p>
          We process your personal data on the basis of the <strong>consent</strong> you give when you submit an enquiry, share
          documents or ask us to act for you. Where you have voluntarily given us data for a specific purpose and not said you object
          (for example, calling you back after you submit the enquiry form), we may also rely on that use under Section 7 of the DPDP
          Act. We also process data where the law requires it, for example to keep records for IRDAI or to comply with a court order.
        </p>
        <p>
          You can <strong>withdraw consent</strong> at any time by contacting us (section 12). Withdrawal is as easy as giving consent
          and does not affect anything we did before. If you withdraw consent, we may no longer be able to advise you or service a
          policy through us, and we may still keep data that the law requires us to retain.
        </p>
        <p>
          By sharing data about another person, such as a family member, nominee or employee, you confirm that you are authorised to do
          so and have told them about this policy.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share data with",
    body: (
      <>
        <p>
          <strong>We do not sell or rent your personal data.</strong> We share it only as needed for the purposes above, with:
        </p>
        <ul>
          <li>
            <strong>Insurers</strong> we are tied up with, whose products you ask about or choose, and their third-party administrators
            (TPAs), medical examination centres and surveyors.
          </li>
          <li>
            <strong>Service providers</strong> who process data for us under contract and our instructions: cloud hosting, our customer
            relationship management (CRM) system, telephony, messaging and email providers, and analytics providers.
          </li>
          <li>
            <strong>Regulators and authorities</strong> such as IRDAI, the Insurance Ombudsman, tax authorities, the Financial
            Intelligence Unit, law enforcement and courts, where the law requires or permits it.
          </li>
          <li>
            <strong>Professional advisers</strong> such as auditors and lawyers, under confidentiality obligations.
          </li>
          <li>
            <strong>A successor business</strong>, if all or part of our business is merged, acquired or transferred, subject to this
            policy.
          </li>
        </ul>
        <p>
          Some service providers may store or process data outside India. We transfer data only to countries not restricted by the
          Government of India under the DPDP Act, and with safeguards that protect it to the standard set out in this policy.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep data",
    body: (
      <>
        <p>
          We keep personal data only as long as needed for the purpose it was collected, or as long as the law requires. In practice:
        </p>
        <ul>
          <li>
            <strong>Enquiries that don&apos;t lead to a policy</strong>: deleted or anonymised once they are no longer needed, and
            generally within three years of our last contact with you.
          </li>
          <li>
            <strong>Policy, proposal, KYC and claim records</strong>: kept for the period IRDAI regulations and other laws (such as
            anti-money-laundering and tax rules) require, which may extend for several years after a policy ends or a claim is settled.
          </li>
          <li>
            <strong>Analytics data</strong>: kept in aggregated or pseudonymised form under our analytics providers&apos; retention
            settings.
          </li>
        </ul>
        <p>When data is no longer needed, we delete it or make it anonymous so it can no longer identify you.</p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: (
      <>
        <p>
          Cookies are small files stored by your browser. We use them, and similar technologies, to make our website work and to
          understand how it is used:
        </p>
        <ul>
          <li>
            <strong>Essential</strong>: needed for the website and our portals to work securely, for example to keep you signed in.
          </li>
          <li>
            <strong>Analytics</strong>: we use Google Analytics and a content analytics service to see which pages are visited, how
            people arrive and how long they stay. These tools collect data such as your IP address, device and browser type and pages
            viewed. Google&apos;s use of this data is described at{" "}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
              policies.google.com/technologies/partner-sites
            </a>
            , and you can opt out with the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              Google Analytics opt-out add-on
            </a>
            .
          </li>
        </ul>
        <p>
          You can block or delete cookies in your browser settings. Blocking essential cookies may stop parts of the website or portals
          from working.
        </p>
      </>
    ),
  },
  {
    id: "communications",
    title: "Calls, messages and marketing",
    body: (
      <>
        <p>
          When you submit an enquiry, you ask us to contact you on the mobile number and email you give, by call, SMS, WhatsApp or
          email, about that enquiry. This applies even if your number is registered on the National Customer Preference Register
          (DND), because you have asked us to contact you.
        </p>
        <p>
          We will send promotional messages about other products only with your consent and in line with the Telecom Commercial
          Communications Customer Preference Regulations. You can opt out at any time by replying STOP where offered, telling your
          advisor, or contacting us. We will still send service messages about policies you hold, such as renewal and claim updates.
        </p>
        <p>
          <strong>Beware of fraudulent calls.</strong> We will never ask for your OTP, card PIN, CVV or net-banking password, and we
          never ask you to pay a premium into a personal bank account. Premiums are paid to the insurer. IRDAI does not sell insurance,
          announce bonuses or invest premiums; if you get such a call, report it to IRDAI and the police.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect your data",
    body: (
      <>
        <p>
          We use reasonable security practices, as required by the Information Technology Act, 2000 and the DPDP Act, to protect your
          data from unauthorised access, loss, misuse or alteration. These include encrypted connections (HTTPS), role-based access
          controls, staff confidentiality obligations and training, and contracts that bind our service providers to protect data.
        </p>
        <p>
          No method of transmission or storage is completely secure. If a personal data breach occurs, we will inform the Data Protection
          Board of India and affected individuals as the DPDP Act and its rules require, and take steps to limit the harm.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Under the DPDP Act, you have the right to:</p>
        <ul>
          <li>
            <strong>Access</strong>: get a summary of the personal data we hold about you, how we process it, and who we have shared it
            with.
          </li>
          <li>
            <strong>Correction and completion</strong>: have inaccurate or incomplete data corrected, completed or updated.
          </li>
          <li>
            <strong>Erasure</strong>: have your data deleted once it is no longer needed, unless the law requires us to keep it.
          </li>
          <li>
            <strong>Withdraw consent</strong>: at any time, for processing based on consent.
          </li>
          <li>
            <strong>Grievance redressal</strong>: have your complaint about our handling of your data answered by us.
          </li>
          <li>
            <strong>Nominate</strong>: name another person to exercise these rights for you if you die or become incapable.
          </li>
        </ul>
        <p>
          To use any of these rights, contact us as in section 12. We may need to verify your identity first. We will respond within the
          time the DPDP Act and its rules set. If you are not satisfied with our response, you can complain to the Data Protection Board
          of India.
        </p>
        <p>
          Please give us accurate information and do not impersonate anyone or file false complaints; these are your duties under the
          DPDP Act.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy to reflect changes in the law, our services or how we process data. The &quot;Last updated&quot; date
        at the top shows when it last changed. If a change materially affects how we use data you have already given us, we will tell
        you and, where required, ask for your consent again.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact and grievances",
    body: (
      <>
        <p>
          For questions about this policy, to exercise your rights, or to raise a privacy complaint, contact us. We aim to acknowledge
          complaints promptly and resolve them within the timelines set by law.
        </p>
        <LegalContact />
        <p>
          For complaints about an insurance policy or claim, see the grievance section of our <Link href="/terms#grievances">Terms of
          Use</Link>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro={
        <p>
          Insurance needs personal information, sometimes sensitive. This policy explains, in plain language, what we collect, why, who
          we share it with, and the rights you have over it.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
