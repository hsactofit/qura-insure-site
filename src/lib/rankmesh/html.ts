import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    "img", "figure", "figcaption", "picture", "source", "del", "ins", "sup", "sub",
    "details", "summary", "iframe",
  ],
  allowedAttributes: {
    a: ["href", "name", "target", "rel", "title"],
    img: ["src", "srcset", "sizes", "alt", "title", "width", "height", "loading"],
    source: ["srcset", "type", "media", "sizes"],
    iframe: ["src", "title", "width", "height", "allow", "allowfullscreen", "loading"],
    th: ["colspan", "rowspan", "align", "scope"],
    td: ["colspan", "rowspan", "align"],
    code: ["class"],
    pre: ["class"],
    span: ["class"],
    ol: ["start", "type", "reversed"],
    "*": ["id"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["http", "https"], source: ["http", "https"], iframe: ["https"] },
  allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"],
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) =>
      attribs.target === "_blank"
        ? { tagName, attribs: { ...attribs, rel: "noopener noreferrer" } }
        : { tagName, attribs },
    img: (tagName, attribs) => ({ tagName, attribs: { loading: "lazy", ...attribs } }),
  },
};

/** Sanitize the supplied HTML body, falling back to rendered Markdown. Scripts and handlers are removed. */
export function renderArticleHtml(html: string | null, markdown: string | null): string {
  const source = html !== null && html.trim() !== ""
    ? html
    : markdown !== null
      ? (marked.parse(markdown, { async: false, gfm: true }) as string)
      : "";
  return sanitizeHtml(source, SANITIZE_OPTIONS);
}
