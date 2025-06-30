import { Clock, User, Package, CheckCircle, AlertCircle } from 'lucide-react';
import type { OrderCardProps, ConfirmationButtonProps } from '../kitchen.d';

const ConfirmationButton = ({ 
  onClick, 
  disabled, 
  confirmed, 
  label, 
  confirmedLabel 
}: ConfirmationButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        !disabled && !confirmed
          ? 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 active:scale-95'
          : confirmed
          ? 'bg-green-100 text-green-700 cursor-not-allowed'
          : 'bg-gray-100 text-gray-500 cursor-not-allowed'
      }`}
    >
      {confirmed ? (
        <div className="flex items-center">
          <CheckCircle className="w-4 h-4 mr-1" />
          {confirmedLabel}
        </div>
      ) : (
        label
      )}
    </button>
  );
};

export const OrderCard = ({ order, onUnitConfirm, onTotalConfirm }: OrderCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 border-yellow-300';
      case 'unit_confirmed': return 'bg-blue-100 border-blue-300';
      case 'total_confirmed': return 'bg-green-100 border-green-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const isUrgent = () => {
    const now = new Date();
    const deliveryTime = new Date();
    const [hours, minutes] = order.deliveryTime.split(':');
    deliveryTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const timeDiff = deliveryTime.getTime() - now.getTime();
    return timeDiff <= 15 * 60 * 1000 && timeDiff > 0;
  };

  return (
    <tr className={`border-2 ${getStatusColor(order.status)} transition-all duration-300 hover:shadow-md`}>
      <td className="px-4 py-6 text-center">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-gray-800">{order.quantity}</span>
          <Package className="w-4 h-4 text-gray-500 mt-1" />
        </div>
      </td>
      
      <td className="px-4 py-6">
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">{order.product}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <User className="w-4 h-4 mr-1" />
            {order.customer}
          </div>
          <div className="text-xs text-gray-500">Pedido: {order.orderTime}</div>
        </div>
      </td>
      
      <td className="px-4 py-6 text-center">
        <div className={`flex flex-col items-center ${isUrgent() ? 'text-red-600' : 'text-gray-800'}`}>
          <Clock className={`w-6 h-6 mb-1 ${isUrgent() ? 'text-red-500' : 'text-gray-500'}`} />
          <span className="text-xl font-bold">{order.deliveryTime}</span>
          {isUrgent() && (
            <div className="flex items-center mt-1">
              <AlertCircle className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-xs text-red-600 font-medium">URGENTE</span>
            </div>
          )}
        </div>
      </td>
      
      <td className="px-4 py-6 text-center">
        <ConfirmationButton
          onClick={() => onUnitConfirm(order.id)}
          disabled={order.status !== 'pending'}
          confirmed={order.status === 'unit_confirmed' || order.status === 'total_confirmed'}
          label="Confirmar unidad"
          confirmedLabel="Confirmado"
        />
      </td>
      
      <td className="px-4 py-6 text-center">
        <ConfirmationButton
          onClick={() => onTotalConfirm(order.id)}
          disabled={order.status !== 'unit_confirmed'}
          confirmed={order.status === 'total_confirmed'}
          label="Confirmar total"
          confirmedLabel="Completado"
        />
      </td>
    </tr>
  );
};