'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import { useTestStore } from '@/store/testStore'
import {
  testOffers,
  INDIVIDUAL_TOTAL_PRICE,
  BUNDLE_TOTAL_PRICE,
  BUNDLE_SAVINGS_PERCENT,
  INDIVIDUAL_TEST_PRICE,
  type TestOffer,
} from '@/data/testOffers'
import CheckoutModal, { type CheckoutConfig } from '@/components/CheckoutModal'
import TestResultModal from '@/components/TestResultModal'

export default function SuccessScreen() {
  const {
    userInfo,
    calculateScore,
    calculateIQ,
    answers,
    resetTest,
    bundleUnlocked,
    unlockedTestIds,
    unlockAllTests,
    unlockTest,
    isTestUnlocked,
  } = useTestStore()
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [showConfetti, setShowConfetti] = useState(true)
  const [checkout, setCheckout] = useState<CheckoutConfig | null>(null)
  const [resultOffer, setResultOffer] = useState<TestOffer | null>(null)

  const score = calculateScore()
  const iq = calculateIQ()
  const totalQuestions = 15

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResize)

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [])

  const getIQCategory = (iq: number) => {
    if (iq >= 140) return { label: 'Genius', color: 'from-yellow-400 to-amber-500', emoji: '🏆' }
    if (iq >= 130) return { label: 'Very Superior', color: 'from-purple-400 to-pink-500', emoji: '🌟' }
    if (iq >= 120) return { label: 'Superior', color: 'from-blue-400 to-indigo-500', emoji: '✨' }
    if (iq >= 110) return { label: 'High Average', color: 'from-green-400 to-emerald-500', emoji: '💪' }
    if (iq >= 90) return { label: 'Average', color: 'from-cyan-400 to-blue-500', emoji: '👍' }
    if (iq >= 80) return { label: 'Low Average', color: 'from-orange-400 to-amber-500', emoji: '📈' }
    return { label: 'Below Average', color: 'from-red-400 to-orange-500', emoji: '💡' }
  }

  const category = getIQCategory(iq)

  const getPercentile = (iq: number) => {
    if (iq >= 145) return 99.9
    if (iq >= 135) return 99
    if (iq >= 130) return 98
    if (iq >= 125) return 95
    if (iq >= 120) return 91
    if (iq >= 115) return 84
    if (iq >= 110) return 75
    if (iq >= 105) return 63
    if (iq >= 100) return 50
    if (iq >= 95) return 37
    if (iq >= 90) return 25
    if (iq >= 85) return 16
    return 10
  }

  const unlockedCount = bundleUnlocked ? testOffers.length : unlockedTestIds.length

  // Notify the results endpoint that extra tests were unlocked (best-effort).
  const emailUnlockedTests = (all: boolean, testName?: string) => {
    fetch('/api/send-results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userInfo?.email,
        name: userInfo?.name,
        score,
        bundle: all,
        unlockedTest: testName,
      }),
    }).catch(() => {})
  }

  // Click on a bonus test card: view results if unlocked, otherwise buy it.
  const handleOfferClick = (offer: TestOffer) => {
    if (isTestUnlocked(offer.id)) {
      setResultOffer(offer)
      return
    }
    setCheckout({
      product: 'single_test',
      amount: INDIVIDUAL_TEST_PRICE,
      title: offer.name,
      description: `Unlock your ${offer.name} results`,
      testId: offer.id,
      testName: offer.name,
      onSuccess: () => {
        unlockTest(offer.id)
        emailUnlockedTests(false, offer.name)
        setResultOffer(offer)
      },
    })
  }

  // Buy the Ultimate Package: unlocks all 20 tests at once.
  const handleBundleClick = () => {
    if (bundleUnlocked) return
    setCheckout({
      product: 'bundle',
      amount: BUNDLE_TOTAL_PRICE,
      title: 'Ultimate Package',
      description: 'Unlock all 20 tests and get results for every one',
      onSuccess: () => {
        unlockAllTests()
        emailUnlockedTests(true)
      },
    })
  }

  return (
    <div className="min-h-screen px-4 py-8 overflow-y-auto">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          colors={['#ec4899', '#8b5cf6', '#3b82f6', '#22c55e', '#f97316', '#fbbf24']}
        />
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-6xl mb-4"
          >
            {category.emoji}
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Congratulations, {userInfo?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-400">Your IQ test results are ready</p>
        </motion.div>

        {/* Main Results Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl p-6 md:p-8 mb-8"
        >
          {/* IQ Score */}
          <div className="text-center mb-8">
            <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">Your IQ Score</div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="relative inline-block"
            >
              <div className={`text-8xl md:text-9xl font-bold text-gradient bg-gradient-to-r ${category.color}`}>
                {iq}
              </div>
              <div className="absolute -top-2 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                IQ
              </div>
            </motion.div>
            <div className={`mt-4 inline-block px-6 py-2 rounded-full bg-gradient-to-r ${category.color} text-white font-semibold`}>
              {category.label}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">{score}</div>
              <div className="text-xs text-gray-400">Correct Answers</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-pink-400">{totalQuestions - score}</div>
              <div className="text-xs text-gray-400">Incorrect</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">{Math.round((score / totalQuestions) * 100)}%</div>
              <div className="text-xs text-gray-400">Accuracy</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-400">Top {100 - getPercentile(iq)}%</div>
              <div className="text-xs text-gray-400">Percentile</div>
            </div>
          </div>

          {/* IQ Scale */}
          <div className="mb-8">
            <div className="text-sm text-gray-400 mb-3">Where You Stand</div>
            <div className="relative h-8 bg-slate-800 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="h-full bg-red-500/50" style={{ width: '15%' }} />
                <div className="h-full bg-orange-500/50" style={{ width: '15%' }} />
                <div className="h-full bg-yellow-500/50" style={{ width: '20%' }} />
                <div className="h-full bg-green-500/50" style={{ width: '20%' }} />
                <div className="h-full bg-blue-500/50" style={{ width: '15%' }} />
                <div className="h-full bg-purple-500/50" style={{ width: '15%' }} />
              </div>
              <motion.div
                initial={{ left: '0%' }}
                animate={{ left: `${Math.min(Math.max((iq - 70) / 80, 0), 1) * 100}%` }}
                transition={{ delay: 0.8, duration: 1, type: 'spring' }}
                className="absolute top-0 w-1 h-full bg-white shadow-lg"
                style={{ transform: 'translateX(-50%)' }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>70</span>
              <span>85</span>
              <span>100</span>
              <span>115</span>
              <span>130</span>
              <span>145+</span>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-green-400 font-semibold">Results Sent!</div>
              <div className="text-gray-400 text-sm">
                A detailed report has been emailed to {userInfo?.email}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Exclusive Offers Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {bundleUnlocked ? 'Your Unlocked Tests' : 'Exclusive Test Offers Just For You!'}
            </h2>
            <p className="text-gray-400">
              {bundleUnlocked
                ? 'Tap any test to view your personalized results'
                : 'Discover more about your cognitive abilities with our premium tests'}
            </p>
          </div>

          {/* Ultimate Package active banner */}
          {unlockedCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center justify-center gap-3 bg-gradient-to-r from-green-500/15 to-emerald-500/15 border border-green-500/40 rounded-xl px-4 py-3 text-center"
            >
              <span className="text-2xl">✅</span>
              <div className="text-left">
                <div className="text-green-400 font-semibold text-sm">
                  {bundleUnlocked ? 'Ultimate Package active' : `${unlockedCount} test${unlockedCount > 1 ? 's' : ''} unlocked`}
                </div>
                <div className="text-gray-400 text-xs">
                  {bundleUnlocked
                    ? 'All 20 tests are unlocked — tap any card to see your results'
                    : 'Tap an unlocked test to view your results'}
                </div>
              </div>
            </motion.div>
          )}

          {/* Test Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testOffers.map((offer, index) => {
              const unlocked = isTestUnlocked(offer.id)
              return (
                <motion.button
                  key={offer.id}
                  type="button"
                  onClick={() => handleOfferClick(offer)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className={`text-left rounded-xl p-4 transition-colors group cursor-pointer border ${
                    unlocked
                      ? 'bg-green-500/5 border-green-500/40 hover:bg-green-500/10'
                      : 'glass-effect border-transparent hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${offer.gradient} flex items-center justify-center flex-shrink-0 text-2xl`}>
                      {offer.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                        {offer.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">{offer.description}</p>
                      {unlocked ? (
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-green-400 font-semibold text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Unlocked
                          </span>
                          <span className="text-purple-300 text-sm font-medium group-hover:underline">
                            View Results →
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 line-through text-sm">${offer.originalPrice}</span>
                          <span className="text-green-400 font-bold">${offer.price}</span>
                          {offer.badge && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${offer.badgeColor}`}>
                              {offer.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Bundle Offer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-6 relative overflow-hidden"
          >
            <div className={`absolute inset-0 rounded-2xl opacity-20 ${bundleUnlocked ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-purple-600 to-pink-600'}`} />
            <div className={`relative glass-effect rounded-2xl p-6 border-2 ${bundleUnlocked ? 'border-green-500/50' : 'border-purple-500/50'}`}>
              {bundleUnlocked ? (
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🎉</span>
                      <h3 className="text-xl font-bold text-white">Ultimate Package Unlocked</h3>
                    </div>
                    <p className="text-gray-300">All 20 tests are unlocked — tap any test above to view your results.</p>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 text-green-400 px-6 py-3 rounded-xl font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Active
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🎁</span>
                      <h3 className="text-xl font-bold text-white">Ultimate Package</h3>
                    </div>
                    <p className="text-gray-300">Get all 20 tests for one amazing price!</p>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 line-through text-sm">${INDIVIDUAL_TOTAL_PRICE.toFixed(2)}</div>
                    <div className="text-4xl font-bold text-gradient from-purple-400 to-pink-400">${BUNDLE_TOTAL_PRICE.toFixed(2)}</div>
                    <div className="text-green-400 text-sm font-semibold">Save {BUNDLE_SAVINGS_PERCENT}%!</div>
                  </div>
                  <motion.button
                    onClick={handleBundleClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-shadow"
                  >
                    Get Bundle
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Take Another Test Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center"
        >
          <button
            onClick={resetTest}
            className="text-gray-400 hover:text-white transition-colors underline"
          >
            Take Another IQ Test
          </button>
        </motion.div>
      </div>

      {/* Checkout & results modals */}
      <CheckoutModal config={checkout} onClose={() => setCheckout(null)} />
      <TestResultModal offer={resultOffer} onClose={() => setResultOffer(null)} />
    </div>
  )
}
