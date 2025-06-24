import { useState, useContext } from 'react';
import type {
  UserData,
  Order,
  ExpandedSections
} from '../profile.d'
import { AuthContext } from '../../auth/authContext';



// Datos simulados de historial de pedidos
const orderHistory: Order[] = [
  {
    id: "1f3sa2",
    productos: [
      { nombre: "PRODUCTO 1", cantidad: 2, precio: 3000 },
      { nombre: "PRODUCTO 2", cantidad: 1, precio: 4500 },
      { nombre: "PRODUCTO 3", cantidad: 1, precio: 4500 }
    ],
    persona: "Adrian Soto",
    precio: 12000,
    metodo: "Efectivo",
    fecha: "12:10",
    fechaCompleta: "17 de Junio, 2025",
    estado: "Completado"
  },
  {
    id: "2g4db3",
    productos: [
      { nombre: "Pancho Clásico", cantidad: 1, precio: 4500 },
      { nombre: "Coca Cola", cantidad: 1, precio: 2000 }
    ],
    persona: "Adrian Soto",
    precio: 6500,
    metodo: "Tarjeta",
    fecha: "11:45",
    fechaCompleta: "17 de Junio, 2025",
    estado: "Completado"
  },
  {
    id: "3h5ec4",
    productos: [
      { nombre: "Pancho Especial", cantidad: 1, precio: 5500 },
      { nombre: "Torta Chocolate", cantidad: 1, precio: 2500 }
    ],
    persona: "Adrian Soto",
    precio: 8000,
    metodo: "Efectivo",
    fecha: "10:30",
    fechaCompleta: "17 de Junio, 2025",
    estado: "En preparación"
  },
  {
    id: "4k7mn5",
    productos: [
      { nombre: "Hamburguesa Completa", cantidad: 2, precio: 8500 },
      { nombre: "Papas Fritas Grandes", cantidad: 2, precio: 3500 },
      { nombre: "Coca Cola 500ml", cantidad: 2, precio: 2500 },
      { nombre: "Nuggets x10", cantidad: 1, precio: 6000 },
      { nombre: "Salsa Barbacoa", cantidad: 3, precio: 800 },
      { nombre: "Helado de Vainilla", cantidad: 1, precio: 3200 }
    ],
    persona: "Adrian Soto",
    precio: 24500,
    metodo: "Transferencia",
    fecha: "13:25",
    fechaCompleta: "18 de Junio, 2025",
    estado: "Completado"
  }
];

export const useProfile = () => {
  const authContext = useContext(AuthContext);

  // Datos simulados del usuario
  const userData: UserData = {
    name: authContext?.user?.name,
    email: authContext?.user?.email,
    dni: authContext?.user?.dni,
    lastName: authContext?.user?.lastName
  };

  const [activeTab, setActiveTab] = useState<string>('datos');
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    name: false,
    email: false,
    password: false
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [selectedTicket, setSelectedTicket] = useState<Order | null>(null);
  const [showTicket, setShowTicket] = useState<boolean>(false);

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };


  const showTicketModal = (order: Order) => {
    setSelectedTicket(order);
    setShowTicket(true);
  };

  const closeTicket = () => {
    setShowTicket(false);
    setSelectedTicket(null);
  };

  return {
    // State
    activeTab,
    expandedSections,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    selectedTicket,
    showTicket,
    userData,
    orderHistory,

    // Actions
    setActiveTab,
    toggleSection,
    setShowCurrentPassword,
    setShowNewPassword,
    setShowConfirmPassword,
    showTicketModal,
    closeTicket
  };
};