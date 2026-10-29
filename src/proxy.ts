import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { AI_BOTS, RANKMESH_BOT_TRACK_URL, RANKMESH_PROJECT_ID } from "@/lib/rankmesh/config.server";
import { isContentUnavailable } from "@/lib/rankmesh/content-store";
import { contentStore } from "@/lib/rankmesh/store.server";

/**
 * All pages: report AI crawler visits to RankMesh in the background.
 *
 * Blog routes: hydrate/refresh the in-memory snapshot before rendering, and
 * answer 503 (pages cannot set that status themselves) when no snapshot has
 * ever been loaded and RankMesh is unreachable.
 */
export async function proxy(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  const ua = req.headers.get("user-agent") ?? "";
  if (AI_BOTS.some((bot) => ua.includes(bot))) {
    event.waitUntil(
      fetch(RANKMESH_BOT_TRACK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: RANKMESH_PROJECT_ID, page: pathname, ua, timestamp: Date.now() }),
        signal: AbortSignal.timeout(5000),
      }).catch(() => {}),
    );
  }

  if (pathname !== "/blog" && !pathname.startsWith("/blog/")) return NextResponse.next();

  try {
    await contentStore.ensureFreshSnapshot();
  } catch (error) {
    if (!isContentUnavailable(error)) throw error;
    return new NextResponse(UNAVAILABLE_HTML, {
      status: 503,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Retry-After": String(error.retryAfterSeconds),
        "Cache-Control": "no-store",
      },
    });
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next|api|favicon|.*\\..*).*)"] };

const UNAVAILABLE_HTML = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Blog temporarily unavailable | Qura Insure</title>
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F2F8FF;color:#0A2342;font-family:"Inclusive Sans",ui-sans-serif,system-ui,-apple-system,sans-serif;padding:24px}
main{max-width:34rem;text-align:center;background:rgba(255,255,255,.76);border:1px solid #C2C8D0;border-radius:2rem;padding:48px 32px;box-shadow:0 24px 70px rgba(11,36,66,.07)}
img{height:40px;width:auto;margin-bottom:28px}h1{font-size:1.75rem;margin:0 0 12px;letter-spacing:-.03em}p{color:#4A697D;line-height:1.6;margin:0 0 28px}
a{display:inline-block;background:#0A2342;color:#fff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:999px}
</style></head><body><main>
<img src="/logos/Colour%20Secondary%20Logo.svg" alt="Qura Insure">
<h1>Our blog is taking a short break</h1>
<p>We couldn't load our articles just now. Please try again in a minute.</p>
<a href="/">Back to Qura Insure</a>
</main></body></html>`;
