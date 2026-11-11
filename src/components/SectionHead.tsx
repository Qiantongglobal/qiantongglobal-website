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
}

export function SectionHead({ label, title, desc, align = "left" }: SectionHeadProps) {
  if (align === "center") {
    return (
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
        <span className="eyebrow">{label}</span>
        <h2 className="h2-section mt-3">{title}</h2>
        {desc && <p className="lead mt-4 max-w-2xl mx-auto">{desc}</p>}
      </div>
    );
  }

  return (
    <div className="mb-12 md:mb-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] gap-5 lg:gap-16 lg:items-end">
      <div>
        <span className="eyebrow">{label}</span>
        <h2 className="h2-section mt-3 max-w-[22ch]">{title}</h2>
      </div>
      {desc && <p className="lead lg:pb-1.5">{desc}</p>}
    </div>
  );
}
