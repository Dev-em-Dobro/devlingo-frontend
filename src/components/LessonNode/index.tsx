import GreenStar from '@/assets/images/green-star.png'
import GrayStar from '@/assets/images/gray-star.png'

// Props do componente
interface LessonNodeProps {
  status: 'locked' | 'completed' | 'available'
  onClick?: () => void
}

const LessonNode = ({ status, onClick }: LessonNodeProps) => {
  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'

  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={isLocked ? undefined : onClick}
        disabled={isLocked}
        className={`
          relative
          transition-all duration-300 hover:scale-105
          ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <img
          src={isCompleted ? GreenStar : GrayStar}
          alt={isLocked ? 'Lição bloqueada' : isCompleted ? 'Lição completada' : 'Lição disponível'}
          className="w-20 h-20 object-contain drop-shadow-lg"
        />
      </button>
    </div>
  )
}

export default LessonNode
