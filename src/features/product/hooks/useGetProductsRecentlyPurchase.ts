import { useApi, type UseApiResult, type UseApiOptions } from "../../shared";
import { useEffect, useRef } from "react";
import type { Product } from "../product";
import { useAppDispatch } from '../../../infrastructure/redux/hooks'
import { createProductsRecentlyPurchase, resetListProductsProductsRecentlyPurchase } from '../slice'
export const useGetProductsRecentlyPurchase = (): UseApiResult<Product[]> => {
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: false,
    params: {
      method: 'GET',
      url: '/product/bulk',
    }
  });

  const { data, loading, error, cancel, handleCall, onSubmit } = useApi<Product[]>(paramsRef);
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (data !== null) {
      dispatch(createProductsRecentlyPurchase(data))
    }
  }, [data, dispatch])
  useEffect(()=>{
    if (error !== null) {
      dispatch(resetListProductsProductsRecentlyPurchase())
    }
  },[dispatch, error])
  return { data, loading, error, cancel, handleCall, onSubmit };
};
