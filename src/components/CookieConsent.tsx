import { useState, useEffect } from "react";
import { X, Cookie, Shield, Settings } from "lucide-react";

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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Cookie size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  We Value Your Privacy
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  By clicking "Accept All", you consent to our use of all cookies. 
                  You can also choose to accept only essential cookies that are necessary for the site to function.
                </p>
              </div>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <X size={18} className="text-muted-foreground" />
            </button>
          </div>

          {showDetails && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <h4 className="text-sm font-semibold text-foreground mb-3">Cookie Categories</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-foreground">Essential Cookies</div>
                    <div className="text-xs text-muted-foreground">Required for the website to function properly</div>
                  </div>
                  <div className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded">Always Active</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-foreground">Analytics Cookies</div>
                    <div className="text-xs text-muted-foreground">Help us understand how visitors interact with our website</div>
                  </div>
                  <div className="text-xs font-medium text-muted-foreground bg-gray-100 px-2 py-1 rounded">Optional</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings size={14} />
              Cookie Settings
            </button>
            <div className="flex flex-col sm:flex-row gap-3 sm:ml-auto">
              <button
                onClick={handleReject}
                className="px-6 py-2.5 border border-gray-200 text-foreground text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 bg-primary hover:bg-teal-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Accept All
              </button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            By using our website, you agree to our{" "}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
