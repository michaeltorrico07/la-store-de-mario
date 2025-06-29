export interface Product {
  name: string;
  amount: number;
}

export interface Order {
  id: string;
  products: Product[];
  customer: string;
  price: number;
  pickupTime: string;
  status: 'pending' | 'ready' | 'delivered';
}