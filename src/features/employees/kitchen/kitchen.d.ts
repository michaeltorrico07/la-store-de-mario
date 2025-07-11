export interface KitchenProduct {
  name: string
  amount: number
  amountConfirmed: number
}

export interface KitchenOrder {
  id: string;
  quantity: number;
  product: string;
  deliveryTime: Date;
  customer: string;
  status: 'pending' | 'unit_confirmed' | 'total_confirmed';
  orderTime: string;
}
