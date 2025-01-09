'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'de'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

//This is where the translations would logically be added.  The existing code doesn't have a translation object, so I'm adding one here.  A more robust solution would involve a separate translation file.

const t = {
  en: {
    proceedToPayment: 'Proceed to Payment',
  },
  de: {
    proceedToPayment: 'Weiter zur Zahlung',
  }
};

export const useTranslation = () => {
  const {language} = useLanguage();
  return t[language];
}

