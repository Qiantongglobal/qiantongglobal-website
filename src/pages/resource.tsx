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
import SelfCheckForm from "@/components/SelfCheckForm";

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

/**
 * Decorative line glyph shown beside the article title. These are abstract
 * marks for the note's theme (documents, clearance, schedules) — never product
 * imagery, so there is no device claim to substantiate. Kept in one place so
 * the 14 notes share one stroke weight and the same two-ink palette.
 */
function ArticleGlyph({ slug }: { slug: string }) {
  const ink = "#0A5B51";
  const gold = "#8F6519";
  const common = {
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  let art: JSX.Element;

  switch (slug) {
    case "ch-rep-switzerland":
      art = (
        <>
          <path d="M60 20 88 31v25c0 17-12 29-28 36-16-7-28-19-28-36V31z" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M60 40v30M50 50h20" stroke={gold} strokeWidth="2.6" {...common} />
          <path d="M78 79l10 10M88 79L78 89" stroke={ink} strokeWidth="1.8" {...common} />
        </>
      );
      break;
    case "class-i-sterile-notified-body":
      art = (
        <>
          <rect x="42" y="34" width="36" height="56" rx="4" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M42 50h36M42 66h36" stroke={ink} strokeWidth="1.6" {...common} />
          <path d="M52 26h16M56 20h8" stroke={gold} strokeWidth="2.2" {...common} />
          <circle cx="60" cy="76" r="7" stroke={gold} strokeWidth="2.2" {...common} />
          <path d="M57 76l2 2 4-4" stroke={gold} strokeWidth="2" {...common} />
        </>
      );
      break;
    case "reading-a-declaration-of-conformity":
      art = (
        <>
          <path d="M38 22h30l16 16v56a4 4 0 0 1-4 4H38a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4z" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M68 22v16h16" stroke={ink} strokeWidth="2" {...common} />
          <path d="M46 50h28M46 60h28M46 70h18" stroke={ink} strokeWidth="1.6" {...common} />
          <circle cx="79" cy="79" r="13" stroke={gold} strokeWidth="2.4" {...common} />
          <path d="M88 88l9 9" stroke={gold} strokeWidth="2.8" {...common} />
        </>
      );
      break;
    case "importer-obligations-article-13":
      art = (
        <>
          <path d="M60 20l30 12v27c0 18-12 31-30 39-18-8-30-21-30-39V32z" stroke={ink} strokeWidth="2.2" {...common} />
          <rect x="44" y="45" width="32" height="26" rx="2" stroke={ink} strokeWidth="1.8" {...common} />
          <path d="M50 53h20M50 60h20" stroke={gold} strokeWidth="1.8" {...common} />
        </>
      );
      break;
    case "three-documents":
      art = (
        <>
          <rect x="30" y="34" width="38" height="50" rx="3" stroke={ink} strokeWidth="1.8" opacity="0.55" {...common} />
          <rect x="42" y="28" width="38" height="50" rx="3" stroke={ink} strokeWidth="1.8" opacity="0.75" {...common} />
          <rect x="54" y="22" width="38" height="50" rx="3" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M62 36h22M62 44h22M62 52h14" stroke={gold} strokeWidth="1.8" {...common} />
        </>
      );
      break;
    case "uk-ce-marking-indefinite-recognition":
      art = (
        <>
          <path d="M34 30h34l14 14v42a4 4 0 0 1-4 4H34a4 4 0 0 1-4-4V34a4 4 0 0 1 4-4z" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M68 30v14h14" stroke={ink} strokeWidth="1.8" {...common} />
          <path d="M42 58h20M42 68h16" stroke={ink} strokeWidth="1.6" {...common} />
          <path d="M76 76a12 12 0 1 0 12 12" stroke={gold} strokeWidth="2.4" {...common} />
          <path d="M76 96v-8h8" stroke={gold} strokeWidth="2.4" {...common} />
        </>
      );
      break;
    case "swissdamed-registration-2026":
      art = (
        <>
          <ellipse cx="60" cy="34" rx="24" ry="9" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M36 34v48c0 5 10.7 9 24 9s24-4 24-9V34" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M36 58c0 5 10.7 9 24 9s24-4 24-9" stroke={ink} strokeWidth="1.6" {...common} />
          <path d="M48 76v8M56 76v10M64 76v8M72 76v10" stroke={gold} strokeWidth="2.2" {...common} />
        </>
      );
      break;
    case "ce-is-not-a-global-passport":
      art = (
        <>
          <circle cx="60" cy="60" r="34" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M26 60h68M60 26c10 10 10 58 0 68M60 26c-10 10-10 58 0 68" stroke={ink} strokeWidth="1.6" {...common} />
          <path d="M40 84L84 36" stroke={gold} strokeWidth="2.6" {...common} />
        </>
      );
      break;
    case "market-access-at-a-glance":
      art = (
        <>
          <rect x="26" y="32" width="68" height="56" rx="3" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M26 48h68M26 64h68M48 32v56" stroke={ink} strokeWidth="1.6" {...common} />
          <path d="M56 76h10M56 84h26" stroke={gold} strokeWidth="2" {...common} />
          <circle cx="60" cy="40" r="2.5" fill={gold} stroke="none" />
        </>
      );
      break;
    case "sourcing-from-china-checklist":
      art = (
        <>
          <rect x="40" y="22" width="40" height="76" rx="3" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M50 42h20M50 56h20M50 70h20" stroke={ink} strokeWidth="1.6" {...common} />
          <path d="M48 38l2 2 4-4M48 52l2 2 4-4M48 66l2 2 4-4" stroke={gold} strokeWidth="2.2" {...common} />
          <path d="M48 84h24" stroke={ink} strokeWidth="1.6" {...common} />
        </>
      );
      break;
    case "first-rfq-what-to-include":
      art = (
        <>
          <rect x="24" y="40" width="72" height="46" rx="3" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M24 44l36 26 36-26" stroke={ink} strokeWidth="2" {...common} />
          <path d="M44 28h32M44 34h20" stroke={gold} strokeWidth="2" {...common} />
        </>
      );
      break;
    case "samples-and-prototyping":
      art = (
        <>
          <path d="M34 46l26-14 26 14-26 14z" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M34 46v30l26 14V60M86 46v30L60 90" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M60 60v30" stroke={ink} strokeWidth="1.6" {...common} />
          <circle cx="60" cy="37" r="4" stroke={gold} strokeWidth="2.2" {...common} />
        </>
      );
      break;
    case "lead-time-ready-date":
      art = (
        <>
          <rect x="32" y="30" width="56" height="56" rx="4" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M32 46h56M46 24v12M74 24v12" stroke={ink} strokeWidth="2" {...common} />
          <path d="M48 68l8 8 16-18" stroke={gold} strokeWidth="2.8" {...common} />
        </>
      );
      break;
    case "sourcing-partner-vs-factory":
      art = (
        <>
          <circle cx="32" cy="60" r="8" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M40 60h16c8 0 8-20 18-20h14" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M40 60h16c8 0 8 20 18 20h14" stroke={gold} strokeWidth="2.2" {...common} />
          <rect x="84" y="30" width="16" height="18" rx="2" stroke={ink} strokeWidth="2" {...common} />
          <rect x="84" y="72" width="16" height="18" rx="2" stroke={gold} strokeWidth="2" {...common} />
        </>
      );
      break;
    case "matching-airway-devices-to-the-case":
      art = (
        <>
          <circle cx="26" cy="60" r="8" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M34 60h18M52 60V34h16M52 60v26h16M52 60h34" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M74 34h16M74 60h16M74 86h16" stroke={gold} strokeWidth="2.4" {...common} />
          <path d="M80 30l3 3 6-6" stroke={gold} strokeWidth="2" {...common} />
        </>
      );
      break;
    case "urine-bags-urine-meters-and-ostomy-bags":
      art = (
        <>
          <rect x="22" y="40" width="22" height="46" rx="4" stroke={ink} strokeWidth="2.2" {...common} />
          <rect x="49" y="34" width="22" height="52" rx="4" stroke={ink} strokeWidth="2.2" {...common} />
          <rect x="76" y="46" width="22" height="40" rx="4" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M28 52h10M28 62h10M28 72h10" stroke={ink} strokeWidth="1.6" {...common} />
          <path d="M55 48h10M55 58h10M55 68h10" stroke={gold} strokeWidth="1.8" {...common} />
          <circle cx="87" cy="66" r="6" stroke={gold} strokeWidth="2.2" {...common} />
        </>
      );
      break;
    default:
      art = (
        <>
          <path d="M40 26h28l14 14v54a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V30a4 4 0 0 1 4-4z" stroke={ink} strokeWidth="2.2" {...common} />
          <path d="M68 26v14h14M46 56h28M46 68h28" stroke={gold} strokeWidth="2" {...common} />
        </>
      );
  }

  return (
    <svg
      viewBox="0 0 120 120"
      className="h-40 w-40 md:h-56 md:w-56"
      role="img"
      aria-label="Decorative illustration of the article theme"
    >
      {art}
    </svg>
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

  if (block.type === "links") {
    return (
      <ul className="mt-5 space-y-3">
        {block.items.map((it) => (
          <li key={it.href} className="text-[15.5px] md:text-[16px] leading-[1.6]">
            <a
              href={it.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-medium text-[#0A5B51] underline decoration-[#C9A96A]/70 decoration-1 underline-offset-[5px] hover:text-primary transition-colors"
            >
              {it.label}
              <ArrowUpRight size={13} />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  // A five-market comparison has six columns; inside a 44rem article column
  // that needs its own scroll width rather than the default 34rem.
  const wide = block.head.length >= 5;

  return (
    <div className="mt-7 w-full min-w-0 overflow-x-auto">
      <table
        className="w-full border-collapse text-left"
        style={{ minWidth: wide ? "58rem" : "34rem" }}
      >
        <thead>
          <tr>
            {block.head.map((h) => (
              <th
                key={h}
                scope="col"
                className={`meta-label border-b border-[#0A5B51]/25 pb-2.5 align-bottom ${
                  wide ? "pr-3" : "pr-4"
                }`}
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
                  className={`align-top py-3.5 ${
                    wide ? "pr-3 text-[13px] leading-[1.5]" : "pr-4 text-[14.5px] leading-[1.6]"
                  } ${
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
            url: "https://www.qiantongglobal.com",
          },
          mainEntityOfPage: `https://www.qiantongglobal.com/resources/${article.slug}`,
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

          <div className="mt-5 flex items-start justify-between gap-8">
            <div className="min-w-0">
              <h1 className="max-w-[30ch] font-display text-[1.72rem] md:text-[2.7rem] leading-[1.16] tracking-[-0.02em] text-foreground [text-wrap:balance]">
                <KeepTogether text={text.title} />
              </h1>

              <p className="mt-5 max-w-[52ch] lead [text-wrap:pretty]">{text.dek}</p>
            </div>
            <div className="hidden shrink-0 lg:block pt-2" aria-hidden="true">
              <ArticleGlyph slug={article.slug} />
            </div>
          </div>

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
        <div
          className={`mx-auto grid grid-cols-1 gap-10 lg:gap-16 ${
            article.wide
              ? "max-w-[78rem] lg:grid-cols-[13rem_minmax(0,1fr)]"
              : "max-w-[64rem] lg:grid-cols-[15rem_minmax(0,1fr)]"
          }`}
        >
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

          <article className={`order-1 lg:order-2 min-w-0 ${article.wide ? "max-w-[62rem]" : "max-w-[44rem]"}`}>
            {text.blocks.map((b, i) => (
              <div key={i} className={article.wide && b.type !== "table" && b.type !== "links" ? "max-w-[46rem]" : undefined}>
                <BlockView block={b} />
              </div>
            ))}

            {/* The overview note ends in a self-check form: the reader has
                just seen the five-market table, so the natural next step is
                "which of these apply to me". The CRM receives the selection
                structured, so the reply can be a document list. */}
            {article.slug === "market-access-at-a-glance" && (
              <SelfCheckForm noteLang={text.lang} />
            )}

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
