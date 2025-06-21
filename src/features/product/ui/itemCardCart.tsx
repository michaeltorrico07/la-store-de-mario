import type { CartItem } from "../product"

interface ItemCardCartProps {
  item: CartItem
  updateQuantity: (productId: string, quantity: number) => (e: React.MouseEvent) => void
  removeFromCart: (productId: string) => (e: React.MouseEvent) => void
}

export const ItemCardCart = ({item, updateQuantity, removeFromCart}: ItemCardCartProps) => {
  return (
    <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
          <img 
            src="/wasa.png" 
            alt={item.name}
            className="w-12 h-12 object-cover rounded"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
          <p className="text-sm text-gray-600 capitalize">{item.tags}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-red-600">${item.price.toLocaleString()}</span>
            
            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              
              <button
                onClick={updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium text-gray-700">
              Subtotal: ${(item.price * item.quantity).toLocaleString()}
            </span>
            
            <button
              onClick={removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 transition-colors p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
