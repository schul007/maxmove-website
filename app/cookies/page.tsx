'use client'

import { useLanguage } from '../contexts/language-context'

export default function CookiePolicy() {
  const { language } = useLanguage()

  const t = {
    en: {
      title: 'Cookie Policy',
      lastUpdated: 'Last Updated: June 1, 2023',
      sections: [
        {
          title: '1. What are Cookies',
          content: 'Cookies are small text files that are placed on your device when you visit our website or use our app. They help us provide you with a better experience and allow certain features to function properly.'
        },
        {
          title: '2. How We Use Cookies',
          content: 'We use cookies for various purposes, including to remember your preferences, understand how you use our service, and personalize content and advertisements.'
        },
        {
          title: '3. Types of Cookies We Use',
          content: 'We use both session cookies (which expire when you close your browser) and persistent cookies (which stay on your device for a set period or until you delete them). We also use first-party cookies (set by us) and third-party cookies (set by our partners and service providers).'
        },
        {
          title: '4. Your Cookie Choices',
          content: 'Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "options" or "preferences" menu of your browser. However, please note that disabling certain cookies may affect the functionality of our service.'
        },
        {
          title: '5. Essential Cookies',
          content: 'Some cookies are essential for the operation of our service. These cookies enable core functionality such as security, network management, and accessibility.'
        },
        {
          title: '6. Analytics and Performance Cookies',
          content: 'We use analytics cookies to collect information about how you use our service. This helps us improve the way our website and app work and understand which parts of our service are most popular.'
        },
        {
          title: '7. Changes to This Policy',
          content: 'We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.'
        }
      ]
    },
    de: {
      title: 'Cookie-Richtlinie',
      lastUpdated: 'Zuletzt aktualisiert: 1. Juni 2023',
      sections: [
        {
          title: '1. Was sind Cookies',
          content: 'Cookies sind kleine Textdateien, die auf Ihrem Gerät platziert werden, wenn Sie unsere Website besuchen oder unsere App nutzen. Sie helfen uns, Ihnen eine bessere Erfahrung zu bieten und ermöglichen bestimmten Funktionen, ordnungsgemäß zu funktionieren.'
        },
        {
          title: '2. Wie wir Cookies verwenden',
          content: 'Wir verwenden Cookies für verschiedene Zwecke, einschließlich um Ihre Präferenzen zu speichern, zu verstehen, wie Sie unseren Dienst nutzen, und um Inhalte und Werbung zu personalisieren.'
        },
        {
          title: '3. Arten von Cookies, die wir verwenden',
          content: 'Wir verwenden sowohl Session-Cookies (die ablaufen, wenn Sie Ihren Browser schließen) als auch persistente Cookies (die für einen bestimmten Zeitraum auf Ihrem Gerät bleiben oder bis Sie sie löschen). Wir verwenden auch Erstanbieter-Cookies (von uns gesetzt) und Drittanbieter-Cookies (von unseren Partnern und Dienstleistern gesetzt).'
        },
        {
          title: '4. Ihre Cookie-Optionen',
          content: 'Die meisten Webbrowser ermöglichen es Ihnen, Cookies über ihre Einstellungen zu kontrollieren. Sie finden diese Einstellungen normalerweise im "Optionen"- oder "Präferenzen"-Menü Ihres Browsers. Bitte beachten Sie jedoch, dass das Deaktivieren bestimmter Cookies die Funktionalität unseres Dienstes beeinträchtigen kann.'
        },
        {
          title: '5. Essentielle Cookies',
          content: 'Einige Cookies sind für den Betrieb unseres Dienstes unerlässlich. Diese Cookies ermöglichen Kernfunktionalitäten wie Sicherheit, Netzwerkverwaltung und Barrierefreiheit.'
        },
        {
          title: '6. Analyse- und Leistungs-Cookies',
          content: 'Wir verwenden Analyse-Cookies, um Informationen darüber zu sammeln, wie Sie unseren Dienst nutzen. Dies hilft uns, die Funktionsweise unserer Website und App zu verbessern und zu verstehen, welche Teile unseres Dienstes am beliebtesten sind.'
        },
        {
          title: '7. Änderungen dieser Richtlinie',
          content: 'Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren. Wir werden Sie über alle Änderungen informieren, indem wir die neue Cookie-Richtlinie auf dieser Seite veröffentlichen.'
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

