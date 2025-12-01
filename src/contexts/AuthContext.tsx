
// ============================================================
// AuthContext.tsx - Contexto de Autenticação Mockado
// ============================================================
// Este arquivo cria um "contexto" que permite compartilhar
// o estado de autenticação entre todos os componentes da aplicação.
// ============================================================

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null           // Dados do usuário (ou null se não logado)
  isAuthenticated: boolean    // true se logado, false se não
  loading: boolean            // true enquanto verifica localStorage
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>
  login: (email: string, password: string) => Promise<{ error: Error | null }>
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  logout: () => Promise<void>
  signInWithGoogle: () => Promise<void>
}

// Função helper para criar ou atualizar perfil do usuário
const createOrUpdateUserProfile = async (user: User) => {
  // 1. Verificar se o Supabase está configurado
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

  if (!supabaseUrl || supabaseUrl.includes('placeholder') || !supabaseAnonKey || supabaseAnonKey.includes('placeholder')) {
    console.warn('⚠️ Supabase não está configurado')
    return { error: new Error('Supabase não configurado') }
  }

  if (!user || !user.id || !user.email) {
    console.error('❌ Usuário inválido')
    return { error: new Error('Usuário inválido') }
  }

  try {
    // 2. Verificar se o perfil já existe
    const { data: existingProfile, error: fetchError } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    // 3. Se já existe, não precisa criar
    if (existingProfile && !fetchError) {
      console.log('✅ Perfil do usuário já existe')
      return { error: null }
    }

    // 4. Se não existe, criar novo perfil
    const name =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split('@')[0] ||
      'Usuário'

    const { data: insertedData, error: insertError } = await supabase
      .from('user_profiles')
      .insert({
        id: user.id,              // Mesmo ID do auth.users
        email: user.email,         // Email do usuário
        name: name,                // Nome (pega de metadata ou email)
        total_xp: 0,               // XP inicial = 0
      })
      .select()

    if (insertError) {
      // Se o erro for de duplicata, não é crítico
      if (insertError.code === '23505') {
        console.log('✅ Perfil já existe')
        return { error: null }
      }
      console.error('❌ Erro ao criar perfil:', insertError)
      return { error: insertError }
    }

    console.log('✅ Perfil criado com sucesso!')
    return { error: null }
  } catch (error) {
    console.error('❌ Erro inesperado:', error)
    return { error: error as Error }
  }
}


// ------------------------------------------------------------
// 2. CRIAÇÃO DO CONTEXTO
// ------------------------------------------------------------
// createContext cria um "container" que vai guardar nossos dados.
// O valor inicial é undefined porque será preenchido pelo Provider.

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ------------------------------------------------------------
// 3. HOOK PERSONALIZADO (useAuth)
// ------------------------------------------------------------
// Este hook facilita o uso do contexto em outros componentes.
// Em vez de usar useContext(AuthContext), usamos apenas useAuth().

export const useAuth = () => {
  const context = useContext(AuthContext)

  // Se alguém tentar usar useAuth() fora do AuthProvider, mostra erro
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}

// ------------------------------------------------------------
// 4. PROVIDER (AuthProvider)
// ------------------------------------------------------------
// O Provider é o componente que "fornece" os dados para todos
// os componentes filhos. Ele deve envolver toda a aplicação.

