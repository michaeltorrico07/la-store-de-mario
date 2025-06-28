import { useApi, type UseApiResult, type UseApiOptions } from "../../shared"
import { useRef } from "react"
import type { Product } from "../product"


export const useGetAllProduct = (): UseApiResult<Product[]> => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: true,
    params: {
      method: 'GET',
      url: '/product'
    }
  })

  const { data, loading, error, cancel, handleCall, onSubmit } = useApi<Product[]>(paramsRef)

  return { data, loading, error, cancel, handleCall, onSubmit }
}