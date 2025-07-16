export interface Product {
  id: string
  name: string
  description: string
  category: 'Comida' | 'Bebida' | 'Snack'
  image: string
  price: number
  inMenu: boolean
}

export type NewProduct = Omit<Product, 'id'>