import { useState, useEffect, useRef } from 'react'
import type { Order } from '../delivery'
import { useApi, type UseApiOptions } from '../../../shared'
import { getActualDeliverHour } from '../../../shared/utils';

export const useDeliveryOrders = () => {
  const actualDeliveryHour = getActualDeliverHour()
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: true,
    params: {
      method: 'GET',
      url: '/order',
      query: {
        date: actualDeliveryHour
      }
    }
  })

  const deliveryParams = useRef<UseApiOptions>({
    autoFetch: false,
    params: {
      method: 'PUT',
      url: '/order',
      pathParam: ''
    }
  })
  const handleDelivery = useApi<boolean>(deliveryParams).handleCall


  const actualDeliveryHourString = new Date(actualDeliveryHour).toLocaleString('es-AR', {
    dateStyle: 'long',
    timeStyle: 'short'
  });

  const { data, loading, handleCall } = useApi<Order[]>(paramsRef)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    console.log(data);
    return setOrders(data ?? []);
  }, [data])

  const deliverOrder = async (orderId: string) => {
    deliveryParams.current.params.pathParam = orderId
    handleDelivery()
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId))
  };

  return {
    orders,
    loading,
    hour: actualDeliveryHourString,
    deliverOrder,
    refetch: handleCall
  };
};