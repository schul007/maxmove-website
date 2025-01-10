'use client'

import { useLanguage } from '../contexts/language-context'
import { useAuth } from '../contexts/auth-context'

export default function AboutPage() {
  const { language } = useLanguage()
  const { user } = useAuth()

  const t = {
    en: {
      title: 'About MaxMove',
      mission: 'Our Mission',
      missionText: "At MaxMove, we're on a mission to help businesses make delivery easy. We believe in creating a seamless, efficient, and reliable last-mile delivery experience for businesses across Germany.",
      story: 'Our Story',
      storyText: "Founded in 2025, MaxMove started with a simple idea: to revolutionize last-mile delivery for businesses. As a startup, we're rapidly growing and working towards our goal of becoming the leading last-mile delivery platform in Germany.",
      values: 'Our Values',
      valuesList: [
        {
          title: 'Innovation',
          description: 'We constantly push the boundaries of what\'s possible in logistics and technology.'
        },
        {
          title: 'Reliability',
          description: 'We understand the importance of timely and secure deliveries, and we never compromise on quality.'
        },
        {
          title: 'Sustainability',
          description: 'We\'re committed to reducing our environmental impact through eco-friendly practices and technologies.'
        },
        {
          title: 'Customer-Centric',
          description: 'Our customers are at the heart of everything we do. We listen, adapt, and strive to exceed expectations.'
        }
      ],
      team: 'Our Team',
      teamText: 'MaxMove is powered by a diverse team of passionate individuals, from tech experts to logistics professionals. Together, we\'re working towards a future where moving goods is effortless and efficient.'
    },
    de: {
      title: 'Über MaxMove',
      mission: 'Unsere Mission',
      missionText: 'Bei MaxMove haben wir es uns zur Aufgabe gemacht, Unternehmen die Lieferung zu erleichtern. Wir glauben daran, ein nahtloses, effizientes und zuverlässiges Last-Mile-Liefererlebnis für Unternehmen in ganz Deutschland zu schaffen.',
      story: 'Unsere Geschichte',
      storyText: 'MaxMove wurde 2025 mit einer einfachen Idee gegründet: die Last-Mile-Lieferung für Unternehmen zu revolutionieren. Als Startup wachsen wir schnell und arbeiten darauf hin, die führende Last-Mile-Lieferplattform in Deutschland zu werden.',
      values: 'Unsere Werte',
      valuesList: [
        {
          title: 'Innovation',
          description: 'Wir erweitern ständig die Grenzen des Möglichen in Logistik und Technologie.'
        },
        {
          title: 'Zuverlässigkeit',
          description: 'Wir verstehen die Bedeutung pünktlicher und sicherer Lieferungen und machen keine Kompromisse bei der Qualität.'
        },
        {
          title: 'Nachhaltigkeit',
          description: 'Wir setzen uns dafür ein, unsere Umweltauswirkungen durch umweltfreundliche Praktiken und Technologien zu reduzieren.'
        },
        {
          title: 'Kundenorientierung',
          description: 'Unsere Kunden stehen im Mittelpunkt all unserer Aktivitäten. Wir hören zu, passen uns an und streben danach, die Erwartungen zu übertreffen.'
        }
      ],
      team: 'Unser Team',
      teamText: 'MaxMove wird von einem vielfältigen Team leidenschaftlicher Mitarbeiter angetrieben, von Technologieexperten bis hin zu Logistikfachleuten. Gemeinsam arbeiten wir an einer Zukunft, in der der Warentransport mühelos und effizient ist.'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">{t[language].title}</h1>
        
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t[language].mission}</h2>
          <p className="text-gray-700">{t[language].missionText}</p>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t[language].story}</h2>
          <p className="text-gray-700">{t[language].storyText}</p>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t[language].values}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t[language].valuesList.map((value, index) => (
              <div key={index} className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">{t[language].team}</h2>
          <p className="text-gray-700">{t[language].teamText}</p>
        </section>
      </div>
    </div>
  )
}

