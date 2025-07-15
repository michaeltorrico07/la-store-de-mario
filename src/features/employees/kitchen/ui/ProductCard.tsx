import { Package, CheckCircle } from 'lucide-react';
import type { KitchenProduct } from '../kitchen';

interface ConfirmationButtonProps {
  onClick: () => void;
  disabled: boolean;
  confirmed: boolean;
  label: string;
  confirmedLabel: string;
}

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
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${!disabled && !confirmed
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

interface ProductCardProps {
  product: KitchenProduct;
  onUnitConfirm: (orderId: string) => void;
  onTotalConfirm: (orderId: string) => void;
}

export const ProductCard = ({ product, onUnitConfirm, onTotalConfirm }: ProductCardProps) => {
  const getStatusColor = (product: KitchenProduct) => {
    if(product.amount === 0){
      return 'bg-green-100 border-green-300'
    } else {
      return 'bg-yellow-100 border-yellow-300'
    }
  };

  return (
    <tr className={`border-2 ${getStatusColor(product)} transition-all duration-300 hover:shadow-md`}>
      <td className="px-4 py-6 text-center">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-gray-800">{product.amount}</span>
          <Package className="w-4 h-4 text-gray-500 mt-1" />
        </div>
      </td>

      <td className="px-4 py-6">
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">{product.name}</h3>
        </div>
      </td>

      <td className="px-4 py-6 text-center">
        <ConfirmationButton
          onClick={() => onUnitConfirm(product.name)}
          disabled={product.amount === 0}
          confirmed={product.amount === 0}
          label="Confirmar unidad"
          confirmedLabel="Confirmado"
        />
      </td>

      <td className="px-4 py-6 text-center">
        <ConfirmationButton
          onClick={() => onTotalConfirm(product.name)}
          disabled={product.amount === 0}
          confirmed={product.amount === 0}
          label="Confirmar total"
          confirmedLabel="Completado"
        />
      </td>
    </tr>
  );
};
