import Link from 'next/link'
import PageLayout from '@/components/PageLayout'

export const metadata = {
  title: 'For Business - BrainyAK',
  description: 'Cognitive assessment solutions for teams and businesses. Bulk testing, corporate assessments, and enterprise solutions.',
}

export default function ForBusinessPage() {
  const features = [
    {
      icon: '💰',
      title: 'Discounted Bulk Rates',
      description: 'Pre-purchase tests at significantly reduced prices for your team or organization.',
    },
    {
      icon: '📧',
      title: 'Personalized Invites',
      description: 'Send branded test invitations to candidates or team members via email.',
    },
    {
      icon: '📊',
      title: 'Dashboard Management',
      description: 'View and manage all results from a centralized admin dashboard.',
    },
    {
      icon: '📈',
      title: 'Analytics & Reports',
      description: 'Generate comprehensive reports and analytics for hiring or development.',
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with advanced security features for enterprise clients.',
    },
    {
      icon: '🎯',
      title: 'Custom Assessments',
      description: 'Tailor tests to your specific industry or role requirements.',
    },
  ]

  const useCases = [
    {
      title: 'Recruitment & Hiring',
      description: 'Screen candidates efficiently with standardized cognitive assessments to identify top talent.',
      icon: '👥',
    },
    {
      title: 'Team Development',
      description: 'Understand your team\'s cognitive strengths and build more effective working groups.',
      icon: '🚀',
    },
    {
      title: 'Educational Institutions',
      description: 'Assess student capabilities and identify those who may benefit from gifted programs.',
      icon: '🎓',
    },
    {
      title: 'Research Projects',
      description: 'Conduct cognitive research with standardized, reliable assessment tools.',
      icon: '🔬',
    },
  ]

  const pricingTiers = [
    {
      name: 'Starter',
      tests: '10-49 tests',
      price: '$1.49',
      savings: '25% savings',
      features: ['Admin dashboard', 'Email invitations', 'Basic reporting'],
    },
    {
      name: 'Professional',
      tests: '50-199 tests',
      price: '$1.19',
      savings: '40% savings',
      features: ['Everything in Starter', 'Advanced analytics', 'Priority support', 'Custom branding'],
      popular: true,
    },
    {
      name: 'Enterprise',
      tests: '200+ tests',
      price: 'Custom',
      savings: 'Volume pricing',
      features: ['Everything in Professional', 'Dedicated account manager', 'API access', 'SSO integration', 'Custom assessments'],
    },
  ]

  return (
    <PageLayout title="Testing for Teams" subtitle="Easily administer cognitive assessments to multiple individuals or teams">
      <div className="space-y-10">
        {/* Hero Section */}
        <section className="text-center">
          <p className="text-gray-300 max-w-2xl mx-auto">
            BrainyAK Business provides organizations with powerful tools to assess cognitive abilities at scale. Whether you&apos;re hiring, developing talent, or conducting research, our platform delivers reliable insights.
          </p>
        </section>

        {/* Features Grid */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Through a Business Account, you can:</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 hover:border-purple-500/50 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-xl p-5 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{useCase.icon}</span>
                  <h3 className="text-white font-semibold">{useCase.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Tiers */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4 text-center">Volume Pricing</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 border ${
                  tier.popular
                    ? 'bg-gradient-to-b from-purple-500/20 to-pink-500/20 border-purple-500/50'
                    : 'bg-slate-800/30 border-slate-700/50'
                }`}
              >
                {tier.popular && (
                  <div className="text-center mb-3">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-white font-bold text-xl text-center">{tier.name}</h3>
                <p className="text-gray-400 text-sm text-center mb-4">{tier.tests}</p>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-gradient from-purple-400 to-pink-400">{tier.price}</span>
                  <span className="text-gray-400 text-sm"> /test</span>
                  <div className="text-green-400 text-sm font-medium">{tier.savings}</div>
                </div>
                <ul className="space-y-2">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                      <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-semibold text-white mb-4">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: 1, title: 'Create Account', desc: 'Sign up for a business account' },
              { step: 2, title: 'Purchase Tests', desc: 'Buy test credits in bulk' },
              { step: 3, title: 'Send Invitations', desc: 'Invite participants via email' },
              { step: 4, title: 'View Results', desc: 'Access results from dashboard' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trusted By */}
        <section className="text-center">
          <p className="text-gray-500 text-sm mb-4">Trusted by organizations worldwide</p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {[
              { name: 'Global Enterprises', icon: '🏢' },
              { name: 'Top Universities', icon: '🎓' },
              { name: 'Talent Agencies', icon: '👥' },
              { name: 'Tech Companies', icon: '💻' },
              { name: 'Healthcare Groups', icon: '🏥' },
              { name: 'Government Agencies', icon: '🏛️' },
            ].map((org, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-400">
                <span className="text-lg">{org.icon}</span>
                <span className="font-medium text-sm">{org.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-6">Contact us to discuss your organization&apos;s needs and get a custom quote.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow"
            >
              Request Business Account
            </Link>
            <a
              href="mailto:business@brainyak.com"
              className="inline-block bg-slate-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-slate-600 transition-colors"
            >
              Contact Sales
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            For any questions, please contact us at{' '}
            <a href="mailto:business@brainyak.com" className="text-purple-400 hover:text-purple-300">
              business@brainyak.com
            </a>
          </p>
        </section>
      </div>
    </PageLayout>
  )
}
