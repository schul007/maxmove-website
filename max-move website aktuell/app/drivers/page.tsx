'use client'

import { useState } from 'react'
import { ArrowRight, Check, DollarSign, Clock, Calendar, TrendingUp } from 'lucide-react'
import { useLanguage } from '../contexts/language-context'

export default function DriversPage() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    vehicleTypes: [] as string[],
    licenseNumber: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Driver signup form submitted:', formData)
    // In a real application, you would send this data to your backend
  }

  const t = {
    en: {
      title: 'Drive with Maxmove',
      subtitle: 'Join our team of professional drivers and start earning today',
      requirements: {
        title: 'Driver Requirements',
        subtitle: 'To become a Maxmove driver, you must meet the following requirements:',
        list: [
          'Must be at least 21 years old',
          'Valid driver\'s license',
          'Clean driving record',
          'Smartphone with data plan',
          'Vehicle insurance',
          'Vehicle registration',
          'Background check clearance',
          'Completion of Maxmove driver training',
        ],
      },
      earnings: {
        title: 'Driver Earnings',
        subtitle: 'Maximize Your Earnings with Maxmove',
        info: [
          {
            title: 'Competitive Base Rates',
            description: 'Earn a competitive base rate for every delivery you complete.',
            icon: DollarSign,
          },
          {
            title: 'Flexible Hours',
            description: 'Work when you want. Set your own schedule and drive on your terms.',
            icon: Clock,
          },
          {
            title: 'Weekly Payouts',
            description: 'Get paid weekly for all your completed deliveries.',
            icon: Calendar,
          },
          {
            title: 'Bonus Opportunities',
            description: 'Earn extra with peak hour bonuses and referral programs.',
            icon: TrendingUp,
          },
        ],
      },
      signup: {
        title: 'Sign Up to Drive',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        phone: 'Phone Number',
        city: 'City',
        vehicleTypes: 'Vehicle Types',
        licenseNumber: 'Driver\'s License Number',
        selectVehicle: 'Select a vehicle type',
        motorcycle: 'Motorcycle',
        car: 'Car',
        van: 'Van',
        truck: 'Truck',
        submit: 'Register',
      },
    },
    de: {
      title: 'Fahren Sie mit Maxmove',
      subtitle: 'Werden Sie Teil unseres professionellen Fahrerteams und verdienen Sie ab heute',
      requirements: {
        title: 'Fahreranforderungen',
        subtitle: 'Um Maxmove-Fahrer zu werden, müssen Sie die folgenden Anforderungen erfüllen:',
        list: [
          'Mindestens 21 Jahre alt',
          'Gültiger Führerschein',
          'Saubere Fahrerbilanz',
          'Smartphone mit Datentarif',
          'Fahrzeugversicherung',
          'Fahrzeugzulassung',
          'Einwandfreies polizeiliches Führungszeugnis',
          'Abschluss der Maxmove-Fahrerschulung',
        ],
      },
      earnings: {
        title: 'Fahrerverdienst',
        subtitle: 'Maximieren Sie Ihren Verdienst mit Maxmove',
        info: [
          {
            title: 'Wettbewerbsfähige Grundtarife',
            description: 'Verdienen Sie einen wettbewerbsfähigen Grundtarif für jede abgeschlossene Lieferung.',
            icon: DollarSign,
          },
          {
            title: 'Flexible Arbeitszeiten',
            description: 'Arbeiten Sie, wann Sie wollen. Legen Sie Ihren eigenen Zeitplan fest und fahren Sie zu Ihren Bedingungen.',
            icon: Clock,
          },
          {
            title: 'Wöchentliche Auszahlungen',
            description: 'Erhalten Sie wöchentliche Auszahlungen für alle Ihre abgeschlossenen Lieferungen.',
            icon: Calendar,
          },
          {
            title: 'Bonus-Möglichkeiten',
            description: 'Verdienen Sie extra durch Stoßzeiten-Boni und Empfehlungsprogramme.',
            icon: TrendingUp,
          },
        ],
      },
      signup: {
        title: 'Registrieren Sie sich als Fahrer',
        firstName: 'Vorname',
        lastName: 'Nachname',
        email: 'E-Mail-Adresse',
        phone: 'Telefonnummer',
        city: 'Stadt',
        vehicleTypes: 'Fahrzeugtypen',
        licenseNumber: 'Führerscheinnummer',
        selectVehicle: 'Wählen Sie einen Fahrzeugtyp',
        motorcycle: 'Motorrad',
        car: 'Auto',
        van: 'Transporter',
        truck: 'LKW',
        submit: 'Registrieren',
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          {t[language].title}
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          {t[language].subtitle}
        </p>

        {/* Requirements Section */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-12">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t[language].requirements.title}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {t[language].requirements.subtitle}
            </p>
            <ul className="space-y-4">
              {t[language].requirements.list.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <Check className="flex-shrink-0 h-6 w-6 text-green-500 mt-1" />
                  <span className="ml-3 text-base text-gray-700">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Earnings Section */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-12">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t[language].earnings.title}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {t[language].earnings.subtitle}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t[language].earnings.info.map((info, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <info.icon className="h-8 w-8 text-orange-500 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-gray-600">{info.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Signup Form */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t[language].signup.title}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  {t[language].signup.firstName}
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  {t[language].signup.lastName}
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t[language].signup.email}
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  {t[language].signup.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  {t[language].signup.city}
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  {t[language].signup.vehicleTypes}
                </p>
                <div className="space-y-2">
                  {['motorcycle', 'car', 'van', 'truck'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        value={type}
                        checked={formData.vehicleTypes.includes(type)}
                        onChange={(e) => {
                          const updatedTypes = e.target.checked
                            ? [...formData.vehicleTypes, type]
                            : formData.vehicleTypes.filter((t) => t !== type);
                          setFormData({ ...formData, vehicleTypes: updatedTypes });
                        }}
                        className="mr-2"
                      />
                      {t[language].signup[type]}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
                  {t[language].signup.licenseNumber}
                </label>
                <input
                  type="text"
                  id="licenseNumber"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  {t[language].signup.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

