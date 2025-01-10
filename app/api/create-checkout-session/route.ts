import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

export async function POST(request: Request) {
  const { amount } = await request.json()

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'MaxMove Delivery',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/booking-success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/booking-cancel`,
    })

    return NextResponse.json({ id: session.id })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 })
  }
}

