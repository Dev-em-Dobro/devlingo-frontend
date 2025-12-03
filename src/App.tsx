
import { useEffect, useState } from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import LessonScreen from './pages/LessonScreen'
import LessonSuccessScreen from './pages/LessonSuccessScreen'
import LessonResultScreen from './pages/LessonFailureScreen'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

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
    <BrowserRouter>
      <div className="App overflow-x-hidden animate-fadeIn">
        <Routes>
          <Route
            path="/login"
            element={<Login />}
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
  )
}

export default App
