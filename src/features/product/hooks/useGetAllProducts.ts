import { useApi, type UseApiResult, type UseApiOptions } from "../../shared"
import { useEffect, useRef } from "react"
import type { Product } from "../product"
import { useAppDispatch, useAppSelector } from '../../../infrastructure/redux/hooks'
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
  const storedProducts = useAppSelector(state => state.products.products)

  useEffect(()=>{
    if (data && storedProducts.length === 0) {
      dispatch(createListProducts({ products: data }))

    }
  },[data, dispatch, storedProducts.length])

  return { data, loading, error, cancel, handleCall, onSubmit }
}