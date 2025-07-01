import { useApi, type UseApiResult, type UseApiOptions } from "../../../shared/hooks/useApi"
import { useRef } from "react"
import type { KitchenOrder } from "../kitchen"

export const useSearchearData = (): UseApiResult<KitchenOrder[]> => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: true,
    params: {
      method: 'GET',
      url: '/order/kitchen'
    }
  })

  const { data, loading, error, cancel, handleCall, onSubmit } = useApi<KitchenOrder[]>(paramsRef)
  console.log(data);
  
  return { data, loading, error, cancel, handleCall, onSubmit}
}