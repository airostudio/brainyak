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

  if (!question) return null

  return (
    <div className="min-h-screen flex flex-col p-2 sm:p-4 md:p-8">
      {/* Header - Compact for mobile */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 sm:mb-6"
      >
        {/* Progress Info Row */}
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-white font-semibold text-sm sm:text-base">
              Q{currentQuestion + 1}/{questions.length}
            </span>
            <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </span>
          </div>
          <div className="text-gray-400 text-xs sm:text-sm hidden sm:block">
            Hi, {userInfo?.name?.split(' ')[0]}!
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 sm:h-3 bg-slate-700/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* Main Content - Stacked on mobile */}
      <div className="flex-1 flex flex-col lg:flex-row gap-3 sm:gap-6 max-w-6xl mx-auto w-full">
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
            {/* Timer - Smaller on mobile */}
            <div className="flex justify-center mb-2 sm:mb-4">
              <div className="relative">
                <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 transform -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-slate-700"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
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
                      <stop offset="0%" stopColor={timeLeft <= 5 ? '#ef4444' : timeLeft <= 15 ? '#eab308' : '#22c55e'} />
                      <stop offset="100%" stopColor={timeLeft <= 5 ? '#dc2626' : timeLeft <= 15 ? '#f97316' : '#10b981'} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-lg sm:text-xl md:text-2xl font-bold ${timeLeft <= 5 ? 'text-red-400' : timeLeft <= 15 ? 'text-yellow-400' : 'text-white'}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>
            </div>

            {/* Question Image - Responsive sizing */}
            <div className="glass-effect rounded-xl sm:rounded-2xl p-2 sm:p-4 md:p-6 mb-3 sm:mb-6 flex-1 flex items-center justify-center min-h-[180px] sm:min-h-[250px]">
              <div
                className="w-full max-w-[280px] sm:max-w-sm md:max-w-md aspect-square"
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
          <h3 className="text-white font-semibold mb-2 sm:mb-4 text-center lg:text-left text-sm sm:text-base">
            Select your answer:
          </h3>

          {/* Options Grid - Responsive gap and sizing */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedOption(index)}
                className={`option-card relative rounded-lg sm:rounded-xl p-1 sm:p-2 transition-all duration-300 ${
                  selectedOption === index
                    ? 'ring-2 sm:ring-4 ring-purple-500 ring-offset-1 sm:ring-offset-2 ring-offset-slate-900'
                    : 'hover:ring-2 hover:ring-purple-500/50'
                }`}
              >
                <div className={`glass-effect rounded-lg sm:rounded-xl p-2 sm:p-3 ${selectedOption === index ? 'bg-purple-500/20' : ''}`}>
                  <div
                    className="w-full aspect-square"
                    dangerouslySetInnerHTML={{ __html: option }}
                  />
                </div>
                {/* Option Letter Badge - Smaller on mobile */}
                <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold text-[10px] sm:text-xs md:text-sm border sm:border-2 border-slate-500">
                  {String.fromCharCode(65 + index)}
                </div>
                {selectedOption === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Next Button - Responsive padding */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNextQuestion}
            disabled={selectedOption === null || isTransitioning}
            className={`w-full mt-3 sm:mt-4 md:mt-6 relative group ${
              selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${
              selectedOption !== null ? 'from-purple-600 to-pink-600' : 'from-gray-600 to-gray-700'
            } rounded-lg sm:rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity`}></div>
            <div className={`relative bg-gradient-to-r ${
              selectedOption !== null ? 'from-purple-600 to-pink-600' : 'from-gray-600 to-gray-700'
            } text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2`}>
              {currentQuestion < questions.length - 1 ? (
                <>
                  <span className="hidden sm:inline">Next Question</span>
                  <span className="sm:hidden">Next</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Complete Test</span>
                  <span className="sm:hidden">Complete</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </>
              )}
            </div>
          </motion.button>

          {/* Skip Button */}
          <button
            onClick={handleNextQuestion}
            className="w-full mt-2 sm:mt-3 text-gray-400 hover:text-white text-xs sm:text-sm transition-colors py-1"
          >
            Skip this question
          </button>
        </motion.div>
      </div>
    </div>
  )
}
