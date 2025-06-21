interface Category {
  id: string
  label: string
  count: number
}

interface CategoryFilterProps {
  categories: Category[] | null
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
}

export const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {categories?.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
            selectedCategory === category.id
              ? 'bg-red-600 text-white shadow-lg transform scale-105'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-red-300 hover:text-red-600'
          }`}
        >
          {category.label}
          <span className={`text-xs px-2 py-1 rounded-full cursor-pointer ${
            selectedCategory === category.id 
              ? 'bg-white/20 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {category.count}
          </span>
        </button>
      ))}
    </div>
  )
}