import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface UserProfile {
  id: string
  email: string
  name: string | null
  total_xp: number
}

const STORAGE_KEY = 'devlingo_user_xp'

export const useUserProfile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // 1. Se não tem usuário, limpa o perfil
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    // 2. Buscar XP do localStorage
    const fetchProfile = () => {
      try {
        setLoading(true)
        
        // Busca o XP do localStorage ou inicia com 0
        const storedXP = localStorage.getItem(STORAGE_KEY)
        const totalXP = storedXP ? parseInt(storedXP, 10) : 0

        // Cria o perfil com dados do usuário + XP do localStorage
        const userProfile: UserProfile = {
          id: user.email, // Usa email como ID já que não temos id no tipo User
          email: user.email || '',
          name: user.name || null,
          total_xp: totalXP
        }

        setProfile(userProfile)
        setError(null)
      } catch (err) {
        console.error('Erro ao carregar perfil:', err)
        setError(err as Error)
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()

    // 3. Listener para mudanças no localStorage (sincroniza entre abas)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const newXP = parseInt(e.newValue, 10)
        setProfile(prev => prev ? { ...prev, total_xp: newXP } : null)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [user])

  return { profile, loading, error }
}
