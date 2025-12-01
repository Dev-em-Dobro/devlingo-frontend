
import { useEffect, useState } from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { AuthProvider } from './contexts/AuthContext'
import LanguageSelection from './pages/LanguageSelection'
import ProtectedRoute from './components/ProtectedRoute'
import { UserPreferencesProvider } from './contexts/UserPreferences/UserPreferencesProvider'
import LevelSelection from './pages/LevelSelection'
import Home from './pages/Home'
import LessonScreen from './pages/LessonScreen'
import LessonSuccessScreen from './pages/LessonSuccessScreen'
import LessonResultScreen from './pages/LessonResultScreen'
import { testSupabaseConnection } from './lib/testSupabase'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

   useEffect(() => {
    // Testar conexão ao carregar o app
    testSupabaseConnection()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true)  // Inicia animação de fade
      setTimeout(() => {
        setIsLoading(false) // Remove loading após animação
      }, 600)
    }, 2500) // Tempo total do loading

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen isFadingOut={isFadingOut} />
  }

  return (
    // todo - talvez colocar essa div pra fora do router
    <AuthProvider>
      <UserPreferencesProvider>
        <BrowserRouter>
          <div className="App overflow-x-hidden animate-fadeIn">
            <Routes>
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/language-selection"
                element={
                  <ProtectedRoute>
                    <LanguageSelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/level-selection"
                element={
                  <ProtectedRoute>
                    <LevelSelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signup"
                element={<SignUp />}
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              {/* 2. Adicionar rota da lição */}
              <Route
                path="/lesson/:lessonId"
                element={<LessonScreen />}
              />
              {/* 4. Rota de sucesso */}
              <Route
                path="/lesson-success"
                element={<LessonSuccessScreen />}
              />

              {/* 5. Rota de resultado */}
              <Route
                path="/lesson-result"
                element={<LessonResultScreen />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserPreferencesProvider>

    </AuthProvider>

  )
}

export default App
