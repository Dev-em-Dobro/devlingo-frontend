interface AnswerFeedbackPopupProps {
  isOpen: boolean
  type: 'correct' | 'incorrect' | null
  onContinue: () => void
  isLoading?: boolean
}

const AnswerFeedbackPopup = ({
  isOpen,
  type,
  onContinue,
  isLoading = false
}: AnswerFeedbackPopupProps) => {
  // 1. Se não está aberto ou não tem tipo, não renderiza
  if (!isOpen || !type) return null

  // 2. Determinar se está correto
  const isCorrect = type === 'correct'

  return (
    // 3. Container fixo na parte inferior
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div
        className={`
          w-full px-6 py-6 flex items-center justify-between
          ${isCorrect
            ? 'bg-green-100'
            : 'bg-red-50'
          }
        `}
      >
        {/* 4. Lado esquerdo: Ícone + Mensagem */}
        <div className="flex items-center gap-4 flex-1">
          {isCorrect ? (
            // 5. Feedback de CORRETO
            <>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <div className="w-12 h-12 bg-[#58CC02] rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">✓</span>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-700">Na mosca!</div>
               
              </div>
            </>
          ) : (
            // 6. Feedback de INCORRETO
            <>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">✗</span>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-700">Incorreto</div>
              </div>
            </>
          )}
        </div>

        {/* 7. Botão Continuar */}
        <button
          onClick={onContinue}
          disabled={isLoading}
          className={`
            px-8 py-4 rounded-2xl font-bold text-lg uppercase shadow-lg hover:shadow-xl transition-all flex-shrink-0 flex items-center justify-center gap-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isCorrect
              ? 'bg-[#58CC02] hover:bg-[#4cb302] text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
            }
          `}
        >
          {/* 8. Spinner de loading */}
          {isLoading && (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          Continuar
        </button>
      </div>
    </div>
  )
}

export default AnswerFeedbackPopup
