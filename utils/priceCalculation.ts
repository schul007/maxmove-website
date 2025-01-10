import { Stop } from '../types/order'

// Define factors that influence the price
const BASE_PRICE = 5.00
const PRICE_PER_KM = 1.50
const VEHICLE_MULTIPLIERS = {
  motorcycle: 1,
  car: 1.2,
  van: 1.5,
  truck: 2
}

// Function to calculate distance between two points (in km)
function calculateDistance(start: Stop, end: Stop): number {
  const R = 6371 // Earth's radius in km
  const dLat = (end.lat - start.lat) * Math.PI / 180
  const dLon = (end.lng - start.lng) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  const distance = R * c
  return distance
}

// Main price calculation function
export function calculatePrice(pickup: Stop, stops: Stop[], vehicleType: string): number {
  let totalDistance = 0
  let currentStop = pickup

  // Calculate total distance
  for (const stop of stops) {
    totalDistance += calculateDistance(currentStop, stop)
    currentStop = stop
  }

  // Calculate base price
  let price = BASE_PRICE + (totalDistance * PRICE_PER_KM)

  // Apply vehicle multiplier
  price *= VEHICLE_MULTIPLIERS[vehicleType as keyof typeof VEHICLE_MULTIPLIERS] || 1

  // Round to 2 decimal places
  return Math.round(price * 100) / 100
}

