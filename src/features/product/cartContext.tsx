import { createContext } from 'react';
import type { CartContextType } from './cartProvider';

export const CartContext = createContext<CartContextType | null>(null);
