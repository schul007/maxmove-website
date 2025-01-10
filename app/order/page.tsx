'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Calendar, Clock, Truck } from 'lucide-react'

export default function OrderPage() {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [service, setService] = useState('motorcycle')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log({ pickup, dropoff, service, date, time })
    // Redirect to tracking page with a mock order ID
    router.push('/track?orderId=123456')
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl font-bold mb-8">Deliver Now</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border p-2 rounded">
            <MapPin className="text-orange-500 mr-2" />
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Pickup location"
              className="w-full p-2 outline-none"
              required
            />
          </div>
          <div className="flex items-center border p-2 rounded">
            <MapPin className="text-orange-500 mr-2" />
            <input
              type="text"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Dropoff location"
              className="w-full p-2 outline-none"
              required
            />
          </div>
          <div className="flex items-center border p-2 rounded">
            <Truck className="text-orange-500 mr-2" />
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full p-2 outline-none"
            >
              <option value="motorcycle">Motorcycle</option>
              <option value="car">Car</option>
              <option value="van">Van</option>
              <option value="truck">Truck</option>
            </select>
          </div>
          <div className="flex items-center border p-2 rounded">
            <Calendar className="text-orange-500 mr-2" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 outline-none"
              required
            />
          </div>
          <div className="flex items-center border p-2 rounded">
            <Clock className="text-orange-500 mr-2" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 outline-none"
              required
            />
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600">
            Place Order
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-lg">
        {/* In a real app, you would integrate a map component here */}
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          Map Interface
        </div>
      </div>
    </div>
  )
}

