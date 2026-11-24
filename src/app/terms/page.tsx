import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalContact, type LegalSection } from "@/components/Legal/LegalPage";
import { IRDAI_REGISTRATION, LEGAL_ENTITY } from "@/data/content";

const TITLE = "Terms of Use | Qura Insure";
const DESCRIPTION =
  "The terms that apply when you use the Qura Insure website and advisory services, including our role as an IRDAI Corporate Agent and how to raise a grievance.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  openGraph: { type: "website", url: "/terms", title: TITLE, description: DESCRIPTION },
};

const name = LEGAL_ENTITY.legalName || LEGAL_ENTITY.brandName;
const reg = IRDAI_REGISTRATION.registrationNumber;

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    body: (
      <>
        <p>
          These Terms of Use (&quot;Terms&quot;) govern your use of {LEGAL_ENTITY.website.replace(/^https?:\/\//, "")}, its sub-domains
          and portals (the &quot;Website&quot;), and the advisory, policy servicing and claims assistance services we provide (the
          &quot;Services&quot;). They form an agreement between you and {name} (&quot;Qura&quot;, &quot;we&quot;, &quot;us&quot;).
        </p>
        <p>
          By using the Website or Services, you agree to these Terms and to our <Link href="/privacy">Privacy Policy</Link>. If you do not
          agree, please do not use them. You must be at least 18 years old and able to enter a binding contract under Indian law to use
          the Services.
        </p>
      </>
    ),
  },
  {
    id: "our-role",
    title: "Our role as a Corporate Agent",
    body: (
      <>
        <p>
          {name} is registered with the Insurance Regulatory and Development Authority of India (IRDAI) as a Corporate Agent
          {reg ? <> (Registration No. {reg})</> : null}. We solicit and arrange insurance on behalf of the insurers we have tie-ups with,
          as permitted by our registration.
        </p>
        <ul>
          <li>
            <strong>We are not an insurer.</strong> Insurance contracts are between you and the insurer. The insurer alone decides whether
            to accept a proposal, the premium and terms offered, and whether and how much to pay on a claim.
          </li>
          <li>
            <strong>Insurance is the subject matter of solicitation.</strong> Product information on the Website is a summary. The policy
            wording, prospectus and sales brochure issued by the insurer are the final word on benefits, exclusions, waiting periods and
            conditions. Please read them carefully before buying.
          </li>
          <li>
            We can only offer products from insurers we are tied up with, so our recommendations do not cover every product on the
            market.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "fees",
    title: "Fees and payments",
    body: (
      <>
        <p>
          Our advisory service is free to you. We are paid commission or remuneration by insurers, within the limits IRDAI allows, when a
          policy is bought through us. This does not increase the premium you pay. You can ask us about the remuneration we receive on a
          product you are considering.
        </p>
        <p>
          <strong>Pay premiums only to the insurer</strong>, through the insurer&apos;s own payment link, website or a regulated payment
          gateway, or by cheque or transfer in the insurer&apos;s name. Never pay into the personal account of any employee or person
          claiming to represent us. We will never ask for your OTP, PIN, CVV or banking password.
        </p>
        <p>
          Under Section 41 of the Insurance Act, 1938, no one may offer you a rebate on the premium or any other inducement to buy a
          policy. We do not offer rebates, and you should not accept them from anyone.
        </p>
      </>
    ),
  },
  {
    id: "your-responsibilities",
    title: "Your responsibilities",
    body: (
      <>
        <ul>
          <li>
            <strong>Give complete and true information.</strong> Insurance contracts are based on utmost good faith. You must disclose all
            material facts, including your health, habits, occupation, income and existing policies, accurately in the proposal form.
            Wrong or missing information can lead the insurer to reject a claim or cancel the policy, subject to Section 45 of the
            Insurance Act, 1938.
          </li>
          <li>
            <strong>Check your documents.</strong> Review the proposal form before signing and the policy document when you receive it,
            and tell us or the insurer straight away if anything is wrong.
          </li>
          <li>
            <strong>Pay premiums on time</strong> and keep track of renewal dates. We send reminders as a courtesy, but continuing cover is
            your responsibility.
          </li>
          <li>
            <strong>Share only data you are entitled to share.</strong> If you give us details of family members, nominees or employees,
            you confirm that you are authorised to do so.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "free-look",
    title: "Free-look period and cancellation",
    body: (
      <p>
        Most life and health insurance policies come with a free-look period (currently 30 days from receipt of the policy document for
        most such policies, as set by IRDAI). During this period you can review the terms and return the policy if you disagree with
        them. The insurer refunds the premium after deductions allowed by IRDAI, such as for the period of cover, medical tests and stamp
        duty. Your policy document states the exact period and process; we will help you make the request. Cancellation after the
        free-look period follows the policy terms.
      </p>
    ),
  },
  {
    id: "claims",
    title: "Claims assistance",
    body: (
      <>
        <p>
          We help you understand the claim process, prepare and submit documents, and follow up with the insurer or its third-party
          administrator (TPA). Claims are assessed and settled by the insurer under the policy terms and IRDAI regulations.
        </p>
        <p>
          We cannot guarantee that a claim will be approved, or the amount or timing of a settlement. Please inform the insurer of a
          claim within the time the policy requires; telling us is not a substitute for notifying the insurer where the policy requires
          direct notice.
        </p>
      </>
    ),
  },
  {
    id: "website-content",
    title: "Website content, tools and guides",
    body: (
      <>
        <p>
          Articles, guides, product pages and the <Link href="/tools/coverage-check">Coverage Check</Link> calculator are for general
          information. They are not a personalised recommendation, an offer of insurance or tax, legal or investment advice. Calculator
          results are estimates based on the assumptions shown and the figures you enter.
        </p>
        <p>
          Tax benefits mentioned are under the Income-tax Act as in force at the time of writing, are subject to change, and depend on
          your circumstances. Premiums, features and insurer information change often; we try to keep the Website accurate but do not
          guarantee that it is complete or current.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>When using the Website, you agree not to:</p>
        <ul>
          <li>submit false, misleading or another person&apos;s details without their authority;</li>
          <li>use the Website for any unlawful or fraudulent purpose, including insurance fraud;</li>
          <li>
            attempt to gain unauthorised access to the Website, our portals or systems, or interfere with their security or operation;
          </li>
          <li>upload malware, or send spam or automated enquiries;</li>
          <li>scrape, copy or harvest content or data from the Website by automated means without our written permission.</li>
        </ul>
        <p>Access to the client and employee portals is personal. Keep your login details confidential and tell us at once of any misuse.</p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <p>
        The Qura Insure name, logos, design, text, graphics and software on the Website belong to us or our licensors and are protected by
        Indian and international law. You may view and print pages for your personal, non-commercial use. You may not copy, modify,
        republish or use them commercially without our written permission. Insurer names and logos belong to their respective owners.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "Third-party websites",
    body: (
      <p>
        The Website may link to insurer websites, payment gateways, regulators and other third-party sites. We do not control them and
        are not responsible for their content, availability or privacy practices. Your use of them is governed by their own terms.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Disclaimers and limitation of liability",
    body: (
      <>
        <p>
          The Website is provided &quot;as is&quot; and &quot;as available&quot;. We do not warrant that it will be uninterrupted, error-free
          or free of harmful components.
        </p>
        <p>
          To the extent the law allows, we are not liable for any indirect, incidental, special or consequential loss arising from your use
          of the Website or from information on it, or for decisions made by insurers on proposals, premiums or claims. Nothing in these
          Terms limits liability that cannot be limited by law, or your rights as a policyholder or consumer under the Insurance Act, 1938,
          IRDAI regulations or the Consumer Protection Act, 2019.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    body: (
      <p>
        You agree to indemnify us against claims, losses and costs arising from your breach of these Terms, any false information you
        provide, or your misuse of the Website, to the extent caused by you.
      </p>
    ),
  },
  {
    id: "grievances",
    title: "Grievance redressal",
    body: (
      <>
        <p>If you have a complaint about our service, a policy or a claim, here is how to raise it:</p>
        <ol>
          <li>
            <strong>Contact us</strong> using the details below. We will acknowledge your complaint and work to resolve it, including
            taking it up with the insurer where needed.
          </li>
          <li>
            <strong>Contact the insurer&apos;s grievance redressal officer.</strong> Their details are in your policy document and on the
            insurer&apos;s website. Insurers must resolve complaints within the time IRDAI sets.
          </li>
          <li>
            <strong>Escalate to IRDAI</strong> through the Bima Bharosa portal at{" "}
            <a href="https://bimabharosa.irdai.gov.in" target="_blank" rel="noopener noreferrer">
              bimabharosa.irdai.gov.in
            </a>{" "}
            or the IRDAI toll-free number 155255, if you are not satisfied with the insurer&apos;s response.
          </li>
          <li>
            <strong>Approach the Insurance Ombudsman</strong> for your area, free of charge, under the Insurance Ombudsman Rules, 2017.
            Details are at{" "}
            <a href="https://www.cioins.co.in" target="_blank" rel="noopener noreferrer">
              cioins.co.in
            </a>
            .
          </li>
        </ol>
        <LegalContact />
      </>
    ),
  },
  {
    id: "law",
    title: "Governing law and disputes",
    body: (
      <p>
        These Terms are governed by the laws of India. Subject to your right to approach the Insurance Ombudsman, a consumer commission or
        IRDAI, disputes arising from these Terms are subject to the exclusive jurisdiction of the courts
        {LEGAL_ENTITY.jurisdictionCity ? <> at {LEGAL_ENTITY.jurisdictionCity}</> : <> having jurisdiction over our registered office</>}.
      </p>
    ),
  },
  {
    id: "general",
    title: "Changes and general terms",
    body: (
      <>
        <p>
          We may update these Terms from time to time. The &quot;Last updated&quot; date at the top shows when they last changed; your
          continued use of the Website after a change means you accept the updated Terms.
        </p>
        <p>
          If any part of these Terms is found invalid or unenforceable, the rest remains in effect. Our not enforcing a right is not a
          waiver of it. These Terms, together with the Privacy Policy, are the entire agreement between us about the Website; policy terms
          are governed by the insurer&apos;s policy document.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      intro={
        <p>
          The terms that apply when you use our website and services: what we do as an IRDAI-registered Corporate Agent, what we
          don&apos;t, and how to reach us if something goes wrong.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
