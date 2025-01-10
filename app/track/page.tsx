'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapsLoader } from '../components/maps-loader';
import { useLanguage } from '../contexts/language-context';
import { Loader2, MapPin, Package } from 'lucide-react';

const OrderStatus = {
  PENDING: 'pending',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
};

interface Order {
  id: string;
  status: string;
  driverLocation: { lat: number; lng: number };
  destination: { lat: number; lng: number };
}

function TrackOrderPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [driverMarker, setDriverMarker] = useState<google.maps.Marker | null>(null);
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { language } = useLanguage();

  const t = {
    en: {
      title: 'Track Your Order',
      orderNotFound: 'Order not found',
      status: {
        [OrderStatus.PENDING]: 'Pending',
        [OrderStatus.PICKED_UP]: 'Picked Up',
        [OrderStatus.IN_TRANSIT]: 'In Transit',
        [OrderStatus.DELIVERED]: 'Delivered',
      },
      estimatedArrival: 'Estimated arrival',
    },
    de: {
      title: 'Verfolgen Sie Ihre Bestellung',
      orderNotFound: 'Bestellung nicht gefunden',
      status: {
        [OrderStatus.PENDING]: 'Ausstehend',
        [OrderStatus.PICKED_UP]: 'Abgeholt',
        [OrderStatus.IN_TRANSIT]: 'Unterwegs',
        [OrderStatus.DELIVERED]: 'Geliefert',
      },
      estimatedArrival: 'Geschätzte Ankunft',
    },
  };

  useEffect(() => {
    if (orderId) {
      // Simulating API call to fetch order details
      const fetchOrder = async () => {
        // In a real application, you would fetch the order details from your backend
        const mockOrder: Order = {
          id: orderId,
          status: OrderStatus.IN_TRANSIT,
          driverLocation: { lat: 52.520008, lng: 13.404954 }, // Berlin coordinates
          destination: { lat: 52.530008, lng: 13.414954 }, // Nearby location
        };
        setOrder(mockOrder);
      };
      fetchOrder();
    }
  }, [orderId]);

  useEffect(() => {
    if (!map || !order) return;

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(order.driverLocation);
    bounds.extend(order.destination);
    map.fitBounds(bounds);

    if (!driverMarker) {
      const newDriverMarker = new google.maps.Marker({
        position: order.driverLocation,
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#4285F4',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });
      setDriverMarker(newDriverMarker);
    } else {
      driverMarker.setPosition(order.driverLocation);
    }

    new google.maps.Marker({
      position: order.destination,
      map: map,
      icon: {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 5,
        fillColor: '#DB4437',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
      },
    });
  }, [map, order, driverMarker]);

  if (!orderId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">No order ID provided.</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">{t[language].title}</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
              <p className="text-lg font-medium text-orange-600">
                {t[language].status[order.status]}
              </p>
            </div>
            <div className="h-96 mb-8">
              <MapsLoader>
                {(mapInstance) => {
                  if (mapInstance && !map) {
                    setMap(mapInstance);
                  }
                  return <div id="map" className="w-full h-full rounded-lg"></div>;
                }}
              </MapsLoader>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-orange-500 mr-2" />
                <span>{t[language].estimatedArrival}: 15-20 min</span>
              </div>
              <div className="flex items-center">
                <Package className="w-6 h-6 text-orange-500 mr-2" />
                <span>2 items</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackOrderPage />
    </Suspense>
  );
}
