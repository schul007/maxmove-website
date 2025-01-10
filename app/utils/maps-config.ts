export const GOOGLE_MAPS_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  libraries: ['places'],
  defaultCenter: { lat: 51.5074, lng: -0.1278 }, // London as default center
  defaultZoom: 13,
}

export function validateMapsConfig() {
  if (!GOOGLE_MAPS_CONFIG.apiKey) {
    throw new Error(
      'Google Maps API key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file'
    )
  }
  
  if (GOOGLE_MAPS_CONFIG.apiKey === 'your_api_key_here') {
    throw new Error(
      'Please replace the placeholder API key with your actual Google Maps API key'
    )
  }
}

