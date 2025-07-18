import { useState, useMemo, useCallback } from "react"
import type { Product, SortBy } from "../product"

interface UseFilteredSortedProduct {
  sortedProducts: Product[]
  selectedCategory: string
  changeCategory: (category: string) => void
  sortBy: SortBy
  changeSort: (sort: SortBy) => void
}

export const useFilteredSortedProducts = (products: Product[] | null): UseFilteredSortedProduct => {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [sortBy, setSortBy] = useState<SortBy>('default')

  const changeCategory = useCallback((category: string) => {
    setSelectedCategory(category)
  }, [])

  const changeSort = useCallback((sort: SortBy) => {
    setSortBy(sort)
  }, [])

  const filtered = useMemo(() => {
    if (!products) return []
    return selectedCategory === 'Todos'
      ? products
      : products.filter(p => p.category === selectedCategory)
  }, [products, selectedCategory])

  const sortedProducts = useMemo(() => {
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price
        case 'price-desc': return b.price - a.price
        case 'name-az': return a.name.localeCompare(b.name)
        default: return 0
      }
    })
  }, [filtered, sortBy])

  return {
    sortedProducts,
    selectedCategory,
    changeCategory,
    sortBy,
    changeSort
  }
}
