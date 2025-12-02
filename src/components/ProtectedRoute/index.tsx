// ============================================================
// ProtectedRoute.tsx - Componente de Rota Protegida
// ============================================================
// Este componente verifica se o usuário está autenticado.
// Se não estiver, redireciona para a página de login.
// ============================================================

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

// ------------------------------------------------------------
// 1. DEFINIÇÃO DOS TIPOS
// ------------------------------------------------------------

interface ProtectedRouteProps {
  children: React.ReactNode  // O conteúdo que será protegido
}

// ------------------------------------------------------------
// 2. COMPONENTE PROTECTEDROUTE
// ------------------------------------------------------------

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Obtém os dados de autenticação do contexto
  const { isAuthenticated, loading } = useAuth()
  
  // Obtém a localização atual (qual rota o usuário tentou acessar)
  const location = useLocation()

  console.log('🔒 [ProtectedRoute] Verificando acesso:', {
    rota: location.pathname,
    isAuthenticated,
    loading
  })

  // ----------------------------------------------------------
  // 2.1 ESTADO DE CARREGAMENTO
  // ----------------------------------------------------------
  // Enquanto estamos verificando o localStorage, mostramos um loading.
  // Isso evita que a tela de login apareça brevemente antes de
  // verificar se o usuário já está logado.
  
  if (loading) {
    console.log('⏳ [ProtectedRoute] Carregando autenticação...')
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // ----------------------------------------------------------
  // 2.2 VERIFICAÇÃO DE AUTENTICAÇÃO
  // ----------------------------------------------------------
  // Se o usuário NÃO está autenticado, redireciona para /login.
  // 
  // O parâmetro "state={{ from: location }}" salva a rota original
  // para que possamos redirecionar de volta após o login.
  //
  // O parâmetro "replace" substitui a entrada no histórico,
  // assim o usuário não pode voltar para a rota protegida
  // clicando no botão "voltar" do navegador.
  
  if (!isAuthenticated) {
    console.log('❌ [ProtectedRoute] Usuário não autenticado - redirecionando para login')
    console.log('📍 [ProtectedRoute] Rota original salva:', location.pathname)
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // ----------------------------------------------------------
  // 2.3 USUÁRIO AUTENTICADO
  // ----------------------------------------------------------
  // Se chegou aqui, o usuário está logado. Mostra o conteúdo.
  
  console.log('✅ [ProtectedRoute] Usuário autenticado - permitindo acesso')
  return <>{children}</>
}

export default ProtectedRoute