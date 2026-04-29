import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import posthog from 'posthog-js'
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'https://22222b706bb4e1020a5d8b120d2faa06@o4511304733163520.ingest.de.sentry.io/4511304749416528',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  tracesSampleRate: 1.0,
  environment: 'development',
})

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  person_profiles: 'always',
  capture_pageview: true,
  session_recording: {
    maskAllInputs: true,
  },
})
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
)
