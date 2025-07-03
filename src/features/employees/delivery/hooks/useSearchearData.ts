import { useApi, type UseApiResult, type UseApiOptions } from "../../../shared/hooks/useApi"
import { useEffect, useRef } from "react"
import type { Order } from "../delivery"

export const useSearchearData = (): UseApiResult<Order[]> => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: true,
    params: {
      method: 'GET',
      url: '/order',
      body: {
        date: "hoy anaseh"
      },
      query: {
        date: "hoy unsa"
      },
      pathParam: "asdasdasdsdad"
    }
  })

  const { data, loading, error, cancel, handleCall, onSubmit } = useApi<Order[]>(paramsRef)
  
  useEffect(()=> {
    console.log(error)
  }, [error])
  
  return { data, loading, error, cancel, handleCall, onSubmit}
}