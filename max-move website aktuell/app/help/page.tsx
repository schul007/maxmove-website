'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/language-context'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function HelpPage() {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')

  const t = {
    en: {
      title: 'Help Center',
      searchPlaceholder: 'Search for help...',
      searchButton: 'Search',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'How do I book a delivery?',
          answer: 'To book a delivery, simply enter your pickup and drop-off locations on the home page, select your preferred vehicle type, and click "See prices". You\'ll then be matched with an available driver.'
        },
        {
          question: 'What types of vehicles are available?',
          answer: 'We offer a range of vehicles including motorcycles, cars, vans, trucks, and towing services to meet various delivery needs.'
        },
        {
          question: 'How do I track my delivery?',
          answer: 'Once you\'re matched with a driver, you\'ll be able to track their location in real-time on the map. You\'ll also receive updates on the estimated arrival time.'
        },
        {
          question: 'Can I communicate with my driver?',
          answer: 'Yes, after being matched with a driver, you\'ll have access to an in-app chat feature where you can communicate directly with your driver.'
        },
        {
          question: 'What if I need to cancel my delivery?',
          answer: 'You can cancel your delivery before a driver is assigned without any charge. If you need to cancel after a driver is assigned, a cancellation fee may apply.'
        }
      ],
      contactTitle: 'Still need help?',
      contactText: 'If you couldn\'t find the answer you were looking for, please contact our support team.',
      contactButton: 'Contact Support'
    },
    de: {
      title: 'Hilfe-Center',
      searchPlaceholder: 'Hilfe suchen...',
      searchButton: 'Suchen',
      faqTitle: 'Häufig gestellte Fragen',
      faqs: [
        {
          question: 'Wie buche ich eine Lieferung?',
          answer: 'Um eine Lieferung zu buchen, geben Sie einfach Ihren Abhol- und Lieferort auf der Startseite ein, wählen Sie Ihren bevorzugten Fahrzeugtyp und klicken Sie auf "Preise anzeigen". Anschließend werden Sie mit einem verfügbaren Fahrer verbunden.'
        },
        {
          question: 'Welche Fahrzeugtypen sind verfügbar?',
          answer: 'Wir bieten eine Reihe von Fahrzeugen an, darunter Motorräder, Autos, Transporter, LKWs und Abschleppdienste, um verschiedene Lieferbedürfnisse zu erfüllen.'
        },
        {
          question: 'Wie kann ich meine Lieferung verfolgen?',
          answer: 'Sobald Sie mit einem Fahrer verbunden sind, können Sie dessen Standort in Echtzeit auf der Karte verfolgen. Sie erhalten auch Updates zur geschätzten Ankunftszeit.'
        },
        {
          question: 'Kann ich mit meinem Fahrer kommunizieren?',
          answer: 'Ja, nachdem Sie mit einem Fahrer verbunden wurden, haben Sie Zugang zu einer In-App-Chat-Funktion, über die Sie direkt mit Ihrem Fahrer kommunizieren können.'
        },
        {
          question: 'Was passiert, wenn ich meine Lieferung stornieren muss?',
          answer: 'Sie können Ihre Lieferung kostenlos stornieren, bevor ein Fahrer zugewiesen wurde. Wenn Sie nach der Zuweisung eines Fahrers stornieren müssen, kann eine Stornierungsgebühr anfallen.'
        }
      ],
      contactTitle: 'Benötigen Sie weitere Hilfe?',
      contactText: 'Wenn Sie die gesuchte Antwort nicht finden konnten, kontaktieren Sie bitte unser Support-Team.',
      contactButton: 'Support kontaktieren'
    }
  }

  const filteredFaqs = t[language].faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">{t[language].title}</h1>
        
        <div className="mb-8 flex gap-2">
          <Input
            type="text"
            placeholder={t[language].searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button>{t[language].searchButton}</Button>
        </div>

        <h2 className="text-2xl font-semibold mb-4">{t[language].faqTitle}</h2>
        <Accordion type="single" collapsible className="mb-8">
          {filteredFaqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">{t[language].contactTitle}</h2>
          <p className="mb-4">{t[language].contactText}</p>
          <Button>{t[language].contactButton}</Button>
        </div>
      </div>
    </div>
  )
}

