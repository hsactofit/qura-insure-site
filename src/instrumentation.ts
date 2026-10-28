export async function register() {
  // Warm the RankMesh Content snapshot when a Node.js server process starts.
  // Blog requests still hydrate on demand if this is skipped or fails.
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.NEXT_PHASE === "phase-production-build") return;
  const { contentStore } = await import("./lib/rankmesh/store.server");
  contentStore.ensureFreshSnapshot().catch(() => {});
}
