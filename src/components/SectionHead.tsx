interface SectionHeadProps {
  label: string;
  title: string;
  desc?: string;
  /**
   * "left" puts the headline against the margin and hangs the standfirst in a
   * narrow right column; "center" stacks it. Alternating the two down the page
   * is what stops six sections from reading as one template repeated six times.
   */
  align?: "left" | "center";
  /** Chapter number shown before the eyebrow ("03"). Numerals only, no copy. */
  no?: string;
  /** light = for sections sitting on the deep green. */
  tone?: "dark" | "light";
}

export function SectionHead({
  label,
  title,
  desc,
  align = "left",
  no,
  tone = "dark",
}: SectionHeadProps) {
  const light = tone === "light";

  const eyebrow = (
    <div className={`index-row ${align === "center" ? "justify-center" : ""}`}>
      {no && <span className={`index-no ${light ? "!text-[#C9A96A]" : ""}`}>{no}</span>}
      <span className={`index-rule ${light ? "!bg-white/30" : ""}`} />
      <span className={`eyebrow ${light ? "!text-[#D8B87A]" : ""}`}>{label}</span>
    </div>
  );

  if (align === "center") {
    return (
      <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
        {eyebrow}
        <h2 className={`h2-section mt-4 ${light ? "text-white" : ""}`}>{title}</h2>
        {desc && (
          <p
            className={`lead mt-4 max-w-[44rem] mx-auto [text-wrap:pretty] ${
              light ? "!text-white/[0.62]" : ""
            }`}
          >
            {desc}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mb-12 md:mb-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] gap-5 lg:gap-16 lg:items-end">
      <div>
        {eyebrow}
        <h2 className={`h2-section mt-4 max-w-[22ch] ${light ? "text-white" : ""}`}>{title}</h2>
      </div>
      {desc && (
        <p className={`lead lg:pb-2 ${light ? "!text-white/[0.62]" : ""}`}>{desc}</p>
      )}
    </div>
  );
}
