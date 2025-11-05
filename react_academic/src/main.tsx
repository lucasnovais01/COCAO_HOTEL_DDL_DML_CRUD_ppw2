import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'  // IMPORTA AQUI
import axios from 'axios'

// Configure axios base URL from Vite env variable (set VITE_API_URL in .env)
axios.defaults.baseURL = import.meta.env.VITE_API_URL ?? '';

// CSS

// import './assets/css/index.css' - modularizado
import './assets/css/0-style.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>   {/* ENVOLVE O APP */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)