import { create } from 'zustand'

export interface UserInfo {
  name: string
  email: string
  phone: string
}

export interface Answer {
  questionId: number
  selectedOption: number
  isCorrect: boolean
  timeSpent: number
}

interface TestState {
  // User info
  userInfo: UserInfo | null
  setUserInfo: (info: UserInfo) => void

  // Test state
  currentStep: 'welcome' | 'registration' | 'test' | 'payment' | 'success'
  setCurrentStep: (step: TestState['currentStep']) => void

  // Question tracking
  currentQuestion: number
  setCurrentQuestion: (q: number) => void

  // Answers
  answers: Answer[]
  addAnswer: (answer: Answer) => void

  // Score
  calculateScore: () => number
  calculateIQ: () => number

  // Timer
  testStartTime: number | null
  setTestStartTime: (time: number) => void

  // Reset
  resetTest: () => void

  // Payment
  paymentComplete: boolean
  setPaymentComplete: (complete: boolean) => void
}

export const useTestStore = create<TestState>((set, get) => ({
  userInfo: null,
  setUserInfo: (info) => set({ userInfo: info }),

  currentStep: 'welcome',
  setCurrentStep: (step) => set({ currentStep: step }),

  currentQuestion: 0,
  setCurrentQuestion: (q) => set({ currentQuestion: q }),

  answers: [],
  addAnswer: (answer) => set((state) => ({
    answers: [...state.answers, answer]
  })),

  calculateScore: () => {
    const { answers } = get()
    return answers.filter(a => a.isCorrect).length
  },

  calculateIQ: () => {
    const { answers } = get()
    const correctAnswers = answers.filter(a => a.isCorrect).length
    const totalQuestions = 15
    const percentage = (correctAnswers / totalQuestions) * 100

    // IQ calculation based on percentage (simplified Mensa-style scale)
    // Average IQ is 100, standard deviation is 15
    if (percentage >= 95) return 145 + Math.floor(Math.random() * 10) // Genius
    if (percentage >= 90) return 135 + Math.floor(Math.random() * 10) // Very Superior
    if (percentage >= 80) return 120 + Math.floor(Math.random() * 15) // Superior
    if (percentage >= 65) return 110 + Math.floor(Math.random() * 10) // High Average
    if (percentage >= 50) return 100 + Math.floor(Math.random() * 10) // Average
    if (percentage >= 35) return 90 + Math.floor(Math.random() * 10) // Low Average
    if (percentage >= 20) return 80 + Math.floor(Math.random() * 10) // Below Average
    return 70 + Math.floor(Math.random() * 10) // Needs Improvement
  },

  testStartTime: null,
  setTestStartTime: (time) => set({ testStartTime: time }),

  resetTest: () => set({
    userInfo: null,
    currentStep: 'welcome',
    currentQuestion: 0,
    answers: [],
    testStartTime: null,
    paymentComplete: false,
  }),

  paymentComplete: false,
  setPaymentComplete: (complete) => set({ paymentComplete: complete }),
}))
