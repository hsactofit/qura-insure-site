import { CRM_ENQUIRY_URL, CRM_SITE_KEY } from "@/lib/crm/config.server";
import { INSURANCE_MENU } from "@/data/content";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MOBILE_RE = /^(\+?91)?[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INTERESTS: string[] = [...INSURANCE_MENU.map((item) => item.title), "Not sure yet"];
// Values the CRM's productInterest field is known to accept. Newer plan types are passed in the message instead.
const CRM_INTERESTS = ["Term Life Insurance", "Health Insurance", "Corporate Plans", "Motor Insurance"];

// Light per-instance throttle: 5 enquiries per IP per 10 minutes.
const WINDOW_MS = 10 * 60_000;
const hits = new Map<string, number[]>();
function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const fail = (message: string, status = 400) => Response.json({ ok: false, message }, { status });

// Only POST is exported, so Next.js answers other methods with 405.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid request.");
  }

  // Honeypot: real visitors never see or fill this field. Pretend success to bots.
  if (str(body.company, 200)) return Response.json({ ok: true });

  const ip = (request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (throttled(ip)) return fail("Too many requests. Please try again in a few minutes.", 429);

  const name = str(body.name, 120);
  const mobile = str(body.mobile, 20).replace(/[\s\-()]/g, "");
  const email = str(body.email, 200);
  const productInterest = str(body.productInterest, 120);
  const message = str(body.message, 1000);
  if (name.length < 2) return fail("Please enter your name.");
  if (!MOBILE_RE.test(mobile)) return fail("Please enter a valid 10-digit mobile number.");
  if (email && !EMAIL_RE.test(email)) return fail("Please enter a valid email address.");
  if (productInterest && !INTERESTS.includes(productInterest)) return fail("Please choose what you're interested in.");

  const crmInterest = CRM_INTERESTS.includes(productInterest) ? productInterest : undefined;
  const extraInterest = productInterest && !crmInterest && productInterest !== "Not sure yet" ? `Interested in: ${productInterest}` : "";
  const fullMessage = [extraInterest, message].filter(Boolean).join("\n");

  const utm: Record<string, string> = {};
  if (body.utm && typeof body.utm === "object") {
    for (const [k, v] of Object.entries(body.utm as Record<string, unknown>)) {
      if (/^(utm_[a-z]+|gclid|fbclid)$/.test(k)) utm[k] = str(v, 200);
    }
  }

  try {
    const res = await fetch(CRM_ENQUIRY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Site-Key": CRM_SITE_KEY },
      body: JSON.stringify({
        name,
        mobile,
        email: email || undefined,
        productInterest: crmInterest,
        message: fullMessage || undefined,
        page: str(body.page, 300) || undefined,
        utm,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (res.ok) return Response.json({ ok: true });
    console.error(`enquiry: CRM responded ${res.status}`);
    if (res.status === 400) {
      const data = await res.json().catch(() => null);
      return fail(data?.error?.message || "Please check your details and try again.");
    }
  } catch (err) {
    console.error("enquiry: CRM unreachable", (err as Error)?.message);
  }
  return fail("We couldn't send your request right now. Please try again shortly.", 502);
}
