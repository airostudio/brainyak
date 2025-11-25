import PageLayout from '@/components/PageLayout'

export const metadata = {
  title: 'Privacy Policy - BrainyAK',
  description: 'Learn how BrainyAK collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <PageLayout title="Privacy Policy" subtitle="Last updated: November 2024">
      <div className="prose prose-invert prose-purple max-w-none">
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              BrainyAK (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our IQ testing services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <h3 className="text-lg font-medium text-white mt-4 mb-2">Personal Information</h3>
            <p>When you use our services, we may collect:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Payment information (processed securely by Stripe)</li>
            </ul>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">Test Data</h3>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Test responses and answers</li>
              <li>Time spent on each question</li>
              <li>IQ scores and cognitive analysis results</li>
            </ul>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">Automatically Collected Information</h3>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Provide and deliver our IQ testing services</li>
              <li>Process payments and send transaction confirmations</li>
              <li>Send test results and cognitive analysis reports</li>
              <li>Communicate about services, offers, and updates</li>
              <li>Improve our services and develop new features</li>
              <li>Analyze usage patterns and optimize user experience</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Information Sharing</h2>
            <p>We do not sell your personal information. We may share information with:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Service Providers:</strong> Third parties that help us operate our services (e.g., Stripe for payments, email providers)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>256-bit SSL encryption for data transmission</li>
              <li>Secure payment processing through Stripe</li>
              <li>Regular security assessments and updates</li>
              <li>Limited access to personal data on a need-to-know basis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and fulfill the purposes described in this policy. Test results and cognitive analysis data may be retained to allow you to access your historical results.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, please contact us at <a href="mailto:privacy@brainyak.com" className="text-purple-400 hover:text-purple-300">privacy@brainyak.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Children&apos;s Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. International Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              Email: <a href="mailto:privacy@brainyak.com" className="text-purple-400 hover:text-purple-300">privacy@brainyak.com</a>
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
