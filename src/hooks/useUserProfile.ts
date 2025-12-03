import { useAuth } from "@/contexts/AuthContext"
import { useEffect, useState } from "react"

interface UserProfile {
  id: string
  email: string
  name: string | null
  total_xp: number
}

const STORAGE_KEY = 'devlingo_user_xp'

export const useUserProfile = () => {
  const { user } = useAuth()

  // vou criar um estado pra contralar as informação do perfil do usuario
  const [profile, setProfile] = useState<UserProfile | null>(null)

  // um estado de carregamento dessas informações 
  const [loading, setLoading] = useState(true)

  // e um estado de erro, caso algo de errado 
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {

      console.log(" useUserProfile: carregando perfil do usuário ", user);
    

    // 1. Se não tem usuário, limpa o perfil
    if (!user) {
      // mesmo com esse warning pode deixar assim! O código está funcional, 
      // só avisa que a dependência 'user' pode mudar. 

      // Fácil de corrigir depois - quando conectar ao Supabase, você 
      //vai usar async/await naturalmente e o warning desaparece sozinho
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

  }, [user])
  
  // precisa retornar os estados pra que outros componentnes possam usar eles, é como se fosse o contrato desse hook
  return { profile, loading, error }
}
