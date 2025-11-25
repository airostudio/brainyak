import PageLayout from '@/components/PageLayout'

export const metadata = {
  title: 'Help Center - BrainyAK',
  description: 'Get help with your BrainyAK IQ test. Find answers to frequently asked questions.',
}

export default function HelpPage() {
  const faqs = [
    {
      question: 'How long does the IQ test take?',
      answer: 'The BrainyAK IQ test consists of 15 questions and typically takes 10-15 minutes to complete. Each question has a time limit to ensure accurate results.',
    },
    {
      question: 'How is my IQ score calculated?',
      answer: 'Your IQ score is calculated based on the number of correct answers and compared against statistical norms. We use a standardized scoring system with a mean of 100 and standard deviation of 15.',
    },
    {
      question: 'Why do I need to pay to see my results?',
      answer: 'The $1.99 fee covers the cost of generating your personalized cognitive analysis report, which includes detailed insights, percentile rankings, and improvement recommendations.',
    },
    {
      question: 'How will I receive my results?',
      answer: 'After payment, your results will be displayed immediately on screen and a detailed report will be sent to your registered email address.',
    },
    {
      question: 'Can I retake the test?',
      answer: 'Yes, you can retake the test as many times as you like. Each test attempt requires a new payment to unlock results.',
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Yes, we use industry-standard encryption and secure payment processing through Stripe. We never share your personal information with third parties.',
    },
    {
      question: 'What types of questions are on the test?',
      answer: 'Our test includes pattern recognition, spatial reasoning, logical sequences, and visual analogies - similar to those used in Mensa-style assessments.',
    },
    {
      question: 'Are the results accurate?',
      answer: 'While our test provides a good estimate of cognitive ability, it should be considered an indicative assessment rather than a clinical diagnosis. For official IQ testing, please consult a licensed psychologist.',
    },
  ]

  return (
    <PageLayout title="Help Center" subtitle="Find answers to common questions">
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search for help..."
            className="w-full bg-slate-800/50 border border-slate-600 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden"
            >
              <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium hover:bg-slate-700/30 transition-colors">
                {faq.question}
                <svg
                  className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-4 pb-4 text-gray-400">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 text-center">
          <h3 className="text-white font-semibold mb-2">Still need help?</h3>
          <p className="text-gray-400 mb-4">Our support team is here to assist you.</p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-shadow"
          >
            Contact Support
          </a>
        </div>
      </div>
    </PageLayout>
  )
}
