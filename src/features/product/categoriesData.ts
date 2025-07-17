import type { Product } from "./product"

export const categoriesData = (products: Product[] | null) => {
  if (products == null) return null
  return [
    { id: 'Todos', label: 'Todos', count: products.length },
    { id: 'Comida', label: 'Comidas', count: products.filter(p => p.category === 'Comida').length },
    { id: 'Bebida', label: 'Bebidas', count: products.filter(p => p.category === 'Bebida').length },
    { id: 'Postre', label: 'Postres', count: products.filter(p => p.category === 'Snack').length }
  ]
} 
