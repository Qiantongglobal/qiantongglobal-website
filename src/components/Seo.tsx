import { useEffect } from "react";

export const SITE_URL = "https://www.qiantongglobal.com";

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
  /** Ask crawlers not to index the page (e.g. the 404 route) */
  noindex?: boolean;
}

export interface SeoSnapshot {
  fullTitle: string;
  description: string;
  url: string;
  jsonLd: string;
  noindex: boolean;
}

/**
 * Head data is computed synchronously during render and stored here, so the
 * build-time prerenderer can read the correct title/canonical/JSON-LD for each
 * route from renderToString. In the browser the same values are applied to
 * document.head by the effect below (no head-management dependency needed).
 */
let lastSnapshot: SeoSnapshot | null = null;

/** Server-only: called before rendering a route during prerender. */
export function resetSeoSnapshot() {
  lastSnapshot = null;
}

/** Server-only: read the head data captured by the Seo component. */
export function takeSeoSnapshot(): SeoSnapshot | null {
  const snapshot = lastSnapshot;
  lastSnapshot = null;
  return snapshot;
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

export function Seo({ title, description, path, jsonLd, noindex }: SeoProps) {
  const fullTitle = title ? `${title} | Qiantong Global` : DEFAULT_TITLE;
  const desc = description ?? DEFAULT_DESCRIPTION;
  const url = `${SITE_URL}${path ?? "/"}`;
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : "";

  // Render phase — runs during SSR too, so the prerenderer can pick it up.
  lastSnapshot = { fullTitle, description: desc, url, jsonLd: jsonLdString, noindex: !!noindex };

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

    document.head
      .querySelectorAll<HTMLScriptElement>('script[data-page-seo="true"]')
      .forEach((el) => el.remove());

    if (jsonLdString) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.pageSeo = "true";
      script.textContent = jsonLdString;
      document.head.appendChild(script);
    }
  }, [fullTitle, desc, url, jsonLdString]);

  return null;
}
