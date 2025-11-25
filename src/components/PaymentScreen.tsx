'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useTestStore } from '@/store/testStore'

// Initialize Stripe (use environment variable in production)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      '::placeholder': {
        color: '#64748b',
      },
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444',
    },
  },
}

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const { userInfo, calculateScore, setPaymentComplete, setCurrentStep } = useTestStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const score = calculateScore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Create payment intent via API
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInfo?.email,
          name: userInfo?.name,
        }),
      })

      const { clientSecret, error: apiError } = await response.json()

      if (apiError) {
        setError(apiError)
        setIsProcessing(false)
        return
      }

      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        setError('Card element not found')
        setIsProcessing(false)
        return
      }

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: userInfo?.name,
            email: userInfo?.email,
          },
        },
      })

      if (stripeError) {
        setError(stripeError.message || 'Payment failed')
        setIsProcessing(false)
        return
      }

      if (paymentIntent?.status === 'succeeded') {
        // Send results email
        await fetch('/api/send-results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userInfo?.email,
            name: userInfo?.name,
            score,
          }),
        })

        setPaymentComplete(true)
        setCurrentStep('success')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setIsProcessing(false)
    }
  }

  // Demo mode - skip payment for testing
  const handleDemoComplete = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Send results email
    try {
      await fetch('/api/send-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInfo?.email,
          name: userInfo?.name,
          score,
        }),
      })
    } catch (err) {
      // Continue even if email fails in demo mode
    }

    setPaymentComplete(true)
    setCurrentStep('success')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Element */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Card Details
        </label>
        <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-4">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Security Note */}
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Secured by Stripe. Your payment information is encrypted.
      </div>

      {/* Pay Button */}
      <motion.button
        type="submit"
        disabled={!stripe || isProcessing}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full relative group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2">
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Pay $1.99 - Unlock My Results
            </>
          )}
        </div>
      </motion.button>

      {/* Demo Mode Button */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleDemoComplete}
          disabled={isProcessing}
          className="text-gray-500 hover:text-gray-300 text-sm underline transition-colors disabled:opacity-50"
        >
          Demo Mode - Skip Payment (Testing Only)
        </button>
      </div>
    </form>
  )
}

export default function PaymentScreen() {
  const { userInfo, calculateScore, calculateIQ } = useTestStore()

  const score = calculateScore()
  const iq = calculateIQ()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        {/* Celebration Icon */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="inline-block"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto glow-purple">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Congratulations Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Test Complete!
          </h2>
          <p className="text-gray-400">
            Great job, {userInfo?.name?.split(' ')[0]}! Your results are ready.
          </p>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl p-6 mb-6"
        >
          <div className="text-center mb-4">
            <div className="text-sm text-gray-400 mb-1">Your Estimated IQ Range</div>
            <div className="relative">
              <div className="text-6xl font-bold text-gradient from-purple-400 via-pink-400 to-orange-400">
                ???
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-t from-slate-800 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-slate-800/50 rounded-xl p-3">
              <div className="text-2xl font-bold text-purple-400">{score}/15</div>
              <div className="text-xs text-gray-400">Correct Answers</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3">
              <div className="text-2xl font-bold text-pink-400">Locked</div>
              <div className="text-xs text-gray-400">Full Analysis</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
            <div className="flex items-center gap-2 text-purple-300 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Unlock your full IQ score and detailed cognitive analysis
            </div>
          </div>
        </motion.div>

        {/* What You Get */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-6 mb-6"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            What You&apos;ll Receive:
          </h3>
          <ul className="space-y-3">
            {[
              'Your precise IQ score calculation',
              'Cognitive strengths & weaknesses analysis',
              'Comparison with global percentiles',
              'Personalized improvement recommendations',
              'Beautiful PDF certificate',
              '20 exclusive bonus test offers!',
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3 text-gray-300"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Price Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-6 py-2">
            <span className="text-gray-400 line-through text-sm">$9.99</span>
            <span className="text-2xl font-bold text-green-400">$1.99</span>
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">80% OFF</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">One-time payment. No subscriptions.</p>
        </motion.div>

        {/* Payment Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-effect rounded-2xl p-6"
        >
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center gap-6 mt-6 text-gray-500 text-xs"
        >
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            256-bit SSL
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            Money-back Guarantee
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
