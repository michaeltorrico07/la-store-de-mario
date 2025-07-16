import { useState } from "react"
import { type Product } from "../product"
import { useCart } from "../hooks/useCart"

interface ProductCartProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCartProps) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const { handleAddCart } = useCart()

  return (
    <div className="relative w-full h-80 sm:h-96 perspective-1000">
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Frente de la carta */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="relative h-40 sm:h-48 bg-gray-100 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <img 
                src={`${product.image}`} 
                alt="Mario" 
                className="w-80 h-80 object-cover"
              />
            </div>
          </div>
          <div className="p-3 sm:p-4 flex flex-col h-40 sm:h-48">
            <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1 sm:mb-2 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-red-600 mb-1 sm:mb-2">
              ${product.price.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 flex-1 overflow-hidden">
              {product.description}
            </p>
          </div>
        </div>

        {/* Reverso de la carta */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl overflow-hidden">
          <div 
            className="w-full h-full relative flex flex-col justify-center items-center text-white p-4 sm:p-6"
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)'
            }}
          >
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white/30 bg-white/20 flex items-center justify-center">
              <img 
                src="/Logo2.png" 
                alt="MarioLogoCard" 
                className="w-14 h-14 sm:w-18 sm:h-18 object-cover" 
              />
            </div>
            
            <div className="text-center w-full max-w-full">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 line-clamp-1">
                {product.name}
              </h3>
              <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm opacity-90 capitalize">
                  Categoría: {product.category}
                </p>
              </div>
              <div className="mb-3 sm:mb-4 max-h-16 sm:max-h-20 overflow-hidden">
                <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                  {product.description.length > 80 
                    ? `${product.description.substring(0, 80)}...` 
                    : product.description
                  }
                </p>
              </div>
              
              <button 
                onClick={handleAddCart(product)}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-white/30 transition-all duration-200 text-xs sm:text-sm font-medium w-full max-w-48 hover:scale-105 active:scale-95 cursor-pointer"
              >
                🛒 Agregar al Carrito
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 overflow-hidden pointer-events-none">
              <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                <path d="M0,50 Q100,20 200,50 T400,50 L400,100 L0,100 Z" fill="rgba(255,255,255,0.1)"/>
                <path d="M0,60 Q100,30 200,60 T400,60 L400,100 L0,100 Z" fill="rgba(255,255,255,0.05)"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
