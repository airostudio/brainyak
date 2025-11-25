import Link from 'next/link'
import PageLayout from '@/components/PageLayout'

export const metadata = {
  title: 'Certified IQ Test - BrainyAK',
  description: 'Take our certified IQ test based on Mensa International standards. Get accurate cognitive assessment results.',
}

export default function CertifiedIQTestPage() {
  const features = [
    {
      icon: '🎯',
      title: 'Mensa-Style Questions',
      description: 'Pattern recognition, spatial reasoning, and logical deduction questions similar to official Mensa tests.',
    },
    {
      icon: '🔬',
      title: 'Scientifically Designed',
      description: 'Our test methodology is based on established psychometric principles and cognitive assessment standards.',
    },
    {
      icon: '⏱️',
      title: 'Timed Assessment',
      description: 'Each question has a specific time limit, measuring both accuracy and processing speed.',
    },
    {
      icon: '📊',
      title: 'Detailed Analysis',
      description: 'Receive a comprehensive breakdown of your cognitive strengths and areas for improvement.',
    },
    {
      icon: '🌍',
      title: 'Global Comparison',
      description: 'See how your IQ compares to the general population with percentile rankings.',
    },
    {
      icon: '📧',
      title: 'Instant Results',
      description: 'Get your IQ score and analysis immediately after payment, plus email delivery.',
    },
  ]

  return (
    <PageLayout title="Certified IQ Test" subtitle="Discover your cognitive potential with our scientifically designed assessment">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-4 py-1 rounded-full text-sm font-medium">
              Based on Mensa International Standards
            </span>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our IQ test is designed to provide an accurate assessment of your cognitive abilities using the same types of questions found in professional intelligence tests.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Test Overview */}
        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-semibold text-white mb-4">Test Overview</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-1">15</div>
              <div className="text-gray-400 text-sm">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-1">10-15</div>
              <div className="text-gray-400 text-sm">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-1">$1.99</div>
              <div className="text-gray-400 text-sm">One-Time Fee</div>
            </div>
          </div>
        </div>

        {/* Question Types */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Question Types</h2>
          <div className="space-y-3">
            {[
              { name: 'Pattern Recognition', description: 'Identify patterns and complete sequences', difficulty: 'Mixed' },
              { name: 'Spatial Reasoning', description: 'Rotate, mirror, and manipulate shapes mentally', difficulty: 'Medium-Hard' },
              { name: 'Logical Sequences', description: 'Determine the next element in a logical series', difficulty: 'Easy-Medium' },
              { name: 'Visual Analogies', description: 'Find relationships between shapes and figures', difficulty: 'Hard' },
              { name: 'Matrix Problems', description: 'Complete 3x3 grids based on row/column patterns', difficulty: 'Hard' },
            ].map((type, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                <div>
                  <h3 className="text-white font-medium">{type.name}</h3>
                  <p className="text-gray-400 text-sm">{type.description}</p>
                </div>
                <span className="text-xs bg-slate-700 text-gray-300 px-3 py-1 rounded-full">
                  {type.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* IQ Scale */}
        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-semibold text-white mb-4">IQ Score Classifications</h2>
          <div className="space-y-2">
            {[
              { range: '145+', label: 'Genius', color: 'bg-yellow-500', width: '100%' },
              { range: '130-144', label: 'Very Superior', color: 'bg-purple-500', width: '90%' },
              { range: '120-129', label: 'Superior', color: 'bg-blue-500', width: '80%' },
              { range: '110-119', label: 'High Average', color: 'bg-green-500', width: '70%' },
              { range: '90-109', label: 'Average', color: 'bg-cyan-500', width: '60%' },
              { range: '80-89', label: 'Low Average', color: 'bg-orange-500', width: '50%' },
              { range: 'Below 80', label: 'Below Average', color: 'bg-red-500', width: '40%' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-24 text-right text-gray-400 text-sm">{item.range}</div>
                <div className="flex-1 h-6 bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full flex items-center justify-end pr-3`} style={{ width: item.width }}>
                    <span className="text-white text-xs font-medium">{item.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Discover Your IQ?</h2>
          <p className="text-gray-400 mb-6">Join thousands who have already unlocked their cognitive potential.</p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow"
          >
            Take the IQ Test Now
          </Link>
          <p className="text-gray-500 text-sm mt-4">Only $1.99 • Instant Results • Email Delivery</p>
        </div>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            <strong>Disclaimer:</strong> This IQ test provides an estimate of cognitive ability for entertainment and self-assessment purposes.
            For official IQ certification, please consult a licensed psychologist or contact Mensa directly.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
