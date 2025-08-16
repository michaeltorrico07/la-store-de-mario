// Tipos para cada producto
export interface OrderProduct {
  name: string;
  amount: number
  price: number
  id: string
}

// Tipos para cada pedido
export interface Order {
  id: string
  code: string;
  listProducts: OrderProduct[];
  totalPrice: number;
  deliverDate: string;
  delivered: boolean;
}