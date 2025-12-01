import { useNavigate, useLocation } from 'react-router-dom'
import DevlingoChar from '@/assets/images/devlingo-char.png'
const LessonSuccessScreen = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // 1. Pegar dados passados pela navegação
  const { xpEarned, accuracy } = (location.state as {
    xpEarned?: number
    accuracy?: number
  }) || {}

  // 2. Função para continuar (volta para home)
  const handleContinue = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      {/* 3. Personagens animados */}
      <div className="flex items-end justify-center gap-8 mb-8 relative">
        {/* Personagem do usuário */}
        <div className="relative">
          <div className="w-32 h-40 bg-purple-200 rounded-lg flex items-center justify-center">
            <span className="text-4xl">👨‍💻</span>
          </div>
        </div>

        {/* Mascote Devlingo */}
        <div className="relative">
          <img
            src={DevlingoChar}
            alt="Devlingo"
            className="w-32 h-32 object-contain animate-bounce"
          />
        </div>
      </div>

      {/* 4. Título de sucesso */}
      <h1 className="text-5xl font-bold text-yellow-500 mb-12 text-center">
        Lição concluída!
      </h1>

      {/* 5. Cards de estatísticas */}
      <div className="flex gap-6 mb-12">
        {/* Card de XP */}
        <div className="bg-yellow-100 border-2 border-yellow-300 rounded-2xl p-6 min-w-[150px]">
          <div className="text-gray-700 text-sm font-semibold mb-2">TOTAL DE XP</div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">⚡</span>
            <span className="text-3xl font-bold text-yellow-600">
              {xpEarned || 0}
            </span>
          </div>
        </div>

        {/* Card de Precisão */}
        <div className="bg-green-100 border-2 border-green-300 rounded-2xl p-6 min-w-[150px]">
          <div className="text-gray-700 text-sm font-semibold mb-2">BOA</div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎯</span>
            <span className="text-3xl font-bold text-green-600">
              {accuracy || 0}%
            </span>
          </div>
        </div>
      </div>

      {/* 6. Botão Continuar */}
      <button
        onClick={handleContinue}
        className="bg-[#58CC02] hover:bg-[#4cb302] text-white px-16 py-4 rounded-2xl font-bold text-xl uppercase shadow-lg transition-colors"
      >
        Continuar
      </button>
    </div>
  )
}

export default LessonSuccessScreen
