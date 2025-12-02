
// ============================================================
// AuthContext.tsx - Contexto de Autenticação Mockado
// ============================================================
// Este arquivo cria um "contexto" que permite compartilhar
// o estado de autenticação entre todos os componentes da aplicação.
// ============================================================

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

// ------------------------------------------------------------
// 1. DEFINIÇÃO DOS TIPOS
// ------------------------------------------------------------
// Definimos a "forma" dos dados que o contexto vai fornecer.
// Isso ajuda o TypeScript a verificar se estamos usando corretamente.

interface User {
  email: string
  name: string
}

interface AuthContextType {
  user: User | null           // Dados do usuário (ou null se não logado)
  isAuthenticated: boolean    // true se logado, false se não
  loading: boolean            // true enquanto verifica localStorage
  login: (email: string, password: string) => Promise<void>  // Função para logar
  logout: () => void          // Função para deslogar
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
  
  // Estado que indica se estamos verificando o localStorage
  // Importante para não mostrar tela de login enquanto verifica
  const [loading, setLoading] = useState(true)

  // ----------------------------------------------------------
  // 4.1 VERIFICAR LOGIN AO CARREGAR A PÁGINA
  // ----------------------------------------------------------
  // useEffect com [] executa apenas UMA VEZ quando o componente monta.
  // Aqui verificamos se já existe um login salvo no localStorage.
  
  useEffect(() => {
    // Tenta recuperar dados do localStorage
    const savedUser = localStorage.getItem('user')
    
    if (savedUser) {
      // Se encontrou, converte de JSON para objeto e atualiza o estado
      // JSON.parse transforma a string '{"email":"x","name":"y"}' em objeto
      setUser(JSON.parse(savedUser))
    }
    
    // Terminou de verificar, não está mais carregando
    setLoading(false)
  }, [])

  // ----------------------------------------------------------
  // 4.2 FUNÇÃO DE LOGIN (MOCKADA)
  // ----------------------------------------------------------
  // Esta função simula um login. Em produção, aqui você chamaria
  // uma API real para validar email e senha.
  
  const login = async (email: string, password: string): Promise<void> => {
    // Simula um delay de rede (como se estivesse chamando uma API)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // ⚠️ MOCKADO: Aceita qualquer email e senha!
    // Em produção, aqui você validaria com o backend.
    
    // Cria um objeto de usuário com os dados
    const userData: User = {
      email: email,
      name: email.split('@')[0]  // Usa a parte antes do @ como nome
    }

    console.log('salv no storage');
    
    
    // Salva no localStorage para persistir entre recarregamentos
    // JSON.stringify transforma o objeto em string para salvar
    localStorage.setItem('user', JSON.stringify(userData))
    
    // Atualiza o estado (isso causa re-render em toda a aplicação)
    setUser(userData)
  }

  // ----------------------------------------------------------
  // 4.3 FUNÇÃO DE LOGOUT
  // ----------------------------------------------------------
  // Remove os dados do usuário do localStorage e do estado.
  
  const logout = () => {
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
    logout                         // Função de logout
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
