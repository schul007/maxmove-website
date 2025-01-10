'use client'

import Link from 'next/link'
import { Globe } from 'lucide-react'
import { useAuth } from '../contexts/auth-context'
import { useLanguage } from '../contexts/language-context'

export default function NavMenu() {
  const { user, logout } = useAuth()
  const { language, setLanguage } = useLanguage()

  const t = {
    en: {
      business: 'Business',
      drivers: 'Drivers',
      help: 'Help',
      login: 'Log in',
      signup: 'Sign up',
      logout: 'Logout',
    },
    de: {
      business: 'Geschäftskunden',
      drivers: 'Fahrer',
      help: 'Hilfe',
      login: 'Anmelden',
      signup: 'Registrieren',
      logout: 'Abmelden',
    },
  }

  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-2xl font-bold">Maxmove</Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/business" className="hover:text-gray-300">{t[language].business}</Link>
            <Link href="/drivers" className="hover:text-gray-300">{t[language].drivers}</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            className="flex items-center space-x-2"
            onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
          >
            <Globe className="w-5 h-5" />
            <span>{language.toUpperCase()}</span>
          </button>
          <Link href="/help" className="hover:opacity-80">{t[language].help}</Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>{user.name}</span>
              <button onClick={() => logout()} className="hover:opacity-80">
                {t[language].logout}
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="hover:opacity-80">{t[language].login}</Link>
              <Link href="/signup" className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100">
                {t[language].signup}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

