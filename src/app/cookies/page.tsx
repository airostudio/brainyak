import PageLayout from '@/components/PageLayout'

export const metadata = {
  title: 'Cookie Policy - BrainyAK',
  description: 'Learn about how BrainyAK uses cookies and similar technologies.',
}

export default function CookiesPage() {
  return (
    <PageLayout title="Cookie Policy" subtitle="Last updated: November 2024">
      <div className="prose prose-invert prose-purple max-w-none">
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Cookies</h2>
            <p>BrainyAK uses cookies for the following purposes:</p>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
            </p>
            <div className="bg-slate-800/30 rounded-lg p-4 mt-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400">
                    <th className="pb-2">Cookie Name</th>
                    <th className="pb-2">Purpose</th>
                    <th className="pb-2">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr>
                    <td className="py-1">session_id</td>
                    <td className="py-1">Maintains user session</td>
                    <td className="py-1">Session</td>
                  </tr>
                  <tr>
                    <td className="py-1">csrf_token</td>
                    <td className="py-1">Security protection</td>
                    <td className="py-1">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">Functional Cookies</h3>
            <p>
              These cookies enable enhanced functionality and personalization, such as remembering your preferences and test progress.
            </p>
            <div className="bg-slate-800/30 rounded-lg p-4 mt-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400">
                    <th className="pb-2">Cookie Name</th>
                    <th className="pb-2">Purpose</th>
                    <th className="pb-2">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr>
                    <td className="py-1">user_preferences</td>
                    <td className="py-1">Stores user settings</td>
                    <td className="py-1">1 year</td>
                  </tr>
                  <tr>
                    <td className="py-1">test_progress</td>
                    <td className="py-1">Saves test progress</td>
                    <td className="py-1">7 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
            </p>
            <div className="bg-slate-800/30 rounded-lg p-4 mt-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400">
                    <th className="pb-2">Cookie Name</th>
                    <th className="pb-2">Purpose</th>
                    <th className="pb-2">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr>
                    <td className="py-1">_ga</td>
                    <td className="py-1">Google Analytics</td>
                    <td className="py-1">2 years</td>
                  </tr>
                  <tr>
                    <td className="py-1">_gid</td>
                    <td className="py-1">Google Analytics</td>
                    <td className="py-1">24 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Third-Party Cookies</h2>
            <p>
              We use services from third parties that may also set cookies on your device:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Stripe:</strong> For secure payment processing</li>
              <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Managing Cookies</h2>
            <p>
              You can control and manage cookies in several ways:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or accept cookies through their settings</li>
              <li><strong>Third-Party Tools:</strong> You can opt out of Google Analytics using the Google Analytics Opt-out Browser Add-on</li>
            </ul>
            <p className="mt-2">
              Please note that disabling certain cookies may affect the functionality of our website and prevent you from using some features.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Browser-Specific Instructions</h2>
            <p>To manage cookies in your browser:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us at:
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
