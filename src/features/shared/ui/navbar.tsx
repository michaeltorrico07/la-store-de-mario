import { useCart } from '../../product/hooks/useCart'
import { useAuthContext } from '../../auth/hooks/useAuthContext'
import { useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'

export const Navbar = () => {
  const { user } = useAuthContext()
  const { toggleCart, getTotalItems } = useCart()
  const location = useLocation()

  useEffect(()=> {console.log(user)}, [user])

  // Solo mostrar el carrito en esta ruta
  const showCart = location.pathname === '/productos'

  return (
    <nav className="bg-[#303030] text-white fixed top-0 left-0 right-0 z-50 drop-shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">

          {/* Logo y nombre - Lado izquierdo */}
          <div className="flex items-center space-x-3 justify-self-start">
            <div className="w-8 h-8 rounded overflow-hidden">
              <img src="/Logo.png" alt="LogoMario" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-base whitespace-nowrap">Otto Krause</h1>
              <p className="text-xs text-gray-300 -mt-1 whitespace-nowrap">FastFood</p>
            </div>
          </div>

          {/* Navegación central */}
          <div className="flex items-center justify-center space-x-8 lg:space-x-12">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors font-medium whitespace-nowrap">
              Inicio
            </Link>
            <Link to="/productos" className="text-white hover:text-gray-300 transition-colors font-medium whitespace-nowrap">
              Productos
            </Link>
            <Link to="/profile" className="text-white hover:text-gray-300 transition-colors font-medium whitespace-nowrap">
              Perfil
            </Link>
          </div>

          {/* Usuario y Carrito - Lado derecho */}
          <div className="flex items-center space-x-3 justify-self-end">

            {/* ✅ Mostrar solo si estamos en /productosPOSTA */}
            {showCart && (
              <button
                onClick={toggleCart}
                className="cursor-pointer relative p-2 text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8M9.5 18a1.5 1.5 0 003 0m6 0a1.5 1.5 0 003 0" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            )}

            {/* Usuario */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-white font-medium whitespace-nowrap hidden sm:inline">{user.name}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
