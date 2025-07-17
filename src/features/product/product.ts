export type SortBy = 'default' | 'price-asc' | 'price-desc' | 'name-az';
export interface CartItem extends Product {
  quantity: number;
}
export interface Product {
  id: string
  name: string
  description: string
  category: 'Comida' | 'Bebida' | 'Snack'
  image: string
  price: number
  inMenu: boolean
}