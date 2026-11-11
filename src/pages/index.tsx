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
  Phone,
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
      <div className="bg-white rounded-sm p-8 border border-[#E7EBE9] h-full flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-[#EDF4F2] rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={32} className="text-[#0A5B51]" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {t("form_success_title")}
        </h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-xs">
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
    <div className="bg-white rounded-sm p-8 border border-[#E7EBE9] h-full">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        {t("form_title")}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              {t("form_name")}
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2.5 border border-[#DDE4E2] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder={t("form_name_ph")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              {t("form_company")}
            </label>
            <input
              type="text"
              name="company"
              className="w-full px-4 py-2.5 border border-[#DDE4E2] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder={t("form_company_ph")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              {t("form_email")}
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2.5 border border-[#DDE4E2] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder={t("form_email_ph")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              {t("form_phone")}
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full px-4 py-2.5 border border-[#DDE4E2] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder={t("form_phone_ph")}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {t("form_product")}
          </label>
          <select
            name="product"
            className="w-full px-4 py-2.5 border border-[#DDE4E2] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
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
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {t("form_message")}
          </label>
          <textarea
            name="message"
            required
            rows={4}
            className="w-full px-4 py-2.5 border border-[#DDE4E2] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
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
          <label htmlFor="privacy-consent" className="text-xs text-muted-foreground leading-relaxed">
            {t("form_privacy_consent")}{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {t("form_privacy_policy_link")}
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-primary hover:bg-teal-700 text-white font-semibold rounded-sm shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

        <p className="text-xs text-muted-foreground text-center">
          {t("form_note")}
        </p>
      </form>
    </div>
  );
}

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center bg-[#05332D]"
        style={{
          backgroundImage:
            "linear-gradient(158deg, #04241F 0%, #05352F 32%, #06463D 62%, #0A5B51 100%)",
        }}
      >
        <div className="relative container-custom py-24 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-[1.9rem] sm:text-[2.4rem] md:text-[2.75rem] lg:text-[3rem] font-semibold text-white leading-[1.18] tracking-[-0.03em]">
              {t("hero_title")}{" "}
              <span className="text-white">{t("hero_title_highlight")}</span>
            </h1>

            <div className="w-14 h-px bg-white/[0.32] mx-auto my-8"></div>

            <div className="mb-9">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/[0.5] mb-4">
                {t("hero_badge_label")}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/[0.28] text-[13px] font-medium text-white rounded-sm">
                  <CheckCircle size={15} className="text-white/[0.55]" />
                  CE MDR 2017/745
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/[0.28] text-[13px] font-medium text-white rounded-sm">
                  <Award size={15} className="text-white/[0.55]" />
                  ISO 13485
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/[0.28] text-[13px] font-medium text-white rounded-sm">
                  <BadgeCheck size={15} className="text-white/[0.55]" />
                  CLASS I&ndash;IIb
                </span>
              </div>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-white/[0.82] mb-3 max-w-2xl mx-auto leading-[1.65]">
              {t("hero_desc_1")}{" "}
              <span className="text-white font-semibold">{t("hero_desc_percent")}</span>{" "}
              {t("hero_desc_2")}
            </p>

            <p className="text-[15px] text-white/[0.55] mb-10">
              {t("hero_sub")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00463E] font-semibold rounded-sm hover:bg-[#F1F6F4] transition-colors duration-200"
              >
                {t("hero_cta_quote")}
                <ArrowRight size={17} />
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/[0.32] text-white font-semibold rounded-sm hover:bg-white/[0.08] hover:border-white/[0.6] transition-colors duration-200"
              >
                {t("hero_cta_products")}
              </a>
            </div>

            <div className="mt-16 pt-8 border-t border-white/[0.18] max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-y-8 sm:divide-x sm:divide-white/[0.14]">
            <div className="px-0 sm:px-4 sm:first:pl-0">
              <div className="text-2xl sm:text-[1.6rem] font-semibold text-white tracking-tight leading-none whitespace-nowrap">
                {t("stat_years")}
              </div>
              <div className="text-[10px] text-white/[0.5] mt-2.5 uppercase tracking-[0.12em] leading-[1.5]">
                {t("stat_years_label")}
              </div>
            </div>
            <div className="px-0 sm:px-4 sm:first:pl-0">
              <div className="text-2xl sm:text-[1.6rem] font-semibold text-white tracking-tight leading-none whitespace-nowrap">
                {t("stat_capacity")}
              </div>
              <div className="text-[10px] text-white/[0.5] mt-2.5 uppercase tracking-[0.12em] leading-[1.5]">
                {t("stat_capacity_label")}
              </div>
            </div>
            <div className="px-0 sm:px-4 sm:first:pl-0">
              <div className="text-2xl sm:text-[1.6rem] font-semibold text-white tracking-tight leading-none whitespace-nowrap">
                {t("stat_supply")}
              </div>
              <div className="text-[10px] text-white/[0.5] mt-2.5 uppercase tracking-[0.12em] leading-[1.5]">
                {t("stat_supply_label")}
              </div>
            </div>
            <div className="px-0 sm:px-4 sm:first:pl-0">
              <div className="text-2xl sm:text-[1.6rem] font-semibold text-white tracking-tight leading-none whitespace-nowrap">
                {t("stat_quality")}
              </div>
              <div className="text-[10px] text-white/[0.5] mt-2.5 uppercase tracking-[0.12em] leading-[1.5]">
                {t("stat_quality_label")}
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
            <div className="text-center mb-12">
              <span className="text-[10.5px] font-semibold text-[#0A5B51] uppercase tracking-[0.18em]">
                {t("why_choose")}
              </span>
              <h2 className="text-[1.6rem] md:text-[2rem] font-semibold tracking-[-0.02em] text-foreground mt-2">
                {t("advantages_title")}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                {t("advantages_desc")}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: ClipboardCheck, title: "feat1_title", desc: "feat1_desc" },
              { icon: Factory, title: "feat2_title", desc: "feat2_desc" },
              { icon: Award, title: "feat3_title", desc: "feat3_desc" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="card-hover bg-white border border-[#E7EBE9] rounded-sm p-8 h-full">
                  <div className="w-14 h-14 bg-[#EDF4F2] rounded-sm flex items-center justify-center mb-6">
                    <item.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {t(item.title)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
          <div className="grid grid-cols-1 lg:grid-cols-[330px_minmax(0,1fr)] gap-10 lg:gap-16">
            <Reveal>
              <div>
                <span className="text-[10.5px] font-semibold text-[#0A5B51] uppercase tracking-[0.18em]">
                  {t("about_label")}
                </span>
                <h2 className="text-[1.6rem] md:text-[2rem] font-semibold tracking-[-0.02em] text-foreground mt-3 leading-[1.25]">
                  {t("about_title")}
                </h2>
                <div className="w-10 h-px bg-[#C3D3CE] mt-7"></div>
              </div>
            </Reveal>

            <Reveal>
              <div className="max-w-[64ch]">
                <p className="text-[15px] text-muted-foreground leading-[1.85]">
                  {t("about_p1")}{" "}
                  <strong className="text-foreground font-semibold">{t("about_p1_highlight1")}</strong>{" "}
                  {t("about_p1_and")}{" "}
                  <strong className="text-foreground font-semibold">{t("about_p1_highlight2")}</strong>
                  {t("about_p1_end")}
                </p>
                <p className="text-[15px] text-muted-foreground leading-[1.85] mt-5">
                  {t("about_p2")}{" "}
                  <strong className="text-foreground font-semibold">{t("about_p2_highlight")}</strong>{" "}
                  {t("about_p2_end")}
                </p>

                <div className="mt-10 pt-8 border-t border-[#E2E8E6]">
                  <h3 className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#7E908C]">
                    {t("focus_title")}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[t("focus_1"), t("focus_2"), t("focus_3"), t("focus_4"), t("focus_5")].map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 bg-white border border-[#DDE4E2] rounded-sm px-3 py-2 text-[13px] text-foreground"
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
            <div className="text-center mb-12">
              <span className="text-[10.5px] font-semibold text-[#0A5B51] uppercase tracking-[0.18em]">
                {t("cert_label")}
              </span>
              <h2 className="text-[1.6rem] md:text-[2rem] font-semibold tracking-[-0.02em] text-foreground mt-2">
                {t("cert_title")}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                {t("cert_desc")}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Award, title: "cert_ce", desc: "cert_ce_desc" },
              { icon: FileText, title: "cert_fda", desc: "cert_fda_desc" },
              { icon: Globe, title: "cert_distributor", desc: "cert_distributor_desc" },
              { icon: Shield, title: "cert_ec", desc: "cert_ec_desc" },
            ].map((cert, i) => (
              <Reveal key={cert.title} delay={i * 80}>
                <div className="card-hover bg-white border border-[#E7EBE9] rounded-sm p-7 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#EDF4F2] rounded-sm flex items-center justify-center flex-shrink-0">
                      <cert.icon size={24} className="text-primary" />
                    </div>
                    <span className="text-xs font-semibold tracking-widest text-[#0A5B51]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {t(cert.title)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
      <section id="factory" className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-[10.5px] font-semibold text-[#0A5B51] uppercase tracking-[0.18em]">
                {t("factory_label")}
              </span>
              <h2 className="text-[1.6rem] md:text-[2rem] font-semibold tracking-[-0.02em] text-foreground mt-2">
                {t("factory_title")}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                {t("factory_desc")}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                src: "https://dingtalk-ai-app.oss-cn-zhangjiakou.aliyuncs.com/1a6db8dc-7fb0-4b3e-a801-27432e20cb5b.PNG",
                alt: "factory_img1",
                capTitle: "factory_cap1_title",
                capDesc: "factory_cap1_desc",
              },
              {
                src: "https://dingtalk-ai-app.oss-cn-zhangjiakou.aliyuncs.com/67c3a951-d06e-40f9-87b1-42d5c9d718d6.jpg",
                alt: "factory_img2",
                capTitle: "factory_cap2_title",
                capDesc: "factory_cap2_desc",
              },
              {
                src: "https://dingtalk-ai-app.oss-cn-zhangjiakou.aliyuncs.com/98802f05-abde-443e-a560-e3c70342b571.jpg",
                alt: "factory_img3",
                capTitle: "factory_cap3_title",
                capDesc: "factory_cap3_desc",
              },
            ].map((img, i) => (
              <Reveal key={img.alt} delay={i * 100}>
                <div className="card-hover bg-white border border-[#E7EBE9] rounded-sm overflow-hidden h-full">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={img.src}
                      alt={t(img.alt)}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {t(img.capTitle)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
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
      <section id="products" className="section-padding bg-[#F7F9F8]">
        <div className="container-custom">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-[10.5px] font-semibold text-[#0A5B51] uppercase tracking-[0.18em]">
                {t("products_label")}
              </span>
              <h2 className="text-[1.6rem] md:text-[2rem] font-semibold tracking-[-0.02em] text-foreground mt-2">
                {t("products_title")}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                {t("products_desc")}
              </p>
            </div>
          </Reveal>

          <div className="border-t border-[#E7EBE9]">
            {categories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 50}>
                <article className="group grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[290px_minmax(0,1fr)] gap-6 md:gap-10 py-9 md:py-10 border-b border-[#E7EBE9]">
                  <div className="relative flex items-center justify-center bg-[#F4F8F7] border border-[#E7EBE9] rounded-sm overflow-hidden aspect-[4/3] md:aspect-[5/4]">
                    <img
                      src={cat.image}
                      alt={t(cat.titleKey)}
                      loading="lazy"
                      className="w-[88%] h-[88%] object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3 top-2.5 font-mono text-[10px] tracking-[0.14em] text-[#8A9C98]">
                      {cat.no}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
                      <h3 className="text-lg md:text-xl font-semibold text-foreground tracking-[-0.01em]">
                        {t(cat.titleKey)}
                      </h3>
                      <span className="text-[10.5px] uppercase tracking-[0.12em] text-[#7E908C]">
                        {cat.count} {t("prod_pcs")} · CE MDR 2017/745 · OEM / ODM
                      </span>
                    </div>

                    <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                      {t(cat.descKey)}
                    </p>

                    <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-2">
                      {cat.skus.map((sku) => (
                        <li key={sku.code} className="flex items-baseline gap-2 min-w-0">
                          <span className="font-mono text-[10px] text-[#0A5B51]/70 shrink-0">
                            {sku.code}
                          </span>
                          <span className="text-[13px] text-foreground/[0.85] leading-snug">
                            {sku.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#contact"
                      className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:gap-2.5 transition-all duration-200"
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
            <div className="mt-10 grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[290px_minmax(0,1fr)] gap-6 md:gap-10 py-9 border border-[#E7EBE9] bg-[#F4F8F7] rounded-sm px-6">
              <div>
                <span className="font-mono text-[10px] tracking-[0.14em] text-[#8A9C98]">06</span>
                <h3 className="mt-2 text-base font-semibold text-foreground">
                  {t("prod_add_title")}
                </h3>
                <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                  {t("prod_add_desc")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 content-start">
                {additionalSourcing.map((item) => (
                  <span
                    key={item}
                    className="text-[12px] text-[#3E524E] bg-white border border-[#E1E7E5] rounded-sm px-2.5 py-1.5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-8 space-y-1.5">
              <p className="text-[13px] text-muted-foreground max-w-3xl">{t("prod_note")}</p>
              <p className="text-[13px] text-muted-foreground max-w-3xl">{t("custom_note")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="section-padding bg-[#F7F9F8]">
        <div className="container-custom">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-[10.5px] font-semibold text-[#0A5B51] uppercase tracking-[0.18em]">
                {t("solutions_label")}
              </span>
              <h2 className="text-[1.6rem] md:text-[2rem] font-semibold tracking-[-0.02em] text-foreground mt-2">
                {t("solutions_title")}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                {t("solutions_desc")}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { problemIcon: AlertTriangle, problemTitle: "sol1_problem_title", problemDesc: "sol1_problem_desc", solutionTitle: "sol1_solution_title", solutionDesc: "sol1_solution_desc" },
              { problemIcon: Clock, problemTitle: "sol2_problem_title", problemDesc: "sol2_problem_desc", solutionTitle: "sol2_solution_title", solutionDesc: "sol2_solution_desc" },
              { problemIcon: Package, problemTitle: "sol3_problem_title", problemDesc: "sol3_problem_desc", solutionTitle: "sol3_solution_title", solutionDesc: "sol3_solution_desc" },
            ].map((sol, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="card-hover bg-white rounded-sm border border-[#E7EBE9] h-full">
                  <div className="p-7 border-b border-[#E7EBE9]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B4746A]"></span>
                      <span className="text-[10.5px] font-semibold text-[#9A6B62] uppercase tracking-[0.16em]">
                        {t("sol1_problem")}
                      </span>
                      <sol.problemIcon size={15} className="ml-auto text-[#CBB7B2]" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-foreground leading-snug">
                      {t(sol.problemTitle)}
                    </h3>
                    <p className="text-[13px] text-muted-foreground mt-2 leading-relaxed">
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
                    <h4 className="text-[15px] font-semibold text-foreground leading-snug">
                      {t(sol.solutionTitle)}
                    </h4>
                    <p className="text-[13px] text-muted-foreground mt-2 leading-relaxed">
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
      <section id="contact" className="section-padding bg-[#F7F9F8]">
        <div className="container-custom">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-[10.5px] font-semibold text-[#0A5B51] uppercase tracking-[0.18em]">
                {t("contact_label")}
              </span>
              <h2 className="text-[1.6rem] md:text-[2rem] font-semibold tracking-[-0.02em] text-foreground mt-2">
                {t("contact_title")}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                {t("contact_desc")}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[400px_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
            {/* Left: Contact Info */}
            <Reveal className="reveal-left">
              <div className="bg-white rounded-sm p-8 border border-[#E7EBE9] h-full">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  {t("contact_get")}
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#EDF4F2] rounded-sm flex items-center justify-center flex-shrink-0">
                      <User size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {t("contact_person")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Jason Li
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#EDF4F2] rounded-sm flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {t("contact_email")}
                      </div>
                      <a
                        href="mailto:info@qiantongglobal.com"
                        className="text-sm text-primary hover:text-[#00463E] transition-colors"
                      >
                        info@qiantongglobal.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#EDF4F2] rounded-sm flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {t("contact_whatsapp")}
                      </div>
                      <a
                        href="https://wa.me/85257098985"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-[#00463E] transition-colors"
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
                      <div className="text-sm font-medium text-foreground">
                        Facebook
                      </div>
                      <a
                        href="https://www.facebook.com/profile.php?id=61589986566230"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-[#00463E] transition-colors"
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
                      <div className="text-sm font-medium text-foreground">
                        {t("contact_response")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("contact_response_val")}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#EDF4F2] rounded-sm flex items-center justify-center flex-shrink-0">
                      <Building2 size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {t("contact_location")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("contact_location_val")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E7EBE9]">
                  <a
                    href="https://wa.me/85257098985"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 border border-[#0E6B4A]/30 text-[#0E6B4A] font-semibold rounded-sm hover:bg-[#0E6B4A] hover:text-white transition-colors"
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
      <section className="bg-[#00463E] py-16 md:py-20">
        <div className="container-custom text-center">
          <h2 className="text-[1.6rem] md:text-[2rem] font-semibold tracking-[-0.02em] text-white">
            {t("cta_title")}
          </h2>
          <p className="text-white/[0.65] max-w-xl mx-auto mt-3 mb-8">
            {t("cta_desc")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:info@qiantongglobal.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00463E] font-semibold rounded-sm hover:bg-[#F1F6F4] transition-colors duration-200"
            >
              <Mail size={17} />
              {t("cta_email")}
            </a>
            <a
              href="https://wa.me/85257098985"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/[0.35] text-white font-semibold rounded-sm hover:bg-white/[0.08] transition-colors duration-200"
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
