'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/auth-context'
import { useLanguage } from '../contexts/language-context'
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { signIn } = useAuth()
  const { language } = useLanguage()

  const t = {
    en: {
      title: 'Log in to your account',
      email: 'Email Address',
      password: 'Password',
      forgotPassword: 'Forgot your password?',
      login: 'Log in',
      or: 'Or continue with',
      google: 'Google',
      facebook: 'Facebook',
      apple: 'Apple',
      noAccount: 'Don\'t have an account?',
      signup: 'Sign up',
    },
    de: {
      title: 'In Ihr Konto einloggen',
      email: 'E-Mail-Adresse',
      password: 'Passwort',
      forgotPassword: 'Passwort vergessen?',
      login: 'Anmelden',
      or: 'Oder fortfahren mit',
      google: 'Google',
      facebook: 'Facebook',
      apple: 'Apple',
      noAccount: 'Noch kein Konto?',
      signup: 'Registrieren',
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      router.push('/')
    } catch (error) {
      console.error('Login failed:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  const handleSocialLogin = (provider: string) => {
    // Here you would typically initiate the OAuth flow for the selected provider
    console.log(`Logging in with ${provider}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t[language].title}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t[language].email}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t[language].password}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                  {t[language].forgotPassword}
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {t[language].login}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {t[language].or}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                onClick={() => handleSocialLogin('google')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaGoogle className="h-5 w-5 text-red-500" />
                <span className="sr-only">{t[language].google}</span>
              </button>
              <button
                onClick={() => handleSocialLogin('facebook')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaFacebook className="h-5 w-5 text-blue-600" />
                <span className="sr-only">{t[language].facebook}</span>
              </button>
              <button
                onClick={() => handleSocialLogin('apple')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaApple className="h-5 w-5 text-gray-900" />
                <span className="sr-only">{t[language].apple}</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t[language].noAccount}{' '}
              <a href="/signup" className="font-medium text-orange-600 hover:text-orange-500">
                {t[language].signup}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

