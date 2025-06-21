import { AuthProvider } from '../features/auth/authProvider'
import { CartProvider } from '../features/product/cartProvider'
import { AppRoutes } from './AppRoutes'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../features/shared'
import { CartPortalWrapper } from '../features/product/ui/global/cartPortalWrapper'

function App() {
  const location = useLocation()
  const showNavbar = ['/productos', '/perfil','/balatro', '/productosPOSTA'].includes(location.pathname)

  return (
    <AuthProvider>
      <CartProvider>
        <CartPortalWrapper/>
        {showNavbar && <Navbar/>}
        <AppRoutes/>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
