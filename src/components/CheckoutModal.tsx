'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useTestStore } from '@/store/testStore'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      '::placeholder': { color: '#64748b' },
    },
    invalid: { color: '#ef4444', iconColor: '#ef4444' },
  },
}

export interface CheckoutConfig {
  product: 'single_test' | 'bundle'
  amount: number // dollars, for display
  title: string
  description: string
  testId?: number
  testName?: string
  recurring?: boolean
  onSuccess: () => void
}

function CheckoutForm({ config, onClose }: { config: CheckoutConfig; onClose: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const { userInfo } = useTestStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const finish = () => {
    config.onSuccess()
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userInfo?.email,
          name: userInfo?.name,
          product: config.product,
          testId: config.testId,
          testName: config.testName,
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
          billing_details: { name: userInfo?.name, email: userInfo?.email },
        },
      })

      if (stripeError) {
        setError(stripeError.message || 'Payment failed')
        setIsProcessing(false)
        return
      }

      if (paymentIntent?.status === 'succeeded') {
        finish()
      } else {
        setIsProcessing(false)
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
      setIsProcessing(false)
    }
  }

  // Demo mode — skip payment for testing
  const handleDemoComplete = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    finish()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Card Details</label>
        <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-4">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      <div className="flex items-center gap-2 text-gray-400 text-xs">
        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Secured by Stripe. Your payment information is encrypted.
      </div>

      <motion.button
        type="submit"
        disabled={!stripe || isProcessing}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full relative group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
        <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3.5 rounded-xl font-bold text-base shadow-lg flex items-center justify-center gap-2">
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </>
          ) : (
            <>Pay ${config.amount.toFixed(2)}{config.recurring ? '/mo' : ''} — Unlock Now</>
          )}
        </div>
      </motion.button>

      <div className="text-center">
        <button
          type="button"
          onClick={handleDemoComplete}
          disabled={isProcessing}
          className="text-gray-500 hover:text-gray-300 text-xs underline transition-colors disabled:opacity-50"
        >
          Demo Mode — Skip Payment (Testing Only)
        </button>
      </div>
    </form>
  )
}

export default function CheckoutModal({
  config,
  onClose,
}: {
  config: CheckoutConfig | null
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {config && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{config.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{config.description}</p>
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

            <div className="flex items-baseline gap-2 mb-5 p-3 bg-slate-800/50 rounded-xl">
              <span className="text-3xl font-bold text-gradient from-purple-400 to-pink-400">
                ${config.amount.toFixed(2)}
              </span>
              {config.recurring && <span className="text-gray-400 text-sm">per month</span>}
              {!config.recurring && <span className="text-gray-400 text-sm">one-time payment</span>}
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm config={config} onClose={onClose} />
            </Elements>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
