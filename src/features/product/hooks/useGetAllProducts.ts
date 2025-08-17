import { useApi, type UseApiResult, type UseApiOptions } from "../../shared"
import { useEffect, useRef } from "react"
import type { Product } from "../product"
import { useAppDispatch } from '../../../infrastructure/redux/hooks'
import { createListProducts } from '../slice'

export const useGetAllProduct = (onlyInMenu?: boolean): UseApiResult<Product[]> => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: true,
    params: {
      method: 'GET',
      url: '/product',
      query: {
        onlyInMenu: onlyInMenu ?? false
      }
    }
  })

  const { data, loading, error, cancel, handleCall, onSubmit } = useApi<Product[]>(paramsRef)
  const dispatch = useAppDispatch()
  useEffect(()=>{ console.log(data, paramsRef) },[data])
  useEffect(()=>{
    if (data !== null && onlyInMenu) {
      dispatch(createListProducts(data))
    }
  },[data, dispatch, onlyInMenu])

  return { data, loading, error, cancel, handleCall, onSubmit }
}
