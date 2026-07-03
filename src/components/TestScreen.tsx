'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTestStore } from '@/store/testStore'
import { questions } from '@/data/questions'

export default function TestScreen() {
  const {
    currentQuestion,
    setCurrentQuestion,
    addAnswer,
    setCurrentStep,
    userInfo,
  } = useTestStore()

  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(questions[currentQuestion]?.timeLimit || 30)
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [isTransitioning, setIsTransitioning] = useState(false)

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleNextQuestion = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)

    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000)

    addAnswer({
      questionId: question.id,
      selectedOption: selectedOption ?? -1,
      isCorrect: selectedOption === question.correctAnswer,
      timeSpent,
    })

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
        setTimeLeft(questions[currentQuestion + 1].timeLimit)
        setQuestionStartTime(Date.now())
        setIsTransitioning(false)
      }, 300)
    } else {
      setCurrentStep('payment')
    }
  }, [
    isTransitioning,
    questionStartTime,
    selectedOption,
    question,
    currentQuestion,
    addAnswer,
    setCurrentQuestion,
    setCurrentStep,
  ])

  useEffect(() => {
    if (timeLeft <= 0) {
      handleNextQuestion()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, handleNextQuestion])

  useEffect(() => {
    setTimeLeft(question?.timeLimit || 30)
    setQuestionStartTime(Date.now())
  }, [currentQuestion, question?.timeLimit])

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', label: 'Easy' }
      case 'medium':
        return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', label: 'Medium' }
      case 'hard':
        return { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30', label: 'Hard' }
      default:
        return { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30', label: 'Unknown' }
    }
  }

  const getTimerConfig = () => {
    const percentage = timeLeft / question.timeLimit
    if (percentage <= 0.2) return { color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)' }
    if (percentage <= 0.5) return { color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)' }
    return { color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' }
  }

  if (!question) return null

  const difficultyConfig = getDifficultyConfig(question.difficulty)
  const timerConfig = getTimerConfig()
  const circumference = 2 * Math.PI * 36

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* Professional Header Bar */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          {/* Top Row - Question Info & Timer */}
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            {/* Question Counter */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-white font-bold text-base sm:text-lg">
                  {currentQuestion + 1}
                </span>
                <span className="text-slate-500 text-sm sm:text-base">/</span>
                <span className="text-slate-400 text-sm sm:text-base">
                  {questions.length}
                </span>
              </div>
              <div className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-semibold uppercase tracking-wide ${difficultyConfig.bg} ${difficultyConfig.text} border ${difficultyConfig.border}`}>
                {difficultyConfig.label}
              </div>
            </div>

            {/* Circular Timer */}
            <div className="relative">
              <svg className="w-12 h-12 sm:w-14 sm:h-14 -rotate-90" viewBox="0 0 80 80">
                {/* Background circle */}
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-slate-700/50"
                />
                {/* Progress circle */}
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke={timerConfig.color}
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - timeLeft / question.timeLimit)}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-sm sm:text-base font-bold tabular-nums"
                  style={{ color: timerConfig.color }}
                >
                  {timeLeft}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full h-1.5 sm:h-2 bg-slate-700/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
              />
            </div>
            {/* Progress percentage */}
            <div className="absolute right-0 -top-5 sm:-top-6 text-[10px] sm:text-xs text-slate-500 font-medium">
              {Math.round(progress)}% complete
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-3 sm:px-6 py-4 sm:py-6">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6">

          {/* Question Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              {/* Question Card */}
              <div className="flex-1 bg-slate-800/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-slate-700/50 p-3 sm:p-6 flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
                <div
                  className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] aspect-square"
                  dangerouslySetInnerHTML={{ __html: question.questionSvg }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Answer Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:w-[340px] xl:w-[380px] flex flex-col"
          >
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-1 h-4 sm:h-5 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full" />
              <h2 className="text-white font-semibold text-sm sm:text-base">Select Answer</h2>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedOption(index)}
                  className={`relative group rounded-xl sm:rounded-2xl transition-all duration-200 ${
                    selectedOption === index
                      ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-slate-900'
                      : 'hover:ring-1 hover:ring-slate-600'
                  }`}
                >
                  {/* Option Card */}
                  <div className={`bg-slate-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border transition-all duration-200 p-2 sm:p-3 ${
                    selectedOption === index
                      ? 'border-violet-500/50 bg-violet-500/10'
                      : 'border-slate-700/50 group-hover:border-slate-600'
                  }`}>
                    {/* Option SVG */}
                    <div
                      className="w-full aspect-square"
                      dangerouslySetInnerHTML={{ __html: option }}
                    />
                  </div>

                  {/* Option Label */}
                  <div className={`absolute -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-200 ${
                    selectedOption === index
                      ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25'
                      : 'bg-slate-700 text-slate-300 border border-slate-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>

                  {/* Selected Checkmark */}
                  {selectedOption === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/25"
                    >
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              {/* Primary Button */}
              <motion.button
                whileHover={{ scale: selectedOption !== null ? 1.01 : 1 }}
                whileTap={{ scale: selectedOption !== null ? 0.99 : 1 }}
                onClick={handleNextQuestion}
                disabled={selectedOption === null || isTransitioning}
                className={`w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 ${
                  selectedOption !== null
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                {currentQuestion < questions.length - 1 ? (
                  <>
                    <span>Continue</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Complete Test</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </>
                )}
              </motion.button>

              {/* Skip Button */}
              <button
                onClick={handleNextQuestion}
                className="w-full py-2 sm:py-2.5 text-slate-500 hover:text-slate-300 text-xs sm:text-sm font-medium transition-colors"
              >
                Skip this question
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="bg-slate-900/60 border-t border-slate-800/50 py-2 sm:py-3">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 flex items-center justify-between">
          <p className="text-slate-600 text-[10px] sm:text-xs">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <p className="text-slate-600 text-[10px] sm:text-xs">
            BrainyAK IQ Test
          </p>
        </div>
      </footer>
    </div>
  )
}
