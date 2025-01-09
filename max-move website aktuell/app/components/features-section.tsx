'use client'

import { useLanguage } from '../contexts/language-context'
import { Euro, Clock, Truck, Shield, MapPin } from 'lucide-react'

export function FeaturesSection() {
  const { language } = useLanguage()

  const features = [
    {
      icon: Euro,
      title: { en: 'Affordable & Speedy', de: 'Kostengünstig & Schnell' },
      description: {
        en: 'Transparent pricing with no hidden costs. Match orders and deliver immediately.',
        de: 'Transparente Preise ohne versteckte Kosten. Vermitteln und liefern Sie sofort.'
      }
    },
    {
      icon: Truck,
      title: { en: 'Reliable driver network', de: 'Zuverlässiges Fahrernetzwerk' },
      description: {
        en: 'Different vehicle types and courier services for all kinds of delivery needs.',
        de: 'Verschiedene Fahrzeugtypen und Kurierdienste für alle Arten von Lieferanforderungen.'
      }
    },
    {
      icon: Shield,
      title: { en: 'Safe delivery', de: 'Sichere Lieferung' },
      description: {
        en: 'Professional and trained drivers ensure all your goods safely reach their destination.',
        de: 'Professionelle und geschulte Fahrer sorgen dafür, dass alle Ihre Waren sicher ihr Ziel erreichen.'
      }
    },
    {
      icon: MapPin,
      title: { en: 'Real-time tracking', de: 'Echtzeit-Tracking' },
      description: {
        en: 'In-app tracking allows you and the receiver to track your order in real time during the delivery.',
        de: 'In-App-Tracking ermöglicht es Ihnen und dem Empfänger, Ihre Bestellung während der Lieferung in Echtzeit zu verfolgen.'
      }
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-center mb-12">
          {language === 'en' ? 'Fast. Simple. Affordable.' : 'Schnell. Einfach. Kostengünstig.'}
        </h3>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md">
              <feature.icon className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">{feature.title[language]}</h3>
                <p className="text-gray-600">{feature.description[language]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

