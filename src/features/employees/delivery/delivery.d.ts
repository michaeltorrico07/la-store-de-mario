// Tipos para cada producto
export interface OrderProduct {
  name: string;
  amount: number;
  price: number;
}

// Tipos para cada pedido
export interface Order {
  code: string;
  listProducts: OrderProduct[];
  totalPrice: number;
  deliverDate: string;
  delivered: boolean;
}