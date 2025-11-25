'use client'

import { useTestStore } from '@/store/testStore'
import WelcomeScreen from '@/components/WelcomeScreen'
import RegistrationForm from '@/components/RegistrationForm'
import TestScreen from '@/components/TestScreen'
import PaymentScreen from '@/components/PaymentScreen'
import SuccessScreen from '@/components/SuccessScreen'
import Footer from '@/components/Footer'

export default function Home() {
  const { currentStep } = useTestStore()

  return (
    <div className="min-h-screen flex flex-col pattern-dots">
      <main className="flex-1">
        {currentStep === 'welcome' && <WelcomeScreen />}
        {currentStep === 'registration' && <RegistrationForm />}
        {currentStep === 'test' && <TestScreen />}
        {currentStep === 'payment' && <PaymentScreen />}
        {currentStep === 'success' && <SuccessScreen />}
      </main>
      {(currentStep === 'welcome' || currentStep === 'success') && <Footer />}
    </div>
  )
}
