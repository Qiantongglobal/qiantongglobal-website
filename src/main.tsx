import 'ai-app-client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
