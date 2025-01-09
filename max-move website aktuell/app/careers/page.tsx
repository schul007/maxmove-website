'use client'

import { useLanguage } from '../contexts/language-context'

export default function CareersPage() {
  const { language } = useLanguage()

  const t = {
    en: {
      title: 'Careers at MaxMove',
      intro: 'Join our team and help shape the future of logistics. We\'re always looking for talented individuals who are passionate about innovation and customer service.',
      openPositions: 'Open Positions',
      applyInstructions: 'To apply for any of these positions, please send your CV to',
      jobs: [
        { title: 'Co-Founder' },
        { title: 'Mobile Developer' },
        { title: 'Full Stack Developer' },
        { title: 'Back End Developer' },
        { title: 'Marketing Intern' },
        { title: 'Front End Intern' },
        { title: 'Mobile Dev Intern' },
        { title: 'Chief Supply Chain Officer (CSCO)' },
        { title: 'Logistics Manager' }
      ]
    },
    de: {
      title: 'Karriere bei MaxMove',
      intro: 'Werden Sie Teil unseres Teams und gestalten Sie die Zukunft der Logistik mit. Wir suchen stets nach talentierten Personen, die sich für Innovation und Kundenservice begeistern.',
      openPositions: 'Offene Stellen',
      applyInstructions: 'Um sich für eine dieser Positionen zu bewerben, senden Sie bitte Ihren Lebenslauf an',
      jobs: [
        { title: 'Mitgründer' },
        { title: 'Mobile Entwickler' },
        { title: 'Full-Stack-Entwickler' },
        { title: 'Back-End-Entwickler' },
        { title: 'Marketing-Praktikant' },
        { title: 'Front-End-Praktikant' },
        { title: 'Mobile-Entwickler-Praktikant' },
        { title: 'Chief Supply Chain Officer (CSCO)' },
        { title: 'Logistikmanager' }
      ]
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">{t[language].title}</h1>
        
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <p className="text-gray-700">{t[language].intro}</p>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t[language].openPositions}</h2>
          <div className="space-y-6">
            {t[language].jobs.map((job, index) => (
              <div key={index} className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-700">
            {t[language].applyInstructions} <a href="mailto:max.valjan@gmail.com" className="text-orange-500 hover:underline">max.valjan@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  )
}

