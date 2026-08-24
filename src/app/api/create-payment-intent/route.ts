import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

// Product ID: prod_TF7lYuAyy0AzZW
// Products & pricing (all amounts in cents)
type ProductKey = 'iq_test' | 'single_test' | 'bundle'

const PRODUCTS: Record<ProductKey, { amount: number; description: string }> = {
  // Original IQ test result unlock — $1.99
  iq_test: { amount: 199, description: 'BrainyAK IQ Test Results' },
  // A single bonus test unlock — $1.99
  single_test: { amount: 199, description: 'BrainyAK Bonus Test' },
  // Ultimate Package — unlocks all 20 tests — $29.80
  bundle: { amount: 2980, description: 'BrainyAK Ultimate Package — All 20 Tests' },
}

export async function POST(request: Request) {
  try {
    const { email, name, product = 'iq_test', testId, testName } = await request.json()

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    const productKey: ProductKey = (['iq_test', 'single_test', 'bundle'] as ProductKey[]).includes(product)
      ? product
      : 'iq_test'
    const { amount, description: baseDescription } = PRODUCTS[productKey]

    // For a single bonus test, personalise the description with its name
    const description =
      productKey === 'single_test' && testName
        ? `BrainyAK Bonus Test — ${testName}`
        : baseDescription

    // Create or retrieve customer
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    })

    let customer
    if (customers.data.length > 0) {
      customer = customers.data[0]
    } else {
      customer = await stripe.customers.create({
        email: email,
        name: name,
        metadata: {
          source: 'brainyak_iq_test',
        },
      })
    }

    // Create payment intent for the selected product
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customer.id,
      description,
      metadata: {
        product_id: 'prod_TF7lYuAyy0AzZW',
        product: productKey,
        test_type: productKey === 'iq_test' ? 'iq_test' : 'bonus_test',
        test_id: testId != null ? String(testId) : '',
        test_name: testName || '',
        customer_email: email,
        customer_name: name,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id,
      amount,
      product: productKey,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
