import { useDeliveryOrders } from '../hooks/useDeliveryOrders';
import { DeliveryHeader } from '../ui/DeliveryHeader';
import { OrdersList } from '../ui/OrdersList';
import { LoadingContent, Background } from '../../../shared';

const DeliveryPanel = () => {
  const { orders, loading, hour, deliverOrder, refetch } = useDeliveryOrders()

  return (
    <Background className="bg-gray-100">
      <div className="pt-20 p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
          <LoadingContent loading={loading}>
            <DeliveryHeader
              orderCount={orders.length}
              onRefresh={refetch}
              loading={loading}
              hour={hour}
            />

            <OrdersList
              orders={orders}
              onDeliver={deliverOrder}
            />
          </LoadingContent>
        </div>
      </div>
    </Background>
  );
};

export { DeliveryPanel };