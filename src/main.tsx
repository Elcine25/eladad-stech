import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // styles globaux en premier : les composants peuvent les surcharger
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
