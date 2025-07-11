import { getActualDeliverHour, useApi, type UseApiOptions } from '../../../shared'
import { useAppSelector } from '../../../../infrastructure/redux/hooks'
import { loadProducts, amountConfirm } from '../slice'
import { useRef, useState } from 'react'
import type { KitchenProduct } from '../kitchen'
import { useDispatch } from 'react-redux'

export const useKitchenProducts = () => {
  const actualDeliverHour = getActualDeliverHour()
  const kitchenState = useAppSelector(state => state.kitchen)
  const paramsRef = useRef<UseApiOptions>({
    autoFetch: false,
    params: {
      url: '/order/kitchen',
      method: 'GET',
      query: {
        date: actualDeliverHour
      }
    }
  })
  const { data, loading, handleCall } = useApi<KitchenProduct[]>(paramsRef)

  const [ kitchenProducts, setKitchenProducts ] = useState<KitchenProduct[]>([])

  const dispatch = useDispatch()
  if (!kitchenState.deliverHour || kitchenState.deliverHour != actualDeliverHour){
    handleCall()
    dispatch(loadProducts({ deliverHour: actualDeliverHour, products: data ?? [] }))
    setKitchenProducts(data ?? [])
  } else {
    setKitchenProducts(kitchenState.products)
  }

  const handleConfirm = (name: string, amount: number) =>{
    dispatch(amountConfirm({ name, amount }))
  }

  return { kitchenProducts, loading, handleConfirm }
}