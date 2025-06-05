// Funciones auxiliares para el manejo de productos
import type { Product } from '../data/mockProducts';

export const filterProductsByCategory = (products: Product[], category: string): Product[] => {
  if (category === 'todos') return products;
  return products.filter(product => product.category === category);
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'name-az':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sortedProducts;
  }
};

export const getProductCountByCategory = (products: Product[], category: string): number => {
  if (category === 'todos') return products.length;
  return products.filter(product => product.category === category).length;
};