'use client'

import { useLanguage } from '../contexts/language-context'
import Image from 'next/image'

export function AppsSection() {
  const { language } = useLanguage()

  const t = {
    en: {
      title: 'Our Apps',
      deliveryApp: 'Delivery App',
      driverApp: 'Driver App',
      comingSoon: 'Coming Soon',
    },
    de: {
      title: 'Unsere Apps',
      deliveryApp: 'Liefer-App',
      driverApp: 'Fahrer-App',
      comingSoon: 'Demnächst verfügbar',
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t[language].title}</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Delivery App */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-6">{t[language].deliveryApp}</h3>
            <div className="mb-6">
              <div className="bg-black rounded-xl p-4 w-[120px] h-[120px] mx-auto flex flex-col items-center justify-center text-white">
                <span className="text-lg font-bold">MaxMove</span>
              </div>
            </div>
            <p className="text-gray-600 mb-6">{t[language].comingSoon}</p>
          </div>

          {/* Driver App */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-6">{t[language].driverApp}</h3>
            <div className="mb-6">
              <div className="bg-black rounded-xl p-4 w-[120px] h-[120px] mx-auto flex flex-col items-center justify-center text-white">
                <span className="text-lg font-bold">MaxMove</span>
                <span className="text-sm mt-1">Driver</span>
              </div>
            </div>
            <p className="text-gray-600 mb-6">{t[language].comingSoon}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

