import { useRef } from 'react';
import type { Order } from '../profile'
import { useApi, type UseApiResult, type UseApiOptions } from '../../shared'

export const useUserOrders = (firebaseisReady:boolean): UseApiResult<Order[]> => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: !firebaseisReady,
    params: {
      method: 'GET',
      url: '/order/user'
    }
  })

  const { data, loading, error, cancel, handleCall, fetch } = useApi<Order[]>(paramsRef.current)

  return { data, loading, error, cancel, handleCall, fetch }
};