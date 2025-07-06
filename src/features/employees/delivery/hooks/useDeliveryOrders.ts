import { useState, useEffect, useRef } from 'react'
import type { Order } from '../delivery'
import { useApi, type UseApiOptions } from '../../../shared'

const getActualDeliveryHour = () => {
  const actualHour = new Date()

  const deliveryHours = [
    '09:00',
    '10:40',
    '12:10',
    '12:50',
    '14:50',
    '16:20'
  ];

  const pad = (n: number) => n.toString().padStart(2, '0');

  const today = new Date(
    actualHour.getFullYear(),
    actualHour.getMonth(),
    actualHour.getDate()
  );

  const actualMinutes = actualHour.getHours() * 60 + actualHour.getMinutes();

  let closest = deliveryHours[0];
  let minDiff = Infinity;

  deliveryHours.map(hourStr => {
    const [h, m] = hourStr.split(':').map(Number);
    const minutes = h * 60 + m;
    const diff = Math.abs(minutes - actualMinutes);
    return { hourStr, diff };
  }).forEach(({ hourStr, diff }) => {
    if (diff < minDiff) {
      minDiff = diff;
      closest = hourStr;
    }
  });

  const [closestHour, closestMinute] = closest.split(':');
  const formattedActualDeliveryHour = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}T${closestHour}:${closestMinute}:00`;

  return formattedActualDeliveryHour;
}

export const useDeliveryOrders = () => {
  const actualDeliveryHour = getActualDeliveryHour()
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