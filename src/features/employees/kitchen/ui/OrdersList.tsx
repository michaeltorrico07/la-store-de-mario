import { CheckCircle } from 'lucide-react';
import { OrderCard } from './OrderCard';
import type { OrdersListProps } from '../kitchen.d';

export const OrdersList = ({ orders, onUnitConfirm, onTotalConfirm, onRefresh, loading }: OrdersListProps) => {

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Pedidos Activos</h2>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          {loading ? 'Cargando...' : 'Refrescar'}
        </button>
      </div>

      <div className="overflow-x-auto">
        {orders?.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">¡Todos los pedidos completados!</h3>
            <p className="text-gray-500">No hay pedidos pendientes en este momento.</p>
          </div>
        ) : (
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#303030] text-white">
              <tr>
                <th className="px-4 py-4 text-center text-sm font-medium">Cantidad</th>
                <th className="px-4 py-4 text-left text-sm font-medium">Producto</th>
                <th className="px-4 py-4 text-center text-sm font-medium">Hora de entrega</th>
                <th className="px-4 py-4 text-center text-sm font-medium">Confirmación de uno</th>
                <th className="px-4 py-4 text-center text-sm font-medium">Confirmación total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders?.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onUnitConfirm={onUnitConfirm}
                  onTotalConfirm={onTotalConfirm}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};