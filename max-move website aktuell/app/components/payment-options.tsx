'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/language-context'
import { CreditCard, ShoppingCartIcon as Paypal, Banknote } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentOptionsProps {
  amount: number
  onPaymentComplete: (method: string) => void
}

export function PaymentOptions({ amount, onPaymentComplete }: PaymentOptionsProps) {
  const { language } = useLanguage()
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'cash' | null>(null)

  const t = {
    en: {
      selectPayment: 'Select Payment Method',
      creditCard: 'Credit Card',
      paypal: 'PayPal',
      cash: 'Cash',
      pay: 'Pay',
      processing: 'Processing...',
    },
    de: {
      selectPayment: 'Zahlungsmethode auswählen',
      creditCard: 'Kreditkarte',
      paypal: 'PayPal',
      cash: 'Bargeld',
      pay: 'Bezahlen',
      processing: 'Verarbeitung...',
    },
  }

  const handleStripePayment = async () => {
    const stripe = await stripePromise
    if (!stripe) return

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    })

    const session = await response.json()

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (result.error) {
      console.error(result.error.message)
    } else {
      onPaymentComplete('stripe')
    }
  }

  const handlePayPalPayment = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      onPaymentComplete('paypal')
    })
  }

  const handleCashPayment = () => {
    onPaymentComplete('cash')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">{t[language].selectPayment}</h2>
      <div className="space-y-2">
        <button
          onClick={() => setPaymentMethod('stripe')}
          className={`w-full flex items-center justify-between p-4 border rounded-lg ${
            paymentMethod === 'stripe' ? 'border-black' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center">
            <CreditCard className="w-6 h-6 mr-2" />
            <span>{t[language].creditCard}</span>
          </div>
          <input
            type="radio"
            checked={paymentMethod === 'stripe'}
            onChange={() => setPaymentMethod('stripe')}
          />
        </button>
        <button
          onClick={() => setPaymentMethod('paypal')}
          className={`w-full flex items-center justify-between p-4 border rounded-lg ${
            paymentMethod === 'paypal' ? 'border-black' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center">
            <Paypal className="w-6 h-6 mr-2" />
            <span>{t[language].paypal}</span>
          </div>
          <input
            type="radio"
            checked={paymentMethod === 'paypal'}
            onChange={() => setPaymentMethod('paypal')}
          />
        </button>
        <button
          onClick={() => setPaymentMethod('cash')}
          className={`w-full flex items-center justify-between p-4 border rounded-lg ${
            paymentMethod === 'cash' ? 'border-black' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center">
            <Banknote className="w-6 h-6 mr-2" />
            <span>{t[language].cash}</span>
          </div>
          <input
            type="radio"
            checked={paymentMethod === 'cash'}
            onChange={() => setPaymentMethod('cash')}
          />
        </button>
      </div>
      {paymentMethod === 'stripe' && (
        <button
          onClick={handleStripePayment}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          {t[language].pay} {amount.toFixed(2)} €
        </button>
      )}
      {paymentMethod === 'paypal' && (
        <PayPalScriptProvider options={{ 'client-id': 'your_paypal_client_id' }}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount.toString(),
                    },
                  },
                ],
              })
            }}
            onApprove={handlePayPalPayment}
          />
        </PayPalScriptProvider>
      )}
      {paymentMethod === 'cash' && (
        <button
          onClick={handleCashPayment}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          {t[language].pay} {amount.toFixed(2)} € {t[language].cash}
        </button>
      )}
    </div>
  )
}

