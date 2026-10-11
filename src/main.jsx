import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SFLProvider } from './context/SFLContext.jsx'

// Render aplikasi utama ke root DOM dengan membungkusnya dalam SFLProvider (Fondasi Data Global)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SFLProvider>
      <App />
    </SFLProvider>
  </StrictMode>,
)

