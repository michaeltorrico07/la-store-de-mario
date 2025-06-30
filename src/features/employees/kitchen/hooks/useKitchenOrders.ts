import { useState, useEffect } from 'react';
import type { KitchenOrder, UseKitchenOrdersReturn } from '../kitchen.d';

// Datos simulados
const MOCK_ORDERS: KitchenOrder[] = [
  {
    id: 'ORD-001',
    quantity: 2,
    product: 'Hamburguesa Clásica',
    deliveryTime: '14:30',
    customer: 'Juan Pérez',
    status: 'pending',
    orderTime: '14:00'
  },
  {
    id: 'ORD-002',
    quantity: 1,
    product: 'Pizza Margherita',
    deliveryTime: '14:45',
    customer: 'María García',
    status: 'pending',
    orderTime: '14:10'
  },
  {
    id: 'ORD-003',
    quantity: 3,
    product: 'Sandwich de Pollo',
    deliveryTime: '15:00',
    customer: 'Carlos López',
    status: 'pending',
    orderTime: '14:20'
  },
  {
    id: 'ORD-004',
    quantity: 1,
    product: 'Ensalada César',
    deliveryTime: '14:35',
    customer: 'Ana Martínez',
    status: 'unit_confirmed',
    orderTime: '14:05'
  }
];

export const useKitchenOrders = (): UseKitchenOrdersReturn => {
  const [orders, setOrders] = useState<KitchenOrder[]>(MOCK_ORDERS);
  const [isLoading] = useState(false);

  const updateOrderStatus = (orderId: string, status: KitchenOrder['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );
  };

  // Simular actualizaciones automáticas cada 30 segundos (opcional)
  useEffect(() => {
    const interval = setInterval(() => {
      // Aquí hacer una llamada al backend para obtener nuevos pedidos
      console.log('Checking for new orders...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    orders,
    isLoading,
    updateOrderStatus
  };
};