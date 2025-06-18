import { useApi, type UseApiResult, type UseApiOptions } from "../shared/hooks/useApi"
import { useRef } from "react"

interface Product {
  id: string
  name: string
  tags: string[]
  description: string
  image: string
  price: number
}

export const useGetAllProduct = (): UseApiResult<Product[]> => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: true,
    params: {
      method: 'GET',
      url: '/product'
    }
  })

  const { data, loading, error, cancel, handleCall } = useApi<Product[]>(paramsRef.current)

  return { data, loading, error, cancel, handleCall }
}