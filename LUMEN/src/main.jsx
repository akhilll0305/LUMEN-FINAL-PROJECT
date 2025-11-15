// Opt-in to React Router v7 behavior to avoid the "Relative route resolution within Splat routes" warning.
// This must be set before any import that loads react-router so it takes effect early.
window.__REACT_ROUTER = window.__REACT_ROUTER || {};
window.__REACT_ROUTER.v7_relativeSplatPath = true;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
