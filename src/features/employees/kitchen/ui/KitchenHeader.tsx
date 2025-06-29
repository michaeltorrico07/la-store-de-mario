import type { KitchenHeaderProps } from '../kitchen.d';

export const KitchenHeader = ({ currentTime }: KitchenHeaderProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md mb-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Panel de Cocina</h1>
          <p className="text-gray-600">Gestión de pedidos en tiempo real</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">
            {currentTime.toLocaleTimeString('es-AR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          <div className="text-sm text-gray-500">
            {currentTime.toLocaleDateString('es-AR', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>
    </div>
  );
};