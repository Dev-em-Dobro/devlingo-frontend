import { useState } from 'react'
import LessonNode from '@/components/LessonNode'
import LessonModal from '@/components/LessonModal'  // 1. Importar o modal

const LessonPath = () => {
  // 1. Estado para controlar qual unidade está selecionada
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null)
    // 2. Estados para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 2. Definir as unidades (por enquanto fixo)
  const totalUnits = 5

  // 3. Criar array de unidades com posições
  const units = Array.from({ length: totalUnits }, (_, i) => i + 1).map((unitId) => {
    // 4. Offsets para criar o efeito de "caminho ondulado"
    const offsets: Record<number, number> = {
      1: 0,      // Centro
      2: -40,    // Esquerda
      3: -60,    // Mais esquerda
      4: -80,    // Ainda mais esquerda
      5: -40,    // Volta um pouco
    }

    // 5. Determinar o status de cada unidade
    // Por enquanto: primeira disponível, resto bloqueado
    const getStatus = (id: number): 'available' | 'locked' | 'completed' => {
      if (id === 1) return 'available'
      return 'locked'
    }

    return {
      id: unitId,
      type: 'lesson' as const,
      status: getStatus(unitId),
      offset: offsets[unitId] || 0,
    }
  })

  // 6. Função ao clicar em uma unidade
  const handleUnitClick = (unitId: number, status: 'available' | 'locked' | 'completed') => {
    // Só abre se não estiver bloqueada
    if (status === 'available' || status === 'completed') {
      setSelectedUnitId(unitId)  // Guarda qual unidade foi clicada
      setIsModalOpen(true)        // Abre o modal
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 relative overflow-x-hidden px-4">
      {/* 7. Container das estrelas */}
      <div className="flex flex-col items-center gap-4">
        {units.map((unit, index) => (
          <div
            key={unit.id}
            className="relative w-full flex justify-center"
            style={{
              // 8. Aplica o offset horizontal
              transform: `translateX(${unit.offset}px)`,
              transition: 'transform 0.3s ease'
            }}
          >
            {/* 9. Renderiza a estrela */}
            <LessonNode
              type={unit.type}
              status={unit.status}
              showStartButton={index === 0}
              onClick={() => handleUnitClick(unit.id, unit.status)}
            />

            {/* 10. Personagem ao lado (aparece na 3ª estrela) */}
            {index === 2 && (
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-24">
                <LessonNode
                  type="practice"
                  status="locked"
                  showStartButton={false}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <LessonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        unitId={selectedUnitId}
      />
    </div>
  )
}

export default LessonPath
