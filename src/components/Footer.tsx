import { Mail, MapPin, MessageCircle, ExternalLink } from "lucide-react";
import { useLanguage } from "./LanguageSwitcher";
import { LogoMark } from "./LogoMark";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#04241F] text-white/[0.66]">
      <div className="container-custom py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.45fr_0.7fr_1fr] gap-10 lg:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <LogoMark tone="light" className="h-10" />
              <span className="text-[17px] font-semibold text-white tracking-[-0.015em] whitespace-nowrap">
                Qiantong Global
              </span>
            </div>
            <p className="text-white/[0.6] text-[14px] leading-[1.7] max-w-sm mt-1">
              {t("footer_desc")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white/[0.92] font-semibold mb-4 text-[11.5px] uppercase tracking-[0.16em]">{t("footer_quick")}</h3>
            <ul className="space-y-2.5 text-[14px]">
              <li><a href="#home" className="hover:text-white transition-colors">{t("nav_home")}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{t("nav_about")}</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">{t("footer_products")}</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">{t("footer_solutions")}</a></li>
              <li><a href="#certifications" className="hover:text-white transition-colors">{t("footer_certifications")}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white/[0.92] font-semibold mb-4 text-[11.5px] uppercase tracking-[0.16em]">{t("footer_contact_info")}</h3>
            <ul className="space-y-3 text-[14px]">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-white/[0.45]" />
                <a href="mailto:info@qiantongglobal.com" className="hover:text-white transition-colors">
                  info@qiantongglobal.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle size={16} className="mt-0.5 flex-shrink-0 text-white/[0.45]" />
                <a href="https://wa.me/85257098985" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +852 5709 8985
                </a>
              </li>
              <li className="flex items-start gap-2">
                <ExternalLink size={16} className="mt-0.5 flex-shrink-0 text-white/[0.45]" />
                <a
                  href="https://www.facebook.com/profile.php?id=61589986566230"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {t("footer_facebook")}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-white/[0.45]" />
                <span>{t("contact_location_val")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.14] mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/[0.56]">
            {t("footer_rights")}
          </p>
          <p className="text-[12px] text-white/[0.56]">
            CE MDR &middot; ISO 13485 &middot; FDA sourcing on request
          </p>
        </div>
      </div>
    </footer>
  );
}
