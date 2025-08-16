// Tipos para los datos del usuario
export interface User {
  name?: string | undefined;
  lastName?: string | undefined
  email?: string | undefined;
}

// Tipos para cada producto
export interface OrderProduct {
  name: string;
  amount: number;
  price: number;
  idProduct: string
}

// Tipos para cada pedido
export interface Order {
  code: string;
  listProducts: OrderProduct[];
  totalPrice: number;
  deliverDate: Date;
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

export interface TicketModalProps {
  selectedTicket: Order | null;
  showTicket: boolean;
  closeTicket: () => void;
}