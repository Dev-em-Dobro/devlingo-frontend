import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// 1. Definir os tipos
export type Language = 'html' | 'css' | 'javascript'
export type Level = 'beginner' | 'intermediate' | 'advanced'

export interface UserPreferences {
  language: Language | null
  level: Level | null
}

interface UserPreferencesContextType {
  preferences: UserPreferences
  setLanguage: (language: Language) => void
  setLevel: (level: Level) => void
  hasCompletedSetup: boolean
  clearPreferences: () => void
  loading: boolean
}

// 2. Criar o Context
const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined)

// 3. Hook personalizado para usar o context
export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext)
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider')
  }
  return context
}


export default UserPreferencesContext