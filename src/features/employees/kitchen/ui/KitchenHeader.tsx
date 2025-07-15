interface KitchenHeaderProps {
  hour: string
}

export const KitchenHeader = ({ hour }: KitchenHeaderProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md mb-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Panel de Cocina</h1>
          <p className="text-gray-600">Gestión de pedidos en tiempo real</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">
            {hour}
          </div>
        </div>
      </div>
    </div>
  );
};