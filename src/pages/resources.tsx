import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { useLanguage } from "@/components/LanguageSwitcher";
import { articles, formatDate } from "@/lib/resources";

/**
 * Index of the compliance notes.
 *
 * Set as a numbered editorial index rather than a card grid: the five pieces
 * are read in any order, and a list with hairlines keeps the whole section to
 * one screen on a laptop instead of three rows of identical boxes.
 */
export default function ResourcesPage() {
  const { t } = useLanguage();

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
          url: "https://qiantongglobal.com/resources",
          hasPart: articles.map((a) => ({
            "@type": "Article",
            headline: a.title,
            url: `https://qiantongglobal.com/resources/${a.slug}`,
            datePublished: a.date,
          })),
        }}
      />

      <header className="border-b border-[#E4EBE8] bg-[#F7FAF9]">
        <div className="container-custom pt-28 md:pt-36 pb-14 md:pb-16">
          <div className="index-row">
            <span className="index-no">00</span>
            <span className="index-rule" />
            <span className="eyebrow">Compliance notes</span>
          </div>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] gap-6 lg:gap-16 lg:items-end">
            <h1 className="h2-section !text-[2rem] md:!text-[2.9rem] max-w-[24ch]">
              The documents behind the product
            </h1>
            <p className="lead lg:pb-1.5 [text-wrap:pretty]">
              Five short notes on the paperwork that decides whether a
              consignment can enter Switzerland or the EU — written for buyers
              who have to file it, defend it and live with it.
            </p>
          </div>
          <p className="mt-8 text-[12.5px] text-[#5F716D]">{t("res_note")}</p>
        </div>
      </header>

      <section className="container-custom py-14 md:py-20">
        <ul className="border-t border-[#DCE5E1]">
          {articles.map((a) => (
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
                    {a.title}
                  </span>
                  <span className="mt-2 block text-[14.5px] leading-[1.65] text-muted-foreground max-w-[52ch]">
                    {a.dek}
                  </span>
                </span>
                <span className="hidden md:flex flex-col items-end gap-2 pt-1.5">
                  <span className="meta-label">{a.tag}</span>
                  <span className="text-[12px] text-[#5F716D]">
                    {a.minutes} min · {formatDate(a.date)}
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="mt-1 text-[#0A5B51]/35 transition-all group-hover:text-primary group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] gap-8 items-center border border-[#DCE5E1] bg-[#F7FAF9] px-6 md:px-10 py-8 md:py-10">
          <div>
            <h2 className="font-display text-[1.35rem] md:text-[1.55rem] leading-[1.3] text-foreground">
              Looking for these documents for a specific device?
            </h2>
            <p className="mt-2.5 body-copy max-w-[46ch]">
              Tell us the product and the market. We will tell you which
              documents the factory already holds and which ones have to be
              requested or reissued.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link to="/#contact" className="btn-primary">
              Ask about a device
            </Link>
            <Link to="/products" className="btn-outline">
              Browse catalogue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
