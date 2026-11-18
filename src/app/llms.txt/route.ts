import { isContentUnavailable } from "@/lib/rankmesh/content-store";
import { SITE_URL, articlePath } from "@/lib/rankmesh/config.server";
import { contentStore } from "@/lib/rankmesh/store.server";
import { ABOUT_DEFINITION } from "@/data/content";
import { LEGAL_PAGES, SERVICE_PAGES } from "@/data/site";
import { TEAM, teamPath } from "@/data/team";

export const dynamic = "force-dynamic";

/** /llms.txt (https://llmstxt.org): a curated map of the site for AI assistants. */
export async function GET() {
  let articles: { title: string; slug: string; excerpt: string | null }[] = [];
  try {
    articles = [...(await contentStore.ensureFreshSnapshot()).articles];
  } catch (error) {
    // Still serve the static sections if the blog source is temporarily unreachable.
    if (!isContentUnavailable(error)) throw error;
  }

  const line = (title: string, url: string, note?: string | null) => `- [${title}](${url})${note ? `: ${note.replace(/\s+/g, " ").trim()}` : ""}`;
  const body = [
    "# Qura Insure",
    "",
    `> ${ABOUT_DEFINITION}`,
    "",
    "Qura Insure charges no advisory fee; it is paid a commission by the insurer that is already included in the premium. Insurance is the subject matter of solicitation.",
    "",
    "## Services",
    ...SERVICE_PAGES.map((p) => line(p.name, `${SITE_URL}${p.path}`)),
    "",
    "## Insurance guides",
    ...(articles.length ? articles.map((a) => line(a.title, `${SITE_URL}${articlePath(a.slug)}`, a.excerpt)) : [line("Blog", `${SITE_URL}/blog`)]),
    "",
    "## About",
    line("Homepage", `${SITE_URL}/`),
    line("Frequently asked questions", `${SITE_URL}/#faq`),
    ...TEAM.map((m) => line(`${m.name}, ${m.jobTitle}`, `${SITE_URL}${teamPath(m.slug)}`)),
    "",
    "## Policies",
    ...LEGAL_PAGES.map((p) => line(p.name, `${SITE_URL}${p.path}`)),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
