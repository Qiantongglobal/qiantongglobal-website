import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [atFooter, setAtFooter] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setAtFooter(entry.isIntersecting),
      { rootMargin: "0px 0px -64px 0px", threshold: 0 }
    );
    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  // Stays out of the hero entirely, so the first screen is nothing but the
  // headline and the two real buttons.
  const hidden = atFooter || !pastHero;

  return (
    <a
      href="https://wa.me/85257098985"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      title="WhatsApp"
      // A 56px disc instead of a worded pill: it keeps the accent colour
      // without covering the right edge of whatever sits at the page bottom.
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#0E6B4A] text-white shadow-[0_8px_24px_rgba(4,36,31,0.28)] ring-1 ring-white/20 transition-all duration-300 hover:bg-[#0A5B51] hover:shadow-[0_10px_28px_rgba(4,36,31,0.34)] ${
        hidden ? "opacity-0 translate-y-6 pointer-events-none" : "opacity-100 translate-y-0"
      }`}
    >
      <MessageCircle size={23} />
    </a>
  );
}
