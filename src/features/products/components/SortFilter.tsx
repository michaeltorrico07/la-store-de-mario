import React from 'react';

interface SortFilterProps {
  sortBy: string;
  onSortChange: (sortValue: string) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-sm font-medium text-gray-700">Ordenar por:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-colors"
      >
        <option value="default">Por defecto</option>
        <option value="price-asc">Precio: Menor a Mayor</option>
        <option value="price-desc">Precio: Mayor a Menor</option>
        <option value="name-az">Nombre: A-Z</option>
      </select>
    </div>
  );
};

export default SortFilter;