import Link from 'next/link'
import PageLayout from '@/components/PageLayout'

export const metadata = {
  title: 'About BrainyAK - Our Mission',
  description: 'Learn about BrainyAK, our mission to make IQ testing accessible, and our commitment to cognitive assessment.',
}

export default function AboutPage() {
  const stats = [
    { value: '100K+', label: 'Tests Taken' },
    { value: '98%', label: 'User Satisfaction' },
    { value: '150+', label: 'Countries' },
    { value: '4.8/5', label: 'Average Rating' },
  ]

  const values = [
    {
      icon: '🎯',
      title: 'Accessibility',
      description: 'Making cognitive assessment available to everyone, regardless of location or background.',
    },
    {
      icon: '🔬',
      title: 'Scientific Rigor',
      description: 'Our tests are designed using established psychometric principles and research.',
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Your data is protected with industry-leading security measures.',
    },
    {
      icon: '✨',
      title: 'User Experience',
      description: 'Beautiful, engaging interfaces that make testing enjoyable.',
    },
  ]

  const team = [
    { role: 'Cognitive Psychology', description: 'Experts in psychological assessment and test development' },
    { role: 'Data Science', description: 'Specialists in statistical analysis and scoring algorithms' },
    { role: 'UX Design', description: 'Designers focused on creating intuitive experiences' },
    { role: 'Engineering', description: 'Developers building secure, scalable platforms' },
  ]

  return (
    <PageLayout title="About BrainyAK" subtitle="Making cognitive assessment accessible to everyone">
      <div className="space-y-8">
        {/* Mission Statement */}
        <section className="text-center">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            At BrainyAK, we believe everyone deserves to understand their cognitive potential. Our mission is to provide accessible, engaging, and scientifically-grounded IQ testing that empowers individuals to discover and develop their mental capabilities.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-800/30 rounded-xl p-5 text-center border border-slate-700/50">
              <div className="text-3xl font-bold text-gradient from-purple-400 to-pink-400">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Our Story */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Our Story</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              BrainyAK was founded with a simple yet powerful idea: IQ testing should be accessible to everyone, not just those who can afford expensive clinical assessments or have access to specialized testing centers.
            </p>
            <p>
              We assembled a team of cognitive psychologists, data scientists, and designers to create an IQ test that combines scientific validity with an engaging user experience. Our visual pattern recognition tests are inspired by established assessments used by Mensa International and clinical psychologists worldwide.
            </p>
            <p>
              Today, we&apos;re proud to have helped over 100,000 people from more than 150 countries discover their cognitive abilities and gain insights into their mental strengths.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <div key={index} className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{value.icon}</span>
                  <h3 className="text-white font-semibold">{value.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Team */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Our Team</h2>
          <p className="text-gray-300 mb-4">
            BrainyAK is built by a diverse team of experts dedicated to cognitive assessment and user experience:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {team.map((member, index) => (
              <div key={index} className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                <h3 className="text-white font-semibold">{member.role}</h3>
                <p className="text-gray-400 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scientific Approach */}
        <section className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Our Scientific Approach</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              Our tests are designed following established psychometric principles:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Questions based on fluid intelligence research
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Scoring algorithms calibrated against population norms
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Culture-fair visual pattern recognition format
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Regular updates based on ongoing research
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-2">Ready to Discover Your IQ?</h2>
          <p className="text-gray-400 mb-6">Join thousands who have already taken our test.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow"
            >
              Take the IQ Test
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-slate-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-slate-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
