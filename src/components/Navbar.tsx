import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./LanguageSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("nav_home"), href: "#home" },
    { label: t("nav_about"), href: "#about" },
    { label: t("nav_products"), href: "#products" },
    { label: t("nav_solutions"), href: "#solutions" },
    { label: t("nav_certifications"), href: "#certifications" },
    { label: t("nav_contact"), href: "#contact" },
  ];

  const textColor = scrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white";
  const bgHover = scrolled ? "hover:bg-primary/5" : "hover:bg-white/10";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className={`text-xl font-bold tracking-tight ${scrolled ? "text-foreground" : "text-white"}`}>
              Qiantong Global
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${textColor} ${bgHover}`}
              >
                {link.label}
              </a>
            ))}
            <div className="ml-2">
              <LanguageSwitcher variant={scrolled ? "light" : "dark"} />
            </div>
            <a
              href="#contact"
              className="ml-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors"
            >
              {t("hero_cta_quote")}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher variant={scrolled ? "light" : "dark"} />
            <button
              className={`p-2 rounded-md ${scrolled ? "text-foreground" : "text-white"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white rounded-xl shadow-xl border border-gray-100 mt-2 py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <a
                href="#contact"
                className="block text-center px-4 py-3 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t("hero_cta_quote")}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
