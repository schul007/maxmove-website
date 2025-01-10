'use client'

import { useLanguage } from '../contexts/language-context'

export default function TermsOfService() {
  const { language } = useLanguage()

  const t = {
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last Updated: June 1, 2023',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing or using Maxmove\'s services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not use our services.'
        },
        {
          title: '2. Description of Service',
          content: 'Maxmove provides an on-demand delivery platform connecting users with drivers for the transportation of goods. We do not own or operate any vehicles and are not responsible for the goods transported.'
        },
        {
          title: '3. User Responsibilities',
          content: 'Users are responsible for providing accurate information, ensuring items for delivery are legal and properly packaged, and being available for pickup and delivery as scheduled.'
        },
        {
          title: '4. Pricing and Payment',
          content: 'Prices for our services are provided in the app before confirming a delivery. Users agree to pay all charges associated with their use of the service. We reserve the right to change our pricing at any time.'
        },
        {
          title: '5. Cancellation Policy',
          content: 'Users may cancel a delivery request before a driver is assigned without charge. Cancellations after driver assignment may incur a fee.'
        },
        {
          title: '6. Limitation of Liability',
          content: 'Maxmove is not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.'
        },
        {
          title: '7. Changes to Terms',
          content: 'We reserve the right to modify these terms at any time. Continued use of our service after changes constitutes acceptance of the new terms.'
        }
      ]
    },
    de: {
      title: 'Nutzungsbedingungen',
      lastUpdated: 'Zuletzt aktualisiert: 1. Juni 2023',
      sections: [
        {
          title: '1. Annahme der Bedingungen',
          content: 'Durch den Zugriff auf oder die Nutzung der Dienste von Maxmove erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Wenn Sie mit einem Teil der Bedingungen nicht einverstanden sind, dürfen Sie unsere Dienste nicht nutzen.'
        },
        {
          title: '2. Beschreibung des Dienstes',
          content: 'Maxmove bietet eine On-Demand-Lieferplattform, die Benutzer mit Fahrern für den Transport von Waren verbindet. Wir besitzen oder betreiben keine Fahrzeuge und sind nicht für die transportierten Waren verantwortlich.'
        },
        {
          title: '3. Verantwortlichkeiten des Benutzers',
          content: 'Benutzer sind dafür verantwortlich, genaue Informationen bereitzustellen, sicherzustellen, dass die zu liefernden Artikel legal und ordnungsgemäß verpackt sind, und für die Abholung und Lieferung wie geplant verfügbar zu sein.'
        },
        {
          title: '4. Preisgestaltung und Zahlung',
          content: 'Die Preise für unsere Dienstleistungen werden in der App vor der Bestätigung einer Lieferung angezeigt. Benutzer erklären sich damit einverstanden, alle mit der Nutzung des Dienstes verbundenen Gebühren zu bezahlen. Wir behalten uns das Recht vor, unsere Preise jederzeit zu ändern.'
        },
        {
          title: '5. Stornierungsrichtlinie',
          content: 'Benutzer können eine Lieferanfrage kostenlos stornieren, bevor ein Fahrer zugewiesen wird. Stornierungen nach der Fahrerzuweisung können eine Gebühr nach sich ziehen.'
        },
        {
          title: '6. Haftungsbeschränkung',
          content: 'Maxmove haftet nicht für indirekte, zufällige, besondere, Folge- oder Strafschäden, die sich aus der Nutzung unserer Dienste ergeben.'
        },
        {
          title: '7. Änderungen der Bedingungen',
          content: 'Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Die weitere Nutzung unseres Dienstes nach Änderungen stellt die Annahme der neuen Bedingungen dar.'
        }
      ]
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t[language].title}</h1>
        <p className="text-gray-600 mb-8">{t[language].lastUpdated}</p>
        {t[language].sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <p className="text-gray-700">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

