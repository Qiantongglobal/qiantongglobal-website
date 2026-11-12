import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, FileDown, Mail } from "lucide-react";
import { useLanguage } from "@/components/LanguageSwitcher";
import { Reveal } from "@/components/Reveal";
import { Seo, SITE_URL } from "@/components/Seo";
import { categories, skuPath, totalSku } from "@/lib/products";

export default function ProductsPage() {
  const { t } = useLanguage();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Medical consumables supplied by Qiantong Global",
    numberOfItems: totalSku,
    itemListElement: categories.flatMap((category, ci) =>
      category.skus.map((sku, si) => ({
        "@type": "ListItem",
        position: ci * 100 + si + 1,
        name: sku.name,
        url: `${SITE_URL}${skuPath(category, sku)}`,
      })),
    ),
  };

  return (
    <div>
      <Seo title={t("products_title")} description={t("products_desc")} path="/products" jsonLd={jsonLd} />

      {/* Page head */}
      <section className="bg-white pt-28 pb-10 md:pt-32 md:pb-12">
        <div className="container-custom">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              {t("nav_home")}
            </Link>
            <ChevronRight size={12} className="text-[#B4C2BE]" />
            <span className="text-foreground">{t("nav_products")}</span>
          </nav>

          <div className="mt-7 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] gap-5 lg:gap-16 lg:items-end">
            <div>
              <span className="eyebrow">{t("products_label")}</span>
              <h1 className="h2-section mt-3 max-w-[24ch]">{t("products_title")}</h1>
            </div>
            <div>
              <p className="lead lg:pb-1.5">{t("products_desc")}</p>
              <a
                href="/qiantong-global-catalogue-2026.pdf"
                download="Qiantong-Global-Catalogue-2026.pdf"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-primary transition-colors hover:text-[#00463E]"
              >
                <FileDown size={14} className="shrink-0" />
                {t("catalogue_dl")}
                <span className="font-mono text-[11px] font-normal tracking-[0.06em] text-muted-foreground">
                  · {t("catalogue_meta")}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white pb-16 md:pb-20">
        <div className="container-custom">
          <div className="border-t border-[#E2E8E6]">
            {categories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 50}>
                <article className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[290px_minmax(0,1fr)] gap-6 md:gap-10 py-10 md:py-12 border-b border-[#E2E8E6]">
                  <div className="relative flex items-center justify-center bg-white rounded-sm overflow-hidden aspect-[16/10] md:aspect-[5/4] ring-1 ring-inset ring-[#E9E7DF]">
                    <img
                      src={cat.image}
                      alt={t(cat.titleKey)}
                      loading="lazy"
                      className="w-[88%] h-[88%] object-contain object-center drop-shadow-[0_16px_26px_rgba(11,47,42,0.20)]"
                    />
                    <span className="absolute left-3.5 top-3 font-mono text-[11px] tracking-[0.14em] text-[#9E7120]/55">
                      {cat.no}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
                      <h2 className="text-[1.25rem] md:text-[1.35rem] font-semibold text-foreground tracking-[-0.015em]">
                        {t(cat.titleKey)}
                      </h2>
                      <span className="meta-label">
                        {cat.count} {t("prod_pcs")} · CE MDR 2017/745 · OEM / ODM
                      </span>
                    </div>

                    <p className="mt-3 text-[15px] text-muted-foreground leading-[1.7] max-w-3xl">
                      {t(cat.descKey)}
                    </p>

                    <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-1">
                      {cat.skus.map((sku) => (
                        <li key={sku.code}>
                          <Link
                            to={skuPath(cat, sku)}
                            className="group/li flex items-baseline gap-2 min-w-0 py-1.5 -my-0.5"
                          >
                            <span className="font-mono text-[11px] text-[#0A5B51]/75 w-[74px] shrink-0 tabular-nums">
                              {sku.code}
                            </span>
                            <span className="text-[14px] text-foreground/[0.88] leading-snug group-hover/li:text-primary transition-colors">
                              {sku.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Closing note + contact */}
          <Reveal>
            <div className="mt-12 md:mt-14 border border-[#E2E8E6] bg-[#F7F9F8] rounded-sm px-6 py-8 md:px-9 md:py-9">
              <h2 className="h3-card">{t("cta_title")}</h2>
              <p className="mt-2.5 text-[14.5px] text-muted-foreground leading-[1.7] max-w-2xl">
                {t("cta_desc")}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href={`mailto:${t("cta_email")}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-[13.5px] font-semibold rounded-sm hover:bg-[#00594F] transition-colors"
                >
                  <Mail size={15} />
                  {t("request_quote")}
                  <ArrowRight size={14} />
                </a>
                <span className="text-[13px] text-muted-foreground">{t("cta_whatsapp")}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
