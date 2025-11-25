import Link from 'next/link'
import PageLayout from '@/components/PageLayout'

export const metadata = {
  title: 'IQ Scores and IQ Levels - BrainyAK',
  description: 'Understand IQ score ranges, classifications, and what different IQ levels mean.',
}

export default function IQScoresPage() {
  const iqRanges = [
    { range: '145+', label: 'Genius or Near-Genius', percentile: 'Top 0.1%', color: 'from-yellow-400 to-amber-500', description: 'Exceptional cognitive abilities. Capable of highly complex thinking and problem-solving.' },
    { range: '130-144', label: 'Very Superior', percentile: 'Top 2%', color: 'from-purple-400 to-violet-500', description: 'Highly gifted intellectual capacity. Qualifies for Mensa membership (130+).' },
    { range: '120-129', label: 'Superior', percentile: 'Top 9%', color: 'from-blue-400 to-indigo-500', description: 'Above-average intelligence. Strong analytical and problem-solving skills.' },
    { range: '110-119', label: 'High Average', percentile: 'Top 25%', color: 'from-green-400 to-emerald-500', description: 'Above the norm with good cognitive capabilities.' },
    { range: '90-109', label: 'Average', percentile: 'Middle 50%', color: 'from-cyan-400 to-blue-500', description: 'Normal intelligence range where most people fall.' },
    { range: '80-89', label: 'Low Average', percentile: 'Bottom 25%', color: 'from-orange-400 to-amber-500', description: 'Below average but within normal functioning range.' },
    { range: '70-79', label: 'Borderline', percentile: 'Bottom 9%', color: 'from-red-400 to-orange-500', description: 'May face some challenges with complex cognitive tasks.' },
    { range: 'Below 70', label: 'Below Average', percentile: 'Bottom 2%', color: 'from-red-500 to-red-600', description: 'May benefit from additional support and resources.' },
  ]

  const famousIQs = [
    { name: 'Albert Einstein', iq: '160-190 (estimated)', field: 'Physics' },
    { name: 'Stephen Hawking', iq: '160', field: 'Theoretical Physics' },
    { name: 'Leonardo da Vinci', iq: '180-190 (estimated)', field: 'Polymath' },
    { name: 'Marilyn vos Savant', iq: '228', field: 'Author, Columnist' },
    { name: 'Terence Tao', iq: '225-230', field: 'Mathematics' },
    { name: 'Garry Kasparov', iq: '190', field: 'Chess' },
  ]

  return (
    <PageLayout title="IQ Scores and IQ Levels" subtitle="Understanding What Your IQ Score Means">
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-gray-300">
            IQ scores are standardized to have a mean of 100 and a standard deviation of 15. This means that about 68% of the population scores between 85 and 115, and about 95% scores between 70 and 130.
          </p>
        </section>

        {/* IQ Ranges Table */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">IQ Score Classifications</h2>
          <div className="space-y-3">
            {iqRanges.map((item, index) => (
              <div key={index} className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className={`w-20 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-sm">{item.range}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white font-semibold">{item.label}</h3>
                      <span className="text-xs bg-slate-700 text-gray-300 px-2 py-0.5 rounded-full">
                        {item.percentile}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bell Curve Visual */}
        <section className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-semibold text-white mb-4">IQ Distribution (Bell Curve)</h2>
          <div className="relative h-40 mb-4">
            {/* Simplified Bell Curve Visualization */}
            <svg viewBox="0 0 400 120" className="w-full h-full">
              {/* Bell curve path */}
              <path
                d="M 20 100 Q 50 100, 80 95 Q 120 85, 150 60 Q 180 30, 200 20 Q 220 30, 250 60 Q 280 85, 320 95 Q 350 100, 380 100"
                fill="none"
                stroke="url(#curveGradient)"
                strokeWidth="3"
              />
              {/* Fill under curve */}
              <path
                d="M 20 100 Q 50 100, 80 95 Q 120 85, 150 60 Q 180 30, 200 20 Q 220 30, 250 60 Q 280 85, 320 95 Q 350 100, 380 100 L 380 120 L 20 120 Z"
                fill="url(#fillGradient)"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="fillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              {/* Labels */}
              <text x="50" y="115" fill="#64748b" fontSize="10" textAnchor="middle">70</text>
              <text x="110" y="115" fill="#64748b" fontSize="10" textAnchor="middle">85</text>
              <text x="200" y="115" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">100</text>
              <text x="290" y="115" fill="#64748b" fontSize="10" textAnchor="middle">115</text>
              <text x="350" y="115" fill="#64748b" fontSize="10" textAnchor="middle">130</text>
            </svg>
          </div>
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <div className="text-center">
              <div className="text-white font-bold">68%</div>
              <div>85-115</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold">95%</div>
              <div>70-130</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold">99.7%</div>
              <div>55-145</div>
            </div>
          </div>
        </section>

        {/* What Your Score Means */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">What Your IQ Score Means</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
              <h3 className="text-green-300 font-semibold mb-2">IQ Is...</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• A measure of cognitive processing ability</li>
                <li>• Correlated with academic performance</li>
                <li>• Relatively stable over time</li>
                <li>• One aspect of overall intelligence</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <h3 className="text-red-300 font-semibold mb-2">IQ Is Not...</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• A measure of your worth as a person</li>
                <li>• The only predictor of success</li>
                <li>• Fixed and unchangeable</li>
                <li>• A measure of emotional intelligence</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Famous IQs */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Notable High-IQ Individuals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {famousIQs.map((person, index) => (
              <div key={index} className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                <h3 className="text-white font-semibold">{person.name}</h3>
                <div className="text-purple-400 text-sm">IQ: {person.iq}</div>
                <div className="text-gray-500 text-xs">{person.field}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-4 text-center">
            Note: Historical IQ estimates are based on analysis of achievements and writings.
          </p>
        </section>

        {/* Mensa */}
        <section className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-3">Mensa Qualification</h2>
          <p className="text-gray-300 mb-4">
            Mensa International, the largest and oldest high-IQ society, accepts individuals who score in the top 2% on a standardized intelligence test. This typically means an IQ score of 130 or higher on most standard tests.
          </p>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-gradient from-purple-400 to-pink-400">130+</div>
            <div className="text-gray-400">
              <div className="font-medium text-white">Required IQ Score</div>
              <div className="text-sm">Top 2% of population</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-2">Find Out Your IQ Score</h2>
          <p className="text-gray-400 mb-6">Take our scientifically designed test and discover where you rank.</p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow"
          >
            Take the IQ Test - $1.99
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
