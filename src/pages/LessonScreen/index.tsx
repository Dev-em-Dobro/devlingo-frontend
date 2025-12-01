import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { useUserPreferences } from '@/contexts/UserPreferences/UserPreferencesContext'
import { lessonsData, type Question } from '@/lib/lessonsData'
import AnswerFeedbackPopup from '@/components/AnswerFeedbackPopup'

const LessonScreen = () => {
  // 1. Pegar o ID da lição da URL
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  const { preferences } = useUserPreferences()

  // 2. Estados da lição
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [lives, setLives] = useState(3)
  const [isCorrect, setIsCorrect] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackType, setFeedbackType] = useState<'correct' | 'incorrect' | null>(null)

  // 3. Buscar a lição atual baseada no ID da URL
  const lesson = preferences.language && preferences.level && lessonId
    ? lessonsData[preferences.language][preferences.level].find(l => l.id === lessonId)
    : null

  // 4. Se não encontrou a lição, mostra mensagem de erro
  if (!lesson) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Lição não encontrada</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#58CC02] text-white px-6 py-2 rounded-xl"
          >
            Voltar
          </button>
        </div>
      </div>
    )
  }

  // 5. Pegar a pergunta atual e calcular progresso
  const currentQuestion: Question = lesson.questions[currentQuestionIndex]
  const totalQuestions = lesson.questions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  // 6. Função ao selecionar uma resposta
  const handleAnswerSelect = (index: number) => {
    if (showResult) return // Não permite mudar depois de verificar
    setSelectedAnswer(index)
  }

  // 7. Função ao clicar em "Verificar"
  const handleCheck = () => {
    if (selectedAnswer === null) return // Precisa ter selecionado algo

    // Verificar se está correto
    const correct = selectedAnswer === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)

    // Mostrar feedback
    setFeedbackType(correct ? 'correct' : 'incorrect')
    setShowFeedback(true)

    // Atualizar contadores
    if (correct) {
      setCorrectAnswers(prev => prev + 1)
    } else {
      setWrongAnswers(prev => prev + 1)
      setLives(prev => Math.max(0, prev - 1))
    }

    // DEBUG
    console.log('Após check:', {
      correct,
      correctAnswers,
      wrongAnswers,
      currentIndex: currentQuestionIndex,
      totalQuestions
    })
  }

  

  // 8. Função ao clicar em "Continuar" ou "Finalizar"
  const handleNext = () => {
    // Esconder feedback antes de avançar
    setShowFeedback(false)
    setFeedbackType(null)

    // DEBUG - Ver valores ANTES da checagem
    console.log('handleNext - valores atuais:', {
      correctAnswers,
      wrongAnswers,
      isCorrect,
      currentQuestionIndex,
      totalQuestions
    })

    if (currentQuestionIndex < totalQuestions - 1) {
      // Ainda tem perguntas: vai para próxima
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setIsCorrect(false)
    } else {
      // Acabou todas as perguntas
      // CALCULAR valores finais porque os estados ainda não 
      if (currentQuestionIndex < totalQuestions - 1) {

        console.log('rota de sucesso');

        // 2. Tela de SUCESSO
        navigate('/lesson-success', {
          state: {
            lessonId,
            xpEarned: lesson.xpReward,
            accuracy: 100,
          },
        })
      } else {
        console.log('rota de erro');

        // 3. Tela de RESULTADO (teve erros)
        navigate('/lesson-result', {
          state: {
            correctAnswers: correctAnswers,  // ← USAR OS VALORES FINAIS
            wrongAnswers: wrongAnswers,       // ← USAR OS VALORES FINAIS
            totalQuestions,
            lessonId,
          },
        })
      }
    }
  }

  // 9. Função para pular pergunta
  const handleSkip = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setIsCorrect(false)
    }
  }

  // 10. Se perdeu todas as vidas, mostra mensagem
  if (lives <= 0 && currentQuestionIndex < totalQuestions - 1) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Você perdeu todas as vidas!</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-[#58CC02] text-white px-6 py-2 rounded-xl"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ===== TOP BAR ===== */}
      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {/* 11. Botão de fechar */}
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X size={24} />
          </button>

          {/* 12. Barra de progresso */}
          <div className="flex-1 h-2 bg-gray-200 rounded-full mx-4 overflow-hidden">
            <div
              className="h-full bg-gray-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* 13. Contador de vidas */}
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-xl">❤️</span>
            <span className="font-bold text-gray-700">{lives}</span>
          </div>
        </div>
      </div>

      {/* ===== CONTEÚDO PRINCIPAL ===== */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 14. Badge "PALAVRA NOVA" (só na primeira pergunta) */}
        {currentQuestionIndex === 0 && (
          <div className="bg-[#9225D4] text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
            PALAVRA NOVA
          </div>
        )}

        {/* 15. Pergunta */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          {currentQuestion.question}
        </h2>

        {/* 16. Opções de resposta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {currentQuestion.options?.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrectAnswer = index === currentQuestion.correctAnswer

            // 17. Determinar classe CSS baseada no estado
            let buttonClass = 'bg-white border-2 border-gray-300 text-gray-800 hover:border-gray-400'

            if (showResult) {
              // Depois de verificar
              if (isCorrectAnswer) {
                buttonClass = 'bg-green-500 border-2 border-green-600 text-white'
              } else if (isSelected && !isCorrect) {
                buttonClass = 'bg-red-500 border-2 border-red-600 text-white'
              } else {
                buttonClass = 'bg-white border-2 border-gray-300 text-gray-800 opacity-50'
              }
            } else if (isSelected) {
              // Selecionado mas ainda não verificou
              buttonClass = 'bg-blue-100 border-2 border-blue-500 text-gray-800'
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`
                  p-6 rounded-2xl text-left transition-all relative
                  ${buttonClass}
                `}
              >
                {/* 18. Número no canto inferior direito */}
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                {/* 19. Texto da opção */}
                <div className="font-semibold text-lg mb-2">{option}</div>
              </button>
            )
          })}
        </div>

        {/* 20. Botões de ação (escondidos quando feedback está visível) */}
        {!showFeedback && (
          <div className="flex gap-4 justify-between">
            {/* Botão Pular */}
            <button
              onClick={handleSkip}
              disabled={showResult && isCorrect}
              className="px-8 py-4 bg-gray-300 text-gray-700 rounded-2xl font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors"
            >
              Pular
            </button>

            {/* Botão Verificar ou Continuar */}
            {!showResult ? (
              <button
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                className={`
                  px-8 py-4 rounded-2xl font-bold uppercase transition-colors
                  ${selectedAnswer !== null
                    ? 'bg-[#58CC02] text-white hover:bg-[#4cb302]'
                    : 'bg-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400'
                  }
                `}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-4 bg-[#58CC02] text-white rounded-2xl font-bold uppercase hover:bg-[#4cb302] transition-colors"
              >
                {currentQuestionIndex < totalQuestions - 1 ? 'Continuar' : 'Finalizar'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* 21. Popup de feedback */}
      <AnswerFeedbackPopup
        isOpen={showFeedback && showResult}
        type={feedbackType}
        onContinue={handleNext}
        isLoading={false}
      />
    </div>
  )
}

export default LessonScreen
