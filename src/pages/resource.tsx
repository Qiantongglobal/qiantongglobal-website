import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { articleBySlug, adjacent, formatDate, type Block } from "@/lib/resources";

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
  const article = slug ? articleBySlug(slug) : undefined;

  if (!article) return <Navigate to="/resources" replace />;

  const { prev, next } = adjacent(article.slug);
  const headings = article.blocks.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={article.title}
        description={article.dek}
        path={`/resources/${article.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.dek,
          datePublished: article.date,
          dateModified: article.date,
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
            All notes
          </Link>

          <div className="index-row mt-8">
            <span className="index-no">{article.no}</span>
            <span className="index-rule" />
            <span className="eyebrow">{article.tag}</span>
          </div>

          <h1 className="mt-5 max-w-[30ch] font-display text-[1.72rem] md:text-[2.7rem] leading-[1.16] tracking-[-0.02em] text-foreground [text-wrap:balance]">
            <KeepTogether text={article.title} />
          </h1>

          <p className="mt-5 max-w-[52ch] lead [text-wrap:pretty]">{article.dek}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-[#5F716D]">
            <span>{formatDate(article.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{article.minutes} min read</span>
            <span aria-hidden="true">·</span>
            <span>Jason Li, Qiantong Global</span>
          </div>
        </div>
      </header>

      <div className="container-custom py-12 md:py-16">
        <div className="mx-auto max-w-[64rem] grid grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)] gap-10 lg:gap-16">
          {/* Left rail: contents + the four lines a reader should leave with.
              Sticky only from lg, where there is room for it to hold still. */}
          <aside className="lg:sticky lg:top-28 lg:self-start order-2 lg:order-1">
            {headings.length > 0 && (
              <nav aria-label="On this page" className="hidden lg:block">
                <p className="meta-label">On this page</p>
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
              <p className="meta-label">In short</p>
              <ul className="mt-3.5 divide-y divide-[#E4EBE8] border-t border-[#E4EBE8]">
                {article.keyPoints.map((p, i) => (
                  <li key={i} className="py-2.5 text-[12.5px] leading-[1.6] text-[#5F716D]">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article className="order-1 lg:order-2 min-w-0 max-w-[44rem]">
            {article.blocks.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}

            <div className="mt-14 border-t border-[#0A5B51]/20 pt-7">
              <p className="text-[14.5px] leading-[1.7] text-muted-foreground max-w-[52ch]">
                This note describes the rules as written and is not legal
                advice. For a specific device, the documents and the appointed
                representative decide the answer.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/#contact" className="btn-primary">
                  Ask about a specific device
                </Link>
                <Link to="/products" className="btn-outline">
                  Browse the catalogue
                </Link>
              </div>
            </div>

            <nav className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="More notes">
              {prev ? (
                <Link
                  to={`/resources/${prev.slug}`}
                  className="group border border-[#DCE5E1] px-5 py-4 hover:border-[#B9CFC9] transition-colors"
                >
                  <span className="meta-label">Previous</span>
                  <span className="mt-2 flex items-start gap-2 text-[14px] font-medium leading-[1.4] text-foreground group-hover:text-primary transition-colors">
                    <ArrowLeft size={13} className="mt-1 shrink-0" />
                    {prev.title}
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
                  <span className="meta-label">Next</span>
                  <span className="mt-2 flex items-start gap-2 text-[14px] font-medium leading-[1.4] text-foreground group-hover:text-primary transition-colors sm:justify-end">
                    {next.title}
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
                All compliance notes
                <ArrowUpRight size={13} />
              </Link>
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
