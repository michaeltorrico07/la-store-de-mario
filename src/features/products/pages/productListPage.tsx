import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SortFilter from '../components/SortFilter';
import Cart from '../components/Cart';
import { mockProducts } from '../data/mockProducts';
import type { Product } from '../data/mockProducts';

const ProductListPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [sortBy, setSortBy] = useState('default');
  const [products] = useState<Product[]>(mockProducts); // CAMBIAR: Conectar con estado global o API

  // Filtrar productos por categoría
  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Ordenar productos según criterio seleccionado
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-az':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Generar categorías dinámicamente basado en los productos
  const categories = [
    { id: 'todos', label: 'Todos', count: products.length },
    { id: 'comidas', label: 'Comidas', count: products.filter(p => p.category === 'comidas').length },
    { id: 'bebidas', label: 'Bebidas', count: products.filter(p => p.category === 'bebidas').length },
    { id: 'postres', label: 'Postres', count: products.filter(p => p.category === 'postres').length },
    { id: 'snacks', label: 'Snacks', count: products.filter(p => p.category === 'snacks').length }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Cart Component */}
      <Cart />
      
      <div className="bg-white border-b border-gray-200 sticky top-16 z-20 pt-4">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Productos</h1>
          
          {/* Filtros de categoría */}
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          {/* Filtros de ordenamiento */}
          <SortFilter 
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mensaje cuando no hay productos */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1h-4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-500 mb-2">No hay productos</h3>
            <p className="text-gray-400">No se encontraron productos en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;