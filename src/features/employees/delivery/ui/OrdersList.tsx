import type { Order } from '../delivery';

interface OrdersListProps {
  orders: Order[];
  onDeliver: (orderId: string) => void;
}

const OrdersList = ({ orders, onDeliver }: OrdersListProps) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📦</div>
        <p className="text-3xl font-bold text-gray-500 mb-2">
          No hay órdenes pendientes
        </p>
        <p className="text-gray-400">
          Las nuevas órdenes aparecerán aquí cuando estén listas para entregar
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#303030] text-white">
          <tr>
            <th className="px-8 py-4 text-left text-lg font-medium">Código</th>
            <th className="px-8 py-4 text-left text-lg font-medium">Productos</th>
            <th className="px-8 py-4 text-left text-lg font-medium">Precio</th>
            <th className="px-8 py-4 text-left text-lg font-medium">Retiro</th>
            <th className="px-8 py-4 text-left text-lg font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders?.map((order, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-8 py-6 whitespace-nowrap font-bold text-lg text-gray-800">
                {order.code}
              </td>
              <td className="px-8 py-6">
                <div className="text-base text-gray-800">
                  {order?.listProducts?.map((product, index) => (
                    <div key={index} className="mb-1">
                      {product.name}
                      {product.amount > 1 && (
                        <span className="text-gray-600 ml-1">(x{product.amount})</span>
                      )}
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-8 py-6 whitespace-nowrap text-base font-bold text-gray-800">
                ${order.totalPrice.toLocaleString()}
              </td>
              <td className="px-8 py-6 whitespace-nowrap text-base text-gray-800">
                {order?.deliverDate && new Date(order.deliverDate).toLocaleString('es-AR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                })}
              </td>
              <td className="px-8 py-6 whitespace-nowrap">
                <button
                  onClick={() => onDeliver(order.code)}
                  className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded text-base font-medium transition-colors"
                >
                  ENTREGAR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { OrdersList };