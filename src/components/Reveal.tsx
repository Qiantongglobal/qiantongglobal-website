import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

/**
 * Fades a block in the first time it enters the viewport. Extracted from the
 * home page so the product pages animate on the same rhythm.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
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
