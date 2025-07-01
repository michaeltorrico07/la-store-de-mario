export interface KitchenOrder {
  id: string;
  quantity: number;
  product: string;
  deliveryTime: Date;
  customer: string;
  status: 'pending' | 'unit_confirmed' | 'total_confirmed';
  orderTime: string;
}

export interface OrderCardProps {
  order: KitchenOrder;
  onUnitConfirm: (orderId: string) => void;
  onTotalConfirm: (orderId: string) => void;
}

export interface OrdersListProps {
  orders: KitchenOrder[];
  onUnitConfirm: (orderId: string) => void;
  onTotalConfirm: (orderId: string) => void;
  loading: boolean;
  onRefresh: () => void;
}

export interface KitchenHeaderProps {
  currentTime: Date;
}

export interface UseKitchenOrdersReturn {
  orders: KitchenOrder[];
  loading: boolean;
  updateOrderStatus: (orderId: string, status: KitchenOrder['status']) => void;
  refetch: () => void;
}

export interface ConfirmationButtonProps {
  onClick: () => void;
  disabled: boolean;
  confirmed: boolean;
  label: string;
  confirmedLabel: string;
}