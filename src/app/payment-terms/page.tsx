import PageLayout from '@/components/PageLayout'

export const metadata = {
  title: 'Payment Terms - BrainyAK',
  description: 'Understand our payment terms, pricing, and refund policy.',
}

export default function PaymentTermsPage() {
  return (
    <PageLayout title="Payment Terms" subtitle="Last updated: November 2024">
      <div className="prose prose-invert prose-purple max-w-none">
        <div className="space-y-6 text-gray-300">
          {/* Pricing Box */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">IQ Test Results</h3>
                <p className="text-gray-400 text-sm">One-time payment for full access to your results</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gradient from-purple-400 to-pink-400">$1.99</div>
                <div className="text-gray-500 text-sm">USD</div>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Pricing</h2>
            <p>
              BrainyAK offers IQ test results for a one-time fee of $1.99 USD. This price includes:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Your calculated IQ score</li>
              <li>Detailed cognitive analysis</li>
              <li>Percentile ranking comparison</li>
              <li>Personalized insights and recommendations</li>
              <li>Email delivery of your results</li>
            </ul>
            <p className="mt-2">
              Prices are subject to change. Any price changes will be clearly displayed before purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Payment Methods</h2>
            <p>We accept the following payment methods through our secure payment processor, Stripe:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Credit cards (Visa, Mastercard, American Express, Discover)</li>
              <li>Debit cards</li>
              <li>Apple Pay</li>
              <li>Google Pay</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Payment Processing</h2>
            <p>
              All payments are processed securely through Stripe, a PCI-DSS Level 1 certified payment processor. We do not store your full credit card information on our servers. Your payment information is encrypted using 256-bit SSL encryption.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Billing</h2>
            <p>
              When you make a purchase, you will be charged immediately. A receipt will be sent to your registered email address. The charge will appear on your statement as &quot;BRAINYAK&quot; or &quot;BRAINYAK IQ TEST&quot;.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Refund Policy</h2>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-yellow-200 text-sm">
                  <strong>Important:</strong> Once IQ test results have been delivered (displayed on screen or sent via email), the payment is non-refundable.
                </p>
              </div>
            </div>
            <p>
              We offer refunds only in the following circumstances:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Technical issues that prevented you from completing the test</li>
              <li>Duplicate charges due to system errors</li>
              <li>Unauthorized transactions (subject to verification)</li>
            </ul>
            <p className="mt-2">
              To request a refund, please contact our support team within 7 days of purchase at <a href="mailto:support@brainyak.com" className="text-purple-400 hover:text-purple-300">support@brainyak.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Currency</h2>
            <p>
              All prices are displayed and charged in US Dollars (USD). If you are paying from a different currency, your bank or card issuer may apply currency conversion fees.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Taxes</h2>
            <p>
              Prices displayed may not include applicable taxes. Depending on your location, sales tax, VAT, or other taxes may be added to your purchase. You are responsible for any applicable taxes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Failed Payments</h2>
            <p>
              If your payment fails, you will be notified immediately and given the opportunity to try again or use a different payment method. Your test results will only be released upon successful payment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Promotional Offers</h2>
            <p>
              From time to time, we may offer promotional discounts or special pricing. These offers:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Cannot be combined with other offers unless stated</li>
              <li>May have expiration dates or usage limits</li>
              <li>Are subject to specific terms and conditions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Contact Us</h2>
            <p>
              For billing questions or payment-related issues, please contact us at:
            </p>
            <p className="mt-2">
              Email: <a href="mailto:billing@brainyak.com" className="text-purple-400 hover:text-purple-300">billing@brainyak.com</a>
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
