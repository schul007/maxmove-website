'use client'

import { useState, useEffect, useRef } from 'react'
import { Loader2, User, Clock, MapPin, Star, Truck, Send, ImageIcon } from 'lucide-react'
import { useLanguage } from '../contexts/language-context'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapsLoader } from './maps-loader'

interface Driver {
  id: string
  name: string
  rating: number
  eta: number
  vehicle: string
  registrationNumber: string
  image: string
  location: {
    lat: number
    lng: number
  }
}

interface Message {
  id: string
  sender: 'user' | 'driver'
  content: string
  timestamp: Date
  image?: string
}

interface DriverMatchingProps {
  pickup: string
  stops: string[]
  vehicleType: string
  onClose: () => void
  user: {
    name: string
    image: string
  }
}

export function DriverMatching({ pickup, stops, vehicleType, onClose, user }: DriverMatchingProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [matchedDriver, setMatchedDriver] = useState<Driver | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [driverMarker, setDriverMarker] = useState<google.maps.Marker | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  const t = {
    en: {
      matching: 'Matching you with a driver...',
      driverFound: 'Driver found!',
      driverName: 'Driver Name',
      rating: 'Rating',
      eta: 'Estimated Time of Arrival',
      vehicle: 'Vehicle',
      registrationNumber: 'Registration Number',
      pickup: 'Pickup',
      dropoff: 'Dropoff',
      chat: 'Chat with driver',
      sendMessage: 'Send message',
      uploadImage: 'Upload image',
      close: 'Close',
    },
    de: {
      matching: 'Wir suchen einen passenden Fahrer...',
      driverFound: 'Fahrer gefunden!',
      driverName: 'Fahrername',
      rating: 'Bewertung',
      eta: 'Geschätzte Ankunftszeit',
      vehicle: 'Fahrzeug',
      registrationNumber: 'Kennzeichen',
      pickup: 'Abholung',
      dropoff: 'Ziel',
      chat: 'Chat mit Fahrer',
      sendMessage: 'Nachricht senden',
      uploadImage: 'Bild hochladen',
      close: 'Schließen',
    },
  }

  useEffect(() => {
    // Simulate API call to match driver
    const matchDriver = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000)) // Simulate 3 second delay
      const mockDriver: Driver = {
        id: '123',
        name: 'John Doe',
        rating: 4.8,
        eta: 10,
        vehicle: vehicleType,
        registrationNumber: 'AB 123 CD',
        image: '/placeholder.svg?height=100&width=100',
        location: {
          lat: 52.520008,
          lng: 13.404954
        }
      }
      setMatchedDriver(mockDriver)
      setIsLoading(false)
    }
    matchDriver()
  }, [vehicleType])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (map && matchedDriver) {
      const driverLatLng = new google.maps.LatLng(matchedDriver.location.lat, matchedDriver.location.lng)
      map.setCenter(driverLatLng)
      map.setZoom(15)

      if (!driverMarker) {
        const newDriverMarker = new google.maps.Marker({
          position: driverLatLng,
          map: map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        })
        setDriverMarker(newDriverMarker)
      } else {
        driverMarker.setPosition(driverLatLng)
      }
    }
  }, [map, matchedDriver, driverMarker])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        content: newMessage,
        timestamp: new Date(),
      }
      setMessages([...messages, userMessage])
      setNewMessage('')

      // Simulate driver response
      setTimeout(() => {
        const driverMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'driver',
          content: 'Thank you for your message. I\'ll be there soon!',
          timestamp: new Date(),
        }
        setMessages(prevMessages => [...prevMessages, driverMessage])
      }, 1000)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageMessage: Message = {
          id: Date.now().toString(),
          sender: 'user',
          content: 'Sent an image',
          timestamp: new Date(),
          image: e.target?.result as string,
        }
        setMessages([...messages, imageMessage])
      }
      reader.readAsDataURL(file)
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <div className="flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-orange-500 animate-spin mb-4" />
            <p className="text-xl font-semibold">{t[language].matching}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!matchedDriver) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex h-full">
          <div className="w-1/2 p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{t[language].driverFound}</h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage src={matchedDriver.image} alt={matchedDriver.name} />
                  <AvatarFallback>{matchedDriver.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{t[language].driverName}</p>
                  <p>{matchedDriver.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="w-6 h-6 text-orange-500 mr-2" />
                <span className="font-semibold">{t[language].rating}:</span>
                <span className="ml-2">{matchedDriver.rating}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-6 h-6 text-orange-500 mr-2" />
                <span className="font-semibold">{t[language].eta}:</span>
                <span className="ml-2">{matchedDriver.eta} minutes</span>
              </div>
              <div className="flex items-center">
                <Truck className="w-6 h-6 text-orange-500 mr-2" />
                <span className="font-semibold">{t[language].vehicle}:</span>
                <span className="ml-2">{matchedDriver.vehicle}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-orange-500 mr-2" />
                <span className="font-semibold">{t[language].registrationNumber}:</span>
                <span className="ml-2">{matchedDriver.registrationNumber}</span>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{t[language].chat}</h3>
              <div ref={chatContainerRef} className="h-64 overflow-y-auto border rounded-lg p-4 mb-4">
                {messages.map((message) => (
                  <div key={message.id} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-2 rounded-lg ${
                      message.sender === 'user' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'
                    }`}>
                      {message.image ? (
                        <img src={message.image} alt="Uploaded" className="max-w-xs rounded-lg" />
                      ) : (
                        message.content
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={t[language].sendMessage}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Button as="span">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    {t[language].uploadImage}
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="w-1/2 relative">
            <MapsLoader>
              {(mapInstance) => {
                if (mapInstance && !map) {
                  setMap(mapInstance)
                }
                return <div id="map" className="w-full h-full"></div>
              }}
            </MapsLoader>
          </div>
        </div>
        <div className="p-4 border-t">
          <Button onClick={onClose}>{t[language].close}</Button>
        </div>
      </div>
    </div>
  )
}

