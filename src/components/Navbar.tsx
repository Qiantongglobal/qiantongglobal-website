import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./LanguageSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LogoMark } from "./LogoMark";

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

  // 未滚动：首屏是深墨绿，导航透明，徽记反白（金羽毛保留）
  // 滚动后：顶部让出一条实白条，徽记回到墨绿原色
  const onDark = !scrolled;
  const textColor = onDark ? "text-white/[0.85] hover:text-white" : "text-foreground/75 hover:text-primary";
  const bgHover = onDark ? "hover:bg-white/10" : "hover:bg-foreground/5";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="flex items-center gap-2.5">
            <LogoMark tone={onDark ? "light" : "dark"} className="h-9 md:h-10" />
            <span
              className={`text-base sm:text-lg md:text-xl font-semibold tracking-tight whitespace-nowrap transition-colors ${
                onDark ? "text-white" : "text-foreground"
              }`}
            >
              Qiantong Global
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-sm transition-colors ${textColor} ${bgHover}`}
              >
                {link.label}
              </a>
            ))}
            <div className="ml-2">
              <LanguageSwitcher variant={onDark ? "dark" : "light"} />
            </div>
            <a
              href="#contact"
              className={`ml-2 px-4 py-2 text-sm font-semibold rounded-sm transition-colors ${
                onDark
                  ? "bg-white text-[#00463E] hover:bg-[#F1F6F4]"
                  : "bg-[#00463E] text-white hover:bg-[#00594F]"
              }`}
            >
              {t("hero_cta_quote")}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher variant={onDark ? "dark" : "light"} />
            <button
              className={`p-2 rounded-sm ${onDark ? "text-white" : "text-foreground"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white rounded-md border border-border mt-2 py-2">
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
                className="block text-center px-4 py-3 bg-[#00463E] text-white text-sm font-semibold rounded-sm hover:bg-[#00594F] transition-colors"
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
