'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/language-context'
import { useAuth } from '../contexts/auth-context'
import { Send, Loader2 } from 'lucide-react'

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
  const { user } = useAuth()

  const t = {
    en: {
      title: 'Chat Support',
      inputPlaceholder: 'Type your message here...',
      send: 'Send',
      loadingMessage: 'Loading messages...',
    },
    de: {
      title: 'Chat-Support',
      inputPlaceholder: 'Geben Sie hier Ihre Nachricht ein...',
      send: 'Senden',
      loadingMessage: 'Nachrichten werden geladen...',
    }
  }

  useEffect(() => {
    // Simulating API call to fetch messages
    setIsLoading(true)
    setTimeout(() => {
      const mockMessages: Message[] = [
        { id: '1', sender: 'system', content: 'Welcome to Maxmove support! How can we help you today?', timestamp: new Date() },
      ]
      setMessages(mockMessages)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === '') return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages(prevMessages => [...prevMessages, userMessage])
    setNewMessage('')

    // Simulating API call to send message and get response
    setTimeout(() => {
      const systemResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'system',
        content: 'Thank you for your message. Our support team will get back to you shortly.',
        timestamp: new Date(),
      }
      setMessages(prevMessages => [...prevMessages, systemResponse])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">{t[language].title}</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="h-96 overflow-y-auto p-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin mr-2" />
                <span>{t[language].loadingMessage}</span>
              </div>
            ) : (
              messages.map(message => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={t[language].inputPlaceholder}
                className="flex-grow mr-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <Send className="w-5 h-5" />
                <span className="sr-only">{t[language].send}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

