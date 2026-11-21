import 'ai-app-client'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Self-hosted Inter: without these the browser fell back to Microsoft YaHei for
// Latin text on Windows, which is where most of the "template" look came from.
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import './app.css'
import App from './app'

const root = document.getElementById('root')

if (root) {
  const tree = (
    <StrictMode>
      <App />
    </StrictMode>
  )
  // Prerendered pages ship with markup in #root — hydrate to reuse it.
  // The dev server and SPA fallback serve an empty shell — mount normally.
  if (root.hasChildNodes()) hydrateRoot(root, tree)
  else createRoot(root).render(tree)
}
