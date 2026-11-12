import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AppProviders } from "./components/providers";
import { LanguageProvider } from "./components/LanguageSwitcher";
import IndexPage from "./pages/index";
import ProductsPage from "./pages/products";
import ProductPage from "./pages/product";
import NotFoundPage from "./pages/not-found";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import CookieConsent from "./components/CookieConsent";
import "./app.css";

/**
 * Restores the expected scroll position on navigation: jump to the section
 * when the URL carries a hash (nav links on product pages land back on the
 * home page sections), otherwise start at the top of the new page.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const raf = requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo(0, 0);
      });
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <AppProviders>
      <LanguageProvider>
        <BrowserRouter basename={import.meta.env.VITE_BASE}>
          <ScrollManager />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:categoryId/:slug" element={<ProductPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
            <CookieConsent />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </AppProviders>
  );
}
