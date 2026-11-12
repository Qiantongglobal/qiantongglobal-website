import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, ChevronRight, Mail } from "lucide-react";
import { useLanguage } from "@/components/LanguageSwitcher";
import { Reveal } from "@/components/Reveal";
import { Seo, SITE_URL } from "@/components/Seo";
import { findSku, relatedSkus, skuPath } from "@/lib/products";

export default function ProductPage() {
  const { t } = useLanguage();
  const { categoryId = "", slug = "" } = useParams();
  const match = findSku(categoryId, slug);

  if (!match) return <Navigate to="/products" replace />;
  const { sku, category } = match;
  const related = relatedSkus(category, sku.code);

  const path = skuPath(category, sku);
  const description = `${sku.name} (${sku.code}) from Qiantong Global — ${sku.application}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
        { "@type": "ListItem", position: 3, name: category.name, item: `${SITE_URL}/products/${category.id}` },
        { "@type": "ListItem", position: 4, name: sku.name, item: `${SITE_URL}${path}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: sku.name,
      sku: sku.code,
      description: sku.application,
      category: category.name,
      brand: { "@type": "Brand", name: "Qiantong Global" },
      url: `${SITE_URL}${path}`,
    },
  ];

  const mailto = `mailto:${t("cta_email")}?subject=${encodeURIComponent(`Quotation request — ${sku.name} (${sku.code})`)}`;

  return (
    <div>
      <Seo
        title={`${sku.name} — ${sku.code}`}
        description={description}
        path={path}
        jsonLd={jsonLd}
      />

      {/* Breadcrumb */}
      <section className="bg-white pt-28 md:pt-32">
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
            <ChevronRight size={12} className="text-[#B4C2BE] hidden sm:block" />
            <span className="hidden sm:inline">{t(category.titleKey)}</span>
            <ChevronRight size={12} className="text-[#B4C2BE]" />
            <span className="text-foreground">{sku.name}</span>
          </nav>
        </div>
      </section>

      {/* Head */}
      <section className="bg-white pt-8 pb-14 md:pt-10 md:pb-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
            <div className="min-w-0 lg:order-2">
              <span className="eyebrow">{t(category.titleKey)}</span>
              <h1 className="h2-section mt-3 max-w-[26ch]">{sku.name}</h1>
              <p className="mt-5 text-[16px] md:text-[17px] text-muted-foreground leading-[1.72] max-w-[62ch]">
                {sku.application}
              </p>

              <dl className="mt-8 border-t border-[#E2E8E6] max-w-[30rem]">
                {[
                  { label: t("product_code"), value: sku.code, mono: true },
                  { label: t("product_category"), value: t(category.titleKey) },
                  { label: t("product_cert"), value: "CE MDR 2017/745" },
                ].map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-6 py-3.5 border-b border-[#EDF1F0]"
                  >
                    <dt className="text-[13px] text-muted-foreground">{fact.label}</dt>
                    <dd
                      className={`text-[13.5px] text-foreground text-right ${
                        fact.mono ? "font-mono tabular-nums tracking-[0.02em]" : "font-medium"
                      }`}
                    >
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href={mailto}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white text-[13.5px] font-semibold rounded-sm hover:bg-[#00594F] transition-colors"
                >
                  <Mail size={15} />
                  {t("request_quote")}
                  <ArrowRight size={14} />
                </a>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-6 py-3.5 border border-[#D2DBD8] text-foreground text-[13.5px] font-medium rounded-sm hover:bg-[#F5F9F8] transition-colors"
                >
                  {t("product_back")}
                </Link>
              </div>
            </div>

            {/* Code plate: the catalogue has one image per category, so the
                product page leads with the code instead of borrowing a photo
                that would misrepresent a single SKU. */}
            <div className="lg:order-1 lg:sticky lg:top-24">
              <div className="relative bg-[#0B2F2A] rounded-sm overflow-hidden aspect-[4/3] flex flex-col justify-between p-6 md:p-7">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-white/[0.5] uppercase">
                    {t("product_catalogue")}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.16em] text-white/[0.5]">
                    {category.no}
                  </span>
                </div>
                <div>
                  <div className="font-mono text-[1.5rem] md:text-[1.75rem] text-white tracking-[0.04em] tabular-nums">
                    {sku.code}
                  </div>
                  <div className="mt-2 text-[12.5px] text-white/[0.6] uppercase tracking-[0.12em]">
                    {t(category.titleKey)}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[12px] text-muted-foreground leading-[1.6]">
                {t("product_spec_note")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ordering notes */}
      <section className="bg-[#F7F9F8] py-14 md:py-16">
        <div className="container-custom">
          <Reveal>
            <h2 className="h3-card">{t("product_notes_title")}</h2>
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[t("product_note_1"), t("product_note_2"), t("product_note_3")].map((note) => (
                <li key={note} className="border-t border-[#D9E2DF] pt-4">
                  <p className="text-[14px] text-muted-foreground leading-[1.7]">{note}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white py-14 md:py-16">
        <div className="container-custom">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="h3-card">{t("product_related")}</h2>
              <Link
                to="/products"
                className="text-[13px] font-semibold text-primary hover:underline underline-offset-4"
              >
                {t("product_back")}
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((item) => (
                <Link
                  key={item.code}
                  to={skuPath(category, item)}
                  className="group border border-[#E2E8E6] rounded-sm p-5 hover:border-[#C3D3CE] hover:bg-[#FAFCFB] transition-colors"
                >
                  <div className="font-mono text-[11px] text-[#0A5B51]/75 tabular-nums">{item.code}</div>
                  <div className="mt-2 text-[14.5px] font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
                    {item.name}
                  </div>
                  <p className="mt-2 text-[12.5px] text-muted-foreground leading-[1.6] line-clamp-3">
                    {item.application}
                  </p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
