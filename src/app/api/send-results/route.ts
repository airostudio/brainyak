import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { testOffers, INDIVIDUAL_TOTAL_PRICE, BUNDLE_TOTAL_PRICE, BUNDLE_SAVINGS_PERCENT } from '@/data/testOffers'

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

// Calculate IQ from score (same logic as frontend)
const calculateIQ = (score: number) => {
  const totalQuestions = 15
  const percentage = (score / totalQuestions) * 100

  if (percentage >= 95) return 145 + Math.floor(Math.random() * 10)
  if (percentage >= 90) return 135 + Math.floor(Math.random() * 10)
  if (percentage >= 80) return 120 + Math.floor(Math.random() * 15)
  if (percentage >= 65) return 110 + Math.floor(Math.random() * 10)
  if (percentage >= 50) return 100 + Math.floor(Math.random() * 10)
  if (percentage >= 35) return 90 + Math.floor(Math.random() * 10)
  if (percentage >= 20) return 80 + Math.floor(Math.random() * 10)
  return 70 + Math.floor(Math.random() * 10)
}

const getIQCategory = (iq: number) => {
  if (iq >= 140) return { label: 'Genius', description: 'You possess exceptional cognitive abilities!' }
  if (iq >= 130) return { label: 'Very Superior', description: 'Your intelligence is significantly above average.' }
  if (iq >= 120) return { label: 'Superior', description: 'You have above-average cognitive abilities.' }
  if (iq >= 110) return { label: 'High Average', description: 'Your intelligence is above the general population.' }
  if (iq >= 90) return { label: 'Average', description: 'You have typical cognitive abilities.' }
  if (iq >= 80) return { label: 'Low Average', description: 'There is room for cognitive improvement.' }
  return { label: 'Below Average', description: 'Consider exercises to boost cognitive function.' }
}

const getPercentile = (iq: number) => {
  if (iq >= 145) return 99.9
  if (iq >= 135) return 99
  if (iq >= 130) return 98
  if (iq >= 125) return 95
  if (iq >= 120) return 91
  if (iq >= 115) return 84
  if (iq >= 110) return 75
  if (iq >= 105) return 63
  if (iq >= 100) return 50
  if (iq >= 95) return 37
  if (iq >= 90) return 25
  if (iq >= 85) return 16
  return 10
}

