import { useApi, type UseApiResult, type UseApiOptions } from "../shared/hooks/useApi"
import { useRef } from "react"

interface UseGetProductProps {
  id: string | undefined
}

interface Product {
  id: string
  name: string
  tags: string[]
  description: string
  image: string
  price: number
}

export const useGetProduct = ({ id }: UseGetProductProps): UseApiResult<Product> => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: true,
    params: {
      method: 'GET',
      url: '/product',
      pathParam: id? id : undefined
    }
  })

  const { data, loading, error, cancel, handleCall, onSubmit } = useApi<Product>(paramsRef)

  return { data, loading, error, cancel, handleCall, onSubmit }
}