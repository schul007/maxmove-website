'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MapPin, Calendar, Clock, ChevronDown, Plus, Trash2 } from 'lucide-react'
import { useAuth } from './contexts/auth-context'
import { useLanguage } from './contexts/language-context'
import DatePicker from 'react-datepicker'
import { MapsLoader } from './components/maps-loader'
import { GOOGLE_MAPS_CONFIG } from './utils/maps-config'
import "react-datepicker/dist/react-datepicker.css"
import { DriverMatching } from './components/driver-matching'
import { FeaturesSection } from './components/features-section'
import { AppsSection } from './components/apps-section'
import { VehiclesSection } from './components/vehicles-section'
import { PostDeliveryPayment } from './components/post-delivery-payment'
import { calculatePrice } from '../utils/priceCalculation'

const vehicles = [
  { id: 'vehicle', name: { en: 'Vehicle', de: 'Fahrzeug' }, description: { en: 'Select a vehicle type', de: 'Wählen Sie einen Fahrzeugtyp' } },
  { id: 'motorcycle', name: { en: 'Motorcycle', de: 'Motorrad' }, description: { en: 'Small parcels up to 20kg', de: 'Kleine Pakete bis 20kg' } },
  { id: 'car', name: { en: 'Car', de: 'Auto' }, description: { en: 'Medium-sized items up to 300kg', de: 'Mittelgroße Gegenstände bis 300kg' } },
  { id: 'van', name: { en: 'Van', de: 'Transporter' }, description: { en: 'Large items up to 1000kg', de: 'Große Gegenstände bis 1000kg' } },
  { id: 'truck', name: { en: 'Truck', de: 'LKW' }, description: { en: 'Bulky items (5.5 ton and 9 ton options)', de: 'Sperrige Gegenstände (5,5-Tonnen und 9-Tonnen Optionen)' } },
]

interface Stop {
  address: string
  lat: number
  lng: number
}

