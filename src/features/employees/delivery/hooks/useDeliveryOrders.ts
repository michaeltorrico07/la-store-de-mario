import { useState, useEffect, useRef } from 'react';
import type { Order } from '../delivery';
import { useApi, type UseApiOptions } from '../../../shared';

export const useDeliveryOrders = () => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: true,
    params: {
      method: 'GET',
      url: '/order',
      body: {
        date: "hoy unsa"
      }
    }
  })

  const { data, loading, handleCall } = useApi<Order[]>(paramsRef)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    return setOrders(data ?? []);
  }, [data])
  
  const deliverOrder = async (orderCode: string) => {
    try {
      setOrders(prev => prev.filter(order => order.code !== orderCode));
    } catch (err) {
      console.error('Error delivering order:', err);
    }
  };

  return {
    orders,
    loading,
    deliverOrder,
    refetch: handleCall
  };
};