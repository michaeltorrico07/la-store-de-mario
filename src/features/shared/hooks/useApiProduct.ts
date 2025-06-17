import { useApi, api, type UseApiCall } from './useApi'

export interface Product {
  id: string
  name: string
  tags: string[]
  description: string
  image: string
  price: number
}

const getProduct = (id: number): UseApiCall<>