interface AuthProviderProps {
  children: ReactNode  // Os componentes filhos que terão acesso ao contexto
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Estado que guarda os dados do usuário (null = não logado)
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)


  // Estado que indica se estamos verificando o localStorage
  // Importante para não mostrar tela de login enquanto verifica
  const [loading, setLoading] = useState(true)

  // ----------------------------------------------------------
  // 4.1 VERIFICAR LOGIN AO CARREGAR A PÁGINA
  // ----------------------------------------------------------
  // useEffect com [] executa apenas UMA VEZ quando o componente monta.
  // Aqui verificamos se já existe um login salvo no localStorage.

  // useEffect(() => {
  //   // Tenta recuperar dados do localStorage
  //   const savedUser = localStorage.getItem('user')

  //   if (savedUser) {
  //     // Se encontrou, converte de JSON para objeto e atualiza o estado
  //     // JSON.parse transforma a string '{"email":"x","name":"y"}' em objeto
  //     setUser(JSON.parse(savedUser))
  //   }

  //   // Terminou de verificar, não está mais carregando
  //   setLoading(false)
  // }, [])


  useEffect(() => {
    // 2. Verificar sessão inicial ao carregar
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)

      // Criar perfil se usuário existe
      if (session?.user) {
        try {
          await createOrUpdateUserProfile(session.user)
        } catch (error) {
          console.error('Erro ao criar perfil:', error)
        }
      }

      setLoading(false)
    })

    // 3. Ouvir mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('🔄 Auth state changed:', _event)
      setSession(session)
      setUser(session?.user ?? null)

      // Criar perfil quando usuário faz login ou cadastro
      if (session?.user && _event !== 'INITIAL_SESSION') {
        setTimeout(() => {
          createOrUpdateUserProfile(session.user).then((result) => {
            if (result.error) {
              console.error('Erro ao criar perfil:', result.error)
            } else {
              console.log('✅ Perfil criado/verificado')
            }
          })
        }, 100)
      }

      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      console.log('📝 Iniciando cadastro:', email)
      console.log('🔗 Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
      console.log('🔑 Supabase Key configurada:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)

      // 1. Criar usuário no Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      console.log('📦 Resposta completa do Supabase:', { data, error })
      console.log('👤 User:', data?.user)
      console.log('🎫 Session:', data?.session)

      if (error) {
        console.error('❌ Erro no cadastro:', error)
        console.error('❌ Detalhes do erro:', {
          message: error.message,
          status: error.status,
          name: error.name
        })
        return { error }
      }

      console.log('✅ Usuário cadastrado!')
      console.log('📧 Email:', data.user?.email)
      console.log('🆔 User ID:', data.user?.id)
      console.log('✉️ Email confirmado:', data.user?.email_confirmed_at)
      console.log('🎫 Tem sessão:', !!data.session)

      // 2. Se houver sessão (usuário autenticado imediatamente), criar perfil
      if (data.session && data.user) {
        console.log('🔧 Criando perfil no banco...')
        const profileError = await createOrUpdateUserProfile(data.user)
        if (profileError.error) {
          console.error('❌ Erro ao criar perfil:', profileError.error)
        } else {
          console.log('✅ Perfil criado com sucesso!')
        }
      } else if (data.user && !data.session) {
        // 3. Se confirmação de email estiver habilitada
        console.log('⚠️ ATENÇÃO: Confirmação de email está HABILITADA')
        console.log('📬 Verifique seu email para confirmar o cadastro')
        console.log('💡 Para desabilitar: vá no Supabase Dashboard > Authentication > Settings')
      }

      return { error: null }
    } catch (error) {
      console.error('❌ Erro inesperado:', error)
      return { error: error as Error }
    }
  }

  // ----------------------------------------------------------
  // 4.2 FUNÇÃO DE LOGIN (MOCKADA)
  // ----------------------------------------------------------
  // Esta função simula um login. Em produção, aqui você chamaria
  // uma API real para validar email e senha.

  const login = async (email: string, password: string) => {
    try {
      console.log('🔐 Iniciando login:', email)

      // 1. Autenticar com email e senha
      const { data, error } = await Promise.race([
        supabase.auth.signInWithPassword({
          email,
          password,
        }),
        // Timeout de segurança
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 8000)
        )
      ]) as any // todo - aqui tem que ver como mudar esse any

      if (error) {
        console.error('❌ Erro no login:', error)
        return { error }
      }

      if (!data || !data.user) {
        return { error: new Error('Login sem dados do usuário') }
      }

      console.log('✅ Login realizado:', data.user.id)

      // 2. O perfil será criado automaticamente pelo onAuthStateChange
      // Não precisa criar aqui para evitar race conditions

      return { error: null }
    } catch (error: any) {
      console.error('❌ Erro inesperado:', error)
      return { error: error as Error }
    }
  }


  // ----------------------------------------------------------
  // 4.3 FUNÇÃO DE LOGOUT
  // ----------------------------------------------------------
  // Remove os dados do usuário do localStorage e do estado.

  const logout = async () => {
    // Remove do localStorage
    localStorage.removeItem('user')

    // Limpa o estado (isso causa re-render e redireciona para login)
    setUser(null)
  }

  // ----------------------------------------------------------
  // 4.4 VALOR DO CONTEXTO
  // ----------------------------------------------------------
  // Este objeto contém tudo que será disponibilizado para os
  // componentes que usarem useAuth().

  const value: AuthContextType = {
    user,                          // Dados do usuário
    isAuthenticated: !!user,       // !! converte para boolean (true se user existe)
    loading,                       // Se está carregando
    login,                         // Função de login
    logout,
    signUp,                        // Função de cadastro
  }

  // ----------------------------------------------------------
  // 4.5 RENDERIZAÇÃO
  // ----------------------------------------------------------
  // O Provider envolve os children e passa o value para eles.

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
