import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

// Product ID: prod_TF7lYuAyy0AzZW
// Price: $1.99 USD

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

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

    // Create payment intent for $1.99
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 199, // $1.99 in cents
      currency: 'usd',
      customer: customer.id,
      description: 'BrainyAK IQ Test Results',
      metadata: {
        product_id: 'prod_TF7lYuAyy0AzZW',
        test_type: 'iq_test',
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
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
