import { useApi, type UseApiResult, type UseApiOptions } from "../../shared"
import { useEffect, useRef } from "react"
import type { Product } from "../product"
import { useAppDispatch } from '../../../infrastructure/redux/hooks'
import { createListProducts } from '../slice'

export const useGetAllProduct = (): UseApiResult<Product[]> => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: true,
    params: {
      method: 'GET',
      url: '/product'
    }
  })

  const { data, loading, error, cancel, handleCall, onSubmit } = useApi<Product[]>(paramsRef)
  const dispatch = useAppDispatch()
  useEffect(()=>{
    if (data !== null) {
      dispatch(createListProducts(data))
    }
  },[data, dispatch])

  return { data, loading, error, cancel, handleCall, onSubmit }
}
