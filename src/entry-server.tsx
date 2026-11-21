import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import { AppProviders } from "./components/providers";
import { LanguageProvider } from "./components/LanguageSwitcher";
import { resetSeoSnapshot, takeSeoSnapshot } from "./components/Seo";
import AppContent from "./app-content";

/**
 * Build-time only. Renders one route to static HTML with the initial (English)
 * language snapshot. The browser then hydrates the same markup.
 */
export function render(url: string) {
  resetSeoSnapshot();
  const html = renderToString(
    <AppProviders>
      <LanguageProvider>
        <StaticRouter location={url} basename={import.meta.env.VITE_BASE}>
          <AppContent />
        </StaticRouter>
      </LanguageProvider>
    </AppProviders>
  );
  return { html, seo: takeSeoSnapshot() };
}
