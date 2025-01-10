import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './contexts/auth-context'
import { LanguageProvider } from './contexts/language-context'
import NavMenu from './components/nav-menu'
import { Footer } from './components/footer'
import { PrivacyNotice } from './components/privacy-notice'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Maxmove - Your Delivery Partner',
  description: 'Fast and reliable deliveries for businesses and individuals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <NavMenu />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            <PrivacyNotice />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

