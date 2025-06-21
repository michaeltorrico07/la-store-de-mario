import { useState } from 'react'
import { productsData, type Product } from '../product'
import { useFilteredSortedProducts } from '../hooks'
import { ProductList, SortFilter, CategoryFilter } from '../ui'

import { categoriesData } from '../categoriesData'


export const ProductListContainer = () => {
  const [products] = useState<Product[]>(productsData);
  const {sortedProducts, selectedCategory, changeCategory, changeSort, sortBy} = useFilteredSortedProducts(products)
  const categories = categoriesData(products)
  return (
    <>

      <div className="bg-white border-b border-gray-200 sticky top-16 z-20 pt-4">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Productos</h1>
          
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={changeCategory}
          />
          
          <SortFilter 
            sortBy = { sortBy }
            onSortChange = { changeSort }
          />
        </div>
      </div>

      <ProductList products={sortedProducts} />
    </>
  )
}
