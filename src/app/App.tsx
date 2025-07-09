import { AuthProvider } from '../features/auth/authProvider'
import { CartProvider } from '../features/product/cartProvider'
import { AppRoutes } from './AppRoutes'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../features/shared'
import { CartPortalWrapper } from '../features/product/ui/global/cartPortalWrapper'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from '../infrastructure/redux/store'

function App() {
  const location = useLocation()
  const showNavbar = ['/productos', '/profile', '/balatro', '/productosPOSTA'].includes(location.pathname)

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <CartProvider>
            <CartPortalWrapper />
            {showNavbar && <Navbar />}
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </PersistGate>
    </ReduxProvider>
  )
}

export default App
