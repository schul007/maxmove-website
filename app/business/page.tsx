'use client'

import { useState } from 'react'
import { ArrowRight, Truck, Building2, Clock, CheckCircle } from 'lucide-react'
import { useLanguage } from '../contexts/language-context'

const industries = {
  en: ['E-Commerce', 'Retail', 'Food & Beverage', 'Logistics', 'Manufacturing', 'Services', 'Other'],
  de: ['E-Commerce', 'Einzelhandel', 'Gastronomie', 'Logistik', 'Produktion', 'Dienstleistungen', 'Andere']
}

const vehicleTypes = {
  en: [
    'Motorcycle (up to 20kg)',
    'Car (up to 300kg)',
    'Van (up to 1000kg)',
    'Truck (over 1000kg)',
    'Towing service'
  ],
  de: [
    'Motorrad (bis 20kg)',
    'PKW (bis 300kg)',
    'Transporter (bis 1000kg)',
    'LKW (über 1000kg)',
    'Abschleppdienst'
  ]
}

const deliveryFrequency = {
  en: [
    '1-10 per month',
    '11-50 per month',
    '51-100 per month',
    'Over 100 per month'
  ],
  de: [
    '1-10 pro Monat',
    '11-50 pro Monat',
    '51-100 pro Monat',
    'Über 100 pro Monat'
  ]
}

const orderMethods = {
  en: ['Web Portal', 'Mobile App', 'API Integration', 'Phone'],
  de: ['Web-Portal', 'Mobile App', 'API-Integration', 'Telefonisch']
}

export default function BusinessPage() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    jobTitle: '',
    email: '',
    phone: '',
    industry: '',
    vehicleType: '',
    deliveryFrequency: '',
    bulkDelivery: '',
    orderMethod: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const features = [
    {
      icon: Truck,
      title: { en: 'Flexible Vehicle Fleet', de: 'Flexible Fahrzeugflotte' },
      description: { 
        en: 'From motorcycles to trucks - choose the right vehicle for your deliveries',
        de: 'Von Motorrädern bis LKWs - wählen Sie das passende Fahrzeug für Ihre Lieferungen'
      }
    },
    {
      icon: Building2,
      title: { en: 'Nationwide Coverage', de: 'Deutschlandweite Abdeckung' },
      description: { 
        en: 'Reliable deliveries in all major German cities',
        de: 'Zuverlässige Lieferungen in allen großen deutschen Städten'
      }
    },
    {
      icon: Clock,
      title: { en: 'Same-Day Delivery', de: 'Same-Day Delivery' },
      description: { 
        en: 'Express delivery on the same day or plan in advance',
        de: 'Express-Lieferung am selben Tag oder Planung im Voraus'
      }
    },
    {
      icon: CheckCircle,
      title: { en: 'API Integration', de: 'API Integration' },
      description: { 
        en: 'Seamless integration into your inventory system',
        de: 'Nahtlose Integration in Ihr Bestandssystem'
      }
    }
  ]

  const t = {
    en: {
      title: 'Last-Mile Delivery for Your Business',
      subtitle: 'Fast and reliable on-demand, same-day, and scheduled deliveries for businesses of all sizes.',
      deliver: 'Deliver Now',
      contactUs: 'Contact Us',
      firstName: 'First Name',
      lastName: 'Last Name',
      companyName: 'Company Name',
      jobTitle: 'Job Title',
      email: 'Email',
      phone: 'Phone',
      industry: 'Industry',
      preferredVehicle: 'Preferred Vehicle Type',
      deliveryFrequency: 'Delivery Frequency',
      preferredOrderMethod: 'Preferred Order Method',
      sendRequest: 'Send Request',
      privacyNote: 'By submitting, you agree to our Privacy Policy. Your data will be treated confidentially.',
      selectOption: 'Please select',
    },
    de: {
      title: 'Last-Mile Delivery für Ihr Unternehmen',
      subtitle: 'Schnelle und zuverlässige On-Demand-, Same-Day- und planbare Lieferungen für Unternehmen jeder Größe.',
      deliver: 'Jetzt Liefern',
      contactUs: 'Kontaktieren Sie uns',
      firstName: 'Vorname',
      lastName: 'Nachname',
      companyName: 'Firmenname',
      jobTitle: 'Position',
      email: 'E-Mail',
      phone: 'Telefon',
      industry: 'Branche',
      preferredVehicle: 'Bevorzugter Fahrzeugtyp',
      deliveryFrequency: 'Lieferhäufigkeit',
      preferredOrderMethod: 'Bevorzugte Bestellmethode',
      sendRequest: 'Anfrage senden',
      privacyNote: 'Durch das Absenden stimmen Sie unserer Datenschutzerklärung zu. Ihre Daten werden vertraulich behandelt.',
      selectOption: 'Bitte auswählen',
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-black text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/placeholder.svg?height=800&width=1600"
            alt="Business delivery"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t[language].title}
              </h1>
              <p className="text-xl mb-8">
                {t[language].subtitle}
              </p>
              <button className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors flex items-center">
                {t[language].deliver} <ArrowRight className="ml-2" />
              </button>
            </div>

            {/* Contact Form */}
            <div className="bg-white text-black p-6 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold mb-6">{t[language].contactUs}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      {t[language].firstName}
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      {t[language].lastName}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    {t[language].companyName}
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                    {t[language].jobTitle}
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t[language].email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {t[language].phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                    {t[language].industry}
                  </label>
                  <select
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  >
                    <option value="">{t[language].selectOption}</option>
                    {industries[language].map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
                    {t[language].preferredVehicle}
                  </label>
                  <select
                    id="vehicleType"
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  >
                    <option value="">{t[language].selectOption}</option>
                    {vehicleTypes[language].map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="deliveryFrequency" className="block text-sm font-medium text-gray-700">
                    {t[language].deliveryFrequency}
                  </label>
                  <select
                    id="deliveryFrequency"
                    value={formData.deliveryFrequency}
                    onChange={(e) => setFormData({ ...formData, deliveryFrequency: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  >
                    <option value="">{t[language].selectOption}</option>
                    {deliveryFrequency[language].map((frequency) => (
                      <option key={frequency} value={frequency}>
                        {frequency}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="orderMethod" className="block text-sm font-medium text-gray-700">
                    {t[language].preferredOrderMethod}
                  </label>
                  <select
                    id="orderMethod"
                    value={formData.orderMethod}
                    onChange={(e) => setFormData({ ...formData, orderMethod: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  >
                    <option value="">{t[language].selectOption}</option>
                    {orderMethods[language].map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  {t[language].sendRequest}
                </button>

                <p className="text-xs text-gray-500 mt-4">
                  {t[language].privacyNote}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title[language]} className="bg-white p-6 rounded-lg shadow-md">
              <feature.icon className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title[language]}</h3>
              <p className="text-gray-600">{feature.description[language]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

