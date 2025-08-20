import { KitchenHeader, ProductsList } from '../ui';
import { useKitchenProducts } from '../hooks';
import { getActualDeliverHour, Background } from '../../../shared';

export const KitchenPanel = () => {
  const hour = new Date(getActualDeliverHour()).toLocaleString('es-AR', {
    dateStyle: 'long',
    timeStyle: 'short'
  });

  const { kitchenProducts, loading, handleConfirm } = useKitchenProducts();

  const handleUnitConfirm = (productName: string) => {
    handleConfirm(productName, 1)
    console.log('asdsa')
  };

  const handleTotalConfirm = (productName: string) => {
    handleConfirm(productName, -1)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <Background className="bg-gray-100">
      <KitchenHeader hour={hour} />
      <ProductsList
        products={kitchenProducts}
        onUnitConfirm={handleUnitConfirm}
        onTotalConfirm={handleTotalConfirm}
      />
    </Background>
  );
};
