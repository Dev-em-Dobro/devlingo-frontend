import DevlingoChar from '@/assets/images/devlingo-char.png'
import { useNavigate, useLocation } from 'react-router-dom'
import { Check, X } from 'lucide-react'

// 1. Tipo para os dados recebidos via navegação
type LessonFailureState = {
  correctAnswers?: number
  wrongAnswers?: number
  totalQuestions?: number
  lessonId?: string
}

const LessonFailureScreen = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // 2. Pegar dados passados pela navegação
  const state = location.state as LessonFailureState
  const correctAnswers = state?.correctAnswers || 0
  const wrongAnswers = state?.wrongAnswers || 0
  const totalQuestions = state?.totalQuestions || 0
  const lessonId = state?.lessonId

  // 3. Calcular precisão baseada nas respostas
  const accuracy = totalQuestions > 0 
    ? Math.round((correctAnswers / totalQuestions) * 100) 
    : 0

  // 4. Função para tentar novamente (reinicia a lição)
  const handleTryAgain = () => {
    if (lessonId) {
      navigate(`/lesson/${lessonId}`, { replace: true })
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      {/* Mascote */}
      <img src={DevlingoChar} alt="Devlingo" className="w-32 h-32 object-contain mb-8" />

      {/* Mensagem de resultado */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Você quase conseguiu!</h1>
      <p className="text-xl text-gray-600 mb-12">Continue praticando para melhorar</p>

      {/* Card de estatísticas */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 mb-8 max-w-md w-full space-y-6">
        
        {/* Respostas corretas */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xl font-semibold text-gray-800">Respostas corretas</span>
          </div>
          <span className="text-3xl font-bold text-green-600">{correctAnswers}</span>
        </div>

        {/* Respostas incorretas */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <X className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-xl font-semibold text-gray-800">Respostas incorretas</span>
          </div>
          <span className="text-3xl font-bold text-red-600">{wrongAnswers}</span>
        </div>

        {/* Precisão */}
        <div className="pt-4 border-t-2 border-gray-200 flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-700">Precisão</span>
          <span className="text-2xl font-bold text-gray-800">{accuracy}%</span>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex gap-4 w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-4 rounded-2xl font-bold uppercase transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={handleTryAgain}
          className="flex-1 bg-[#58CC02] hover:bg-[#4cb302] text-white px-6 py-4 rounded-2xl font-bold uppercase transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  )
}

export default LessonFailureScreen

// import { useNavigate, useLocation } from 'react-router-dom'

// const LessonFailureScreen = () => {
//   const navigate = useNavigate()
//   const location = useLocation()

//   // 1. Pegar dados passados pela navegação
//   const {
//     correctAnswers,
//     wrongAnswers,
//     totalQuestions,
//     lessonId
//   } = (location.state as {
//     correctAnswers?: number
//     wrongAnswers?: number
//     totalQuestions?: number
//     lessonId?: string
//   }) || {}

//   // 2. Calcular precisão
//   const accuracy = totalQuestions && totalQuestions > 0
//     ? Math.round((correctAnswers || 0) / totalQuestions * 100)
//     : 0

//   // 3. Função para tentar novamente (reinicia a lição)
//   const handleTryAgain = () => {
//     if (lessonId) {
//       navigate(`/lesson/${lessonId}`, { replace: true })
//     } else {
//       navigate('/')
//     }
//   }

//   // 4. Função para voltar para home
//   const handleGoHome = () => {
//     navigate('/')
//   }

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
//       {/* 5. Mascote */}
//       <div className="mb-8">
//         <img
//           src="/devlingo-char.png"
//           alt="Devlingo"
//           className="w-32 h-32 object-contain"
//         />
//       </div>

//       {/* 6. Mensagem de resultado */}
//       <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
//         Você quase conseguiu!
//       </h1>
//       <p className="text-xl text-gray-600 mb-12 text-center">
//         Continue praticando para melhorar
//       </p>

//       {/* 7. Card de estatísticas */}
//       <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 mb-8 max-w-md w-full">
//         <div className="space-y-6">
//           {/* Respostas corretas */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                 <span className="text-2xl">✓</span>
//               </div>
//               <span className="text-xl font-semibold text-gray-800">
//                 Respostas corretas
//               </span>
//             </div>
//             <span className="text-3xl font-bold text-green-600">
//               {correctAnswers || 0}
//             </span>
//           </div>

//           {/* Respostas incorretas */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
//                 <span className="text-2xl">✗</span>
//               </div>
//               <span className="text-xl font-semibold text-gray-800">
//                 Respostas incorretas
//               </span>
//             </div>
//             <span className="text-3xl font-bold text-red-600">
//               {wrongAnswers || 0}
//             </span>
//           </div>

//           {/* Precisão */}
//           <div className="pt-4 border-t-2 border-gray-200">
//             <div className="flex items-center justify-between">
//               <span className="text-lg font-semibold text-gray-700">
//                 Precisão
//               </span>
//               <span className="text-2xl font-bold text-gray-800">
//                 {accuracy}%
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 8. Botões de ação */}
//       <div className="flex gap-4 w-full max-w-md">
//         {/* Botão Voltar */}
//         <button
//           onClick={handleGoHome}
//           className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-4 rounded-2xl font-bold uppercase transition-colors"
//         >
//           Voltar
//         </button>

//         {/* Botão Tentar Novamente */}
//         <button
//           onClick={handleTryAgain}
//           className="flex-1 bg-[#58CC02] hover:bg-[#4cb302] text-white px-6 py-4 rounded-2xl font-bold uppercase transition-colors"
//         >
//           Tentar Novamente
//         </button>
//       </div>
//     </div>
//   )
// }

// export default LessonFailureScreen 
