import { AuthProvider } from '../features/auth/authProvider'
import { CartProvider } from '../features/product/cartProvider'
import { AppRoutes } from './AppRoutes'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../features/shared'
import { CartPortalWrapper } from '../features/product/ui/global/cartPortalWrapper'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../infrastructure/redux/store'

function App() {
  const location = useLocation()
  const showNavbar = ['/productos', '/profile', '/balatro', '/productosPOSTA'].includes(location.pathname)

  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <CartProvider>
          <CartPortalWrapper />
          {showNavbar && <Navbar />}
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </ReduxProvider>
  )
}

export default App