export default function Home() {
  const { user } = useAuth()
  const { language } = useLanguage()
  const [pickup, setPickup] = useState<Stop>({ address: '', lat: 0, lng: 0 })
  const [stops, setStops] = useState<Stop[]>([{ address: '', lat: 0, lng: 0 }])
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicles[0]>(vehicles[0])
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeInput, setActiveInput] = useState<'pickup' | number | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<Date>(() => {
    const now = new Date();
    now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15);
    return now;
  })
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [showDriverMatching, setShowDriverMatching] = useState(false)
  const [showPostDeliveryPayment, setShowPostDeliveryPayment] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null)
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null)
  const [showVehicles, setShowVehicles] = useState(false)

  const mapRef = useRef<google.maps.Map | null>(null)
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null)
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null)

  const t = {
    en: {
      title: 'Move anything, anytime, anywhere',
      pickupPlaceholder: 'Enter pickup location',
      stopPlaceholder: 'Enter stop location',
      addStop: 'Add another stop',
      today: 'Today',
      now: 'Now',
      seePrices: 'See prices',
      loginToBook: 'Log in to book',
      estimatedArrival: 'Estimated arrival time',
      estimatedPrice: 'Estimated Price',
      currency: '€',
      selectVehicle: 'Select a vehicle'
    },
    de: {
      title: 'Bewegen Sie alles, jederzeit, überall',
      pickupPlaceholder: 'Abholort eingeben',
      stopPlaceholder: 'Haltepunkt eingeben',
      addStop: 'Weiteren Haltepunkt hinzufügen',
      today: 'Heute',
      now: 'Jetzt',
      seePrices: 'Preise anzeigen',
      loginToBook: 'Anmelden zum Buchen',
      estimatedArrival: 'Geschätzte Ankunftszeit',
      estimatedPrice: 'Geschätzter Preis',
      currency: '€',
      selectVehicle: 'Wählen Sie ein Fahrzeug'
    },
  }

  const initMap = useCallback(() => {
    console.log('Google Maps API loaded:', !!window.google?.maps);
    if (!mapRef.current && window.google?.maps) {
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: GOOGLE_MAPS_CONFIG.defaultCenter,
        zoom: GOOGLE_MAPS_CONFIG.defaultZoom,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      })

      mapRef.current = map
      autocompleteServiceRef.current = new google.maps.places.AutocompleteService()
      placesServiceRef.current = new google.maps.places.PlacesService(map)
    }
  }, [])

  useEffect(() => {
    if (window.google?.maps) {
      initMap()
    }
  }, [initMap])

  const handleLocationInput = useCallback((input: string) => {
    if (input.length > 2 && autocompleteServiceRef.current) {
      const request = {
        input,
        componentRestrictions: { country: 'DE' }, // Restrict to Germany
        types: ['address', 'establishment', 'geocode'],
      };

      autocompleteServiceRef.current.getPlacePredictions(
        request,
        (predictions: google.maps.places.AutocompletePrediction[] | null, status: google.maps.places.PlacesServiceStatus) => {
          console.log('Autocomplete status:', status);
          console.log('Predictions:', predictions);
          if (predictions) {
            setSuggestions(predictions)
            setShowSuggestions(true)
          } else {
            setSuggestions([])
            setShowSuggestions(false)
          }
        }
      )
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [])

  const handleLocationSelect = useCallback((placeId: string, index: 'pickup' | number) => {
    if (placesServiceRef.current) {
      placesServiceRef.current.getDetails(
        { placeId },
        (place: google.maps.places.PlaceResult | null) => {
          if (place && place.formatted_address && place.geometry?.location) {
            const newStop: Stop = {
              address: place.formatted_address,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }
            if (index === 'pickup') {
              setPickup(newStop)
            } else {
              setStops(prevStops => {
                const newStops = [...prevStops]
                newStops[index as number] = newStop
                return newStops
              })
            }
            setShowSuggestions(false)

            if (mapRef.current) {
              mapRef.current.setCenter(place.geometry.location)
              mapRef.current.setZoom(15)
              new google.maps.Marker({
                position: place.geometry.location,
                map: mapRef.current,
              })
            }
          }
        }
      )
    }
  }, [])

  const addStop = () => {
    setStops([...stops, { address: '', lat: 0, lng: 0 }])
  }

  const removeStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index))
  }

  const simulateOrderCompletion = () => {
    // In a real application, this would be triggered by the driver marking the delivery as complete
    setCurrentOrderId('123456') // Replace with actual order ID
    setShowPostDeliveryPayment(true)
  }

  const handleCalculatePrice = useCallback(() => {
    if (pickup.address && stops.length > 0 && stops[0].address && selectedVehicle && selectedVehicle.id !== 'vehicle') {
      const price = calculatePrice(pickup, stops, selectedVehicle.id, selectedDate, selectedTime)
      setCalculatedPrice(price)
    } else {
      console.error('Invalid inputs for price calculation')
      setCalculatedPrice(null)
    }
  }, [pickup, stops, selectedVehicle, selectedDate, selectedTime])

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setShowDatePicker(false)
  }

  const handleTimeSelect = (time: Date) => {
    const now = new Date();
    if (time < now) {
      time = now;
    }
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  const isNow = (time: Date) => {
    const now = new Date();
    const timeDiff = Math.abs(time.getTime() - now.getTime());
    // Consider it "now" if within 15 minutes
    return timeDiff <= 15 * 60 * 1000;
  };

  const filterTime = (time: Date) => {
    const now = new Date();
    return time >= now;
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 min-h-[calc(100vh-5rem)]">
        <div className="w-full md:w-[450px] z-10 flex flex-col">
          <h1 className="text-3xl font-bold text-black my-6 px-6 flex items-center">
            {t[language].title}
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-6 flex-grow">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-3 top-3">
                  <MapPin className="w-6 h-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={pickup.address}
                  onChange={(e) => {
                    setPickup({ ...pickup, address: e.target.value })
                    handleLocationInput(e.target.value)
                  }}
                  onFocus={() => setActiveInput('pickup')}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder={t[language].pickupPlaceholder}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                  autoComplete="off"
                />
                {activeInput === 'pickup' && showSuggestions && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.place_id}
                        onClick={() => handleLocationSelect(suggestion.place_id, 'pickup')}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                      >
                        <div className="font-medium">{suggestion.structured_formatting.main_text}</div>
                        <div className="text-sm text-gray-500">{suggestion.structured_formatting.secondary_text}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {stops.map((stop, index) => (
                <div key={index} className="relative">
                  <div className="absolute left-3 top-3">
                    <MapPin className="w-6 h-6 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={stop.address}
                    onChange={(e) => {
                      const newStops = [...stops]
                      newStops[index] = { ...newStops[index], address: e.target.value }
                      setStops(newStops)
                      handleLocationInput(e.target.value)
                    }}
                    onFocus={() => setActiveInput(index)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder={t[language].stopPlaceholder}
                    className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                    autoComplete="off"
                  />
                  {stops.length > 1 && (
                    <button
                      onClick={() => removeStop(index)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                  {activeInput === index && showSuggestions && suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion.place_id}
                          onClick={() => handleLocationSelect(suggestion.place_id, index)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                        >
                          <div className="font-medium">{suggestion.structured_formatting.main_text}</div>
                          <div className="text-sm text-gray-500">{suggestion.structured_formatting.secondary_text}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={addStop}
                className="w-full flex items-center justify-center space-x-2 py-2 border-2 border-gray-200 rounded-lg hover:border-black"
              >
                <Plus className="w-5 h-5" />
                <span>{t[language].addStop}</span>
              </button>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <button
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="w-full flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>
                      {isToday(selectedDate)
                        ? t[language].today
                        : selectedDate.toLocaleDateString(language === 'en' ? 'en-US' : 'de-DE', {
                            month: 'short',
                            day: 'numeric'
                          })
                      }
                    </span>
                  </button>
                  {showDatePicker && (
                    <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-lg shadow-lg">
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateSelect}
                        inline
                        minDate={new Date()}
                        dateFormat="MMM d, yyyy"
                      />
                    </div>
                  )}
                </div>
                <div className="relative flex-1">
                  <button
                    onClick={() => setShowTimePicker(!showTimePicker)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>
                        {isNow(selectedTime)
                          ? t[language].now
                          : selectedTime.toLocaleTimeString(language === 'en' ? 'en-US' : 'de-DE', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: language === 'en'
                            })
                        }
                      </span>
                    </div>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  {showTimePicker && (
                    <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-lg shadow-lg">
                      <DatePicker
                        selected={selectedTime}
                        onChange={handleTimeSelect}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption={language === 'en' ? 'Time' : 'Zeit'}
                        dateFormat="h:mm aa"
                        filterTime={filterTime}
                        minTime={new Date()}
                        maxTime={new Date(new Date().setHours(23, 59, 0))}
                        inline
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowVehicles(!showVehicles)}
                  className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-black"
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">
                      {selectedVehicle ? selectedVehicle.name[language] : t[language].selectVehicle}
                    </span>
                  </div>
                  <ChevronDown className="w-5 h-5" />
                </button>
                {showVehicles && (
                  <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {vehicles.map((vehicle) => (
                      <button
                        key={vehicle.id}
                        onClick={() => {
                          setSelectedVehicle(vehicle)
                          setShowVehicles(false)
                        }}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                      >
                        <div>
                          <div className="font-medium">{vehicle.name[language]}</div>
                          <div className="text-sm text-gray-500">{vehicle.description[language]}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  if (!user) {
                    window.location.href = '/login'
                    return
                  }
                  handleCalculatePrice()
                  if (calculatedPrice !== null) {
                    simulateOrderCompletion()
                  }
                }}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
              >
                {user ? t[language].seePrices : t[language].loginToBook}
              </button>
              {calculatedPrice !== null && (
                <div className="mt-4 text-center">
                  <p className="text-lg font-semibold">{t[language].estimatedPrice}</p>
                  <p className="text-2xl font-bold">{calculatedPrice.toFixed(2)} {t[language].currency}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gray-200 rounded-lg relative">
          <MapsLoader>
            <div id="map" className="w-full h-full min-h-[400px] md:min-h-[calc(100vh-5rem)]"></div>
            {pickup.address && stops[0].address && (
              <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-sm text-gray-500">{t[language].estimatedArrival}</div>
                <div className="text-lg font-bold">15-20 min</div>
              </div>
            )}
          </MapsLoader>
        </div>
        {showDriverMatching && selectedVehicle && selectedVehicle.id !== 'vehicle' && (
          <DriverMatching
            pickup={pickup}
            stops={stops}
            vehicleType={selectedVehicle.name[language]}
            onClose={() => setShowDriverMatching(false)}
            user={{
              name: user?.name || 'Guest',
              image: user?.image || '/placeholder.svg?height=100&width=100'
            }}
          />
        )}
      </div>
      <FeaturesSection />
      <AppsSection />
      <VehiclesSection />
      {showPostDeliveryPayment && currentOrderId && calculatedPrice !== null && selectedVehicle && selectedVehicle.id !== 'vehicle' && (
        <PostDeliveryPayment
          orderId={currentOrderId}
          totalAmount={calculatedPrice}
          onPaymentComplete={() => {
            setShowPostDeliveryPayment(false)
            setCurrentOrderId(null)
            setCalculatedPrice(null)
          }}
        />
      )}
    </>
  )
}

