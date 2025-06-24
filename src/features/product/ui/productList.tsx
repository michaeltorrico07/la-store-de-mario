import { ProductCard } from './productCard'
import type { Product } from '../product'
import "../styles/animations.css"

interface ProductListProps {
  products: Product[]
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mensaje cuando no hay productos */}
        {  products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1h-4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-500 mb-2">No hay productos</h3>
            <p className="text-gray-400">No se encontraron productos en esta categoría</p>
          </div>
        )}
      </div>
  )
}
