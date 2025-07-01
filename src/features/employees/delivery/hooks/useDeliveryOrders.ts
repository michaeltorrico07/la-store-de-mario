import { useState, useEffect } from 'react';
import type { Order } from '../delivery';
import { useSearchearData } from './useSearchearData';

export const useDeliveryOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { loading, data, handleCall } = useSearchearData()

  // Deliver order
  const deliverOrder = async (orderCode: string) => {
    try {
      setOrders(prev => prev.filter(order => order.code !== orderCode));
    } catch (err) {
      setError('Error al entregar la orden');
      console.error('Error delivering order:', err);
    }
  };

  // Initial load
  useEffect(() => {
    const now = new Date();

    setOrders((data ?? []).filter(order => new Date(order.deliverDate) >= now));
  }, [data]);

  return {
    orders,
    loading,
    error,
    deliverOrder,
    refetch: handleCall
  };
};