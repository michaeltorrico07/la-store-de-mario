import { useApi, type UseApiResult, type UseApiOptions } from "../../shared"
import { useEffect, useRef } from "react"
import type { Product } from "../product"


export const useGetAllProduct = (): UseApiResult<Product[]> => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: true,
    params: {
      method: 'GET',
      url: '/product'
    }
  })

  const { data, loading, error, cancel, handleCall } = useApi<Product[]>(paramsRef.current)
  useEffect(()=> {
    console.log(data)
  },[data])
  return { data, loading, error, cancel, handleCall }
}