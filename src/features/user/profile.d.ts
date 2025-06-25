// Tipos para los datos del usuario
export interface User {
  name?: string | undefined;
  lastName?: string | undefined
  email?: string | undefined;
  dni?: string | undefined
}

// Tipos para cada producto
export interface Product {
  name: string;
  amount: number;
  price: number;
}

// Tipos para cada pedido
export interface Order {
  id: string;
  products: Producto[];
  user: string;
  price: number;
  method: string;
  date: Date;
  delivered: boolean;
}

export interface PasswordData {
  current: string;
  new: string;
  confirm: string;
}

export interface ExpandedSections {
  name: boolean;
  email: boolean;
  password: boolean;
}

// Props para componentes
export interface OrderHistoryTabProps {
  orderHistory: Order[];
  showTicketModal: (order: Order) => void;
}

export interface TicketModalProps {
  selectedTicket: Order | null;
  showTicket: boolean;
  closeTicket: () => void;
}