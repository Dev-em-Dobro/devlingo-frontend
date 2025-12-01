import { useEffect, useState, type ReactNode } from "react"
import type { Language, Level, UserPreferences } from "./UserPreferencesContext"
import UserPreferencesContext from "./UserPreferencesContext"

// 4. Chave do localStorage
const STORAGE_KEY = 'devlingo_user_preferences'

interface UserPreferencesProviderProps {
  children: ReactNode
}

// 5. Provider do Context
export const UserPreferencesProvider = ({ children }: UserPreferencesProviderProps) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    language: null,
    level: null,
  })
  const [loading, setLoading] = useState(true)

  // 6. Carregar preferências do localStorage ao iniciar
  useEffect(() => {
    const loadPreferences = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          console.log('📦 Preferências carregadas do localStorage:', parsed)
          setPreferences(parsed)
        }
      } catch (error) {
        console.error('Erro ao carregar preferências:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPreferences()
  }, [])

  // 7. Salvar preferências no localStorage quando mudarem
  useEffect(() => {
    if (!loading && (preferences.language || preferences.level)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
      console.log('💾 Preferências salvas no localStorage:', preferences)
    }
  }, [preferences, loading])

  // 8. Função para definir a linguagem
  const setLanguage = (language: Language) => {
    setPreferences((prev) => ({ ...prev, language }))
  }

  // 9. Função para definir o nível
  const setLevel = (level: Level) => {
    setPreferences((prev) => ({ ...prev, level }))
  }

  // 10. Função para limpar preferências
  const clearPreferences = () => {
    setPreferences({ language: null, level: null })
    localStorage.removeItem(STORAGE_KEY)
  }

  // 11. Verificar se o setup foi completado
  const hasCompletedSetup = preferences.language !== null && preferences.level !== null

  const value = {
    preferences,
    setLanguage,
    setLevel,
    hasCompletedSetup,
    clearPreferences,
    loading,
  }

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  )
}
