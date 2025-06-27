import { useRef } from 'react';
import type { Order } from '../profile'
import { useApi, type UseApiResult, type UseApiOptions } from '../../shared'

export const useUserOrders = (): UseApiResult<Order[]> => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: false,
    params: {
      method: 'GET',
      url: '/order/user'
    }
  })

  const { data, loading, error, cancel, handleCall } = useApi<Order[]>(paramsRef.current)
  
  return { data, loading, error, cancel, handleCall }
};