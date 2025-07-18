import { useCart } from '../hooks/useCart';
import { ItemCardCart } from './itemCardCart';
import { TimeSelector } from './TimeSelector';
import { useInitPointRedirect } from '../hooks/useInitPointRedirect';

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, toggleCart, getTotalPrice, availableTimeSlots, selectedTime, handleTimeSelect, canProceedToPayment} = useCart();
  
  const { generateInitPoint, loading } = useInitPointRedirect(items);

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={toggleCart}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="bg-[#303030] text-white p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Carrito de Compras</h2>
          <button 
            onClick={toggleCart}
            className="text-white hover:text-gray-300 transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8M9.5 18a1.5 1.5 0 003 0m6 0a1.5 1.5 0 003 0" />
              </svg>
              <p className="text-lg font-medium mb-2">Tu carrito está vacío</p>
              <p className="text-sm text-center">Agrega algunos productos para comenzar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Items del carrito */}
              {items.map((item) => (
                <ItemCardCart 
                  key={item.id} 
                  item={item} 
                  updateQuantity={updateQuantity} 
                  removeFromCart={removeFromCart} 
                />
              ))}
              
              {/* Selector de horario */}
              <div className="border-t pt-4 mt-4">
                <TimeSelector
                  onTimeSelect={handleTimeSelect}
                  selectedTime={selectedTime}
                  availableTimeSlots={availableTimeSlots}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-red-600">${getTotalPrice().toLocaleString()}</span>
              </div>
              
              <div className="space-y-2">
                <button 
                  onClick={generateInitPoint} 
                  disabled={!canProceedToPayment() || loading}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                    canProceedToPayment() && !loading
                      ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer hover:transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Procesando...
                    </div>
                  ) : (
                    'Proceder al Pago'
                  )}
                </button>
                
                {!canProceedToPayment() && items.length > 0 && (
                  <p className="text-xs text-gray-500 text-center">
                    Selecciona un horario de entrega para continuar
                  </p>
                )}
                
                <button 
                  onClick={clearCart}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium transition-colors"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}