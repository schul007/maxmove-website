'use client'

import { useLanguage } from '../contexts/language-context'

export default function PrivacyPolicy() {
  const { language } = useLanguage()

  const t = {
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: June 1, 2023',
      sections: [
        {
          title: '1. Information We Collect',
          content: 'We collect information you provide directly to us, such as your name, email address, phone number, and payment information. We also collect data about your use of our service, including your location data and delivery history.'
        },
        {
          title: '2. How We Use Your Information',
          content: 'We use your information to provide, maintain, and improve our services, process transactions, send you related information, and communicate with you.'
        },
        {
          title: '3. Information Sharing and Disclosure',
          content: 'We may share your information with drivers to facilitate deliveries, with service providers who perform services on our behalf, or if required by law.'
        },
        {
          title: '4. Data Security',
          content: 'We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.'
        },
        {
          title: '5. Your Choices',
          content: 'You can access and update certain information through your account settings. You may also opt out of receiving promotional communications from us.'
        },
        {
          title: '6. Changes to this Policy',
          content: 'We may change this privacy policy from time to time. If we make significant changes, we will notify you through the app or by email.'
        },
        {
          title: '7. Contact Us',
          content: 'If you have any questions about this privacy policy, please contact us at privacy@maxmove.com.'
        }
      ]
    },
    de: {
      title: 'Datenschutzrichtlinie',
      lastUpdated: 'Zuletzt aktualisiert: 1. Juni 2023',
      sections: [
        {
          title: '1. Informationen, die wir sammeln',
          content: 'Wir sammeln Informationen, die Sie uns direkt zur Verfügung stellen, wie Ihren Namen, Ihre E-Mail-Adresse, Telefonnummer und Zahlungsinformationen. Wir sammeln auch Daten über Ihre Nutzung unseres Dienstes, einschließlich Ihrer Standortdaten und Lieferhistorie.'
        },
        {
          title: '2. Wie wir Ihre Informationen verwenden',
          content: 'Wir verwenden Ihre Informationen, um unsere Dienste bereitzustellen, zu warten und zu verbessern, Transaktionen zu verarbeiten, Ihnen relevante Informationen zu senden und mit Ihnen zu kommunizieren.'
        },
        {
          title: '3. Informationsaustausch und Offenlegung',
          content: 'Wir können Ihre Informationen mit Fahrern teilen, um Lieferungen zu erleichtern, mit Dienstleistern, die Dienstleistungen in unserem Auftrag erbringen, oder wenn dies gesetzlich vorgeschrieben ist.'
        },
        {
          title: '4. Datensicherheit',
          content: 'Wir ergreifen angemessene Maßnahmen, um Ihre persönlichen Informationen vor Verlust, Diebstahl, Missbrauch und unbefugtem Zugriff zu schützen.'
        },
        {
          title: '5. Ihre Wahlmöglichkeiten',
          content: 'Sie können bestimmte Informationen über Ihre Kontoeinstellungen aufrufen und aktualisieren. Sie können sich auch von Werbemitteilungen von uns abmelden.'
        },
        {
          title: '6. Änderungen dieser Richtlinie',
          content: 'Wir können diese Datenschutzrichtlinie von Zeit zu Zeit ändern. Bei wesentlichen Änderungen werden wir Sie über die App oder per E-Mail benachrichtigen.'
        },
        {
          title: '7. Kontaktieren Sie uns',
          content: 'Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns bitte unter privacy@maxmove.com.'
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

