import Link from "next/link";
import { BUSINESS } from "@/data/site";

/** How to reach Qura Insure; uses the published email/phone once they are configured. */
export default function ContactLine() {
  if (BUSINESS.email || BUSINESS.telephone) {
    return (
      <>
        {BUSINESS.email && <>email <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></>}
        {BUSINESS.email && BUSINESS.telephone && " or "}
        {BUSINESS.telephone && <>call <a href={`tel:${BUSINESS.telephone}`}>{BUSINESS.telephone}</a></>}
      </>
    );
  }
  return <>use the <Link href="/#contact">enquiry form on our homepage</Link></>;
}
