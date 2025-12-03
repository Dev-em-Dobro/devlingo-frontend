
interface SaveLessonScoreParams {
    userId: string | undefined
    lessonId: string | undefined
    correctAnswers: number
    wrongAnswers: number
    xpEarned: number
}

/**
 * Salva no localStorage
 */
export const saveLessonScore = async (params: SaveLessonScoreParams) => {
  // Simular delay de salvamento no backend
  await new Promise(resolve => setTimeout(resolve, 2000))

  const STORAGE_KEY_XP = 'devlingo_user_xp'
  const STORAGE_KEY_LESSONS = 'devlingo_completed_lessons'

  // 1. Atualizar XP total
  const currentXP = parseInt(localStorage.getItem(STORAGE_KEY_XP) || '0')
  const newTotalXP = currentXP + params.xpEarned
  localStorage.setItem(STORAGE_KEY_XP, newTotalXP.toString())

  // 2. Marcar lição como completa
  const completedLessons = JSON.parse(localStorage.getItem(STORAGE_KEY_LESSONS) || '[]')
  if (!completedLessons.includes(params.lessonId)) {
    completedLessons.push(params.lessonId)
    localStorage.setItem(STORAGE_KEY_LESSONS, JSON.stringify(completedLessons))
  }

  return { newTotalXP }
}
