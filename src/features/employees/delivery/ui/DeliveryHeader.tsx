interface DeliveryHeaderProps {
  orderCount: number
  onRefresh: () => void
  loading?: boolean
  hour: string
}

const DeliveryHeader = ({ orderCount, onRefresh, loading = false, hour }: DeliveryHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-start mb-4 max-sm:flex-col">
        <div className="max-sm:mb-3">
          <h1 className="text-3xl font-bold text-gray-800">Órdenes del {hour}</h1>
          <p className="text-gray-600 mt-1">
            {orderCount > 0 ? `${orderCount} órdenes pendientes` : 'Sin órdenes pendientes'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right max-sm:text-left">
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
    </div>
  );
};

export { DeliveryHeader };