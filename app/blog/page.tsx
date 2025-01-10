'use client'

import { useLanguage } from '../contexts/language-context'

export default function BlogPage() {
  const { language } = useLanguage()

  const t = {
    en: {
      title: 'MaxMove Blog',
      blogPost: {
        title: 'Empowering Communities Through Digital Logistics',
        date: 'January 15, 2025',
        content: `At MaxMove, we believe in the power of technology to transform communities and businesses. Our mission goes beyond simply moving goods from point A to point B. We're committed to empowering local businesses, easing the burdens of logistics, and driving the digital transformation of the European delivery industry.

        Small and medium-sized businesses are the backbone of our communities. Yet, many struggle with the complexities and costs of efficient delivery systems. That's where MaxMove steps in. By providing an accessible, user-friendly platform, we're helping these businesses compete in an increasingly digital marketplace.

        Our innovative approach doesn't just benefit businesses; it touches entire communities. By facilitating smoother, faster deliveries, we're improving the daily lives of people across Europe. From busy professionals receiving their online orders to elderly individuals getting their medications delivered, MaxMove is making a difference.

        Moreover, we're proud to be at the forefront of digitalizing the European logistics industry. By embracing cutting-edge technologies like AI-driven route optimization and real-time tracking, we're setting new standards for efficiency and transparency in delivery services.

        As we continue to grow and evolve, our commitment remains steadfast: to carry your worries, support struggling businesses, and drive positive change in the communities we serve. Together, we're not just delivering packages – we're delivering progress.`
      }
    },
    de: {
      title: 'MaxMove Blog',
      blogPost: {
        title: 'Stärkung von Gemeinschaften durch digitale Logistik',
        date: '15. Januar 2025',
        content: `Bei MaxMove glauben wir an die Kraft der Technologie, um Gemeinschaften und Unternehmen zu transformieren. Unsere Mission geht über den einfachen Transport von Gütern von Punkt A nach Punkt B hinaus. Wir setzen uns dafür ein, lokale Unternehmen zu stärken, die Belastungen der Logistik zu erleichtern und die digitale Transformation der europäischen Lieferbranche voranzutreiben.

        Kleine und mittlere Unternehmen sind das Rückgrat unserer Gemeinschaften. Dennoch kämpfen viele mit den Komplexitäten und Kosten effizienter Liefersysteme. Hier kommt MaxMove ins Spiel. Indem wir eine zugängliche, benutzerfreundliche Plattform bereitstellen, helfen wir diesen Unternehmen, in einem zunehmend digitalen Markt wettbewerbsfähig zu bleiben.

        Unser innovativer Ansatz kommt nicht nur Unternehmen zugute; er berührt ganze Gemeinschaften. Indem wir reibungslosere und schnellere Lieferungen ermöglichen, verbessern wir den Alltag von Menschen in ganz Europa. Von beschäftigten Berufstätigen, die ihre Online-Bestellungen erhalten, bis hin zu älteren Menschen, die ihre Medikamente geliefert bekommen, MaxMove macht einen Unterschied.

        Darüber hinaus sind wir stolz darauf, an der Spitze der Digitalisierung der europäischen Logistikbranche zu stehen. Durch den Einsatz modernster Technologien wie KI-gesteuerte Routenoptimierung und Echtzeit-Tracking setzen wir neue Standards für Effizienz und Transparenz in Lieferdiensten.

        Während wir weiter wachsen und uns entwickeln, bleibt unser Engagement unerschütterlich: Ihre Sorgen zu tragen, kämpfende Unternehmen zu unterstützen und positive Veränderungen in den Gemeinschaften, die wir bedienen, voranzutreiben. Gemeinsam liefern wir nicht nur Pakete – wir liefern Fortschritt.`
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">{t[language].title}</h1>
        <article className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">{t[language].blogPost.title}</h2>
            <p className="text-gray-600 mb-4">{t[language].blogPost.date}</p>
            <div className="prose max-w-none">
              {t[language].blogPost.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
