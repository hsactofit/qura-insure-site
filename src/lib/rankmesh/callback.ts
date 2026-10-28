import { createHash, timingSafeEqual } from "node:crypto";
import type { SyncResult } from "./content-store";

const MAX_BODY_BYTES = 1024;

const digest = (value: string) => createHash("sha256").update(value, "utf8").digest();

/** Constant-time token comparison that is safe for unequal lengths. */
export function tokensMatch(provided: string, expected: string): boolean {
  const lengthsMatch = provided.length === expected.length;
  return timingSafeEqual(digest(provided), digest(expected)) && lengthsMatch;
}

const reply = (status: number, body: Record<string, unknown>) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

async function bodyWithinLimit(request: Request): Promise<boolean> {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) return false;
  if (!request.body) return true;
  const reader = request.body.getReader();
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) return true;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel().catch(() => {});
      return false;
    }
  }
}

/**
 * POST /api/rankmesh-content/sync. The body ({}) carries no instructions:
 * a valid call always means "fetch the full collection now".
 */
export async function handleSyncCallback(
  request: Request,
  deps: { token: string; forceSync: () => Promise<SyncResult> },
): Promise<Response> {
  const provided = request.headers.get("x-rankmesh-sync-token");
  if (!provided || !tokensMatch(provided, deps.token)) {
    return reply(401, { status: "unauthorized" });
  }
  if (!(await bodyWithinLimit(request))) {
    return reply(413, { status: "error", message: "Request body too large" });
  }
  try {
    const { articleCount } = await deps.forceSync();
    return reply(200, { status: "synced", article_count: articleCount });
  } catch (error) {
    const kind = (error as { kind?: string }).kind;
    const status = kind === "timeout" ? 504 : kind === "rate_limited" ? 503 : 502;
    return reply(status, { status: "error", message: "Content refresh failed; previous content kept" });
  }
}
