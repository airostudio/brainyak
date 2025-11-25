'use client'

import { motion } from 'framer-motion'
import { useTestStore } from '@/store/testStore'

export default function WelcomeScreen() {
  const { setCurrentStep } = useTestStore()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Animated Brain Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 1 }}
        className="mb-8"
      >
        <div className="relative">
          <svg
            viewBox="0 0 200 200"
            className="w-40 h-40 md:w-52 md:h-52"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Glowing background */}
            <defs>
              <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>

            <circle cx="100" cy="100" r="95" fill="url(#brainGlow)" />

            {/* Brain shape */}
            <g transform="translate(35, 30)">
              <path
                d="M65 140c-35 0-55-25-55-55 0-15 5-28 15-38C15 42 10 32 10 20 10 8 20 0 35 0c10 0 18 4 23 10C63 4 73 0 85 0c20 0 35 12 35 30 0 8-3 15-8 20 15 10 23 28 23 48 0 30-25 42-50 42h-20z"
                fill="url(#brainGradient)"
                className="drop-shadow-lg"
              />
              {/* Brain details */}
              <path
                d="M40 30c0 8-5 15-12 18M65 25c5 10 5 25 0 40M90 35c8 5 12 15 10 28M50 70c-10 5-20 2-25-5M75 75c10 3 20 0 25-10M55 100c-5 10-15 15-25 12M80 105c5 8 12 12 22 10"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </g>

            {/* Sparkles */}
            <circle cx="30" cy="50" r="3" fill="#fbbf24" className="animate-pulse" />
            <circle cx="170" cy="70" r="4" fill="#22c55e" className="animate-pulse" />
            <circle cx="45" cy="160" r="3" fill="#f97316" className="animate-pulse" />
            <circle cx="160" cy="150" r="4" fill="#ec4899" className="animate-pulse" />
          </svg>
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold text-center mb-4"
      >
        <span className="text-gradient from-pink-500 via-purple-500 to-blue-500">
          BrainyAK
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-xl md:text-2xl text-gray-300 text-center mb-2"
      >
        Discover Your True IQ
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-gray-400 text-center mb-8 max-w-md"
      >
        Based on Mensa International Standards
      </motion.p>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-3xl"
      >
        <div className="glass-effect rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🧩</div>
          <h3 className="text-white font-semibold mb-1">15 Visual Puzzles</h3>
          <p className="text-gray-400 text-sm">Pattern recognition & spatial reasoning</p>
        </div>
        <div className="glass-effect rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">⏱️</div>
          <h3 className="text-white font-semibold mb-1">Timed Challenges</h3>
          <p className="text-gray-400 text-sm">Test your cognitive speed</p>
        </div>
        <div className="glass-effect rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="text-white font-semibold mb-1">Detailed Analysis</h3>
          <p className="text-gray-400 text-sm">IQ score & insights emailed to you</p>
        </div>
      </motion.div>

      {/* Price Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-50"></div>
          <div className="relative bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full font-bold text-lg">
            Only $1.99 One-Time Fee
          </div>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentStep('registration')}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-shadow">
          Start Your IQ Test
          <span className="ml-2">→</span>
        </div>
      </motion.button>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-10 flex items-center gap-6 text-gray-500 text-sm"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Secure Payment
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Instant Results
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Email Delivery
        </div>
      </motion.div>
    </div>
  )
}
