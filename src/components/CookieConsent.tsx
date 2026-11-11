import { useState, useEffect } from "react";
import { X, Cookie, Settings } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setAccepted(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem("cookie_consent", "all");
    setVisible(false);
    setAccepted(true);
  }

  function handleReject() {
    localStorage.setItem("cookie_consent", "essential");
    setVisible(false);
    setAccepted(true);
  }

  if (!visible || accepted) return null;

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
                We Value Your Privacy
              </h3>
              <p className="mt-1 text-[12.5px] text-muted-foreground leading-[1.6] max-w-3xl">
                We use cookies to analyse site traffic and improve your experience. You can
                accept all cookies or only those the site needs to function.{" "}
                <a href="/privacy" className="text-primary underline underline-offset-2 hover:no-underline">
                  Privacy Policy
                </a>
              </p>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
              >
                <Settings size={12} />
                {showDetails ? "Hide details" : "Cookie settings"}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 lg:ml-4">
            <button
              onClick={handleReject}
              className="flex-1 lg:flex-none px-5 py-2.5 border border-[#D2DBD8] text-foreground text-[13.5px] font-medium rounded-sm hover:bg-[#F5F9F8] transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 lg:flex-none px-5 py-2.5 bg-primary hover:bg-[#00594F] text-white text-[13.5px] font-semibold rounded-sm transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={() => setVisible(false)}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-[#EDF1F0] grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[13px] font-medium text-foreground">Essential cookies</div>
                <div className="text-[12px] text-muted-foreground mt-0.5">
                  Required for the website to function
                </div>
              </div>
              <span className="text-[11px] font-medium text-primary bg-[#EDF4F2] px-2 py-1 rounded-sm whitespace-nowrap">
                Always active
              </span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[13px] font-medium text-foreground">Analytics cookies</div>
                <div className="text-[12px] text-muted-foreground mt-0.5">
                  Help us understand how visitors use the site
                </div>
              </div>
              <span className="text-[11px] font-medium text-muted-foreground bg-[#F3F6F5] px-2 py-1 rounded-sm whitespace-nowrap">
                Optional
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
