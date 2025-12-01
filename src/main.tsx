import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { UserPreferencesProvider } from './contexts/UserPreferences/UserPreferencesProvider.tsx'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
    <AuthProvider>
      <UserPreferencesProvider>
        <App />
      </UserPreferencesProvider>
    </AuthProvider>
  </StrictMode>,
)