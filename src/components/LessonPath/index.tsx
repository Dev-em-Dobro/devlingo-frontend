import { useState, useEffect } from 'react'
import LessonNode from '@/components/LessonNode'
import LessonModal from '@/components/LessonModal'  // 1. Importar o modal

const COMPLETED_UNITS_KEY = 'devlingo_completed_units'

const LessonPath = () => {
  // 1. Estado para controlar qual unidade está selecionada
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null)
  // 2. Estados para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 3. Estado para unidades completadas
  const [completedUnits, setCompletedUnits] = useState<number[]>([])

  // 4. Carregar unidades completadas do localStorage
  useEffect(() => {
    const loadCompletedUnits = () => {
      const completedUnitsStr = localStorage.getItem(COMPLETED_UNITS_KEY) || '[]'
      const completed: number[] = JSON.parse(completedUnitsStr)
      setCompletedUnits(completed)
    }

    loadCompletedUnits()

    // Listener para atualizar quando outra aba modificar
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === COMPLETED_UNITS_KEY) {
        loadCompletedUnits()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // 5. Definir as unidades (por enquanto fixo)
  const totalUnits = 5

  // 6. Criar array de unidades com posições
  const units = Array.from({ length: totalUnits }, (_, i) => i + 1).map((unitId) => {
    // 7. Offsets para criar o efeito de "caminho ondulado"
    const offsets: Record<number, number> = {
      1: 0,      // Centro
      2: -40,    // Esquerda
      3: -60,    // Mais esquerda
      4: -80,    // Ainda mais esquerda
      5: -40,    // Volta um pouco
    }

    // 8. Determinar o status de cada unidade
    const getStatus = (id: number): 'available' | 'locked' | 'completed' => {
      // Se foi concluída, mostra como completed
      if (completedUnits.includes(id)) return 'completed'

      // Primeira unidade sempre disponível
      if (id === 1) return 'available'

      // Unidade disponível se a anterior foi concluída
      if (completedUnits.includes(id - 1)) return 'available'

      // Senão, está bloqueada
      return 'locked'
    }

    return {
      id: unitId,
      type: 'lesson' as const,
      status: getStatus(unitId),
      offset: offsets[unitId] || 0,
    }
  })

  // 9. Função ao clicar em uma unidade
  const handleUnitClick = (unitId: number, status: 'available' | 'locked' | 'completed') => {
    // Só abre se não estiver bloqueada
    if (status === 'available' || status === 'completed') {
      setSelectedUnitId(unitId)  // Guarda qual unidade foi clicada
      setIsModalOpen(true)        // Abre o modal
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 relative overflow-x-hidden px-4">
      {/* 10. Container das estrelas */}
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
        unitId={selectedUnitId ?? undefined}
      />
    </div>
  )
}

export default LessonPath
