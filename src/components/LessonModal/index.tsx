import { X } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import DevlingoChar from '@/assets/images/devlingo-char.png'
import { lessonsData } from '@/lib/lessonsData'
import { useState, useEffect } from 'react'

interface LessonModalProps {
  isOpen: boolean
  onClose: () => void
  unitId?: number
}

const LessonModal = ({ isOpen, onClose, unitId = 1 }: LessonModalProps) => {
  const navigate = useNavigate()
  const [completedLessons, setCompletedLessons] = useState<string[]>([])

  // Carregar lições completadas do localStorage
  useEffect(() => {
    if (isOpen) {
      const completedLessonsStr = localStorage.getItem('devlingo_completed_lessons') || '[]'
      const completed: string[] = JSON.parse(completedLessonsStr)
      setCompletedLessons(completed)
    }
  }, [isOpen])

  // 1. Se o modal não está aberto, não renderiza nada
  if (!isOpen) return null

  // 2. Filtrar apenas as lições desta unidade específica
  // Agora é muito mais simples: só pegar as lições onde unitId corresponde
  const unitLessons = lessonsData.filter(lesson => lesson.unitId === unitId)

  // 3. Função que executa quando clica em uma lição
  // Navega para a tela da lição e fecha o modal
  const handleStartLesson = (lessonId: string) => {
    navigate(`/lesson/${lessonId}`)
    onClose()
  }

  return (
    // 4. Overlay escuro que cobre a tela toda
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* 5. Container principal do modal */}
      <div className="bg-white rounded-3xl max-w-lg w-full relative">
        
        {/* 6. Botão X para fechar o modal */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        {/* 7. Área roxa com o conteúdo */}
        <div className="bg-[#9225d4] rounded-3xl p-8 pt-16">
          {/* 8. Título do modal */}
          <h2 className="text-white text-2xl font-bold text-center mb-2">
            Escolha uma lição
          </h2>
          {/* 9. Mostra qual unidade está selecionada */}
          <p className="text-white text-center mb-8">Unidade {unitId}</p>

          {/* 10. Lista das lições desta unidade */}
          <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
            {/* 11. Para cada lição da unidade, cria um botão */}
            {unitLessons.map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id)
              
              return (
                <button
                  key={lesson.id}
                  onClick={() => handleStartLesson(lesson.id)}
                  className={`w-full text-white p-4 rounded-xl text-left transition-all relative ${
                    isCompleted 
                      ? 'bg-green-500/30 hover:bg-green-500/40 border-2 border-green-400' 
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  {/* Indicador de conclusão */}
                  {isCompleted && (
                    <div className="absolute top-2 right-2 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                  
                  {/* 12. Título da lição */}
                  <div className="font-semibold">{lesson.title}</div>
                  {/* 13. Descrição da lição */}
                  <div className="text-sm opacity-90">{lesson.description}</div>
                  {/* 14. Pontos XP que a lição dá */}
                  <div className="text-xs mt-1">+{lesson.xpReward} XP</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* 15. Personagem Devlingo no canto inferior direito */}
        <div className="absolute -bottom-12 -right-8">
          <img src={DevlingoChar} alt="Devlingo" className="w-24 h-24 object-contain" />
        </div>
      </div>
    </div>
  )
}

export default LessonModal



// import { useState, useMemo, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { X } from 'lucide-react'
// import { lessonsData } from '@/lib/lessonsData'
// import DevlingoChar from '@/assets/images/devlingo-char.png'

// // 1. Definir as props do modal
// interface LessonModalProps {
//   isOpen: boolean
//   onClose: () => void
//   unitId?: number
// }

// const LessonModal = ({ isOpen, onClose, unitId = 1 }: LessonModalProps) => {
//   const navigate = useNavigate()

//   // 2. Estado para controlar qual lição está selecionada
//   const [selectedLessonIndex, setSelectedLessonIndex] = useState<number | null>(null)

//   // 3. Resetar lição selecionada quando a unidade mudar ou o modal fechar
//   useEffect(() => {
//     if (isOpen) {
//       setSelectedLessonIndex(null)
//     }
//   }, [unitId, isOpen])

//   // 4. Buscar todas as lições (sempre do nível beginner)
//   const allLessons = useMemo(() => {
//     return lessonsData['beginner'] || []
//   }, [])

//   // 5. Configuração de unidades (mesmo número usado no LessonPath)
//   const totalUnits = 5
//   const lessonsPerUnit = Math.ceil(allLessons.length / totalUnits)

//   // 6. Filtrar lições apenas da unidade atual
//   const lessons = useMemo(() => {
//     const startIndex = (unitId - 1) * lessonsPerUnit
//     const endIndex = Math.min(startIndex + lessonsPerUnit, allLessons.length)
//     return allLessons.slice(startIndex, endIndex)
//   }, [allLessons, unitId, lessonsPerUnit])

//   const totalLessons = lessons.length

//   // 7. Função para iniciar a lição selecionada
//   const handleStartLesson = () => {
//     if (selectedLessonIndex !== null && lessons[selectedLessonIndex]) {
//       navigate(`/lesson/${lessons[selectedLessonIndex].id}`)
//       onClose()
//     }
//   }

//   // 8. Função ao clicar em uma lição
//   const handleLessonClick = (index: number) => {
//     setSelectedLessonIndex(index)
//   }

//   // 9. Se o modal não está aberto, não renderiza nada
//   if (!isOpen) return null

//   // 10. Se não há lições, mostra mensagem
//   if (lessons.length === 0) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
//           <p className="text-center text-gray-600">
//             Nenhuma lição disponível. Configure suas preferências primeiro.
//           </p>
//           <button
//             onClick={onClose}
//             className="mt-4 w-full bg-[#58CC02] text-white py-3 rounded-2xl font-bold"
//           >
//             Fechar
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     // 11. Overlay escuro
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       {/* 12. Container do modal */}
//       <div className="bg-white rounded-3xl max-w-lg w-full relative">

//         {/* 13. Botão de fechar (X) */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//         >
//           <X size={24} />
//         </button>

//         {/* 14. Conteúdo principal (fundo roxo) */}
//         <div className="bg-[#9225d4] rounded-3xl p-8 pt-16">

//           {/* 15. Se uma lição está selecionada, mostra detalhes */}
//           {selectedLessonIndex !== null && lessons[selectedLessonIndex] ? (
//             <>
//               <h2 className="text-white text-2xl font-bold text-center mb-2">
//                 {lessons[selectedLessonIndex].title}
//               </h2>
//               <p className="text-white text-center mb-8">
//                 Lição {selectedLessonIndex + 1} de {totalLessons}
//               </p>

//               {/* 16. Botão para começar a lição */}
//               <button
//                 onClick={handleStartLesson}
//                 className="w-full bg-white text-[#58CC02] py-4 rounded-2xl font-bold text-lg uppercase shadow-lg hover:bg-gray-50 transition-colors"
//               >
//                 Começar +{lessons[selectedLessonIndex].xpReward} XP
//               </button>
//             </>
//           ) : (
//             // 17. Se nenhuma lição selecionada, mostra a lista
//             <>
//               <h2 className="text-white text-2xl font-bold text-center mb-2">
//                 Escolha uma lição
//               </h2>
//               <p className="text-white text-center mb-8">
//                 Unidade {unitId}
//               </p>

//               {/* 18. Lista de lições */}
//               <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
//                 {lessons.map((lesson, index) => (
//                   <button
//                     key={lesson.id}
//                     onClick={() => handleLessonClick(index)}
//                     className="w-full bg-white/20 hover:bg-white/30 text-white p-4 rounded-xl text-left transition-all cursor-pointer"
//                   >
//                     <div className="font-semibold">{lesson.title}</div>
//                     <div className="text-sm opacity-90">{lesson.description}</div>
//                     <div className="text-xs mt-1">+{lesson.xpReward} XP</div>
//                   </button>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>

//         {/* 19. Personagem no canto inferior direito */}
//         <div className="absolute -bottom-12 -right-8">
//           <img
//             src={DevlingoChar}
//             alt="Devlingo"
//             className="w-24 h-24 object-contain"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LessonModal
