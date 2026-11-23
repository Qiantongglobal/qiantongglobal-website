import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageSwitcher";
import { Reveal } from "@/components/Reveal";
import { Seo, SITE_URL } from "@/components/Seo";
import { findCategory, skuApplication, skuName, skuPath } from "@/lib/products";
import { categoryCopy } from "@/lib/category-copy";

/**
 * Category landing page: /products/<category>/
 *
 * Owner-approved copy (2026-11-23) rendered around the same SKU-card pattern
 * the rest of the catalogue uses. The copy stays in English by design — these
 * pages target English-language search; UI chrome (breadcrumb, buttons)
 * follows the interface language like everywhere else.
 */
export default function CategoryPage() {
  const { t, lang } = useLanguage();
  const { categoryId = "" } = useParams();
  const category = findCategory(categoryId);

  if (!category) return <Navigate to="/products" replace />;
  const copy = categoryCopy[category.id];

  if (!copy) return <Navigate to="/products" replace />;

  const path = `/products/${category.id}`;
  const quoteHref = `/?code=${encodeURIComponent(category.id)}#contact`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: copy.h1,
      description: copy.metaDescription,
      url: `${SITE_URL}${path}`,
      isPartOf: { "@type": "WebSite", name: "Qiantong Global", url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
        { "@type": "ListItem", position: 3, name: copy.h1, item: `${SITE_URL}${path}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: copy.h1,
      numberOfItems: category.skus.length,
      itemListElement: category.skus.map((sku, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: skuName(sku, "en"),
        url: `${SITE_URL}${skuPath(category, sku)}`,
      })),
    },
  ];

  // Body copy stays English even when the UI language differs, so the SEO
  // page never shows a half-translated wall of text.
  const crumbName = lang === "en" ? copy.h1 : t(category.titleKey);

  return (
    <div>
      <Seo title={copy.seoTitle} description={copy.metaDescription} path={path} jsonLd={jsonLd} />

      {/* Head */}
      <section className="bg-white pt-28 pb-10 md:pt-32 md:pb-12">
        <div className="container-custom">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-muted-foreground"
          >
            <Link to="/" className="hover:text-foreground transition-colors">
              {t("nav_home")}
            </Link>
            <ChevronRight size={12} className="text-[#B4C2BE]" />
            <Link to="/products" className="hover:text-foreground transition-colors">
              {t("nav_products")}
            </Link>
            <ChevronRight size={12} className="text-[#B4C2BE]" />
            <span className="text-foreground">{crumbName}</span>
          </nav>

          <span className="eyebrow mt-7 block">{t(category.titleKey)}</span>
          <h1 className="h2-section mt-3 max-w-[26ch]">{copy.h1}</h1>
          <p className="mt-5 text-[16px] md:text-[17px] text-muted-foreground leading-[1.72] max-w-[70ch]">
            {copy.intro}
          </p>
        </div>
      </section>

      {/* Approved body copy */}
      <section className="bg-white pb-14 md:pb-16">
        <div className="container-custom">
          <div className="border-t border-[#E2E8E6] pt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {copy.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-[17px] md:text-[18px] font-semibold text-foreground tracking-[-0.01em]">
                  {section.heading}
                </h2>
                <p className="mt-3 text-[14px] text-muted-foreground leading-[1.75]">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-[#F7F9F8] py-14 md:py-16">
        <div className="container-custom">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="h3-card">{t("nav_products")}</h2>
              <span className="meta-label">
                {category.count} {t("prod_pcs")} · CE MDR 2017/745 · OEM / ODM
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.skus.map((sku) => (
                <Link
                  key={sku.code}
                  to={skuPath(category, sku)}
                  className="group border border-[#E2E8E6] rounded-sm bg-white overflow-hidden hover:border-[#C3D3CE] hover:bg-[#FAFCFB] transition-colors"
                >
                  <div className="relative aspect-[4/3] bg-white flex items-center justify-center border-b border-[#EDF1F0]">
                    {sku.image ? (
                      <img
                        src={sku.image}
                        alt={skuName(sku, lang)}
                        width={sku.imageW}
                        height={sku.imageH}
                        loading="lazy"
                        className="w-[82%] h-[82%] object-contain object-center"
                      />
                    ) : (
                      <span className="font-mono text-[1.35rem] text-[#0B2F2A]/85 tracking-[0.04em] tabular-nums">
                        {sku.code}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="font-mono text-[11px] text-[#0A5B51]/85 tabular-nums">{sku.code}</div>
                    <div className="mt-1.5 text-[14px] font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
                      {skuName(sku, lang)}
                    </div>
                    <p className="mt-2 text-[12px] text-muted-foreground leading-[1.6] line-clamp-3">
                      {skuApplication(sku, lang)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14 md:py-16">
        <div className="container-custom">
          <Reveal>
            <div className="border border-[#E2E8E6] rounded-sm bg-[#F7F9F8] px-6 md:px-10 py-8 flex flex-col md:flex-row md:items-center gap-6 justify-between">
              <div>
                <h2 className="h3-card">{t("request_quote")}</h2>
                <p className="mt-2 text-[14px] text-muted-foreground leading-[1.7] max-w-[60ch]">
                  {t("products_desc")}
                </p>
              </div>
              <Link
                to={quoteHref}
                className="inline-flex items-center justify-center gap-2 shrink-0 px-7 py-3.5 bg-primary text-white text-[13.5px] font-semibold rounded-sm hover:bg-[#00594F] transition-colors"
              >
                {t("request_quote")}
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
