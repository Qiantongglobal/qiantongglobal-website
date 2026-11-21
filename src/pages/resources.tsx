import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { useLanguage } from "@/components/LanguageSwitcher";
import { articles, articleText, availableLangs, formatDate } from "@/lib/resources";

/**
 * Page furniture for the notes index. Only the languages the notes themselves
 * are written in get their own hero — an index promise in German over
 * English-only body copy reads like a half-finished translation. Everything
 * else falls back to English, which is the language of the notes.
 */
const INDEX: Record<
  "en" | "de" | "fr" | "it",
  {
    eyebrow: string;
    title: string;
    lead: string;
    ctaTitle: string;
    ctaBody: string;
    ctaAsk: string;
    ctaBrowse: string;
  }
> = {
  en: {
    eyebrow: "Compliance notes",
    title: "The documents behind the product",
    lead: "Short notes on the paperwork that decides whether a consignment can enter Switzerland, the EU or the UK — written for buyers who have to file it, defend it and live with it.",
    ctaTitle: "Looking for these documents for a specific device?",
    ctaBody:
      "Tell us the product and the market. We will tell you which documents the factory already holds and which ones have to be requested or reissued.",
    ctaAsk: "Ask about a device",
    ctaBrowse: "Browse catalogue",
  },
  de: {
    eyebrow: "Fachbeiträge",
    title: "Die Dokumente hinter dem Produkt",
    lead: "Kurze Beiträge zu den Unterlagen, die darüber entscheiden, ob eine Lieferung in die Schweiz, in die EU oder nach Großbritannien gelangen darf — geschrieben für Käufer, die sie einreichen, verteidigen und damit leben müssen.",
    ctaTitle: "Sie suchen diese Unterlagen für ein konkretes Gerät?",
    ctaBody:
      "Nennen Sie uns Produkt und Zielmarkt. Wir sagen Ihnen, welche Unterlagen das Werk bereits hat und welche angefordert oder neu ausgestellt werden müssen.",
    ctaAsk: "Zu einem Gerät fragen",
    ctaBrowse: "Katalog ansehen",
  },
  fr: {
    eyebrow: "Notes de conformité",
    title: "Les documents derrière le produit",
    lead: "Notes brèves sur les pièces qui décident si une expédition peut entrer en Suisse, dans l'UE ou au Royaume-Uni — écrites pour les acheteurs qui doivent les déposer, les défendre et vivre avec.",
    ctaTitle: "Vous cherchez ces documents pour un dispositif précis ?",
    ctaBody:
      "Indiquez-nous le produit et le marché. Nous vous dirons quels documents l'usine détient déjà et lesquels doivent être demandés ou réémis.",
    ctaAsk: "Poser une question sur un dispositif",
    ctaBrowse: "Voir le catalogue",
  },
  it: {
    eyebrow: "Note di conformità",
    title: "I documenti dietro il prodotto",
    lead: "Note brevi sui documenti che decidono se una spedizione può entrare in Svizzera, nell'UE o nel Regno Unito — scritte per gli acquirenti che devono presentarli, difenderli e conviverci.",
    ctaTitle: "Cercate questi documenti per un dispositivo preciso?",
    ctaBody:
      "Indicateci il prodotto e il mercato. Vi diremo quali documenti lo stabilimento già detiene e quali vanno richiesti o riemessi.",
    ctaAsk: "Chiedere informazioni su un dispositivo",
    ctaBrowse: "Sfogliare il catalogo",
  },
};

/**
 * Index of the compliance notes.
 *
 * Set as a numbered editorial index rather than a card grid: the pieces are
 * read in any order, and a list with hairlines keeps the whole section to one
 * screen on a laptop instead of three rows of identical boxes.
 */
export default function ResourcesPage() {
  const { t, lang } = useLanguage();
  const copy = INDEX[lang === "de" || lang === "fr" || lang === "it" ? lang : "en"];

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Compliance notes for medical device importers"
        description="Short, practical notes on CH-REP appointments, Class I sterile devices, Declarations of Conformity and importer obligations under the MDR — written for buyers, not for regulators."
        path="/resources"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Compliance notes",
          url: "https://www.qiantongglobal.com/resources",
          hasPart: articles.map((a) => ({
            "@type": "Article",
            headline: a.title,
            url: `https://www.qiantongglobal.com/resources/${a.slug}`,
            datePublished: a.date,
          })),
        }}
      />

      <header className="border-b border-[#E4EBE8] bg-[#F7FAF9]">
        <div className="container-custom pt-28 md:pt-36 pb-14 md:pb-16">
          <div className="index-row">
            <span className="index-no">00</span>
            <span className="index-rule" />
            <span className="eyebrow">{copy.eyebrow}</span>
          </div>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] gap-6 lg:gap-16 lg:items-end">
            <h1 className="h2-section !text-[2rem] md:!text-[2.9rem] max-w-[24ch]">
              {copy.title}
            </h1>
            <p className="lead lg:pb-1.5 [text-wrap:pretty]">
              {copy.lead}
            </p>
          </div>
          <p className="mt-8 text-[12.5px] text-[#5F716D]">{t("res_note")}</p>
        </div>
      </header>

      <section className="container-custom py-14 md:py-20">
        <ul className="border-t border-[#DCE5E1]">
          {articles.map((a) => {
            const tx = articleText(a, lang);
            const also = availableLangs(a).filter((l) => l !== "en");
            return (
            <li key={a.slug} className="border-b border-[#DCE5E1]">
              <Link
                to={`/resources/${a.slug}`}
                className="group grid grid-cols-[2.5rem_minmax(0,1fr)] md:grid-cols-[3.5rem_minmax(0,1fr)_13rem] gap-x-3 md:gap-x-8 items-start py-7 md:py-9 transition-colors hover:bg-[#F7FAF9]"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-[#8F6519] pt-1.5">
                  {a.no}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[1.2rem] md:text-[1.42rem] leading-[1.3] tracking-[-0.01em] text-foreground group-hover:text-primary transition-colors [text-wrap:balance]">
                    {tx.title}
                  </span>
                  <span className="mt-2 block text-[14.5px] leading-[1.65] text-muted-foreground max-w-[52ch]">
                    {tx.dek}
                  </span>
                </span>
                <span className="hidden md:flex flex-col items-end gap-2 pt-1.5">
                  <span className="meta-label">{tx.tag}</span>
                  <span className="text-[12px] text-[#5F716D]">
                    {tx.minutes} min · {formatDate(a.date, tx.lang)}
                  </span>
                  {also.length > 0 && (
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#8F6519]/80">
                      {also.map((l) => l.toUpperCase()).join(" · ")}
                    </span>
                  )}
                  <ArrowUpRight
                    size={15}
                    className="mt-1 text-[#0A5B51]/35 transition-all group-hover:text-primary group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </li>
            );
          })}
        </ul>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] gap-8 items-center border border-[#DCE5E1] bg-[#F7FAF9] px-6 md:px-10 py-8 md:py-10">
          <div>
            <h2 className="font-display text-[1.35rem] md:text-[1.55rem] leading-[1.3] text-foreground">
              {copy.ctaTitle}
            </h2>
            <p className="mt-2.5 body-copy max-w-[46ch]">{copy.ctaBody}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link to="/#contact" className="btn-primary">
              {copy.ctaAsk}
            </Link>
            <Link to="/products" className="btn-outline">
              {copy.ctaBrowse}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
