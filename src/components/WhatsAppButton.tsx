import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [atFooter, setAtFooter] = useState(false);

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

  return (
    <a
      href="https://wa.me/85257098985"
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={atFooter}
      tabIndex={atFooter ? -1 : 0}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
        atFooter ? "opacity-0 translate-y-6 pointer-events-none" : "opacity-100 translate-y-0"
      }`}
    >
      <MessageCircle size={22} />
      <span className="hidden sm:inline text-sm font-semibold">
        Chat on WhatsApp
      </span>
    </a>
  );
}
