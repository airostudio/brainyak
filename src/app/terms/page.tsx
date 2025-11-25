import PageLayout from '@/components/PageLayout'

export const metadata = {
  title: 'Terms and Conditions - BrainyAK',
  description: 'Read our terms and conditions for using the BrainyAK IQ test platform.',
}

export default function TermsPage() {
  return (
    <PageLayout title="Terms and Conditions" subtitle="Last updated: November 2024">
      <div className="prose prose-invert prose-purple max-w-none">
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the BrainyAK website and IQ testing services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Services</h2>
            <p>
              BrainyAK provides online cognitive assessment tests, including IQ tests based on pattern recognition, logical reasoning, and spatial awareness. Our services include:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Online IQ testing assessments</li>
              <li>Personalized results and cognitive analysis</li>
              <li>Email delivery of test results</li>
              <li>Additional cognitive test offerings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. User Registration</h2>
            <p>
              To use our services, you must provide accurate and complete registration information including your name, email address, and phone number. You are responsible for maintaining the confidentiality of your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Payment Terms</h2>
            <p>
              Our IQ test results are available for a one-time fee of $1.99 USD. Payment is processed securely through Stripe. All payments are non-refundable once results have been delivered.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Test Results Disclaimer</h2>
            <p>
              The IQ scores and cognitive assessments provided by BrainyAK are for entertainment and self-assessment purposes only. They should not be considered as clinical or professional psychological evaluations. For official IQ testing, please consult a licensed psychologist or certified testing center.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Intellectual Property</h2>
            <p>
              All content on the BrainyAK website, including test questions, graphics, logos, and software, is the property of BrainyAK and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Share test questions or answers with others</li>
              <li>Use automated systems to take tests</li>
              <li>Attempt to manipulate or cheat on assessments</li>
              <li>Use the service for any unlawful purpose</li>
              <li>Interfere with the proper functioning of the website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Limitation of Liability</h2>
            <p>
              BrainyAK shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid for the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Privacy</h2>
            <p>
              Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Modifications</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the service constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which BrainyAK operates, without regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">12. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <p className="mt-2">
              Email: <a href="mailto:legal@brainyak.com" className="text-purple-400 hover:text-purple-300">legal@brainyak.com</a>
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
