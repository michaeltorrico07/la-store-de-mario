// Datos temporales - CAMBIAR: Reemplazar con API calls a la base de datos
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  calories: string;
  description: string;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Pancho Clásico",
    price: 3000,
    category: "comidas",
    image: "/images/pancho-clasico.jpg", // CAMBIAR: Ruta real de la imagen
    calories: "243kcal",
    description: "Pancho con ketchup, mostaza y papitas"
  },
  {
    id: 2,
    name: "Pancho Especial",
    price: 4500,
    category: "comidas",
    image: "/images/pancho-especial.jpg", // CAMBIAR: Ruta real de la imagen
    calories: "350kcal",
    description: "Pancho con todos los ingredientes premium"
  },
  {
    id: 3,
    name: "Coca Cola",
    price: 2000,
    category: "bebidas",
    image: "/images/coca-cola.jpg", // CAMBIAR: Ruta real de la imagen
    calories: "140kcal",
    description: "Bebida gaseosa 500ml"
  },
  {
    id: 4,
    name: "Torta Chocolate",
    price: 3500,
    category: "postres",
    image: "/images/torta-chocolate.jpg", // CAMBIAR: Ruta real de la imagen
    calories: "420kcal",
    description: "Deliciosa torta de chocolate casera"
  },
  {
    id: 5,
    name: "Papas Fritas",
    price: 2500,
    category: "snacks",
    image: "/images/papas-fritas.jpg", // CAMBIAR: Ruta real de la imagen
    calories: "320kcal",
    description: "Papas fritas crujientes y doradas"
  },
  {
    id: 6,
    name: "Hamburguesa",
    price: 5000,
    category: "comidas",
    image: "/images/hamburguesa.jpg", // CAMBIAR: Ruta real de la imagen
    calories: "580kcal",
    description: "Hamburguesa completa con papas"
  }
];