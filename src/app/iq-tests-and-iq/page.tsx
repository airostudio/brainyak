import Link from 'next/link'
import PageLayout from '@/components/PageLayout'

export const metadata = {
  title: 'IQ Tests and IQ - BrainyAK',
  description: 'Learn about the history, science, and different types of IQ tests. Understand what IQ really measures.',
}

export default function IQTestsAndIQPage() {
  return (
    <PageLayout title="IQ Tests and IQ" subtitle="The Science of Intelligence Testing">
      <div className="space-y-8">
        {/* History Section */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">A Brief History of IQ Testing</h2>
          <p className="text-gray-300 mb-4">
            The concept of measuring intelligence dates back to the early 1900s when French psychologist Alfred Binet developed the first practical intelligence test. Originally designed to identify students who needed educational assistance, this test laid the foundation for modern IQ testing.
          </p>
          <p className="text-gray-300 mb-4">
            In 1912, German psychologist William Stern introduced the term &quot;Intelligence Quotient&quot; (IQ), which was calculated by dividing mental age by chronological age and multiplying by 100. This formula has since evolved into more sophisticated scoring methods.
          </p>
          <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
            <h3 className="text-white font-semibold mb-3">Key Milestones</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <span className="text-purple-400 font-bold">1905</span>
                <span>Binet-Simon Scale introduced</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-purple-400 font-bold">1916</span>
                <span>Stanford-Binet Intelligence Test developed</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-purple-400 font-bold">1939</span>
                <span>Wechsler Adult Intelligence Scale (WAIS) created</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-purple-400 font-bold">1946</span>
                <span>Mensa founded for high-IQ individuals</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-purple-400 font-bold">Today</span>
                <span>Online IQ testing becomes widely accessible</span>
              </div>
            </div>
          </div>
        </section>

        {/* Types of IQ Tests */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Types of IQ Tests</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                name: 'Stanford-Binet',
                description: 'Measures five cognitive abilities: fluid reasoning, knowledge, quantitative reasoning, visual-spatial processing, and working memory.',
                usage: 'Clinical & Educational',
              },
              {
                name: 'Wechsler Scales',
                description: 'Includes WAIS (adults), WISC (children), and WPPSI (preschool). Measures verbal comprehension, perceptual reasoning, working memory, and processing speed.',
                usage: 'Clinical & Educational',
              },
              {
                name: "Raven's Progressive Matrices",
                description: 'Non-verbal test using visual patterns. Considered culture-fair as it minimizes language and cultural bias.',
                usage: 'Research & Selection',
              },
              {
                name: 'Cattell Culture Fair',
                description: 'Designed to measure fluid intelligence independent of cultural or educational background.',
                usage: 'Research & Mensa',
              },
            ].map((test, index) => (
              <div key={index} className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
                <h3 className="text-white font-semibold mb-2">{test.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{test.description}</p>
                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                  {test.usage}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* What IQ Measures */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">What Does IQ Actually Measure?</h2>
          <p className="text-gray-300 mb-4">
            IQ tests are designed to measure cognitive abilities, not knowledge or education level. Modern theories distinguish between different types of intelligence:
          </p>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-5">
              <h3 className="text-blue-300 font-semibold mb-2">Fluid Intelligence (Gf)</h3>
              <p className="text-gray-300 text-sm">
                The ability to solve novel problems, think abstractly, and adapt to new situations without relying on prior knowledge. This type of intelligence tends to peak in early adulthood and gradually decline with age.
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-5">
              <h3 className="text-green-300 font-semibold mb-2">Crystallized Intelligence (Gc)</h3>
              <p className="text-gray-300 text-sm">
                The ability to use learned knowledge, skills, and experience. This type of intelligence typically increases throughout life as we accumulate more knowledge and expertise.
              </p>
            </div>
          </div>
        </section>

        {/* IQ Distribution */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">IQ Distribution in Population</h2>
          <p className="text-gray-300 mb-4">
            IQ scores follow a normal distribution (bell curve) with a mean of 100 and standard deviation of 15. This means:
          </p>
          <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-400">68%</div>
                <div className="text-gray-400 text-sm">Score 85-115</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400">95%</div>
                <div className="text-gray-400 text-sm">Score 70-130</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">2%</div>
                <div className="text-gray-400 text-sm">Score above 130</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">0.1%</div>
                <div className="text-gray-400 text-sm">Score above 145</div>
              </div>
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Limitations of IQ Tests</h2>
          <p className="text-gray-300 mb-4">
            While IQ tests are valuable tools, it&apos;s important to understand their limitations:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              IQ tests measure specific cognitive abilities, not overall &quot;intelligence&quot;
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              Emotional intelligence, creativity, and practical skills are not measured
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              Test performance can be affected by anxiety, fatigue, or motivation
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              Cultural bias may exist in some test formats
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              IQ scores can change over time and with training
            </li>
          </ul>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-2">Curious About Your IQ?</h2>
          <p className="text-gray-400 mb-6">Take our Mensa-style test and discover your cognitive abilities.</p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow"
          >
            Take the IQ Test
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
