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

export const useCreateBalatro = (): UseApiResult<Product> => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: false,
    params: {
      url: '/product',
      method: 'POST',
      body: {
        name: "panchubi",
        description: "un panchubi con mayonesa",
        tags: ["pancho", "panchubi", "le pongo queso y ahora es veneco", "wasa"],
        image: "https://www.ab173.com/upload/default/2024/0802/5dbb5e90e50b1b741d482a129f2d3a12.png",
        price: 2499
      }
    }  
  })

  const { data, loading, error, cancel, handleCall } = useApi<Product>(paramsRef.current)

  return { data, loading, error, cancel, handleCall }
}