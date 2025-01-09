'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/language-context'

interface PhoneVerificationProps {
  onVerified: (phoneNumber: string) => void
}

export function PhoneVerification({ onVerified }: PhoneVerificationProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [step, setStep] = useState<'phone' | 'code'>('phone')
  const { language } = useLanguage()

  const t = {
    en: {
      phoneNumber: 'Phone Number',
      sendCode: 'Send Verification Code',
      enterCode: 'Enter Verification Code',
      verify: 'Verify',
      invalidPhone: 'Please enter a valid phone number',
      invalidCode: 'Please enter a valid verification code',
    },
    de: {
      phoneNumber: 'Telefonnummer',
      sendCode: 'Verifizierungscode senden',
      enterCode: 'Verifizierungscode eingeben',
      verify: 'Verifizieren',
      invalidPhone: 'Bitte geben Sie eine gültige Telefonnummer ein',
      invalidCode: 'Bitte geben Sie einen gültigen Verifizierungscode ein',
    },
  }

  const handleSendCode = () => {
    // In a real application, you would send the verification code to the phone number
    console.log(`Sending verification code to ${phoneNumber}`)
    setStep('code')
  }

  const handleVerify = () => {
    // In a real application, you would verify the code with your backend
    console.log(`Verifying code ${verificationCode}`)
    onVerified(phoneNumber)
  }

  return (
    <div className="space-y-4">
      {step === 'phone' ? (
        <>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              {t[language].phoneNumber}
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <button
            onClick={handleSendCode}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            {t[language].sendCode}
          </button>
        </>
      ) : (
        <>
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              {t[language].enterCode}
            </label>
            <input
              type="text"
              id="code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <button
            onClick={handleVerify}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            {t[language].verify}
          </button>
        </>
      )}
    </div>
  )
}

