'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { GOOGLE_MAPS_CONFIG, validateMapsConfig } from '../utils/maps-config'

interface MapsLoaderProps {
  children: (map: google.maps.Map | null) => React.ReactNode
}

export function MapsLoader({ children }: MapsLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)

  useEffect(() => {
    try {
      validateMapsConfig()

      // Check if Google Maps is already loaded
      if (window.google?.maps) {
        setIsLoading(false)
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=${GOOGLE_MAPS_CONFIG.libraries.join(',')}`
      script.async = true
      script.defer = true
      
      script.onload = () => {
        setIsLoading(false)
      }

      script.onerror = () => {
        setError('Failed to load Google Maps. Please try again later.')
      }

      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }, [])

  useEffect(() => {
    if (!isLoading && !error && !map) {
      const newMap = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: GOOGLE_MAPS_CONFIG.defaultCenter,
        zoom: GOOGLE_MAPS_CONFIG.defaultZoom,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      })
      setMap(newMap)
    }
  }, [isLoading, error, map])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <p className="text-sm text-gray-500">
          Please check your API key configuration and make sure you have enabled the necessary Google Maps APIs
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return <>{children(map)}</>
}

