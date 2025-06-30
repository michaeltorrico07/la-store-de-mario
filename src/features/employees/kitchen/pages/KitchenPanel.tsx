import { useState, useEffect } from 'react';
import { KitchenHeader, OrdersList } from '../ui';
import { useKitchenOrders } from '../hooks';

export const KitchenPanel = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const { orders, isLoading, updateOrderStatus } = useKitchenOrders();

  // Actualizar hora actual cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleUnitConfirm = (orderId: string) => {
    updateOrderStatus(orderId, 'unit_confirmed');
  };

  const handleTotalConfirm = (orderId: string) => {
    updateOrderStatus(orderId, 'total_confirmed');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <KitchenHeader currentTime={currentTime} />
      <OrdersList
        orders={orders}
        onUnitConfirm={handleUnitConfirm}
        onTotalConfirm={handleTotalConfirm}
      />
    </div>
  );
};