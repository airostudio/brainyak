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

    // Record answer (if no selection made, count as incorrect)
    addAnswer({
      questionId: question.id,
      selectedOption: selectedOption ?? -1,
      isCorrect: selectedOption === question.correctAnswer,
      timeSpent,
    })

    // Move to next question or payment
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

  // Timer effect
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

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(question?.timeLimit || 30)
    setQuestionStartTime(Date.now())
  }, [currentQuestion, question?.timeLimit])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'hard':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getTimerColor = () => {
    if (timeLeft <= 5) return 'from-red-500 to-red-600'
    if (timeLeft <= 15) return 'from-yellow-500 to-orange-500'
    return 'from-green-500 to-emerald-500'
  }

  if (!question) return null

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-white font-semibold">
              Question {currentQuestion + 1}/{questions.length}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </span>
          </div>
          <div className="text-gray-400 text-sm">
            Hi, {userInfo?.name?.split(' ')[0]}!
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto w-full">
        {/* Question Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {/* Timer */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-slate-700"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="url(#timerGradient)"
                    strokeWidth="6"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - timeLeft / question.timeLimit)}
                    className="transition-all duration-1000 ease-linear"
                  />
                  <defs>
                    <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" className={`${timeLeft <= 5 ? 'stop-color-red-500' : timeLeft <= 15 ? 'stop-color-yellow-500' : 'stop-color-green-500'}`} stopColor={timeLeft <= 5 ? '#ef4444' : timeLeft <= 15 ? '#eab308' : '#22c55e'} />
                      <stop offset="100%" className={`${timeLeft <= 5 ? 'stop-color-red-600' : timeLeft <= 15 ? 'stop-color-orange-500' : 'stop-color-emerald-500'}`} stopColor={timeLeft <= 5 ? '#dc2626' : timeLeft <= 15 ? '#f97316' : '#10b981'} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-red-400' : timeLeft <= 15 ? 'text-yellow-400' : 'text-white'}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>
            </div>

            {/* Question Image */}
            <div className="glass-effect rounded-2xl p-4 md:p-6 mb-6 flex-1 flex items-center justify-center">
              <div
                className="w-full max-w-md aspect-square"
                dangerouslySetInnerHTML={{ __html: question.questionSvg }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Options Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:w-96"
        >
          <h3 className="text-white font-semibold mb-4 text-center lg:text-left">
            Select your answer:
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedOption(index)}
                className={`option-card relative rounded-xl p-2 transition-all duration-300 ${
                  selectedOption === index
                    ? 'ring-4 ring-purple-500 ring-offset-2 ring-offset-slate-900'
                    : 'hover:ring-2 hover:ring-purple-500/50'
                }`}
              >
                <div className={`glass-effect rounded-xl p-3 ${selectedOption === index ? 'bg-purple-500/20' : ''}`}>
                  <div
                    className="w-full aspect-square"
                    dangerouslySetInnerHTML={{ __html: option }}
                  />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold text-sm border-2 border-slate-500">
                  {String.fromCharCode(65 + index)}
                </div>
                {selectedOption === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNextQuestion}
            disabled={selectedOption === null || isTransitioning}
            className={`w-full mt-6 relative group ${
              selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${
              selectedOption !== null ? 'from-purple-600 to-pink-600' : 'from-gray-600 to-gray-700'
            } rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity`}></div>
            <div className={`relative bg-gradient-to-r ${
              selectedOption !== null ? 'from-purple-600 to-pink-600' : 'from-gray-600 to-gray-700'
            } text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2`}>
              {currentQuestion < questions.length - 1 ? (
                <>
                  Next Question
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              ) : (
                <>
                  Complete Test
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </>
              )}
            </div>
          </motion.button>

          {/* Skip Button */}
          <button
            onClick={handleNextQuestion}
            className="w-full mt-3 text-gray-400 hover:text-white text-sm transition-colors"
          >
            Skip this question
          </button>
        </motion.div>
      </div>
    </div>
  )
}
