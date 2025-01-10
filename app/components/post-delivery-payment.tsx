'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/language-context'
import { PaymentOptions } from './payment-options'
import { Button } from "@/components/ui/button"

interface PostDeliveryPaymentProps {
  orderId: string
  totalAmount: number
  onPaymentComplete: () => void
}

export function PostDeliveryPayment({ orderId, totalAmount, onPaymentComplete }: PostDeliveryPaymentProps) {
  const { language } = useLanguage()
  const [paymentCompleted, setPaymentCompleted] = useState(false)

  const t = {
    en: {
      title: 'Complete Your Payment',
      orderCompleted: 'Your order has been completed',
      totalAmount: 'Total Amount',
      paymentCompleted: 'Payment Completed',
      close: 'Close',
    },
    de: {
      title: 'Schließen Sie Ihre Zahlung ab',
      orderCompleted: 'Ihre Bestellung wurde abgeschlossen',
      totalAmount: 'Gesamtbetrag',
      paymentCompleted: 'Zahlung abgeschlossen',
      close: 'Schließen',
    },
  }

  const handlePaymentComplete = (method: string) => {
    console.log(`Payment completed for order ${orderId} using ${method}`)
    setPaymentCompleted(true)
    // Here you would typically update the order status in your backend
    // and perform any other necessary actions
    onPaymentComplete()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">{t[language].title}</h2>
        <p className="mb-4">{t[language].orderCompleted}</p>
        <p className="mb-6">
          {t[language].totalAmount}: {totalAmount.toFixed(2)} €
        </p>
        {!paymentCompleted ? (
          <PaymentOptions amount={totalAmount} onPaymentComplete={handlePaymentComplete} />
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-bold mb-4">{t[language].paymentCompleted}</p>
            <Button onClick={onPaymentComplete}>{t[language].close}</Button>
          </div>
        )}
      </div>
    </div>
  )
}