export async function POST(request: Request) {
  try {
    const { email, name, score, bundle = false, unlockedTest } = await request.json()

    if (!email || !name || score === undefined) {
      return NextResponse.json(
        { error: 'Email, name, and score are required' },
        { status: 400 }
      )
    }

    // Optional confirmation banner when the user unlocks extra tests.
    const unlockBannerHtml = bundle
      ? `<div style="background: linear-gradient(90deg, rgba(34,197,94,0.15), rgba(16,185,129,0.15)); border: 1px solid rgba(34,197,94,0.4); border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: center;">
          <div style="font-size: 28px;">🎉</div>
          <h3 style="margin: 8px 0 4px 0; color: #22c55e; font-size: 18px;">Ultimate Package Unlocked</h3>
          <p style="margin: 0; color: #cbd5e1; font-size: 14px;">All 20 tests are now unlocked on your account. Sign in to view your results for every one.</p>
        </div>`
      : unlockedTest
      ? `<div style="background: rgba(34,197,94,0.12); border: 1px solid rgba(34,197,94,0.4); border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: center;">
          <p style="margin: 0; color: #22c55e; font-size: 14px;">✅ You unlocked <strong>${unlockedTest}</strong>. Your results are ready in the app.</p>
        </div>`
      : ''

    const iq = calculateIQ(score)
    const category = getIQCategory(iq)
    const percentile = getPercentile(iq)
    const accuracy = Math.round((score / 15) * 100)

    // Generate test offers HTML
    const offersHtml = testOffers.slice(0, 10).map(offer => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #334155;">
          <div style="display: flex; align-items: center;">
            <span style="font-size: 24px; margin-right: 12px;">${offer.icon}</span>
            <div>
              <div style="font-weight: 600; color: #ffffff;">${offer.name}</div>
              <div style="font-size: 12px; color: #94a3b8;">${offer.description}</div>
            </div>
          </div>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #334155; text-align: right;">
          <span style="text-decoration: line-through; color: #64748b; font-size: 12px;">$${offer.originalPrice}</span>
          <span style="color: #22c55e; font-weight: bold; margin-left: 8px;">$${offer.price}</span>
        </td>
      </tr>
    `).join('')

    // Create beautiful HTML email
    const htmlEmail = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your IQ Test Results - BrainyAK</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse;">

              <!-- Header -->
              <tr>
                <td style="text-align: center; padding-bottom: 30px;">
                  <h1 style="margin: 0; font-size: 36px; background: linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    BrainyAK
                  </h1>
                  <p style="margin: 10px 0 0 0; color: #94a3b8; font-size: 14px;">Your IQ Test Results</p>
                </td>
              </tr>

              <!-- Main Card -->
              <tr>
                <td style="background: linear-gradient(180deg, #1e293b 0%, #334155 100%); border-radius: 16px; padding: 40px; border: 1px solid #475569;">

                  <!-- Greeting -->
                  <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 24px; text-align: center;">
                    Congratulations, ${name}! 🎉
                  </h2>

                  ${unlockBannerHtml}

                  <!-- IQ Score -->
                  <div style="text-align: center; margin-bottom: 30px;">
                    <p style="margin: 0; color: #94a3b8; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your IQ Score</p>
                    <div style="font-size: 72px; font-weight: bold; background: linear-gradient(90deg, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 10px 0;">
                      ${iq}
                    </div>
                    <span style="display: inline-block; background: linear-gradient(90deg, #8b5cf6, #ec4899); color: white; padding: 8px 20px; border-radius: 20px; font-weight: 600;">
                      ${category.label}
                    </span>
                  </div>

                  <!-- Stats Grid -->
                  <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                    <tr>
                      <td style="width: 50%; padding: 10px;">
                        <div style="background: #1e293b; border-radius: 12px; padding: 20px; text-align: center;">
                          <div style="font-size: 32px; font-weight: bold; color: #a855f7;">${score}/15</div>
                          <div style="font-size: 12px; color: #94a3b8;">Correct Answers</div>
                        </div>
                      </td>
                      <td style="width: 50%; padding: 10px;">
                        <div style="background: #1e293b; border-radius: 12px; padding: 20px; text-align: center;">
                          <div style="font-size: 32px; font-weight: bold; color: #ec4899;">${accuracy}%</div>
                          <div style="font-size: 12px; color: #94a3b8;">Accuracy</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 50%; padding: 10px;">
                        <div style="background: #1e293b; border-radius: 12px; padding: 20px; text-align: center;">
                          <div style="font-size: 32px; font-weight: bold; color: #3b82f6;">Top ${100 - percentile}%</div>
                          <div style="font-size: 12px; color: #94a3b8;">Percentile</div>
                        </div>
                      </td>
                      <td style="width: 50%; padding: 10px;">
                        <div style="background: #1e293b; border-radius: 12px; padding: 20px; text-align: center;">
                          <div style="font-size: 32px; font-weight: bold; color: #22c55e;">${percentile}%</div>
                          <div style="font-size: 12px; color: #94a3b8;">Population Rank</div>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <!-- Analysis -->
                  <div style="background: #1e293b; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                    <h3 style="margin: 0 0 15px 0; color: #ffffff; font-size: 18px;">📊 Your Cognitive Analysis</h3>
                    <p style="margin: 0; color: #cbd5e1; line-height: 1.6;">
                      ${category.description} Your IQ of ${iq} places you in the top ${100 - percentile}% of the population.
                      ${iq >= 120 ? 'You demonstrate exceptional pattern recognition and logical reasoning abilities.' :
                        iq >= 100 ? 'You show solid cognitive abilities with room for growth in specific areas.' :
                        'Consider brain-training exercises to enhance your cognitive performance.'}
                    </p>
                  </div>

                  <!-- Strengths -->
                  <div style="background: linear-gradient(90deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1)); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                    <h3 style="margin: 0 0 15px 0; color: #22c55e; font-size: 18px;">✨ Your Strengths</h3>
                    <ul style="margin: 0; padding-left: 20px; color: #cbd5e1;">
                      <li style="margin-bottom: 8px;">${iq >= 110 ? 'Excellent pattern recognition abilities' : 'Good foundational reasoning skills'}</li>
                      <li style="margin-bottom: 8px;">${score >= 10 ? 'Strong visual-spatial processing' : 'Developing visual processing skills'}</li>
                      <li style="margin-bottom: 8px;">${accuracy >= 60 ? 'Above-average logical deduction' : 'Steady logical thinking'}</li>
                    </ul>
                  </div>

                </td>
              </tr>

              <!-- Exclusive Offers Section -->
              <tr>
                <td style="padding-top: 30px;">
                  <div style="background: linear-gradient(180deg, #1e293b 0%, #334155 100%); border-radius: 16px; padding: 30px; border: 1px solid #475569;">
                    <h2 style="margin: 0 0 10px 0; color: #ffffff; font-size: 24px; text-align: center;">
                      🎁 Exclusive Test Offers
                    </h2>
                    <p style="margin: 0 0 20px 0; color: #94a3b8; text-align: center; font-size: 14px;">
                      Discover more about your cognitive abilities!
                    </p>

                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      ${offersHtml}
                    </table>

                    <!-- Bundle Offer -->
                    ${bundle ? '' : `<div style="background: linear-gradient(90deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2)); border: 2px solid #8b5cf6; border-radius: 12px; padding: 20px; margin-top: 20px; text-align: center;">
                      <h3 style="margin: 0 0 10px 0; color: #ffffff; font-size: 20px;">
                        🚀 Ultimate Package
                      </h3>
                      <p style="margin: 0 0 15px 0; color: #cbd5e1;">Get all 20 tests for one amazing price!</p>
                      <div>
                        <span style="text-decoration: line-through; color: #64748b;">$${INDIVIDUAL_TOTAL_PRICE.toFixed(2)}</span>
                        <span style="font-size: 36px; font-weight: bold; color: #a855f7; margin: 0 10px;">$${BUNDLE_TOTAL_PRICE.toFixed(2)}</span>
                        <span style="color: #22c55e; font-weight: bold;">Save ${BUNDLE_SAVINGS_PERCENT}%!</span>
                      </div>
                    </div>`}

                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="text-align: center; padding: 30px 0;">
                  <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px;">
                    Thank you for taking the BrainyAK IQ Test!
                  </p>
                  <p style="margin: 0; color: #475569; font-size: 11px;">
                    © ${new Date().getFullYear()} BrainyAK. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `

    // Plain text version
    const textEmail = `
BrainyAK - Your IQ Test Results
================================

Congratulations, ${name}!

YOUR IQ SCORE: ${iq}
Category: ${category.label}

TEST STATISTICS:
- Correct Answers: ${score}/15
- Accuracy: ${accuracy}%
- Percentile: Top ${100 - percentile}%

COGNITIVE ANALYSIS:
${category.description} Your IQ of ${iq} places you in the top ${100 - percentile}% of the population.

EXCLUSIVE TEST OFFERS:
Check out our other cognitive assessments:
- Emotional Intelligence (EQ) - $1.99
- Memory & Recall Test - $1.99
- Logical Reasoning - $1.99
- And 17 more tests available!

BUNDLE DEAL: Get all 20 tests for just $${BUNDLE_TOTAL_PRICE.toFixed(2)} (Save ${BUNDLE_SAVINGS_PERCENT}%!)

Thank you for taking the BrainyAK IQ Test!

© ${new Date().getFullYear()} BrainyAK. All rights reserved.
    `

    // Try to send email
    try {
      const transporter = createTransporter()

      const subject = bundle
        ? `🎉 Ultimate Package unlocked — all 20 tests are yours, ${name}!`
        : unlockedTest
        ? `✅ ${unlockedTest} unlocked — your results are ready!`
        : `🧠 Your IQ Test Results - Score: ${iq} (${category.label})`

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"BrainyAK" <noreply@brainyak.com>',
        to: email,
        subject,
        text: textEmail,
        html: htmlEmail,
      })

      return NextResponse.json({
        success: true,
        message: 'Results sent successfully',
        iq,
        category: category.label,
      })
    } catch (emailError) {
      // If email fails, still return success (demo mode)
      console.error('Email sending failed:', emailError)
      return NextResponse.json({
        success: true,
        message: 'Results calculated (email service not configured)',
        iq,
        category: category.label,
        emailSent: false,
      })
    }
  } catch (error) {
    console.error('Error processing results:', error)
    return NextResponse.json(
      { error: 'Failed to process results' },
      { status: 500 }
    )
  }
}
