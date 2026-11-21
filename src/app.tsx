import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./components/providers";
import { LanguageProvider } from "./components/LanguageSwitcher";
import AppContent from "./app-content";
import "./app.css";

export default function App() {
  return (
    <AppProviders>
      <LanguageProvider>
        <BrowserRouter basename={import.meta.env.VITE_BASE}>
          <AppContent />
        </BrowserRouter>
      </LanguageProvider>
    </AppProviders>
  );
}
