import type { Product } from "./product"

export const categoriesData = (products: Product[] | null) => {
  if (products == null) return null
  return [
    { id: 'todos', label: 'Todos', count: products.length },
    { id: 'comidas', label: 'Comidas', count: products.filter(p => p.category === 'Comida').length },
    { id: 'bebidas', label: 'Bebidas', count: products.filter(p => p.category === 'Bebida').length },
    { id: 'postres', label: 'Postres', count: products.filter(p => p.category === 'Snack').length },
    { id: 'snacks', label: 'Snacks', count: products.filter(p => p.category === 'Carpincho').length }
  ]
} 
