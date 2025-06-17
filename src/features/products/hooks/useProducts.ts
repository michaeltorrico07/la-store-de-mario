// Hook personalizado para manejar la lógica de productos
// CAMBIAR: Conectar con API real cuando esté lista la base de datos
import { useState, useEffect } from 'react';
import type { Product } from '../data/mockProducts';
import { api } from '../../../infrastructure/services';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulando carga de API
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/product')
        setProducts(response.data.data)
      } catch (err) {
        console.error(err);
        setError('Error cargando productos');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading, error, setProducts };
};