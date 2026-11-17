import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { useLanguage } from "@/components/LanguageSwitcher";
import {
  articleBySlug,
  adjacent,
  articleText,
  availableLangs,
  formatDate,
  type Block,
  type ResolvedLang,
} from "@/lib/resources";

/** Page furniture for the languages the notes are actually written in. The
 *  English note rendered inside German chrome would look like an unfinished
 *  translation, so the two travel together. */
const CHROME = {
  en: {
    all: "All notes",
    onPage: "On this page",
    inShort: "In short",
    minRead: "min read",
    disclaimer:
      "This note describes the rules as written and is not legal advice. For a specific device, the documents and the appointed representative decide the answer.",
    ask: "Ask about a specific device",
    browse: "Browse the catalogue",
    prev: "Previous",
    next: "Next",
    allNotes: "All compliance notes",
    langLabel: "Also published in",
  },
  de: {
    all: "Alle Beiträge",
    onPage: "Auf dieser Seite",
    inShort: "Kurz gefasst",
    minRead: "Min. Lesezeit",
    disclaimer:
      "Dieser Beitrag beschreibt die Regeln, wie sie geschrieben stehen, und ist keine Rechtsberatung. Bei einem konkreten Gerät entscheiden die Unterlagen und der bestellte Bevollmächtigte.",
    ask: "Zu einem konkreten Gerät fragen",
    browse: "Katalog ansehen",
    prev: "Vorheriger Beitrag",
    next: "Nächster Beitrag",
    allNotes: "Alle Fachbeiträge",
    langLabel: "Auch erschienen auf",
  },
  fr: {
    all: "Toutes les notes",
    onPage: "Sur cette page",
    inShort: "En bref",
    minRead: "min de lecture",
    disclaimer:
      "Cette note décrit les règles telles qu'elles sont écrites et ne constitue pas un conseil juridique. Pour un dispositif précis, ce sont les documents et le mandataire désigné qui tranchent.",
    ask: "Poser une question sur un dispositif",
    browse: "Voir le catalogue",
    prev: "Note précédente",
    next: "Note suivante",
    allNotes: "Toutes les notes de conformité",
    langLabel: "Également publié en",
  },
  it: {
    all: "Tutte le note",
    onPage: "In questa pagina",
    inShort: "In sintesi",
    minRead: "min di lettura",
    disclaimer:
      "Questa nota descrive le regole così come sono scritte e non costituisce un parere legale. Per un dispositivo preciso, a decidere sono i documenti e il rappresentante designato.",
    ask: "Chiedere informazioni su un dispositivo",
    browse: "Sfogliare il catalogo",
    prev: "Nota precedente",
    next: "Nota successiva",
    allNotes: "Tutte le note di conformità",
    langLabel: "Pubblicato anche in",
  },
} as const;

/** Language names follow the page language, not the reader's UI language:
 *  a German page that offers "Français" instead of "Französisch" reads like a
 *  machine-assembled menu. */
