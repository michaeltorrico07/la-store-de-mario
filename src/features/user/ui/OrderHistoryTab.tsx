import { Clock, FileText } from 'lucide-react';
import type { OrderHistoryTabProps } from '../profile.d'

export const OrderHistoryTab = ({ orderHistory, showTicketModal }: OrderHistoryTabProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md w-full transition-all duration-300 animate-in fade-in slide-in-from-right-3">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">Historial de pedidos</h3>
      </div>

      <div className="overflow-x-auto">
        {orderHistory?.length === 0 || orderHistory === undefined ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No tienes pedidos aún</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#303030] text-white sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Código</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Productos</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Persona</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Precio</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Método</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Retiro</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderHistory?.map((order, index) => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-gray-50 transition-colors duration-200 animate-in fade-in slide-in-from-bottom-2"
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-800">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-800">
                        {order?.products?.map((product, index) => (
                          <div key={index}>
                            {product.name} (x{product.amount})
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {order.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">
                      ${order?.price?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {order.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {order.date.getDate()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => showTicketModal(order)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors flex items-center"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}