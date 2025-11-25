# BrainyAK - IQ Test Platform

A beautiful, engaging IQ test application built with Next.js, featuring Mensa-style visual pattern recognition questions, Stripe payment integration, and automated email results delivery.

## Features

- **15 Visual Pattern Recognition Questions** - Mensa-style puzzles with colorful SVG graphics
- **User Registration** - Collects name, email, and phone number
- **Timed Challenges** - Each question has a time limit for accurate IQ calculation
- **Stripe Payment Integration** - $1.99 one-time payment for results
- **Email Results** - Beautiful HTML email with IQ score, analysis, and cognitive insights
- **20 Additional Test Offers** - Exclusive offers for related cognitive assessments
- **Responsive Design** - Works beautifully on desktop and mobile
- **Animations** - Smooth transitions and engaging animations with Framer Motion

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Stripe** - Payment processing
- **Nodemailer** - Email delivery
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Confetti** - Celebration effects

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Stripe account
- SMTP email service (Gmail, SendGrid, etc.)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd brainyak
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file based on `.env.example`:
```bash
cp .env.example .env.local
```

4. Configure your environment variables:
```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM=noreply@brainyak.com

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Stripe Setup

### Create Product and Price

The app uses Stripe Product ID: `prod_TF7lYuAyy0AzZW`

1. Go to your Stripe Dashboard
2. Create a product for "IQ Test Results" at $1.99
3. Copy your API keys to `.env.local`

### Webhook Setup (Production)

1. In Stripe Dashboard, go to Developers > Webhooks
2. Add endpoint: `https://your-domain.com/api/webhook`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

## Project Structure

```
brainyak/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── create-payment-intent/  # Stripe payment creation
│   │   │   ├── send-results/           # Email results delivery
│   │   │   └── webhook/                # Stripe webhooks
│   │   ├── globals.css                 # Global styles
│   │   ├── layout.tsx                  # Root layout
│   │   └── page.tsx                    # Main page
│   ├── components/
│   │   ├── WelcomeScreen.tsx           # Landing page
│   │   ├── RegistrationForm.tsx        # User details form
│   │   ├── TestScreen.tsx              # IQ test interface
│   │   ├── PaymentScreen.tsx           # Stripe checkout
│   │   └── SuccessScreen.tsx           # Results & offers
│   ├── data/
│   │   ├── questions.ts                # 15 IQ test questions
│   │   └── testOffers.ts               # 20 additional test offers
│   └── store/
│       └── testStore.ts                # Zustand state management
├── .env.example                        # Environment template
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Question Types

The IQ test includes various Mensa-style question types:

1. **Pattern Completion** - Complete the missing element in a pattern
2. **Sequence** - Identify the next item in a sequence
3. **Spatial Reasoning** - Rotation and mirror patterns
4. **Matrix Problems** - Grid-based pattern recognition
5. **Logic Puzzles** - Shape counting and relationship problems
6. **Analogies** - Shape transformation relationships

## IQ Scoring

The IQ score is calculated based on:
- Number of correct answers
- Based on standard IQ distribution (mean=100, SD=15)

| Score Range | IQ Range | Category |
|------------|----------|----------|
| 95%+ | 145+ | Genius |
| 90-94% | 135-144 | Very Superior |
| 80-89% | 120-134 | Superior |
| 65-79% | 110-119 | High Average |
| 50-64% | 100-109 | Average |
| 35-49% | 90-99 | Low Average |
| 20-34% | 80-89 | Below Average |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- AWS Amplify
- Netlify
- Railway
- DigitalOcean App Platform

## License

MIT License - feel free to use this project for your own purposes.

## Support

For questions or issues, please open a GitHub issue.
