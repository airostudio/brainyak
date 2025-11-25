import Link from 'next/link'
import PageLayout from '@/components/PageLayout'

export const metadata = {
  title: 'Learn More About IQ Testing - BrainyAK',
  description: 'Discover how IQ tests work, what they measure, and how BrainyAK can help you understand your cognitive abilities.',
}

export default function LearnMorePage() {
  return (
    <PageLayout title="Learn More" subtitle="Understanding IQ Tests and Cognitive Assessment">
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">What is an IQ Test?</h2>
          <p className="text-gray-300 mb-4">
            An Intelligence Quotient (IQ) test is a standardized assessment designed to measure human intelligence and cognitive abilities. Originally developed in the early 20th century, IQ tests have evolved to become one of the most widely used tools for assessing cognitive potential.
          </p>
          <p className="text-gray-300">
            Modern IQ tests, including those used by Mensa International, focus on measuring various aspects of intelligence including logical reasoning, pattern recognition, spatial awareness, and problem-solving abilities.
          </p>
        </section>

        {/* What We Measure */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">What Our Test Measures</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Fluid Intelligence',
                description: 'Your ability to think logically and solve novel problems, independent of acquired knowledge.',
                icon: '🧠',
              },
              {
                title: 'Pattern Recognition',
                description: 'Identifying relationships, patterns, and sequences in visual information.',
                icon: '🔍',
              },
              {
                title: 'Spatial Reasoning',
                description: 'Mentally manipulating shapes and understanding spatial relationships.',
                icon: '📐',
              },
              {
                title: 'Logical Deduction',
                description: 'Drawing conclusions from given information using systematic reasoning.',
                icon: '💡',
              },
            ].map((item, index) => (
              <div key={index} className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="text-white font-semibold">{item.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">How Our IQ Test Works</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Register', description: 'Provide your name, email, and phone number to get started.' },
              { step: 2, title: 'Take the Test', description: 'Complete 15 visual pattern recognition questions. Each question is timed.' },
              { step: 3, title: 'Unlock Results', description: 'Pay a one-time fee of $1.99 to access your detailed results.' },
              { step: 4, title: 'Get Your Score', description: 'Receive your IQ score, percentile ranking, and cognitive analysis instantly.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Why Take an IQ Test?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-300">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Understand your cognitive strengths
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Identify areas for improvement
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Compare yourself globally
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-300">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Satisfy your curiosity
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Challenge your mind
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Track cognitive development
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Common Questions</h2>
          <div className="space-y-3">
            {[
              {
                q: 'Is this test accurate?',
                a: 'Our test uses established psychometric principles to provide a reliable estimate of cognitive ability. While not a clinical assessment, it offers valuable insights into your intellectual potential.',
              },
              {
                q: 'How long does the test take?',
                a: 'Most users complete the test in 10-15 minutes. Each question has a time limit to ensure accurate results.',
              },
              {
                q: 'Can I retake the test?',
                a: 'Yes, you can take the test multiple times. Each attempt requires a separate payment.',
              },
              {
                q: 'Is my information secure?',
                a: 'Absolutely. We use industry-standard encryption and never share your personal information with third parties.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                <h3 className="text-white font-medium mb-1">{item.q}</h3>
                <p className="text-gray-400 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow"
          >
            Start Your IQ Test
          </Link>
          <p className="text-gray-500 text-sm mt-3">Only $1.99 for complete results</p>
        </div>
      </div>
    </PageLayout>
  )
}
