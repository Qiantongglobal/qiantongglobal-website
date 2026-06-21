import {
  Shield,
  Search,
  Factory,
  CheckCircle,
  Globe,
  TrendingUp,
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
  ChevronRight,
  Star,
  ArrowRight,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageSwitcher";
import { useReveal } from "@/hooks/useReveal";
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
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={32} className="text-teal-600" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {t("form_success_title")}
        </h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-xs">
          {t("form_success_desc")}
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 bg-primary hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors"
        >
          {t("form_send_another")}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
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
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
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
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
            placeholder={t("form_message_ph")}
          ></textarea>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
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
          className="w-full py-3 bg-primary hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500 rounded-full blur-3xl"></div>
          </div>
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="relative container-custom py-32 md:py-40">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <Shield size={14} className="text-teal-300" />
              <span className="text-sm text-teal-100 font-medium">
                {t("hero_badge")}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t("hero_title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">
                {t("hero_title_highlight")}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-teal-100/80 mb-4 max-w-2xl mx-auto leading-relaxed">
              {t("hero_desc_1")}{" "}
              <span className="text-white font-semibold">{t("hero_desc_percent")}</span>{" "}
              {t("hero_desc_2")}
            </p>

            <p className="text-base text-teal-200/60 mb-10">
              {t("hero_sub")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-900 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-teal-50 transition-all duration-200"
              >
                {t("hero_cta_quote")}
                <ArrowRight size={18} />
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                {t("hero_cta_products")}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-white/10">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {t("stat_years")}
                </div>
                <div className="text-sm text-teal-200/60 mt-1">
                  {t("stat_years_label")}
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {t("stat_capacity")}
                </div>
                <div className="text-sm text-teal-200/60 mt-1">
                  {t("stat_capacity_label")}
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {t("stat_markets")}
                </div>
                <div className="text-sm text-teal-200/60 mt-1">
                  {t("stat_markets_label")}
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
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {t("why_choose")}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
                {t("advantages_title")}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                {t("advantages_desc")}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: Factory, title: "feat1_title", desc: "feat1_desc" },
              { icon: Search, title: "feat2_title", desc: "feat2_desc" },
              { icon: TrendingUp, title: "feat3_title", desc: "feat3_desc" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="card-hover bg-white border border-gray-100 rounded-2xl p-8 shadow-sm h-full">
                  <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mb-6">
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
      <section id="about" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal className="reveal-left">
              <div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  {t("about_label")}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">
                  {t("about_title")}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t("about_p1")}{" "}
                  <strong className="text-foreground">{t("about_p1_highlight1")}</strong>{" "}
                  {t("about_p1_and")}{" "}
                  <strong className="text-foreground">{t("about_p1_highlight2")}</strong>
                  {t("about_p1_end")}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {t("about_p2")}{" "}
                  <strong className="text-foreground">{t("about_p2_highlight")}</strong>{" "}
                  {t("about_p2_end")}
                </p>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">
                    {t("focus_title")}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {[t("focus_1"), t("focus_2"), t("focus_3"), t("focus_4"), t("focus_5")].map((item) => (
                      <span key={item} className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-foreground">
                        <CheckCircle size={14} className="text-teal-500" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="reveal-right">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Globe size={24} className="text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    {t("markets_title")}
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🌏</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {t("market_sea")}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("market_sea_desc")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🇪🇺</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {t("market_eu")}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("market_eu_desc")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{t("stat_expertise")}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {t("stat_expertise_label")}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{t("stat_supply")}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {t("stat_supply_label")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Factory Gallery Section */}
      <section id="factory" className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {t("factory_label")}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
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
                <div className="card-hover bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm h-full">
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
      <section id="products" className="section-padding bg-gray-50">
        <div className="container-custom">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {t("products_label")}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
                {t("products_title")}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                {t("products_desc")}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: Shield, cat: "cat_gowns", desc: "cat_gowns_desc", items: [
                { title: "gown1_title", specs: "gown1_specs" },
                { title: "gown2_title", specs: "gown2_specs" },
              ]},
              { icon: Package, cat: "cat_drapes", desc: "cat_drapes_desc", items: [
                { title: "drape1_title", specs: "drape1_specs" },
                { title: "drape2_title", specs: "drape2_specs" },
                { title: "drape3_title", specs: "drape3_specs" },
              ]},
              { icon: ClipboardCheck, cat: "cat_packs", desc: "cat_packs_desc", items: [
                { title: "pack1_title", specs: "pack1_specs" },
                { title: "pack2_title", specs: "pack2_specs" },
                { title: "pack3_title", specs: "pack3_specs" },
              ]},
              { icon: Shield, cat: "cat_protective", desc: "cat_protective_desc", items: [
                { title: "protective_title", specs: "protective_specs" },
              ]},
              { icon: Star, cat: "cat_masks", desc: "cat_masks_desc", items: [
                { title: "mask1_title", specs: "mask1_specs" },
                { title: "mask2_title", specs: "mask2_specs" },
              ]},
              { icon: Shield, cat: "cat_gloves", desc: "cat_gloves_desc", items: [
                { title: "glove1_title", specs: "glove1_specs" },
                { title: "glove2_title", specs: "glove2_specs" },
              ]},
              { icon: Package, cat: "cat_accessories", desc: "cat_accessories_desc", items: [
                { title: "acc1_title", specs: "acc1_specs" },
                { title: "acc2_title", specs: "acc2_specs" },
              ]},
              { icon: Package, cat: "cat_anesthesia", desc: "cat_anesthesia_desc", items: [
                { title: "anesthesia_title", specs: "anesthesia_specs" },
              ]},
              { icon: Package, cat: "cat_lab", desc: "cat_lab_desc", items: [
                { title: "lab_title", specs: "lab_desc" },
              ]},
            ].map((product, i) => (
              <Reveal key={product.cat} delay={i * 60}>
                <div className="card-hover bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm h-full">
                  <div className="bg-gradient-to-br from-teal-600 to-teal-800 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <product.icon size={24} className="text-teal-200" />
                      <h3 className="text-lg font-semibold text-white">
                        {t(product.cat)}
                      </h3>
                    </div>
                    <p className="text-sm text-teal-100/80">
                      {t(product.desc)}
                    </p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {product.items.map((item) => (
                        <li key={item.title} className="flex items-start gap-3">
                          <ChevronRight size={16} className="text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-sm font-medium text-foreground">
                              {t(item.title)}
                            </span>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {t(item.specs)}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <a
                        href="#contact"
                        className="text-sm font-medium text-primary hover:text-teal-800 inline-flex items-center gap-1 transition-colors"
                      >
                        {t("request_quote")} <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="text-center text-sm text-muted-foreground mt-8 max-w-xl mx-auto">
              {t("custom_note")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="section-padding bg-gray-50">
        <div className="container-custom">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {t("solutions_label")}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
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
                <div className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-full">
                  <div className="bg-red-50 border-b border-red-100 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <sol.problemIcon size={22} className="text-red-500" />
                      <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">
                        {t("sol1_problem")}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-red-800">
                      {t(sol.problemTitle)}
                    </h3>
                    <p className="text-sm text-red-600/80 mt-2">
                      {t(sol.problemDesc)}
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                        <CheckCircle size={18} className="text-teal-600" />
                      </div>
                      <span className="text-sm font-semibold text-teal-700">
                        {t("sol1_solution")}
                      </span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-3">
                      {t(sol.solutionTitle)}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(sol.solutionDesc)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {t("cert_label")}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
                {t("cert_title")}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                {t("cert_desc")}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "cert_ce", desc: "cert_ce_desc" },
              { icon: Shield, title: "cert_fda", desc: "cert_fda_desc" },
              { icon: FileText, title: "cert_distributor", desc: "cert_distributor_desc" },
              { icon: Building2, title: "cert_ec", desc: "cert_ec_desc" },
            ].map((cert, i) => (
              <Reveal key={cert.title} delay={i * 80}>
                <div className="card-hover bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm h-full">
                  <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <cert.icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t(cert.title)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(cert.desc)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-gradient-to-r from-teal-900 to-teal-800">
        <div className="container-custom">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: t("trust_years"), label: t("trust_years_label") },
                { value: t("trust_factories"), label: t("trust_factories_label") },
                { value: t("trust_countries"), label: t("trust_countries_label") },
                { value: t("trust_quality"), label: t("trust_quality_label") },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-teal-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-gray-50">
        <div className="container-custom">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {t("contact_label")}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
                {t("contact_title")}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                {t("contact_desc")}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Contact Info */}
            <Reveal className="reveal-left">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  {t("contact_get")}
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
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
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {t("contact_email")}
                      </div>
                      <a
                        href="mailto:info@qiantongglobal.com"
                        className="text-sm text-primary hover:text-teal-800 transition-colors"
                      >
                        info@qiantongglobal.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
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
                        className="text-sm text-primary hover:text-teal-800 transition-colors"
                      >
                        +852 5709 8985
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
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
                        className="text-sm text-primary hover:text-teal-800 transition-colors"
                      >
                        Qiantong Global
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
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
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
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

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <a
                    href="https://wa.me/85257098985"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
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
      <section className="py-16 bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-teal-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-48 h-48 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>
        <Reveal>
          <div className="relative container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t("cta_title")}
            </h2>
            <p className="text-teal-100/80 max-w-xl mx-auto mb-8">
              {t("cta_desc")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:info@qiantongglobal.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-900 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-teal-50 transition-all duration-200"
              >
                <Mail size={18} />
                {t("cta_email")}
              </a>
              <a
                href="https://wa.me/85257098985"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                <MessageSquare size={18} />
                {t("cta_whatsapp")}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
