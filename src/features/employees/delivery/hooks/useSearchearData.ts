import { useApi, type UseApiResult, type UseApiOptions } from "../../../shared/hooks/useApi"
import { useRef } from "react"
import type { Order } from "../delivery"

export const useSearchearData = (): UseApiResult<Order[]> => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: true,
    params: {
      method: 'GET',
      url: '/order'
    }
  })

  const { data, loading, error, cancel, handleCall, onSubmit } = useApi<Order[]>(paramsRef)
  
  return { data, loading, error, cancel, handleCall, onSubmit}
}