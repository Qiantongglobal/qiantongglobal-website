import {
  Shield,
  Factory,
  CheckCircle,
  Globe,
  Package,
  ClipboardCheck,
  AlertTriangle,
  Clock,
  Award,
  FileText,
  Mail,
  MessageCircle,
  User,
  MessageSquare,
  Building2,
  ArrowRight,
  ExternalLink,
  Loader2,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageSwitcher";
import { SectionHead } from "@/components/SectionHead";
import { useReveal } from "@/hooks/useReveal";
import { categories, additionalSourcing } from "@/lib/products";
import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjgqbjqk";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useReveal();
  return (
    <div
      ref={ref}
      className={`${className} reveal ${isVisible ? "active" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ContactForm() {
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        const errData = await res.json().catch(() => null);
        setError(errData?.error || "Failed to submit. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-sm p-8 border border-[#E2E8E6] h-full flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-[#EDF4F2] rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={32} className="text-[#0A5B51]" />
        </div>
        <h3 className="text-[19px] font-semibold text-foreground mb-2">
          {t("form_success_title")}
        </h3>
        <p className="text-[14.5px] text-muted-foreground mb-6 max-w-xs leading-[1.65]">
          {t("form_success_desc")}
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 bg-primary hover:bg-teal-700 text-white font-semibold rounded-sm transition-colors"
        >
          {t("form_send_another")}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-sm p-8 border border-[#E2E8E6] h-full">
      <h3 className="text-[17px] font-semibold text-foreground mb-6">
        {t("form_title")}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[13.5px] font-semibold text-foreground mb-2">
              {t("form_name")}
            </label>
            <input
              type="text"
              name="name"
              required
              className="field"
              placeholder={t("form_name_ph")}
            />
          </div>
          <div>
            <label className="block text-[13.5px] font-semibold text-foreground mb-2">
              {t("form_company")}
            </label>
            <input
              type="text"
              name="company"
              className="field"
              placeholder={t("form_company_ph")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[13.5px] font-semibold text-foreground mb-2">
              {t("form_email")}
            </label>
            <input
              type="email"
              name="email"
              required
              className="field"
              placeholder={t("form_email_ph")}
            />
          </div>
          <div>
            <label className="block text-[13.5px] font-semibold text-foreground mb-2">
              {t("form_phone")}
            </label>
            <input
              type="tel"
              name="phone"
              className="field"
              placeholder={t("form_phone_ph")}
            />
          </div>
        </div>

        <div>
          <label className="block text-[13.5px] font-semibold text-foreground mb-2">
            {t("form_product")}
          </label>
          <select
            name="product"
            className="field bg-white"
          >
            <option value="">{t("form_product_ph")}</option>
            <option value="non-woven">{t("form_product_1")}</option>
            <option value="gauze-cotton">{t("form_product_2")}</option>
            <option value="surgical-kits">{t("form_product_3")}</option>
            <option value="anesthesia">{t("form_product_5")}</option>
            <option value="lab">{t("form_product_6")}</option>
            <option value="custom">{t("form_product_4")}</option>
          </select>
        </div>

        <div>
          <label className="block text-[13.5px] font-semibold text-foreground mb-2">
            {t("form_message")}
          </label>
          <textarea
            name="message"
            required
            rows={4}
            className="field resize-none"
            placeholder={t("form_message_ph")}
          ></textarea>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-sm px-4 py-2.5">
            {error}
          </div>
        )}

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="privacy-consent"
            name="privacy_consent"
            required
            className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="privacy-consent" className="text-[12.5px] text-muted-foreground leading-[1.6]">
            {t("form_privacy_consent")}{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {t("form_privacy_policy_link")}
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 bg-primary hover:bg-[#00594F] text-white font-semibold rounded-sm transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              {t("form_submitting")}
            </>
          ) : (
            t("form_submit")
          )}
        </button>

        <p className="text-[12.5px] text-muted-foreground text-center">
          {t("form_note")}
        </p>
      </form>
    </div>
  );
}

export default function HomePage() {
  const { t, lang } = useLanguage();
  // Chinese sets tighter and breaks on any character, so balanced wrapping
  // splits compounds like 供应商 across two lines. Give it its own metrics.
  const isCJK = lang === "zh";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        id="home"
        className="relative flex items-center min-h-[100svh] bg-[#05332D]"
        style={{
          backgroundImage:
            "linear-gradient(158deg, #04241F 0%, #05352F 34%, #06463D 64%, #0A5B51 100%)",
        }}
      >
        <div className="relative container-custom pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28 md:pb-14">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className={`font-semibold text-white leading-[1.12] ${
                isCJK
                  ? "text-[1.75rem] sm:text-[2.3rem] md:text-[2.75rem] lg:text-[3.15rem] tracking-[-0.01em]"
                  : "text-[1.875rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.55rem] tracking-[-0.03em] [text-wrap:balance]"
              }`}
            >
              {t("hero_title")}{" "}
              <span className="text-white">{t("hero_title_highlight")}</span>
            </h1>

            <p className="mt-6 sm:mt-7 text-[1.0625rem] sm:text-[1.15rem] md:text-[1.25rem] text-white/[0.8] max-w-2xl mx-auto leading-[1.6]">
              {t("hero_desc_1")}{" "}
              <span className="text-white font-semibold">{t("hero_desc_percent")}</span>{" "}
              {t("hero_desc_2")}
            </p>

            <p className="mt-3.5 text-[14.5px] text-white/[0.55] tracking-[0.01em]">
              {t("hero_sub")}
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#00463E] font-semibold rounded-sm hover:bg-[#F1F6F4] transition-colors duration-200"
              >
                {t("hero_cta_quote")}
                <ArrowRight size={17} />
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/[0.32] text-white font-semibold rounded-sm hover:bg-white/[0.08] hover:border-white/[0.6] transition-colors duration-200"
              >
                {t("hero_cta_products")}
              </a>
            </div>

            {/* Certifications sit after the action now, as supporting proof
                rather than a interruption between the headline and the CTA. */}
            <div className="mt-9 sm:mt-11 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[13px] md:text-[14px] font-medium uppercase tracking-[0.1em] text-white/[0.82]">
              <span className="inline-flex items-center gap-2">
                <CheckCircle size={15} className="text-white/[0.62]" />
                CE MDR<span className="hidden sm:inline"> 2017/745</span>
              </span>
              <span className="hidden sm:block w-px h-3.5 bg-white/[0.3]" />
              <span className="inline-flex items-center gap-2">
                <Award size={15} className="text-white/[0.62]" />
                ISO 13485
              </span>
              <span className="hidden sm:block w-px h-3.5 bg-white/[0.3]" />
              <span className="inline-flex items-center gap-2">
                <BadgeCheck size={15} className="text-white/[0.62]" />
                CLASS I&ndash;IIb
              </span>
            </div>

            <div className="mt-10 sm:mt-14 pt-7 sm:pt-8 border-t border-white/[0.16] max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center gap-7 sm:gap-0">
                <div className="grid grid-cols-3 gap-4 sm:gap-0 flex-1">
                  {[
                    { value: t("stat_years"), label: t("stat_years_label") },
                    { value: t("stat_capacity"), label: t("stat_capacity_label") },
                    { value: t("stat_supply"), label: t("stat_supply_label") },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className={`text-left sm:text-center ${i > 0 ? "sm:border-l sm:border-white/[0.14]" : ""}`}
                    >
                      <div className="text-[1.5rem] sm:text-[1.6rem] font-semibold text-white tracking-tight leading-none whitespace-nowrap tnum">
                        {stat.value}
                      </div>
                      <div className="text-[10.5px] text-white/[0.52] mt-2.5 uppercase tracking-[0.12em] leading-[1.5]">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                {/* OEM/ODM is a capability, not a metric — it gets its own
                    block instead of sitting in the same row as three numbers. */}
                <div className="sm:pl-9 sm:border-l sm:border-white/[0.22] text-left">
                  <div className="text-[1.15rem] sm:text-[1.25rem] font-semibold text-white tracking-tight leading-none whitespace-nowrap">
                    {t("stat_quality")}
                  </div>
                  <div className="text-[10.5px] text-white/[0.52] mt-2.5 uppercase tracking-[0.12em] leading-[1.5]">
                    {t("stat_quality_label")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Advantages Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <SectionHead
              label={t("why_choose")}
              title={t("advantages_title")}
              desc={t("advantages_desc")}
              align="left"
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: ClipboardCheck, title: "feat1_title", desc: "feat1_desc" },
              { icon: Factory, title: "feat2_title", desc: "feat2_desc" },
              { icon: Award, title: "feat3_title", desc: "feat3_desc" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="card-hover bg-white border border-[#E2E8E6] rounded-sm p-8 h-full">
                  <div className="w-12 h-12 bg-[#EDF4F2] rounded-sm flex items-center justify-center mb-5">
                    <item.icon size={23} className="text-primary" />
                  </div>
                  <h3 className="h3-card mb-2.5 md:min-h-[2.7em]">
                    {t(item.title)}
                  </h3>
                  <p className="body-copy">
                    {t(item.desc)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-[#F7F9F8]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)] gap-10 lg:gap-20">
            <Reveal>
              <div>
                <span className="text-[10.5px] font-semibold text-[#0A5B51] uppercase tracking-[0.18em]">
                  {t("about_label")}
                </span>
                <h2 className="h2-section mt-3 max-w-[22ch]">
                  {t("about_title")}
                </h2>
                <div className="w-10 h-px bg-[#C3D3CE] mt-7"></div>
              </div>
            </Reveal>

            <Reveal>
              <div className="max-w-[64ch]">
                <p className="text-[15.5px] text-muted-foreground leading-[1.8]">
                  {t("about_p1")}{" "}
                  <strong className="text-foreground font-semibold">{t("about_p1_highlight1")}</strong>{" "}
                  {t("about_p1_and")}{" "}
                  <strong className="text-foreground font-semibold">{t("about_p1_highlight2")}</strong>
                  {t("about_p1_end")}
                </p>
                <p className="text-[15.5px] text-muted-foreground leading-[1.8] mt-5">
                  {t("about_p2")}{" "}
                  <strong className="text-foreground font-semibold">{t("about_p2_highlight")}</strong>{" "}
                  {t("about_p2_end")}
                </p>

                <div className="mt-10 pt-8 border-t border-[#E2E8E6]">
                  <h3 className="meta-label">
                    {t("focus_title")}
                  </h3>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[t("focus_1"), t("focus_2"), t("focus_3"), t("focus_4"), t("focus_5")].map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 bg-white border border-[#DDE4E2] rounded-sm px-3 py-2 text-[13.5px] text-foreground"
                      >
                        <CheckCircle size={13} className="text-[#0A5B51]" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <SectionHead
              label={t("cert_label")}
              title={t("cert_title")}
              desc={t("cert_desc")}
              align="center"
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Award, title: "cert_ce", desc: "cert_ce_desc" },
              { icon: FileText, title: "cert_fda", desc: "cert_fda_desc" },
              { icon: Globe, title: "cert_distributor", desc: "cert_distributor_desc" },
              { icon: Shield, title: "cert_ec", desc: "cert_ec_desc" },
            ].map((cert, i) => (
              <Reveal key={cert.title} delay={i * 80}>
                <div className="relative card-hover bg-white border border-[#E2E8E6] rounded-sm p-8 h-full">
                  <span className="absolute right-7 top-7 font-mono text-[11px] tracking-[0.14em] text-[#A9B8B4]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-12 h-12 bg-[#EDF4F2] rounded-sm flex items-center justify-center mb-5">
                    <cert.icon size={23} className="text-primary" />
                  </div>
                  <h3 className="h3-card mb-2">
                    {t(cert.title)}
                  </h3>
                  <p className="body-copy">
                    {t(cert.desc)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="text-center text-sm text-muted-foreground mt-10 max-w-2xl mx-auto leading-relaxed">
              {t("cert_footer")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Factory Gallery Section */}
      <section id="factory" className="section-padding bg-[#F7F9F8]">
        <div className="container-custom">
          <Reveal>
            <SectionHead
              label={t("factory_label")}
              title={t("factory_title")}
              desc={t("factory_desc")}
              align="left"
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                src: "https://dingtalk-ai-app.oss-cn-zhangjiakou.aliyuncs.com/1a6db8dc-7fb0-4b3e-a801-27432e20cb5b.PNG",
                alt: "factory_img1",
                capTitle: "factory_cap1_title",
                capDesc: "factory_cap1_desc",
                grade: "brightness(1.14) contrast(1.02) saturate(0.9)",
              },
              {
                src: "https://dingtalk-ai-app.oss-cn-zhangjiakou.aliyuncs.com/67c3a951-d06e-40f9-87b1-42d5c9d718d6.jpg",
                alt: "factory_img2",
                capTitle: "factory_cap2_title",
                capDesc: "factory_cap2_desc",
                grade: "brightness(0.97) contrast(1.02) saturate(0.9)",
              },
              {
                src: "https://dingtalk-ai-app.oss-cn-zhangjiakou.aliyuncs.com/98802f05-abde-443e-a560-e3c70342b571.jpg",
                alt: "factory_img3",
                capTitle: "factory_cap3_title",
                capDesc: "factory_cap3_desc",
                grade: "brightness(1.03) contrast(1.03) saturate(0.9)",
              },
            ].map((img, i) => (
              <Reveal key={img.alt} delay={i * 100}>
                <div className="h-full">
                  <div className="aspect-[4/3] overflow-hidden rounded-sm bg-[#E4EBE9]">
                    <img
                      src={img.src}
                      alt={t(img.alt)}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      style={{ filter: img.grade }}
                      loading="lazy"
                    />
                  </div>
                  <div className="pt-5">
                    <h3 className="h3-card mb-2">
                      {t(img.capTitle)}
                    </h3>
                    <p className="body-copy">
                      {t(img.capDesc)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <SectionHead
              label={t("products_label")}
              title={t("products_title")}
              desc={t("products_desc")}
              align="left"
            />
          </Reveal>

          <div className="border-t border-[#E2E8E6]">
            {categories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 50}>
                <article className="group grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[290px_minmax(0,1fr)] gap-6 md:gap-10 py-10 md:py-12 border-b border-[#E2E8E6]">
                  <div className="relative flex items-center justify-center bg-[#0B2F2A] border border-[#0B2F2A] rounded-sm overflow-hidden aspect-[16/10] md:aspect-[5/4]">
                    <img
                      src={cat.image}
                      alt={t(cat.titleKey)}
                      loading="lazy"
                      className="w-[90%] h-[90%] object-contain object-center transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3.5 top-3 font-mono text-[11px] tracking-[0.14em] text-white/[0.45]">
                      {cat.no}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
                      <h3 className="text-[1.25rem] md:text-[1.35rem] font-semibold text-foreground tracking-[-0.015em]">
                        {t(cat.titleKey)}
                      </h3>
                      <span className="meta-label">
                        {cat.count} {t("prod_pcs")} · CE MDR 2017/745 · OEM / ODM
                      </span>
                    </div>

                    <p className="mt-3 text-[15px] text-muted-foreground leading-[1.7] max-w-3xl">
                      {t(cat.descKey)}
                    </p>

                    <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2.5">
                      {cat.skus.map((sku) => (
                        <li key={sku.code} className="flex items-baseline gap-2 min-w-0">
                          <span className="font-mono text-[11px] text-[#0A5B51]/75 w-[74px] shrink-0 tabular-nums">
                            {sku.code}
                          </span>
                          <span className="text-[14px] text-foreground/[0.88] leading-snug">
                            {sku.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#contact"
                      className="mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-primary hover:gap-2.5 transition-all duration-200"
                    >
                      {t("request_quote")}
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-6 md:gap-12 py-8 md:py-9 border border-[#E2E8E6] bg-[#F7F9F8] rounded-sm px-6 md:px-8 items-center">
              <div>
                <span className="font-mono text-[11px] tracking-[0.14em] text-[#7E908C]">06</span>
                <h3 className="mt-2 h3-card">
                  {t("prod_add_title")}
                </h3>
                <p className="mt-2.5 text-[14.5px] text-muted-foreground leading-[1.65]">
                  {t("prod_add_desc")}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {additionalSourcing.map((item) => (
                  <span
                    key={item}
                    className="text-[13px] text-[#3E524E] bg-white border border-[#E1E7E5] rounded-sm px-3 py-2 text-center sm:text-left"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-8 space-y-1.5">
              <p className="text-[14px] text-muted-foreground max-w-3xl leading-[1.7]">{t("prod_note")}</p>
              <p className="text-[14px] text-muted-foreground max-w-3xl leading-[1.7]">{t("custom_note")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="section-padding bg-[#F7F9F8]">
        <div className="container-custom">
          <Reveal>
            <SectionHead
              label={t("solutions_label")}
              title={t("solutions_title")}
              desc={t("solutions_desc")}
              align="center"
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { problemIcon: AlertTriangle, problemTitle: "sol1_problem_title", problemDesc: "sol1_problem_desc", solutionTitle: "sol1_solution_title", solutionDesc: "sol1_solution_desc" },
              { problemIcon: Clock, problemTitle: "sol2_problem_title", problemDesc: "sol2_problem_desc", solutionTitle: "sol2_solution_title", solutionDesc: "sol2_solution_desc" },
              { problemIcon: Package, problemTitle: "sol3_problem_title", problemDesc: "sol3_problem_desc", solutionTitle: "sol3_solution_title", solutionDesc: "sol3_solution_desc" },
            ].map((sol, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="card-hover bg-white rounded-sm border border-[#E2E8E6] h-full">
                  <div className="p-7 border-b border-[#E2E8E6]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A5B4B0]"></span>
                      <span className="text-[10.5px] font-semibold text-[#7E908C] uppercase tracking-[0.16em]">
                        {t("sol1_problem")}
                      </span>
                      <sol.problemIcon size={15} className="ml-auto text-[#C3CFCC]" />
                    </div>
                    <h3 className="text-[16px] font-semibold text-foreground leading-snug">
                      {t(sol.problemTitle)}
                    </h3>
                    <p className="text-[14.5px] text-muted-foreground mt-2.5 leading-[1.65]">
                      {t(sol.problemDesc)}
                    </p>
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0A5B51]"></span>
                      <span className="text-[10.5px] font-semibold text-[#0A5B51] uppercase tracking-[0.16em]">
                        {t("sol1_solution")}
                      </span>
                      <CheckCircle size={15} className="ml-auto text-[#0A5B51]/40" />
                    </div>
                    <h4 className="text-[16px] font-semibold text-foreground leading-snug">
                      {t(sol.solutionTitle)}
                    </h4>
                    <p className="text-[14.5px] text-muted-foreground mt-2.5 leading-[1.65]">
                      {t(sol.solutionDesc)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <SectionHead
              label={t("contact_label")}
              title={t("contact_title")}
              desc={t("contact_desc")}
              align="left"
            />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[400px_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
            {/* Left: Contact Info */}
            <Reveal className="reveal-left">
              <div className="bg-white rounded-sm p-8 border border-[#E2E8E6] h-full">
                <h3 className="text-[17px] font-semibold text-foreground mb-6">
                  {t("contact_get")}
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#EDF4F2] rounded-sm flex items-center justify-center flex-shrink-0">
                      <User size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-[14.5px] font-medium text-foreground">
                        {t("contact_person")}
                      </div>
                      <div className="text-[14.5px] text-muted-foreground">
                        Jason Li
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#EDF4F2] rounded-sm flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-[14.5px] font-medium text-foreground">
                        {t("contact_email")}
                      </div>
                      <a
                        href="mailto:info@qiantongglobal.com"
                        className="text-[14.5px] text-primary hover:text-[#00463E] transition-colors"
                      >
                        info@qiantongglobal.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#EDF4F2] rounded-sm flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-[14.5px] font-medium text-foreground">
                        {t("contact_whatsapp")}
                      </div>
                      <a
                        href="https://wa.me/85257098985"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14.5px] text-primary hover:text-[#00463E] transition-colors"
                      >
                        +852 5709 8985
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#EDF4F2] rounded-sm flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-[14.5px] font-medium text-foreground">
                        Facebook
                      </div>
                      <a
                        href="https://www.facebook.com/profile.php?id=61589986566230"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14.5px] text-primary hover:text-[#00463E] transition-colors"
                      >
                        Qiantong Global
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#EDF4F2] rounded-sm flex items-center justify-center flex-shrink-0">
                      <MessageSquare size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-[14.5px] font-medium text-foreground">
                        {t("contact_response")}
                      </div>
                      <div className="text-[14.5px] text-muted-foreground">
                        {t("contact_response_val")}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#EDF4F2] rounded-sm flex items-center justify-center flex-shrink-0">
                      <Building2 size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-[14.5px] font-medium text-foreground">
                        {t("contact_location")}
                      </div>
                      <div className="text-[14.5px] text-muted-foreground">
                        {t("contact_location_val")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E2E8E6]">
                  <a
                    href="https://wa.me/85257098985"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 border border-[#0E6B4A]/35 text-[#0E6B4A] font-semibold rounded-sm hover:bg-[#0E6B4A] hover:text-white transition-colors"
                  >
                    <MessageSquare size={18} />
                    {t("contact_whatsapp_btn")}
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Right: Contact Form */}
            <Reveal className="reveal-right">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#00463E] py-16 md:py-[5.5rem]">
        <div className="container-custom text-center">
          <h2 className="h2-section text-white">
            {t("cta_title")}
          </h2>
          <p className="text-white/[0.7] text-[15px] md:text-[16px] leading-[1.65] max-w-xl mx-auto mt-4 mb-9">
            {t("cta_desc")}
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <a
              href="mailto:info@qiantongglobal.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#00463E] font-semibold rounded-sm hover:bg-[#F1F6F4] transition-colors duration-200"
            >
              <Mail size={17} />
              {t("cta_email")}
            </a>
            <a
              href="https://wa.me/85257098985"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/[0.35] text-white font-semibold rounded-sm hover:bg-white/[0.08] transition-colors duration-200"
            >
              <MessageSquare size={17} />
              {t("cta_whatsapp")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
