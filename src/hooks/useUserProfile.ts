import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

interface UserProfile {
  id: string
  email: string
  name: string | null
  total_xp: number
}

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

    // 2. Buscar perfil do banco
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const { data, error: fetchError } = await supabase
          .from('user_profiles')
          .select('id, email, name, total_xp')
          .eq('id', user.id)           // Busca pelo ID do usuário logado
          .single()                    // Retorna um único registro

        if (fetchError) {
          console.error('Erro ao buscar perfil:', fetchError)
          setError(fetchError as Error)
          setProfile(null)
        } else {
          setProfile(data)
          setError(null)
        }
      } catch (err) {
        console.error('Erro inesperado:', err)
        setError(err as Error)
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()

    // 3. (Opcional) Listener para atualizações em tempo real
    // Se o XP mudar em outro lugar, atualiza automaticamente
    const channel = supabase
      .channel('user_profile_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_profiles',
          filter: `id=eq.${user.id}`,  // Só escuta mudanças do usuário atual
        },
        (payload) => {
          console.log('Perfil atualizado:', payload.new)
          setProfile(payload.new as UserProfile)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)  // Limpa o listener ao desmontar
    }
  }, [user])

  return { profile, loading, error }
}
