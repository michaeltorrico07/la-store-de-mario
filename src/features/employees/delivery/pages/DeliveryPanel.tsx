import { useDeliveryOrders } from '../hooks/useDeliveryOrders';
import { DeliveryHeader } from '../ui/DeliveryHeader';
import { OrdersList } from '../ui/OrdersList';

const DeliveryPanel = () => {
  const { orders, loading, deliverOrder, refetch } = useDeliveryOrders();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando órdenes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* AQUÍ VA LA NAVBAR */}

      <div className="pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <DeliveryHeader
              orderCount={orders.length}
              onRefresh={refetch}
              loading={loading}
            />

            <OrdersList
              orders={orders}
              onDeliver={deliverOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { DeliveryPanel };