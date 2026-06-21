import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProviders } from "./components/providers";
import { LanguageProvider } from "./components/LanguageSwitcher";
import IndexPage from "./pages/index";
import NotFoundPage from "./pages/not-found";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import CookieConsent from "./components/CookieConsent";
import "./app.css";

export default function App() {
  return (
    <AppProviders>
      <LanguageProvider>
        <BrowserRouter basename={import.meta.env.VITE_BASE}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<IndexPage />} />
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
