'use client'

import { useLanguage } from '../contexts/language-context'
import Image from 'next/image'

export function VehiclesSection() {
  const { language } = useLanguage()

  // Note: Make sure to place the vehicle images in the public/vehicles/ directory
  const vehicles = [
    {
      image: '/vehicles/van.png',
      title: { en: 'Van', de: 'Transporter' },
      description: {
        en: 'Perfect for medium-sized deliveries',
        de: 'Perfekt für mittelgroße Lieferungen'
      }
    },
    {
      image: '/vehicles/truck.png',
      title: { en: 'Truck', de: 'LKW' },
      description: {
        en: 'Ideal for large deliveries (5.5 ton and 9 ton options)',
        de: 'Ideal für große Lieferungen (5,5-Tonnen und 9-Tonnen Optionen)'
      }
    },
    {
      image: '/vehicles/motorcycle.png',
      title: { en: 'Motorcycle', de: 'Motorrad' },
      description: {
        en: 'Quick deliveries for small packages',
        de: 'Schnelle Lieferungen für kleine Pakete'
      }
    },
    {
      image: '/vehicles/car.png',
      title: { en: 'Car', de: 'Auto' },
      description: {
        en: 'For quick, versatile deliveries',
        de: 'Für schnelle, vielseitige Lieferungen'
      }
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === 'en' ? 'Wide variety of vehicles' : 'Große Auswahl an Fahrzeugen'}
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 bg-black">
                <Image
                  src={vehicle.image}
                  alt={vehicle.title[language]}
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute bottom-2 right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded">
                  MaxMove
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{vehicle.title[language]}</h3>
                <p className="text-gray-600">{vehicle.description[language]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

