import { useState } from "react"
import { ProductCard, NewProductCard } from "../ui"
import type { Product } from "../management"
import { useAppSelector } from "../../../../infrastructure/redux/hooks";
import { useGetAllProduct } from "../../../product/hooks";
import { useProductSubmit } from "../hooks/useProductSubmit";


const placeholderImage = "https://i.pinimg.com/736x/4b/d5/a3/4bd5a30b4ef102ae5243090cf5c7d4b8.jpg";

const initialProducts: Product[] = [
  {
    id: 'asasas',
    name: "Pizza Margarita",
    description: "Pizza clásica con tomate, mozzarella y albahaca.",
    category: 'Comida',
    image: placeholderImage,
    price: 9.99,
    inMenu: true,
  },
  {
    id: 'asasas',
    name: "Hamburguesa Clásica",
    description: "Carne de res con queso, lechuga, tomate y cebolla.",
    category: 'Comida',
    image: placeholderImage,
    price: 11.5,
    inMenu: false,
  },
  {
    id: 'asasas',
    name: "Aguante Rem carajo",
    description: "Carne de rem asjdksajd con queso, lechuga, tomate y cebolla.",
    category: 'Comida',
    image: placeholderImage,
    price: 11.5,
    inMenu: false,
  },
  {
    id: 'asasas',
    name: "Hamburguesa Clásica",
    description: "Carne de res con queso, lechuga, tomate y cebolla.",
    category: 'Comida',
    image: placeholderImage,
    price: 11.5,
    inMenu: false,
  },
  {
    id: 'asasas',
    name: "Hamburguesa Clásica",
    description: "Carne de res con queso, lechuga, tomate y cebolla.",
    category: 'Comida',
    image: placeholderImage,
    price: 11.5,
    inMenu: false,
  },
];

export const Management = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const { onSubmit } = useProductSubmit()

  const handleUpdate = () => {
    console.log('oa')
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Administrar Productos</h1>
      {products.map((product, i) => (
        <ProductCard
          key={i}
          index={i}
          product={product}
          onUpdate={handleUpdate}
        />
      ))}
      <NewProductCard onAdd={onSubmit} />
    </div>
  );
};
