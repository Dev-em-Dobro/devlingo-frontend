import LessonNode from '@/components/LessonNode'
import DevlingoChar from '@/assets/images/devlingo-char.png'
import { useState } from 'react'
import LessonModal from '../LessonModal'
import { lessonsData } from '@/lib/lessonsData'

const LessonPath = () => {

  // 1. Estados do componente
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null) // Qual unidade foi clicada
  const [isModalOpen, setIsModalOpen] = useState(false) // Modal aberto/fechado

  // 2. Calcula as unidades completadas diretamente (sem useEffect)
  const getCompletedUnits = (): number[] => {
    // 2.1. Busca do localStorage quais lições foram completadas
    const completedLessonsStr = localStorage.getItem('devlingo_completed_lessons') || '[]'
    const completedLessons: string[] = JSON.parse(completedLessonsStr) // Ex: ['lesson-1', 'lesson-2']

    // 2.2. Para cada unidade (1 a 5), verifica se TODAS as lições foram completadas
    return [1, 2, 3, 4, 5].filter(unitId => {
      // 2.3. Busca todas as lições desta unidade específica
      const unitLessons = lessonsData.filter(lesson => lesson.unitId === unitId)
      
      // 2.4. Se a unidade não tem lições, não está completa
      if (unitLessons.length === 0) return false
      
      // 2.5. Verifica se TODAS as lições da unidade estão no array de completadas
      return unitLessons.every(lesson => completedLessons.includes(lesson.id))
    })
  }

  const completedUnits = getCompletedUnits() // Chama a função toda vez que o componente renderiza

  // 3. Função chamada quando clica em uma estrela/unidade
  const handleUnitClick = (unitId: number, status: 'available' | 'locked' | 'completed') => {
    // 3.1. Só permite clicar se a unidade NÃO está bloqueada
    if (status === 'available' || status === 'completed') {
      setSelectedUnitId(unitId)  // 3.2. Guarda qual unidade foi clicada
      setIsModalOpen(true)        // 3.3. Abre o modal com as lições
    }
    // Se status === 'locked', não faz nada (unidade bloqueada)
  }

  // 4. Função auxiliar: verifica se uma unidade específica está completada
  const isUnitCompleted = (unitId: number): boolean => {
    // 4.1. Retorna true se o ID da unidade está no array completedUnits
    return completedUnits.includes(unitId) // Ex: completedUnits = [1, 2] -> isUnitCompleted(1) = true
  }

  // 5. Função principal: determina o status visual de cada unidade (completed/available/locked)
  const getUnitStatus = (unitId: number): 'available' | 'locked' | 'completed' => {
    // 5.1. Se todas as lições da unidade foram completadas -> estrela VERDE
    if (isUnitCompleted(unitId)) {
      return 'completed'
    }
    
    // 5.2. A primeira unidade SEMPRE está disponível (mesmo que não esteja completa) -> estrela CINZA
    if (unitId === 1) {
      return 'available'
    }
    
    // 5.3. Se a unidade ANTERIOR foi completada, esta fica disponível -> estrela CINZA
    const previousUnitCompleted = isUnitCompleted(unitId - 1)
    if (previousUnitCompleted) {
      return 'available'
    }
    
    // 5.4. Caso contrário, está bloqueada -> estrela CINZA com opacidade
    return 'locked'
  }

  return (
    <div className="max-w-2xl mx-auto py-12 relative overflow-x-hidden px-4">
      <div className="flex flex-col items-center gap-4">

        {/* 6. UNIDADE 1 - Centro (sempre disponível) */}
        <div className="relative w-full flex justify-center">
          <LessonNode
            status={getUnitStatus(1)} // Pega o status (completed/available/locked)
            onClick={() => handleUnitClick(1, getUnitStatus(1))}  // Ao clicar, abre modal com lições da unidade 1

          />
        </div>

        {/* 7. UNIDADE 2 - Esquerda (disponível se unidade 1 foi completada) */}
        <div
          className="relative w-full flex justify-center"
          style={{ transform: 'translateX(-40px)' }}
        >
          <LessonNode
            status={getUnitStatus(2)}
            onClick={() => handleUnitClick(2, getUnitStatus(2))}
          />
        </div>

        {/* 8. UNIDADE 3 - Mais esquerda (disponível se unidade 2 foi completada) */}
        <div
          className="relative w-full flex justify-center"
          style={{ transform: 'translateX(-60px)' }}
        >
          <LessonNode
            status={getUnitStatus(3)}
            onClick={() => handleUnitClick(3, getUnitStatus(3))}
          />

          {/* Personagem Devlingo ao lado da unidade 3 */}
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-24">
            <div className="w-32 h-32 rounded-full flex items-center justify-center animate-float">
              <img
                src={DevlingoChar}
                alt="Devlingo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* 9. UNIDADE 4 - Ainda mais esquerda (disponível se unidade 3 foi completada) */}
        <div
          className="relative w-full flex justify-center"
          style={{ transform: 'translateX(-80px)' }}
        >
          <LessonNode
            status={getUnitStatus(4)}
            onClick={() => handleUnitClick(4, getUnitStatus(4))}
          />
        </div>

        {/* 10. UNIDADE 5 - Volta um pouco (disponível se unidade 4 foi completada) */}
        <div
          className="relative w-full flex justify-center"
          style={{ transform: 'translateX(-40px)' }}
        >
          <LessonNode
            status={getUnitStatus(5)}
            onClick={() => handleUnitClick(5, getUnitStatus(5))}
          />
        </div>

      </div>

      {/* 11. Modal que mostra as lições da unidade selecionada */}
      <LessonModal
        isOpen={isModalOpen} // Modal aberto ou fechado
        onClose={() => setIsModalOpen(false)} // Ao fechar, atualiza estado
        unitId={selectedUnitId ?? undefined} // Passa qual unidade foi clicada
      />
    </div>
  )
}

export default LessonPath
