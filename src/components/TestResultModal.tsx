'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { TestOffer } from '@/data/testOffers'
import { getTestResult } from '@/data/testResults'
import { useTestStore } from '@/store/testStore'

export default function TestResultModal({
  offer,
  onClose,
}: {
  offer: TestOffer | null
  onClose: () => void
}) {
  const { calculateScore, answers } = useTestStore()

  return (
    <AnimatePresence>
      {offer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <ResultCard offer={offer} score={calculateScore()} answers={answers} onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ResultCard({
  offer,
  score,
  answers,
  onClose,
}: {
  offer: TestOffer
  score: number
  answers: ReturnType<typeof useTestStore.getState>['answers']
  onClose: () => void
}) {
  const result = getTestResult(offer, score, answers)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: 'spring', duration: 0.4 }}
      className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${offer.gradient} flex items-center justify-center text-2xl flex-shrink-0`}>
            {offer.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">{offer.name}</h3>
            <span className="inline-flex items-center gap-1 text-xs text-green-400 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Unlocked
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white transition-colors flex-shrink-0 ml-4"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Score */}
      <div className="text-center mb-5">
        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Your Score</div>
        <div className={`text-6xl font-bold text-gradient bg-gradient-to-r ${result.color}`}>
          {result.percent}%
        </div>
        <div className={`mt-2 inline-block px-4 py-1 rounded-full bg-gradient-to-r ${result.color} text-white text-sm font-semibold`}>
          {result.level}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden mb-5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${result.percent}%` }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={`h-full bg-gradient-to-r ${result.color} rounded-full`}
        />
      </div>

      {/* Summary */}
      <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
        <h4 className="text-white font-semibold text-sm mb-2">Analysis</h4>
        <p className="text-gray-300 text-sm leading-relaxed">{result.summary}</p>
      </div>

      {/* Strengths */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-5">
        <h4 className="text-green-400 font-semibold text-sm mb-2">Key Strengths</h4>
        <ul className="space-y-1.5">
          {result.strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-semibold transition-colors"
      >
        Done
      </button>
    </motion.div>
  )
}
