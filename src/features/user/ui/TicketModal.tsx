import { X, Calendar, Users } from 'lucide-react';
import { type Order } from '../profile.d'

interface TicketModalProps {
  selectedTicket: Order | null;
  showTicket: boolean;
  closeTicket: () => void;
  user: string
}

export const TicketModal = ({ selectedTicket, showTicket, closeTicket, user }: TicketModalProps) => {
  if (!showTicket || !selectedTicket) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header del ticket */}
        <div className="bg-[#303030] text-white p-6 rounded-t-lg relative">
          <button
            onClick={closeTicket}
            className="absolute top-4 right-4 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors shadow-lg z-10"
            title="Cerrar ticket"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">TICKET DE PEDIDO</h2>
            <div className="bg-white text-[#303030] px-4 py-2 rounded-lg inline-block">
              <span className="text-3xl font-bold">#{selectedTicket.code}</span>
            </div>
          </div>
        </div>

        {/* Contenido del ticket */}
        <div className="p-6 space-y-6">
          {/* Estado */}
          <div className="text-center">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold ${selectedTicket.delivered
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
              }`}>
              <div className={`w-3 h-3 rounded-full mr-2 ${selectedTicket.delivered ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
              {selectedTicket.delivered ? 'Entregado' : 'Pendiente'}
            </div>
          </div>

          {/* Info principal */}
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50">
            <div className="grid grid-cols-2 gap-4 text-sm max-sm:flex-col max-sm:flex">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-600 mr-2" />
                <div>
                  <p className="text-gray-600">Cliente:</p>
                  <p className="font-bold text-lg">{user}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-600 mr-2" />
                <div>
                  <p className="text-gray-600">Fecha:</p>
                  <p className="font-bold text-lg text-red-600">{selectedTicket?.deliverDate
                    ? new Date(selectedTicket.deliverDate).toLocaleString('es-AR', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })
                    : '-'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Productos */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
              PRODUCTOS PEDIDOS
            </h3>
            <div className="space-y-3">
              {selectedTicket.listProducts.map((product, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-bold text-lg text-gray-800">{product.name}</p>
                    <div className="flex items-center mt-1">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Cantidad: {product.amount}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">
                      ${product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t-2 border-gray-300 pt-4">
            <div className="flex justify-between items-center bg-[#303030] text-white p-4 rounded-lg">
              <span className="text-xl font-bold">TOTAL A PAGAR:</span>
              <span className="text-3xl font-bold">${selectedTicket.totalPrice}</span>
            </div>
          </div>

          {/* Info adicional */}
          <div className="text-center text-sm text-gray-600 border-t pt-4">
            <p className="mb-2">Presente este ticket para retirar su pedido</p>
            <p className="font-bold">¡Gracias por su compra!</p>
          </div>

          {/* Botón cerrar */}
          <div className="text-center mt-6">
            <button
              onClick={closeTicket}
              className="bg-gray-600 cursor-pointer hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center mx-auto"
            >
              <X className="w-5 h-5 mr-2" />
              Cerrar Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}