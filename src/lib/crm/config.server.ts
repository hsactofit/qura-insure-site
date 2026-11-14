import "server-only";

/**
 * Qura CRM lead intake. SERVER-ONLY.
 *
 * The enquiry form posts to this site's /api/enquiry route, which forwards to the CRM with the
 * shared key below (header X-Site-Key). The same value must be set as WEBSITE_LEAD_KEY on the CRM
 * server. Embedded as a fallback because the host cannot set environment variables (see
 * lib/rankmesh/config.server.ts); never import this from a "use client" module, return it or log it.
 */
export const CRM_ENQUIRY_URL =
  process.env.QURA_CRM_ENQUIRY_URL || "https://quracrmapi.leadrizz.com/api/v1/public/enquiries";

export const CRM_SITE_KEY =
  process.env.QURA_CRM_SITE_KEY || "qsl_xnCSZ11JSiT8K7SoPAjw4-RYZXH0nlcYLS-a2sTaChE";
