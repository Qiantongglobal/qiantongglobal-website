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
  FileDown,
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
import { Link } from "react-router-dom";
import { useLanguage } from "@/components/LanguageSwitcher";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/LogoMark";
import { categories, additionalSourcing, skuPath } from "@/lib/products";
import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjgqbjqk";

function ContactForm() {
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  /* Product pages link here with ?code=QG-XX-NNN so the buyer never retypes the
     code; the hidden field puts it in the notification as well. */
  const [refCode] = useState(
    () => new URLSearchParams(window.location.search).get("code") || ""
  );

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
        {refCode && <input type="hidden" name="product_code" value={refCode} />}
        {refCode && (
          <div className="flex items-center gap-2 border border-[#DCE7E3] bg-[#F5F9F8] px-3.5 py-2.5 rounded-sm">
            <FileText size={14} className="shrink-0 text-[#0A5B51]/60" />
            <span className="font-mono text-[12.5px] tracking-[0.04em] text-foreground">
              {refCode}
            </span>
          </div>
        )}
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
            {/* Options follow the catalogue's five categories. The old list
                (non-woven, gauze, lab consumables) described a range we do not
                carry any more, so buyers were picking a category that has no
                SKU behind it. */}
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {t(cat.titleKey)}
              </option>
            ))}
            <option value="multiple">{t("form_product_multi")}</option>
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
            defaultValue={refCode ? `I would like a quotation for ${refCode}.\n\n` : undefined}
          ></textarea>
        </div>

        {error && (
          <div className="text-[13px] text-red-700 bg-red-50 border border-red-200 rounded-sm px-4 py-3 leading-relaxed">
            {error}{" "}
            <a
              href={`mailto:${t("cta_email")}`}
              className="font-medium underline underline-offset-2"
            >
              {t("cta_email")}
            </a>
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
        className="relative flex items-center min-h-[100svh] bg-[#05332D] grain overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(158deg, #04241F 0%, #05352F 34%, #06463D 64%, #0A5B51 100%)",
        }}
      >
        {/* Brand mark at seal scale, sunk into the gradient. The content sits
            above it on a real stacking order, so the mark never fights the
            headline for contrast. */}
        <div className="hero-watermark" aria-hidden="true">
          <LogoMark tone="watermark" className="hero-mark" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(56% 44% at 50% 42%, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0) 72%)",
          }}
        />
        <div className="relative z-10 w-full container-custom pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28 md:pb-14">
          <div className="max-w-4xl mx-auto text-center">
            {/* Ornament instead of a second wordmark: the navbar already
                carries the name, this only sets the eye before the claim. */}
            <div className="mx-auto mb-8 sm:mb-9 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-white/20" />
              <span className="w-[5px] h-[5px] rotate-45 bg-[#C9A96A]/75" />
              <span className="h-px w-12 bg-white/20" />
            </div>
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
              <span className="text-white font-semibold whitespace-nowrap">{t("hero_desc_percent")}</span>{" "}
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
                      <div className="num-display text-[1.7rem] sm:text-[1.85rem] text-white leading-none whitespace-nowrap tnum">
                        {stat.value}
                      </div>
                      <div className="text-[10.5px] text-white/[0.56] mt-3 uppercase tracking-[0.14em] leading-[1.5]">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                {/* OEM/ODM is a capability, not a metric — it gets its own
                    block instead of sitting in the same row as three numbers. */}
                <div className="sm:pl-9 sm:border-l sm:border-white/[0.22] text-left">
                  <div className="num-display text-[1.35rem] sm:text-[1.45rem] text-white leading-none whitespace-nowrap">
                    {t("stat_quality")}
                  </div>
                  <div className="text-[10.5px] text-white/[0.56] mt-3 uppercase tracking-[0.14em] leading-[1.5]">
                    {t("stat_quality_label")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Advantages Section */}
      <section className="section-padding bg-white relative overflow-hidden grain-pale">
        <div className="container-custom">
          <Reveal>
            <SectionHead
              no="01"
              label={t("why_choose")}
              title={t("advantages_title")}
              desc={t("advantages_desc")}
              align="left"
            />
          </Reveal>

          {/* Rules instead of cards: the same three points, but read as a
              document rather than three boxes on a template. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-y-0 col-rule">
            {[
              { icon: ClipboardCheck, title: "feat1_title", desc: "feat1_desc" },
              { icon: Factory, title: "feat2_title", desc: "feat2_desc" },
              { icon: Award, title: "feat3_title", desc: "feat3_desc" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div
                  className={`group relative h-full pt-7 md:pt-8 md:pb-2 ${
                    i > 0 ? "md:pl-10 lg:pl-12 md:border-l md:border-[#E5ECE9]" : ""
                  } ${i < 2 ? "md:pr-10 lg:pr-12" : ""}`}
                >
                  <span className="absolute left-0 -top-px h-px w-0 bg-[#9E7120]/70 transition-all duration-500 group-hover:w-full" />
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-[#9E7120]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <item.icon size={20} strokeWidth={1.5} className="text-[#0A5B51]/55" />
                  </div>
                  <h3 className="mt-8 text-[1.15rem] font-semibold text-foreground leading-[1.35] tracking-[-0.01em] max-w-[30ch]">
                    {t(item.title)}
                  </h3>
                  <p className="mt-3 body-copy max-w-[36ch]">{t(item.desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-[#F4F7F5] relative overflow-hidden grain-pale">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)] gap-10 lg:gap-0">
            <Reveal>
              <div className="lg:pr-16">
                <div className="index-row">
                  <span className="index-no">02</span>
                  <span className="index-rule" />
                  <span className="eyebrow">{t("about_label")}</span>
                </div>
                <h2 className="h2-section mt-4 max-w-[20ch]">
                  {t("about_title")}
                </h2>
                <div className="w-9 h-px bg-[#9E7120]/45 mt-8"></div>
              </div>
            </Reveal>

            <Reveal>
              <div className="max-w-[64ch] lg:border-l lg:border-[#E1E8E5] lg:pl-16">
                <p className="text-[15.5px] text-muted-foreground leading-[1.85]">
                  {t("about_p1")}{" "}
                  <strong className="text-foreground font-semibold">{t("about_p1_highlight1")}</strong>{" "}
                  {t("about_p1_and")}{" "}
                  <strong className="text-foreground font-semibold">{t("about_p1_highlight2")}</strong>
                  {t("about_p1_end")}
                </p>
                <p className="text-[15.5px] text-muted-foreground leading-[1.85] mt-5">
                  {t("about_p2")}{" "}
                  <strong className="text-foreground font-semibold">{t("about_p2_highlight")}</strong>{" "}
                  {t("about_p2_end")}
                </p>

                <div className="mt-11 pt-8 border-t border-[#E1E8E5]">
                  <h3 className="meta-label">
                    {t("focus_title")}
                  </h3>
                  {/* A single column of numbered rows. Two columns left the
                      fifth item orphaned and made five short labels look like
                      a form; a numbered list reads as an index instead. */}
                  <ul className="mt-4 border-t border-[#E1E8E5]">
                    {[t("focus_1"), t("focus_2"), t("focus_3"), t("focus_4"), t("focus_5")].map((item, i) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-4 py-3 border-b border-[#E1E8E5] text-[13.5px] text-foreground/[0.88]"
                      >
                        <span className="font-mono text-[10px] tracking-[0.1em] text-[#9E7120]/85 w-4 shrink-0 tnum">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Certifications Section — the one dark band in the middle of the page.
          Without it the whole stretch from advantages to contact reads as one
          long pale field; this gives the scroll a place to land. */}
      <section
        id="certifications"
        className="section-padding relative overflow-hidden text-white grain"
        style={{
          background:
            "linear-gradient(158deg, #04231F 0%, #053B34 52%, #06473E 100%)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(52% 60% at 82% 8%, rgba(201,169,106,0.10) 0%, rgba(201,169,106,0) 70%)",
          }}
        />
        <div className="container-custom relative">
          <Reveal>
            <SectionHead
              no="03"
              tone="light"
              label={t("cert_label")}
              title={t("cert_title")}
              desc={t("cert_desc")}
              align="center"
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 lg:gap-x-20">
            {[
              { icon: Award, title: "cert_ce", desc: "cert_ce_desc" },
              { icon: FileText, title: "cert_fda", desc: "cert_fda_desc" },
              { icon: Globe, title: "cert_distributor", desc: "cert_distributor_desc" },
              { icon: Shield, title: "cert_ec", desc: "cert_ec_desc" },
            ].map((cert, i) => (
              <Reveal key={cert.title} delay={i * 80}>
                <div className="group border-t border-white/[0.14] py-6 md:py-7 transition-colors duration-300 hover:border-white/[0.3]">
                  <div className="flex items-baseline gap-4 md:gap-5">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-[#C9A96A]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-[1.05rem] font-semibold text-white leading-snug">
                          {t(cert.title)}
                        </h3>
                        <cert.icon
                          size={17}
                          strokeWidth={1.5}
                          className="ml-auto shrink-0 text-[#C9A96A]/60"
                        />
                      </div>
                      <p className="mt-2 text-[14.5px] leading-[1.7] text-white/[0.68]">
                        {t(cert.desc)}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Closes the band on a rule instead of letting the centred note
              trail off into the section padding. */}
          <Reveal>
            <div className="mt-14 pt-7 border-t border-white/[0.14] flex flex-col md:flex-row md:items-start gap-4 md:gap-10">
              <span aria-hidden="true" className="mt-[9px] h-px w-10 shrink-0 bg-[#C9A96A]/45" />
              <p className="text-[13.5px] text-white/[0.48] max-w-3xl leading-[1.75]">
                {t("cert_footer")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Factory Gallery Section */}
      <section id="factory" className="section-padding bg-[#F4F7F5] relative overflow-hidden grain-pale">
        <div className="container-custom">
          <Reveal>
            <SectionHead
              no="04"
              label={t("factory_label")}
              title={t("factory_title")}
              desc={t("factory_desc")}
              align="left"
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                src: "/images/facilities/01-cleanroom.webp",
                alt: "factory_img1",
                capTitle: "factory_cap1_title",
                capDesc: "factory_cap1_desc",
                // Brightness is normalised to a common target (~145 / 255) so the
                // three shots read as one photo edit. Measured means: 128 / 149 / 152.
                grade: "brightness(1.13) contrast(1.02) saturate(0.92)",
              },
              {
                src: "/images/facilities/02-inspection.webp",
                alt: "factory_img2",
                capTitle: "factory_cap2_title",
                capDesc: "factory_cap2_desc",
                grade: "brightness(0.97) contrast(1.02) saturate(0.92)",
              },
              {
                src: "/images/facilities/03-sewing.webp",
                alt: "factory_img3",
                capTitle: "factory_cap3_title",
                capDesc: "factory_cap3_desc",
                grade: "brightness(0.95) contrast(1.02) saturate(0.92)",
              },
            ].map((img, i) => (
              <Reveal key={img.alt} delay={i * 100}>
                <div className="group h-full">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-[#E4EBE9] ring-1 ring-inset ring-[#0B2F2A]/10 transition-shadow duration-500 group-hover:shadow-[0_22px_50px_-28px_rgba(4,36,31,0.55)]">
                    <img
                      src={img.src}
                      alt={t(img.alt)}
                      className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                      style={{ filter: img.grade }}
                      loading="lazy"
                    />
                    <span className="absolute left-3.5 top-3.5 font-mono text-[10.5px] tracking-[0.2em] text-white/85 bg-[#04241F]/35 backdrop-blur-[2px] px-2 py-[3px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="pt-5">
                    <div className="h-px w-8 bg-[#9E7120]/45 mb-4 transition-all duration-500 group-hover:w-14" />
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
      <section id="products" className="section-padding bg-white relative overflow-hidden grain-pale">
        <div className="container-custom">
          <Reveal>
            <SectionHead
              no="05"
              label={t("products_label")}
              title={t("products_title")}
              desc={t("products_desc")}
              align="left"
            />
          </Reveal>

          <div className="border-t border-[#E2E8E6]">
            {categories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 50}>
                <article className="group grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[290px_minmax(0,1fr)] gap-6 md:gap-12 py-12 md:py-16 px-5 -mx-5 border-b border-[#E6ECE9] transition-colors duration-300 hover:bg-[#FAFCFB]">
                  <div className="relative flex items-center justify-center bg-white rounded-sm overflow-hidden aspect-[16/10] md:aspect-[5/4] ring-1 ring-inset ring-[#E9E7DF]">
                    <img
                      src={cat.image}
                      alt={t(cat.titleKey)}
                      loading="lazy"
                      /* Most of this catalogue is clear or frosted PVC. On a tinted
                         plate those items lose their edge entirely; a white plate
                         plus a shadow cast from the alpha channel restores it. */
                      className="w-[88%] h-[88%] object-contain object-center drop-shadow-[0_16px_26px_rgba(11,47,42,0.20)] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3.5 top-3 font-mono text-[11px] tracking-[0.18em] text-[#9E7120]/55">
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

                    <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-9">
                      {cat.skus.map((sku) => (
                        <li key={sku.code}>
                          <Link
                            to={skuPath(cat, sku)}
                            className="group/li flex h-full min-h-[52px] items-center gap-2.5 min-w-0 border-b border-[#EFF3F1] py-2"
                          >
                            <span className="font-mono text-[10.5px] text-[#9E7120]/80 w-[72px] shrink-0 tabular-nums tracking-[0.02em]">
                              {sku.code}
                            </span>
                            <span className="text-[14px] text-foreground/[0.86] leading-snug group-hover/li:text-primary transition-colors">
                              {sku.name}
                            </span>
                          </Link>
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
            <div className="mt-12 pt-8 border-t border-[#E2E8E6] grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-6 md:gap-14 md:items-end">
              <div className="space-y-2">
                <p className="text-[14px] text-muted-foreground max-w-2xl leading-[1.7]">{t("prod_note")}</p>
                <p className="text-[14px] text-muted-foreground max-w-2xl leading-[1.7]">{t("custom_note")}</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <a
                  href="/qiantong-global-catalogue-2026.pdf"
                  download="Qiantong-Global-Catalogue-2026.pdf"
                  className="group/dl inline-flex items-center gap-2 whitespace-nowrap text-[13.5px] font-semibold text-primary transition-all duration-200 hover:gap-3"
                >
                  <FileDown size={15} className="shrink-0 transition-transform duration-200 group-hover/dl:translate-y-0.5" />
                  {t("catalogue_dl")}
                  <span className="font-mono text-[11px] font-normal tracking-[0.06em] text-muted-foreground">
                    {t("catalogue_meta")}
                  </span>
                </a>
                <Link
                  to="/products"
                  className="group/all inline-flex items-center gap-2 text-[13.5px] font-semibold text-primary whitespace-nowrap hover:gap-3 transition-all duration-200"
                >
                  {t("hero_cta_products")}
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover/all:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="section-padding bg-[#F4F7F5] relative overflow-hidden grain-pale">
        <div className="container-custom">
          <Reveal>
            <SectionHead
              no="06"
              label={t("solutions_label")}
              title={t("solutions_title")}
              desc={t("solutions_desc")}
              align="center"
            />
          </Reveal>

          {/* Same rules-not-cards treatment as the advantages block: a problem
              set, a hairline, then the answer. The boxed version made these
              read as promo cards next to sections that had gone editorial. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 col-rule">
            {[
              { problemIcon: AlertTriangle, problemTitle: "sol1_problem_title", problemDesc: "sol1_problem_desc", solutionTitle: "sol1_solution_title", solutionDesc: "sol1_solution_desc" },
              { problemIcon: Clock, problemTitle: "sol2_problem_title", problemDesc: "sol2_problem_desc", solutionTitle: "sol2_solution_title", solutionDesc: "sol2_solution_desc" },
              { problemIcon: Package, problemTitle: "sol3_problem_title", problemDesc: "sol3_problem_desc", solutionTitle: "sol3_solution_title", solutionDesc: "sol3_solution_desc" },
            ].map((sol, i) => (
              <Reveal key={i} delay={i * 120}>
                <div
                  className={`group relative h-full pt-7 md:pt-8 md:pb-2 ${
                    i > 0 ? "md:pl-10 lg:pl-12 md:border-l md:border-[#E5ECE9]" : ""
                  } ${i < 2 ? "md:pr-10 lg:pr-12" : ""}`}
                >
                  <span className="absolute left-0 -top-px h-px w-0 bg-[#9E7120]/70 transition-all duration-500 group-hover:w-full" />
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-[#9E7120]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#8A7A5A]">
                      {t("sol1_problem")}
                    </span>
                    <sol.problemIcon
                      size={16}
                      strokeWidth={1.5}
                      className="ml-auto text-[#C9BFA5]"
                    />
                  </div>
                  <h3 className="mt-4 text-[1.0625rem] font-semibold text-foreground leading-[1.4]">
                    {t(sol.problemTitle)}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] text-muted-foreground leading-[1.7]">
                    {t(sol.problemDesc)}
                  </p>

                  <div className="mt-7 pt-6 border-t border-[#DCE5E1]">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#0A5B51]">
                        {t("sol1_solution")}
                      </span>
                      <CheckCircle
                        size={16}
                        strokeWidth={1.5}
                        className="ml-auto text-[#0A5B51]/30"
                      />
                    </div>
                    <h4 className="mt-4 text-[1.0625rem] font-semibold text-foreground leading-[1.4]">
                      {t(sol.solutionTitle)}
                    </h4>
                    <p className="mt-2.5 text-[14.5px] text-muted-foreground leading-[1.7]">
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
              no="07"
              label={t("contact_label")}
              title={t("contact_title")}
              desc={t("contact_desc")}
              align="left"
            />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[400px_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
            {/* Left: Contact Info */}
            <Reveal className="reveal-left">
              <div className="h-full lg:pr-8">
                <h3 className="text-[17px] font-semibold text-foreground mb-6">
                  {t("contact_get")}
                </h3>

                <div className="divide-y divide-[#EBF0EE] border-t border-[#EBF0EE]">
                  <div className="flex items-start gap-4 py-3.5">
                    <div className="w-[18px] shrink-0 flex items-center justify-center pt-[3px]">
                      <User size={15} strokeWidth={1.5} className="text-[#0A5B51]/55" />
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

                  <div className="flex items-start gap-4 py-3.5">
                    <div className="w-[18px] shrink-0 flex items-center justify-center pt-[3px]">
                      <Mail size={15} strokeWidth={1.5} className="text-[#0A5B51]/55" />
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

                  <div className="flex items-start gap-4 py-3.5">
                    <div className="w-[18px] shrink-0 flex items-center justify-center pt-[3px]">
                      <MessageCircle size={15} strokeWidth={1.5} className="text-[#0A5B51]/55" />
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

                  <div className="flex items-start gap-4 py-3.5">
                    <div className="w-[18px] shrink-0 flex items-center justify-center pt-[3px]">
                      <ExternalLink size={15} strokeWidth={1.5} className="text-[#0A5B51]/55" />
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

                  <div className="flex items-start gap-4 py-3.5">
                    <div className="w-[18px] shrink-0 flex items-center justify-center pt-[3px]">
                      <MessageSquare size={15} strokeWidth={1.5} className="text-[#0A5B51]/55" />
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

                  <div className="flex items-start gap-4 py-3.5">
                    <div className="w-[18px] shrink-0 flex items-center justify-center pt-[3px]">
                      <Building2 size={15} strokeWidth={1.5} className="text-[#0A5B51]/55" />
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
      <section className="relative overflow-hidden bg-[#00463E] py-16 md:py-20 grain">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(48% 70% at 50% 0%, rgba(201,169,106,0.14) 0%, rgba(201,169,106,0) 70%)",
          }}
        />
        <div className="container-custom text-center relative">
          <span className="mx-auto mb-7 block h-px w-12 bg-[#C9A96A]/60" />
          <h2 className="h2-section text-white">
            {t("cta_title")}
          </h2>
          <p className="text-white/[0.66] text-[15px] md:text-[16px] leading-[1.7] max-w-xl mx-auto mt-5 mb-10">
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

          {/* A rule-and-label line under the buttons: without it the band was a
              large empty field of dark green with a paragraph floating in it. */}
          <div className="mt-9 flex items-center justify-center gap-4 text-[12.5px] tracking-[0.08em] uppercase text-white/[0.42]">
            <span aria-hidden="true" className="h-px w-10 bg-[#C9A96A]/30" />
            {t("contact_response_val")}
            <span aria-hidden="true" className="h-px w-10 bg-[#C9A96A]/30" />
          </div>
        </div>
      </section>
    </div>
  );
}
