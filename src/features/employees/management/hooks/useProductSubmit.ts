import { useApi, type UseApiOptions } from "../../../shared"
import { useRef } from "react"
import type { NewProductSchema } from "../schemas/productSchema"

export const useProductSubmit = () => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: false,
    params: {
      url: '/product',
      method: 'POST',
      headers: { "Content-Type": "multipart/form-data" }
    }
  })

  const { data, error, onSubmit } = useApi<NewProductSchema>(paramsRef);

  return { data, error, onSubmit }
}