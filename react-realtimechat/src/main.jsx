import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx'
import { HideProvider } from './context/HideProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HideProvider>
        <App />
      </HideProvider>
    </AuthProvider>

  </React.StrictMode>,
)
