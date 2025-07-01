interface DeliveryHeaderProps {
  orderCount: number;
  onRefresh: () => void;
  loading?: boolean;
}

const DeliveryHeader = ({ orderCount, onRefresh, loading = false }: DeliveryHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Panel de Entregas</h1>
          <p className="text-gray-600 mt-1">
            {orderCount > 0 ? `${orderCount} órdenes pendientes` : 'Sin órdenes pendientes'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800">{orderCount}</div>
            <div className="text-sm text-gray-500">Órdenes</div>
          </div>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            {loading ? 'Cargando...' : 'Refrescar'}
          </button>
        </div>
      </div>
      
      {orderCount > 0 && (
        <div className="text-sm text-gray-500">
          Última actualización: {new Date().toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export { DeliveryHeader };