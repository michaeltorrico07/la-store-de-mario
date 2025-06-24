import { useEffect, useState, useCallback } from 'react';
import { api } from '../../../infrastructure/services';
import { isAxiosError } from 'axios';
import type { Order } from '../profile'

export const useUserOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/order/user'); // El interceptor ya añade el ID
      setOrders(response.data.data);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || 'Error al obtener órdenes');
      } else {
        setError('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders, // para usarlo manualmente desde el componente padre
  };
};