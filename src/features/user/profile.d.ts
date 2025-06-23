import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

// Tipos para los datos del usuario
export interface UserData {
  name?: string | undefined;
  lastName?: string | undefined
  email?: string | undefined;
  dni?: string | undefined
}

// Tipos para cada producto
export interface Producto {
  nombre: string;
  cantidad: number;
  precio: number;
}

// Tipos para cada pedido
export interface Order {
  id: string;
  productos: Producto[];
  persona: string;
  precio: number;
  metodo: string;
  fecha: string;
  fechaCompleta: string;
  estado: 'Completado' | 'Pendiente' | 'En preparación' | string;
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
export interface PersonalDataTabProps {
  userData: UserData;
  expandedSections: ExpandedSections;
  toggleSection: (section: keyof ExpandedSections) => void;
  showCurrentPassword: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  setShowCurrentPassword: (show: boolean) => void;
  setShowNewPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
}

interface DataFieldProps {
  icon: LucideIcon;
  title: string;
  value: string | undefined;
  isExpanded: boolean;
  onToggle: () => void;
  children?: ReactNode;
}

export interface OrderHistoryTabProps {
  orderHistory: Order[];
  showTicketModal: (order: Order) => void;
}

export interface TicketModalProps {
  selectedTicket: Order | null;
  showTicket: boolean;
  closeTicket: () => void;
}