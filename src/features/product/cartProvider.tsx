import { useState, useCallback, useMemo } from 'react'
import type { Product, CartItem } from './product'
import { CartContext } from './cartContext.tsx'
import { useTimeSelection } from './hooks/useTimeSelection'

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
  // Nuevas propiedades para el horario
  availableTimeSlots: any[];
  selectedTime: string | null;
  handleTimeSelect: (timeId: string) => void;
  isTimeSelected: () => boolean;
  getSelectedTimeSlot: () => any;
  canProceedToPayment: () => boolean;
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  // Hook para manejo de horarios
  const {
    availableTimeSlots,
    selectedTime,
    handleTimeSelect,
    isTimeSelected,
    getSelectedTimeSlot,
    clearSelection
  } = useTimeSelection();

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
    clearSelection(); // Limpiar selección de horario también
  }, [clearSelection]);

  const toggleCart = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items])

  // Nueva función para validar si se puede proceder al pago
  const canProceedToPayment = useCallback(() => {
    return items.length > 0 && isTimeSelected();
  }, [items.length, isTimeSelected])

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
    getTotalPrice,
    // Nuevas propiedades
    availableTimeSlots,
    selectedTime,
    handleTimeSelect,
    isTimeSelected,
    getSelectedTimeSlot,
    canProceedToPayment
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
    getTotalPrice,
    availableTimeSlots,
    selectedTime,
    handleTimeSelect,
    isTimeSelected,
    getSelectedTimeSlot,
    canProceedToPayment
  ])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}