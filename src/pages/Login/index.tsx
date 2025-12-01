import { useAuth } from "@/contexts/AuthContext"
import { useState, type FormEvent } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

const Login = () => {
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

            const { error } = await login(email, password)

            if (error) {
                setError(error.message || 'Erro ao fazer login')
            } else {
                // 3. Se sucesso, redirecionar
                navigate('/', { replace: true })
            }
        } catch (err: any) {
            setError(err?.message || 'Erro inesperado')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#9225D4] to-[#6c19a0] flex items-center justify-center px-4 py-12">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta!</h1>

                    <p className="text-gray-600">Entre na sua conta para continuar</p>
                </div>

                {/* Mensagem de erro */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#9225D4] transition-colors"
                            placeholder="seu@email.com"
                            disabled={loading}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
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


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-sm text-gray-500">ou</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        Não tem uma conta?{' '}
                        <Link to="/signup" className="text-[#9225D4] font-semibold hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Login

