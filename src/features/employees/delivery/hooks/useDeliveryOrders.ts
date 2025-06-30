import { useState, useEffect } from 'react';
import type { Order } from '../delivery';

// Mock data 
const mockOrders: Order[] = [
  {
    id: "1f3sa2",
    products: [
      { name: "PRODUCTO 1", amount: 1 },
      { name: "PRODUCTO 2", amount: 1 },
      { name: "PRODUCTO 3", amount: 1 }
    ],
    customer: "Adrian Soto",
    price: 12000,
    pickupTime: "12:10",
    status: "pending"
  },
  {
    id: "2k4mb7",
    products: [
      { name: "Hamburguesa Clásica", amount: 2 },
      { name: "Papas Fritas", amount: 1 }
    ],
    customer: "María González",
    price: 8500,
    pickupTime: "12:25",
    status: "pending"
  },
  {
    id: "5p9xc1",
    products: [
      { name: "Pizza Margherita", amount: 1 }
    ],
    customer: "Carlos López",
    price: 15000,
    pickupTime: "12:40",
    status: "ready"
  }
];

export const useDeliveryOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders 
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      //llamada a la API
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      setOrders(mockOrders);
      
    } catch (err) {
      setError('Error al cargar las órdenes');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Deliver order
  const deliverOrder = async (orderId: string) => {
    try {
      // Llamada a la API 
      
      setOrders(prev => prev.filter(order => order.id !== orderId));
      
    } catch (err) {
      setError('Error al entregar la orden');
      console.error('Error delivering order:', err);
    }
  };

  // Initial load
  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    deliverOrder,
    refetch: fetchOrders
  };
};