// ============================================================
// Login.tsx - Tela de Login
// ============================================================

import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const Login = () => {
  // ----------------------------------------------------------
  // 1. ESTADOS DO FORMULÁRIO
  // ----------------------------------------------------------
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  // ----------------------------------------------------------
  // 2. HOOKS
  // ----------------------------------------------------------
  const { login } = useAuth()           // Função de login do contexto
  const navigate = useNavigate()         // Para redirecionar após login
  const location = useLocation()         // Para saber de onde o usuário veio

  // ----------------------------------------------------------
  // 3. FUNÇÃO DE SUBMIT
  // ----------------------------------------------------------
  const handleSubmit = async (e: FormEvent) => {
    // Previne o comportamento padrão do formulário (recarregar página)
    e.preventDefault()
    
    // Limpa erros anteriores
    setError(null)
    
    // Ativa o estado de loading
    setLoading(true)

    try {
      // Chama a função de login do AuthContext
      await login(email, password)
      
      // Se chegou aqui, login foi bem-sucedido!
      
      // Verifica se o usuário veio de alguma rota protegida
      // Se sim, redireciona de volta para lá
      // testar isso aqui na nova versão sem o lnagugae seletciton 
      const from = location.state?.from?.pathname || '/'
      
      // Redireciona para a página de destino
      navigate(from, { replace: true })
      
    } catch (err: any) {
      // Se deu erro, mostra mensagem
      setError(err?.message || 'Erro ao fazer login')
    } finally {
      // Desativa o loading (independente de sucesso ou erro)
      setLoading(false)
    }
  }

  // ----------------------------------------------------------
  // 4. RENDERIZAÇÃO
  // ----------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta!
          </h1>
          <p className="text-gray-600">
            Entre na sua conta para continuar
          </p>
        </div>

        {/* Mensagem de erro */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Campo Email */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-600 transition-colors disabled:opacity-50"
              placeholder="seu@email.com"
            />
          </div>

          {/* Campo Senha */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-600 transition-colors disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          {/* Botão de Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Link para cadastro */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Não tem uma conta?{' '}
            <Link 
              to="/signup" 
              className="text-purple-600 font-semibold hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
