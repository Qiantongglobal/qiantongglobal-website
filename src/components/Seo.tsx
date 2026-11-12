import { useEffect } from "react";

export const SITE_URL = "https://qiantongglobal.com";

/** Site-wide fallback, matching the tags in index.html */
const DEFAULT_TITLE = "Qiantong Global — Medical Consumables Supply Chain Partner";
const DEFAULT_DESCRIPTION =
  "Medical consumables supply chain partner in Changyuan, China — the source of roughly 60% of China's output. CE-certified factories, on-site verification, OEM and ODM.";

interface SeoProps {
  /** Page title without the brand suffix */
  title?: string;
  description?: string;
  /** Path starting with a slash, used for the canonical URL */
  path?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function upsertMeta(key: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * A single-page app renders one shell for every route, so the head tags have to
 * be written at runtime. Crawlers that execute JavaScript pick these up; the
 * sitemap and canonical keep each URL distinct in the meantime.
 */
export function Seo({ title, description, path, jsonLd }: SeoProps) {
  const fullTitle = title ? `${title} | Qiantong Global` : DEFAULT_TITLE;
  const desc = description ?? DEFAULT_DESCRIPTION;
  const url = `${SITE_URL}${path ?? "/"}`;
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    document.title = fullTitle;
    upsertMeta("description", desc);
    upsertMeta("og:title", fullTitle, "property");
    upsertMeta("og:description", desc, "property");
    upsertMeta("og:url", url, "property");

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    if (!jsonLdString) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.pageSeo = "true";
    script.textContent = jsonLdString;
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [fullTitle, desc, url, jsonLdString]);

  return null;
}
