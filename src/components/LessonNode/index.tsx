import { Lock, Trophy } from 'lucide-react'
import DevlingoChar from '@/assets/images/devlingo-char.png'
import GreenStar from '@/assets/images/green-star.png'
import GrayStar from '@/assets/images/gray-star.png'

// 1. Definir as props do componente
interface LessonNodeProps {
  type: 'lesson' | 'chest' | 'practice' | 'unit'
  status: 'current' | 'locked' | 'completed' | 'available'
  showStartButton?: boolean
  onClick?: () => void
}

const LessonNode = ({ type, status, onClick }: LessonNodeProps) => {
  // 2. Determinar estados
  const isLocked = status === 'locked'
  const isCurrent = status === 'current'
  const isCompleted = status === 'completed'

  // 3. Função para determinar a cor de fundo
  const getNodeStyle = () => {
    if (isLocked) return 'bg-gray-300'
    if (isCurrent) return 'bg-[#58CC02]'
    if (isCompleted) return 'bg-yellow-400'
    return 'bg-gray-300' // available
  }

  // 4. Renderizar o conteúdo baseado no tipo
  const renderNodeContent = () => {
    // 4a. Tipo BAÚ (chest)
    if (type === 'chest') {
      return (
        <div className={`
          w-24 h-24 rounded-full ${getNodeStyle()}
          flex items-center justify-center
          shadow-lg
          ${!isLocked ? 'ring-8 ring-gray-200' : ''}
        `}>
          <div className="w-16 h-12 bg-gray-400 rounded-md flex items-center justify-center">
            <Lock className="text-gray-600" size={24} />
          </div>
        </div>
      )
    }

    // 4b. Tipo PRÁTICA (personagem)
    if (type === 'practice') {
      return (
        <div className="relative">
          <div className={`
            w-32 h-32 rounded-full
            flex items-center justify-center
            ${!isLocked ? 'ring-8 ring-gray-100' : ''}
            animate-float
          `}>
            <img
              src={DevlingoChar}
              alt="Devlingo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )
    }

    // 4c. Tipo UNIDADE (troféu)
    if (type === 'unit') {
      return (
        <div className={`
          w-24 h-24 rounded-full ${getNodeStyle()}
          flex items-center justify-center
          shadow-lg
          ${!isLocked ? 'ring-8 ring-gray-200' : ''}
        `}>
          <Trophy className={isLocked ? 'text-gray-500' : 'text-white'} size={32} />
        </div>
      )
    }

    // 4d. Tipo LIÇÃO (estrela) - PADRÃO
    return (
      <button
        onClick={isLocked ? undefined : onClick}
        disabled={isLocked}
        className={`
          relative
          transition-all duration-300 hover:scale-105
          ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {/* 5. Imagem da estrela */}
        <img
          src={isCompleted ? GreenStar : GrayStar}
          alt={isLocked ? 'Lição bloqueada' : isCompleted ? 'Lição completada' : 'Lição disponível'}
          className="w-20 h-20 object-contain drop-shadow-lg"
        />
      </button>
    )
  }

  return (
    <div className="relative flex flex-col items-center">
      {renderNodeContent()}
    </div>
  )
}

export default LessonNode
