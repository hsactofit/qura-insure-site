import { handleSyncCallback } from "@/lib/rankmesh/callback";
import { RANKMESH_SYNC_TOKEN } from "@/lib/rankmesh/config.server";
import { contentStore } from "@/lib/rankmesh/store.server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Only POST is exported, so Next.js answers other methods with 405.
export function POST(request: Request) {
  return handleSyncCallback(request, { token: RANKMESH_SYNC_TOKEN, forceSync: contentStore.forceSync });
}
