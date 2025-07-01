import { useState, useEffect } from 'react';
import type { KitchenOrder, UseKitchenOrdersReturn } from '../kitchen.d';
import { useSearchearData } from './useSearchearData';

export const useKitchenOrders = (): UseKitchenOrdersReturn => {
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const { data, loading, handleCall } = useSearchearData()

  const updateOrderStatus = (orderId: string, status: KitchenOrder['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );
  };

  // Initial load
  useEffect(() => {
    setOrders(data || []);
  }, [data]);

  return {
    orders,
    loading,
    updateOrderStatus,
    refetch: handleCall
  };
};