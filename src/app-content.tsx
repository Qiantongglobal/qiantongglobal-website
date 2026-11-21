import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import CookieConsent from "./components/CookieConsent";
import IndexPage from "./pages/index";
import ProductsPage from "./pages/products";
import ProductPage from "./pages/product";
import ResourcesPage from "./pages/resources";
import ResourcePage from "./pages/resource";
import NotFoundPage from "./pages/not-found";
import PrivacyPolicy from "./pages/PrivacyPolicy";

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
        // Instant, not smooth: arriving from a product page means travelling
        // the whole document, and a slow glide through every section reads as
        // a loading stall rather than a transition.
        if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
        else window.scrollTo(0, 0);
      });
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

/**
 * Everything inside the Router. Shared by the browser entry (wrapped in
 * BrowserRouter) and the build-time prerenderer (wrapped in StaticRouter) so
 * the static HTML is byte-for-byte the same markup React mounts into.
 */
export default function AppContent() {
  return (
    <>
      <ScrollManager />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:categoryId/:slug" element={<ProductPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:slug" element={<ResourcePage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
      </div>
    </>
  );
}
