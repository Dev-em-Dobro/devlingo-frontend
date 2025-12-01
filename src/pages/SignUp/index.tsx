import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'  // Para o spinner de loading
import { useAuth } from '@/contexts/AuthContext'


const SignUp = () => {
    const { signUp } = useAuth()

    // 1. Estados para os inputs
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // 2. Estados para controle da UI
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)

        console.log('🚀 Iniciando cadastro...')
        console.log('📧 Email:', email)
        console.log('🔒 Senha length:', password.length)
        console.log('🔒 Confirmar senha length:', confirmPassword.length)

        // 1. Validações
        if (password !== confirmPassword) {
            console.log('❌ Senhas não coincidem')
            setError('As senhas não coincidem.')
            return
        }

        if (password.length < 6) {
            console.log('❌ Senha muito curta')
            setError('A senha deve ter pelo menos 6 caracteres.')
            return
        }

        console.log('✅ Validações passaram')

        // 2. Ativar loading
        setLoading(true)
        console.log('⏳ Loading ativado')

        try {
            // 3. Chamar função de cadastro do Supabase
            console.log('📤 Chamando signUp...')
            const { error } = await signUp(email, password)
            console.log('📥 Resposta do signUp:', { error })

            // 4. Verificar se houve erro
            if (error) {
                console.log('❌ Erro no cadastro:', error)
                setError(error.message || 'Erro ao criar conta. Tente novamente.')
                setLoading(false)
                return
            }

            // 5. Se sucesso, mostrar mensagem e redirecionar
            console.log('✅ Cadastro bem-sucedido!')
            setSuccess(true)
            console.log('🔄 Redirecionando em 2s...')
            setTimeout(() => {
                navigate('/language-selection')
            }, 2000)  // Aguarda 2 segundos antes de redirecionar

        } catch (err: any) {
            // 6. Tratar erros inesperados
            console.error('💥 Erro inesperado:', err)
            setError('Erro inesperado. Tente novamente.')
        } finally {
            console.log('🏁 Finalizando - loading desativado')
            setLoading(false)
        }
    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-[#9225D4] to-[#6c19a0] flex items-center justify-center px-4 py-12">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar conta</h1>
                    <p className="text-gray-600">Cadastre-se para começar sua jornada</p>
                </div>

                {/* 4. Mostrar erro se houver */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 5. Input Email - controlado */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}  // ✅ Valor controlado
                            onChange={(e) => setEmail(e.target.value)}  // ✅ Atualiza estado
                            required
                            disabled={loading}  // ✅ Desabilita durante loading
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#9225D4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="seu@email.com"
                        />
                    </div>

                    {/* 6. Input Senha - controlado */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}  // ✅ Valor controlado
                            onChange={(e) => setPassword(e.target.value)}  // ✅ Atualiza estado
                            required
                            minLength={6}  // ✅ Validação HTML5
                            disabled={loading}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#9225D4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* 7. Input Confirmar Senha - controlado */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                            Confirmar Senha
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}  // ✅ Valor controlado
                            onChange={(e) => setConfirmPassword(e.target.value)}  // ✅ Atualiza estado
                            required
                            minLength={6}
                            disabled={loading}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#9225D4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* 8. Botão Submit */}
                    <button
                        type="submit"
                        disabled={loading}  // ✅ Desabilita durante loading
                        className="w-full bg-[#9225D4] hover:bg-[#7a1fb3] text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 className="w-5 h-5 animate-spin" />}  {/* ✅ Spinner */}
                        {loading ? 'Criando conta...' : 'Criar conta'}
                    </button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-sm text-gray-500">ou</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        Já tem uma conta?{' '}
                        <Link to="/login" className="text-[#9225D4] font-semibold hover:underline">
                            Faça login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
