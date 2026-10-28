import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/rankmesh/config.server";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
