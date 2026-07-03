export interface Question {
  id: number
  type: 'pattern' | 'sequence' | 'spatial' | 'logic' | 'analogy'
  difficulty: 'easy' | 'medium' | 'hard'
  questionImage: string
  options: string[]
  correctAnswer: number
  timeLimit: number // seconds
}

// High-resolution WebP artwork lives in /public/questions and is generated
// from premium vector designs (see scripts/generate-question-images.js).
const img = (id: number) => `/questions/q${id}.webp`
const opts = (id: number) =>
  [0, 1, 2, 3].map((i) => `/questions/q${id}-o${i}.webp`)

const meta: Array<{
  id: number
  type: Question['type']
  difficulty: Question['difficulty']
  timeLimit: number
}> = [
  { id: 1, type: 'pattern', difficulty: 'easy', timeLimit: 30 },
  { id: 2, type: 'sequence', difficulty: 'easy', timeLimit: 30 },
  { id: 3, type: 'spatial', difficulty: 'medium', timeLimit: 45 },
  { id: 4, type: 'pattern', difficulty: 'medium', timeLimit: 60 },
  { id: 5, type: 'logic', difficulty: 'easy', timeLimit: 30 },
  { id: 6, type: 'spatial', difficulty: 'medium', timeLimit: 45 },
  { id: 7, type: 'logic', difficulty: 'medium', timeLimit: 60 },
  { id: 8, type: 'analogy', difficulty: 'hard', timeLimit: 60 },
  { id: 9, type: 'spatial', difficulty: 'hard', timeLimit: 60 },
  { id: 10, type: 'pattern', difficulty: 'medium', timeLimit: 45 },
  { id: 11, type: 'sequence', difficulty: 'medium', timeLimit: 45 },
  { id: 12, type: 'spatial', difficulty: 'hard', timeLimit: 60 },
  { id: 13, type: 'logic', difficulty: 'easy', timeLimit: 45 },
  { id: 14, type: 'logic', difficulty: 'medium', timeLimit: 45 },
  { id: 15, type: 'pattern', difficulty: 'hard', timeLimit: 90 },
]

export const questions: Question[] = meta.map((m) => ({
  id: m.id,
  type: m.type,
  difficulty: m.difficulty,
  questionImage: img(m.id),
  options: opts(m.id),
  correctAnswer: 0,
  timeLimit: m.timeLimit,
}))

export const getQuestionsByDifficulty = (difficulty: Question['difficulty']) =>
  questions.filter((q) => q.difficulty === difficulty)

export const getTotalQuestions = () => questions.length
