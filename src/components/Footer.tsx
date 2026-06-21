import { Mail, Phone, MapPin, MessageCircle, ExternalLink } from "lucide-react";
import { useLanguage } from "./LanguageSwitcher";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Qiantong Global
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              {t("footer_desc")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer_quick")}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-white transition-colors">{t("nav_home")}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{t("nav_about")}</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">{t("footer_products")}</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">{t("footer_solutions")}</a></li>
              <li><a href="#certifications" className="hover:text-white transition-colors">{t("footer_certifications")}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer_contact_info")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-teal-400" />
                <a href="mailto:info@qiantongglobal.com" className="hover:text-white transition-colors">
                  info@qiantongglobal.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-teal-400" />
                <a href="https://wa.me/85257098985" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +852 5709 8985
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle size={16} className="mt-0.5 flex-shrink-0 text-teal-400" />
                <span>WhatsApp: Jason Li</span>
              </li>
              <li className="flex items-start gap-2">
                <ExternalLink size={16} className="mt-0.5 flex-shrink-0 text-teal-400" />
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
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-teal-400" />
                <span>{t("contact_location_val")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            {t("footer_rights")}
          </p>
          <p className="text-xs text-gray-500">
            CE MDR &middot; FDA &middot; ISO Certified Medical Consumables Supplier
          </p>
        </div>
      </div>
    </footer>
  );
}
