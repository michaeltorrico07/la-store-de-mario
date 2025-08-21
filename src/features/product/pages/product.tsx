import { useFilteredSortedProducts, useGetAllProduct } from '../hooks'
import { ProductList, SortFilter, CategoryFilter, Carousel } from '../ui'
import { categoriesData } from '../categoriesData'
import { useAppSelector } from '../../../infrastructure/redux/hooks'
import { useEffect, useState } from 'react'
import { useGetProductsRecentlyPurchase } from '../hooks/useGetProductsRecentlyPurchase'
import { useAuthContext } from '../../auth/hooks/useAuthContext';
import { useUserOrders } from '../../user/hooks'
import { useAppDispatch } from '../../../infrastructure/redux/hooks'

export const ProductListContainer = () => {
  const storedProducts = useAppSelector(state => state.products.products ?? [])
  const storedProductsRecentlyPurchase = useAppSelector(state => state.products.productsRecentlyPurchase ?? [])
  const { data: ordersData, handleCall } = useUserOrders()
  useGetAllProduct(true)
  const productsToUse = storedProducts
  const productsProductsRecentlyPurchaseToShow = storedProductsRecentlyPurchase
  const {sortedProducts, inMenuProducts, selectedCategory, changeCategory, changeSort, sortBy} = useFilteredSortedProducts(productsToUse)
  const categories = categoriesData(inMenuProducts)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const { loading } = useAuthContext()
  const { onSubmit } = useGetProductsRecentlyPurchase()
  const dispath = useAppDispatch()
  useEffect(() => {
    if (loading === false) {
      handleCall();
    }
  }, [handleCall, loading]);

  useEffect(() => {
    if (ordersData !== null) {
      const allProductIds = ordersData.flatMap(order =>
        order.listProducts.map(product => product.idProduct)
      )
      const uniqueProductIds = Array.from(new Set(allProductIds)).slice(0, 10)

      if (uniqueProductIds.length > 0) {
        const productIdsString = uniqueProductIds.join(',')
        const productsQuery = { ids: productIdsString }
        onSubmit(productsQuery)
      }
    }
  }, [ordersData, onSubmit, dispath])


  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return windowWidth <= 640 ? (
    <div className='mt-5'>
      <div className='space-y-5'>
        {categories.map(category => {
          const productsByCategory = productsToUse.filter(p => p.category === category.id)
          if (productsByCategory.length === 0) return null;

          return (
            <div key={category.id} className="mb-8 ">
              <div className='pl-4 font-bold text-xl mb-2'>{category.label}</div>
              <Carousel data={productsByCategory} />
            </div>
          )
        })}
        {productsProductsRecentlyPurchaseToShow && productsProductsRecentlyPurchaseToShow.length > 0 && (
          <div>
            <div className='pl-4 font-bold text-xl mb-2'>Compras recientes</div>
            <Carousel data={productsProductsRecentlyPurchaseToShow} />
          </div>
        )}
      </div>
    </div>
    ) : (
      <>
        <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
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
