import type { Product } from "./product"

export const categoriesData = (products: Product[] ) => {
  return [
    { id: 'Todos', label: 'Todos', count: products.length },
    { id: 'Comida', label: 'Comidas', count: products.filter(p => p.category === 'Comida').length },
    { id: 'Bebida', label: 'Bebidas', count: products.filter(p => p.category === 'Bebida').length },
    { id: 'Snack', label: 'Snacks', count: products.filter(p => p.category === 'Snack').length }
  ]
} 
