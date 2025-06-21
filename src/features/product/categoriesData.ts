import type { Product } from "./product"

export const categoriesData = (products: Product[] | null) => {
  if (products == null) return null
  return [
    { id: 'todos', label: 'Todos', count: products.length },
    { id: 'comidas', label: 'Comidas', count: products.filter(p => p.tags.includes('comidas') === true).length },
    { id: 'bebidas', label: 'Bebidas', count: products.filter(p => p.tags.includes('bebidas') === true).length },
    { id: 'postres', label: 'Postres', count: products.filter(p => p.tags.includes('postres') === true).length },
    { id: 'snacks', label: 'Snacks', count: products.filter(p => p.tags.includes('snacks') === true).length }
  ]
} 
