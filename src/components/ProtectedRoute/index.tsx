// ============================================================
// ProtectedRoute.tsx - Componente de Rota Protegida
// ============================================================
// Este componente verifica se o usuário está autenticado.
// Se não estiver, redireciona para a página de login.
// ============================================================

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import LoadingScreen from '../LoadingScreen'

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
  
  console.log("isAuthenticated", isAuthenticated);
  
  
  // Obtém a localização atual (qual rota o usuário tentou acessar)
  const location = useLocation()

  // ----------------------------------------------------------
  // 2.1 ESTADO DE CARREGAMENTO
  // ----------------------------------------------------------
  // Enquanto estamos verificando o localStorage, mostramos um loading.
  // Isso evita que a tela de login apareça brevemente antes de
  // verificar se o usuário já está logado.
  
  if (loading) {
    return <LoadingScreen isFadingOut={false} />
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
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  console.log('passou');
  

  // ----------------------------------------------------------
  // 2.3 USUÁRIO AUTENTICADO
  // ----------------------------------------------------------
  // Se chegou aqui, o usuário está logado. Mostra o conteúdo.
  
  return <>{children}</>
}

export default ProtectedRoute