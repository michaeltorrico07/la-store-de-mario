// Hook personalizado para manejar la lógica de productos
// CAMBIAR: Conectar con API real cuando esté lista la base de datos
import { useState, useEffect } from 'react';
import type { Product } from '../data/mockProducts';
import { mockProducts } from '../data/mockProducts';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulando carga de API
    const loadProducts = async () => {
      try {
        setLoading(true);
        // CAMBIAR: Reemplazar con llamada real a la API
        // const response = await fetch('/api/products');
        // const data = await response.json();
        
        // Por ahora usamos mock data
        setTimeout(() => {
          setProducts(mockProducts);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Error cargando productos');
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading, error, setProducts };
};