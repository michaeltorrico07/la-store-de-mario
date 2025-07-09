import { useApi, type UseApiResult, type UseApiOptions } from "../shared/hooks/useApi"
import {  useRef } from "react"
import type { ProductFormDataPartial } from "./schemaProduct"

export const useUse = (): UseApiResult<ProductFormDataPartial> => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: false,
    params: {
      method: 'PUT',
      url: '/product'
    }
  })

  const { data, loading, error, cancel, handleCall, onSubmit } = useApi<ProductFormDataPartial>(paramsRef)

  return { data, loading, error, cancel, handleCall, onSubmit}
}