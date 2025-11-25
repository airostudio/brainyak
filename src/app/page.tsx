'use client'

import { useTestStore } from '@/store/testStore'
import WelcomeScreen from '@/components/WelcomeScreen'
import RegistrationForm from '@/components/RegistrationForm'
import TestScreen from '@/components/TestScreen'
import PaymentScreen from '@/components/PaymentScreen'
import SuccessScreen from '@/components/SuccessScreen'

export default function Home() {
  const { currentStep } = useTestStore()

  return (
    <main className="min-h-screen pattern-dots">
      {currentStep === 'welcome' && <WelcomeScreen />}
      {currentStep === 'registration' && <RegistrationForm />}
      {currentStep === 'test' && <TestScreen />}
      {currentStep === 'payment' && <PaymentScreen />}
      {currentStep === 'success' && <SuccessScreen />}
    </main>
  )
}
