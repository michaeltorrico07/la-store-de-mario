import { useContext } from "react";
import { CartContext} from "../cartContext.tsx";
import type { CartContextType } from "../cartProvider.tsx";

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};