const LANG_NAME: Record<ResolvedLang, Record<ResolvedLang, string>> = {
  en: { en: "English", de: "Deutsch", fr: "Français", it: "Italiano" },
  de: { en: "Englisch", de: "Deutsch", fr: "Französisch", it: "Italienisch" },
  fr: { en: "anglais", de: "allemand", fr: "français", it: "italien" },
  it: { en: "inglese", de: "tedesco", fr: "francese", it: "italiano" },
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Terms that must not be split across a line break. A browser breaks after
 *  the hard hyphen in "CH-REP" and after the space in "ISO 13485", which looks
 *  like a typo at display size even though the text is correct. */
const KEEP_TOGETHER = /(CH-REP|ISO 13485|DoC)/g;
const NO_BREAK = new Set(["CH-REP", "ISO 13485", "DoC"]);

function KeepTogether({ text }: { text: string }) {
  return (
    <>
      {text.split(KEEP_TOGETHER).map((part, i) =>
        NO_BREAK.has(part) ? (
          <span key={i} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/** Body copy is set at 16.5px rather than the site's 15px: these pieces are
 *  read line by line, and the extra half step keeps a 70-character measure
 *  comfortable without widening the column. */
function BlockView({ block }: { block: Block }) {
  if (block.type === "h2") {
    return (
      <h2
        id={slugify(block.text)}
        className="mt-12 mb-4 scroll-mt-28 border-t border-[#DCE5E1] pt-7 font-display text-[1.32rem] md:text-[1.45rem] leading-[1.32] tracking-[-0.01em] text-foreground [text-wrap:balance]"
      >
        <KeepTogether text={block.text} />
      </h2>
    );
  }

  if (block.type === "p") {
    return (
      <p className="mt-4 text-[16px] md:text-[16.5px] leading-[1.78] text-foreground/85 [text-wrap:pretty]">
        {block.text}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="mt-5 space-y-3">
        {block.items.map((item, i) => (
          <li key={i} className="relative pl-6 text-[15.5px] md:text-[16px] leading-[1.72] text-foreground/85">
            <span className="absolute left-0 top-[0.62em] h-px w-3 bg-[#8F6519]/60" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "note") {
    return (
      <aside className="mt-8 border-l-2 border-[#8F6519] bg-[#F7FAF9] px-5 py-4 md:px-6 md:py-5">
        <p className="text-[14.5px] md:text-[15px] leading-[1.7] text-foreground/80">{block.text}</p>
      </aside>
    );
  }

  return (
    <div className="mt-7 w-full min-w-0 overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <thead>
          <tr>
            {block.head.map((h) => (
              <th
                key={h}
                scope="col"
                className="meta-label border-b border-[#0A5B51]/25 pb-2.5 pr-4 align-bottom"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i} className="border-b border-[#E4EBE8]">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`py-3.5 pr-4 align-top text-[14.5px] leading-[1.6] ${
                    j === 0 ? "font-medium text-foreground" : "text-foreground/80"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ResourcePage() {
  const { slug } = useParams();
  const { lang, setLang } = useLanguage();
  const article = slug ? articleBySlug(slug) : undefined;

  if (!article) return <Navigate to="/resources" replace />;

  // A note translated into German, opened by a French reader, must fall back
  // to English *and* say so, rather than mixing German chrome with English
  // body copy. `text.lang` is the language the reader is actually getting.
  const text = articleText(article, lang);
  const chrome = CHROME[text.lang];
  const langs = availableLangs(article);

  const { prev, next } = adjacent(article.slug);
  const headings = text.blocks.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={text.title}
        description={text.dek}
        path={`/resources/${article.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: text.title,
          description: text.dek,
          datePublished: article.date,
          dateModified: article.date,
          inLanguage: text.lang,
          author: { "@type": "Person", name: "Jason Li" },
          publisher: {
            "@type": "Organization",
            name: "Qiantong Global",
            url: "https://qiantongglobal.com",
          },
          mainEntityOfPage: `https://qiantongglobal.com/resources/${article.slug}`,
        }}
      />

      <header className="border-b border-[#E4EBE8] bg-[#F7FAF9]">
        <div className="container-custom pt-28 md:pt-36 pb-10 md:pb-14">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-[12.5px] font-medium text-[#5F716D] hover:text-primary transition-colors"
          >
            <ArrowLeft size={13} />
            {chrome.all}
          </Link>

          <div className="index-row mt-8">
            <span className="index-no">{article.no}</span>
            <span className="index-rule" />
            <span className="eyebrow">{text.tag}</span>
          </div>

          <h1 className="mt-5 max-w-[30ch] font-display text-[1.72rem] md:text-[2.7rem] leading-[1.16] tracking-[-0.02em] text-foreground [text-wrap:balance]">
            <KeepTogether text={text.title} />
          </h1>

          <p className="mt-5 max-w-[52ch] lead [text-wrap:pretty]">{text.dek}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-[#5F716D]">
            <span>{formatDate(article.date, text.lang)}</span>
            <span aria-hidden="true">·</span>
            <span>
              {text.minutes} {chrome.minRead}
            </span>
            <span aria-hidden="true">·</span>
            <span>Jason Li, Qiantong Global</span>
          </div>

          {langs.length > 1 && (
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12.5px]">
              <span className="text-[#5F716D]">{chrome.langLabel}</span>
              {langs.map((l) =>
                l === text.lang ? (
                  <span key={l} className="font-semibold text-foreground">
                    {LANG_NAME[text.lang][l]}
                  </span>
                ) : (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    className="underline decoration-[#C9A96A]/70 decoration-1 underline-offset-[5px] text-[#0A5B51] hover:text-primary transition-colors"
                  >
                    {LANG_NAME[text.lang][l]}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </header>

      <div className="container-custom py-12 md:py-16">
        <div className="mx-auto max-w-[64rem] grid grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)] gap-10 lg:gap-16">
          {/* Left rail: contents + the four lines a reader should leave with.
              Sticky only from lg, where there is room for it to hold still. */}
          <aside className="lg:sticky lg:top-28 lg:self-start order-2 lg:order-1">
            {headings.length > 0 && (
              <nav aria-label="On this page" className="hidden lg:block">
                <p className="meta-label">{chrome.onPage}</p>
                <ul className="mt-4 space-y-2.5 border-l border-[#DCE5E1] pl-4">
                  {headings.map((h) => (
                    <li key={h.text}>
                      <a
                        href={`#${slugify(h.text)}`}
                        className="block text-[13px] leading-[1.45] text-[#5F716D] hover:text-primary transition-colors"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className="mt-10 border-t border-[#DCE5E1] pt-5">
              <p className="meta-label">{chrome.inShort}</p>
              <ul className="mt-3.5 divide-y divide-[#E4EBE8] border-t border-[#E4EBE8]">
                {text.keyPoints.map((p, i) => (
                  <li key={i} className="py-2.5 text-[12.5px] leading-[1.6] text-[#5F716D]">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article className="order-1 lg:order-2 min-w-0 max-w-[44rem]">
            {text.blocks.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}

            <div className="mt-14 border-t border-[#0A5B51]/20 pt-7">
              <p className="text-[14.5px] leading-[1.7] text-muted-foreground max-w-[52ch]">
                {chrome.disclaimer}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/#contact" className="btn-primary">
                  {chrome.ask}
                </Link>
                <Link to="/products" className="btn-outline">
                  {chrome.browse}
                </Link>
              </div>
            </div>

            <nav className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="More notes">
              {prev ? (
                <Link
                  to={`/resources/${prev.slug}`}
                  className="group border border-[#DCE5E1] px-5 py-4 hover:border-[#B9CFC9] transition-colors"
                >
                  <span className="meta-label">{chrome.prev}</span>
                  <span className="mt-2 flex items-start gap-2 text-[14px] font-medium leading-[1.4] text-foreground group-hover:text-primary transition-colors">
                    <ArrowLeft size={13} className="mt-1 shrink-0" />
                    {articleText(prev, lang).title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  to={`/resources/${next.slug}`}
                  className="group border border-[#DCE5E1] px-5 py-4 hover:border-[#B9CFC9] transition-colors sm:text-right"
                >
                  <span className="meta-label">{chrome.next}</span>
                  <span className="mt-2 flex items-start gap-2 text-[14px] font-medium leading-[1.4] text-foreground group-hover:text-primary transition-colors sm:justify-end">
                    {articleText(next, lang).title}
                    <ArrowRight size={13} className="mt-1 shrink-0" />
                  </span>
                </Link>
              )}
            </nav>

            <p className="mt-10">
              <Link
                to="/resources"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#0A5B51] hover:text-primary"
              >
                {chrome.allNotes}
                <ArrowUpRight size={13} />
              </Link>
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
