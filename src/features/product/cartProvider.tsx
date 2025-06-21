import { useState, useCallback, useMemo, useEffect } from 'react'
import type { Product, CartItem } from './product'
import { CartContext } from './cartContext.tsx'

export interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product) => void;
  handleAddCart: (product: Product) => (e: React.MouseEvent) => void
  removeFromCart: (productId: string) => (e: React.MouseEvent) => void;
  updateQuantity: (productId: string, quantity: number) => (e: React.MouseEvent) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
  console.log("Nuevo estado de isOpen:", isOpen);
}, [isOpen]);

  const addToCart = useCallback((product: Product)=>{
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { ...product, quantity: 1 }];
    });
  }, [])

  const handleAddCart = useCallback( (product: Product) => (e: React.MouseEvent) =>{
    e.stopPropagation()
    addToCart(product) 
   },[addToCart])


  const removeFromCart = useCallback((productId: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => (e: React.MouseEvent) => {
    e.stopPropagation()
  
    if (quantity <= 0) {
      setItems(currentItems => currentItems.filter(item => item.id !== productId))
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  },[])

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const toggleCart = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items])

  const value = useMemo(() => ({
    items,
    isOpen,
    addToCart,
    handleAddCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    getTotalItems,
    getTotalPrice
  }), [
    items,
    isOpen,
    addToCart,
    handleAddCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    getTotalItems,
    getTotalPrice
  ])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}