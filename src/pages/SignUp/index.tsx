import { Link } from "react-router-dom"

const SignUp = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#9225D4] to-[#6c19a0] flex items-center justify-center px-4 py-12">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar conta</h1>

                    <p className="text-gray-600">Cadastre-se para começar sua jornada</p>



                </div>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#9225D4] transition-colors"
                            placeholder="seu@email.com"
                        />
                    </div>



                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#9225D4] transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                            Confirmar Senha
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#9225D4] transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#9225D4] hover:bg-[#7a1fb3] text-white font-bold py-3 px-4 rounded-xl transition-colors"
                    >
                        Criar conta
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