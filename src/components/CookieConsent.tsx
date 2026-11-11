import { useState, useEffect } from "react";
import { X, Cookie, Settings } from "lucide-react";
import { useLanguage } from "@/components/LanguageSwitcher";

/**
 * Consent is wired to Google Consent Mode: the page loads GA with every
 * purpose denied (see index.html), and only an explicit "Accept All" flips
 * analytics_storage to granted. "Essential only" and closing the bar both
 * count as a refusal, so neither writes to localStorage as an acceptance.
 */
function setAnalyticsConsent(granted: boolean) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", { analytics_storage: granted ? "granted" : "denied" });
}

export default function CookieConsent() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "all") {
      // Returning visitor who already accepted: restore before GA's first hit.
      setAnalyticsConsent(true);
    } else if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function decide(choice: "all" | "essential") {
    localStorage.setItem("cookie_consent", choice);
    if (choice === "all") setAnalyticsConsent(true);
    setVisible(false);
  }

  if (!visible) return null;

  // A single bar pinned to the bottom edge, rather than a floating card: it
  // covers a tenth of the screen instead of a quarter, and reads as part of
  // the site instead of a bolted-on widget.
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E2E8E6] bg-white shadow-[0_-8px_24px_rgba(4,36,31,0.06)]">
      <div className="container-custom py-4 md:py-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Cookie size={18} className="mt-0.5 shrink-0 text-primary" />
            <div className="min-w-0">
              <h3 className="text-[13.5px] font-semibold text-foreground">
                {t("cookie_title")}
              </h3>
              <p className="mt-1 text-[12.5px] text-muted-foreground leading-[1.6] max-w-3xl">
                {t("cookie_body")}{" "}
                <a href="/privacy" className="text-primary underline underline-offset-2 hover:no-underline">
                  {t("form_privacy_policy_link")}
                </a>
              </p>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
              >
                <Settings size={12} />
                {showDetails ? t("cookie_hide") : t("cookie_settings")}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 lg:ml-4">
            <button
              onClick={() => decide("essential")}
              className="flex-1 lg:flex-none px-5 py-2.5 border border-[#D2DBD8] text-foreground text-[13.5px] font-medium rounded-sm hover:bg-[#F5F9F8] transition-colors"
            >
              {t("cookie_reject")}
            </button>
            <button
              onClick={() => decide("all")}
              className="flex-1 lg:flex-none px-5 py-2.5 bg-primary hover:bg-[#00594F] text-white text-[13.5px] font-semibold rounded-sm transition-colors"
            >
              {t("cookie_accept")}
            </button>
            <button
              // Closing without choosing is recorded as a refusal: the bar must
              // not keep re-appearing, and no analytics consent may be implied.
              onClick={() => decide("essential")}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={t("cookie_close")}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-[#EDF1F0] grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[13px] font-medium text-foreground">{t("cookie_ess_t")}</div>
                <div className="text-[12px] text-muted-foreground mt-0.5">
                  {t("cookie_ess_d")}
                </div>
              </div>
              <span className="text-[11px] font-medium text-primary bg-[#EDF4F2] px-2 py-1 rounded-sm whitespace-nowrap">
                {t("cookie_ess_a")}
              </span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[13px] font-medium text-foreground">{t("cookie_ana_t")}</div>
                <div className="text-[12px] text-muted-foreground mt-0.5">
                  {t("cookie_ana_d")}
                </div>
              </div>
              <span className="text-[11px] font-medium text-muted-foreground bg-[#F3F6F5] px-2 py-1 rounded-sm whitespace-nowrap">
                {t("cookie_ana_o")}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
