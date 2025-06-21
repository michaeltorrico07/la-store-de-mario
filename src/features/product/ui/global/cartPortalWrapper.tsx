import { useCart } from '../../hooks/useCart'
import { Portal } from '../../../shared/utils/'
import { Cart } from '../cart'

export const CartPortalWrapper = () => {
  const { isOpen } = useCart()

  if (!isOpen) return null

  return (
    <Portal id="cart-portal">
      <Cart />
    </Portal>
  )
}