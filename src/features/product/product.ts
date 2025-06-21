export type SortBy = 'default' | 'price-asc' | 'price-desc' | 'name-az';
export interface CartItem extends Product {
  quantity: number;
}
export interface Product {
  id: string
  name: string
  tags: string[]
  description: string
  image: string
  price: number
}

export const productsData: Product[] = [
  {
    id: "awsfeawsfawsf",
    name: "Pancho Clásico",
    price: 3000,
    tags: ["comidas"],
    image: "/images/pancho-clasico.jpg",
    description: "Pancho con ketchup, mostaza y papitas"
  },
  {    
    id: "awsfawdawsdeawsfawsf",
    name: "Pancho Especial",
    price: 4500,
    tags: ["comidas"],
    image: "/images/pancho-especial.jpg", // CAMBIAR: Ruta real de la imagen
    description: "Pancho con todos los ingredientes premium"
  },
  {
    id: "awsedfafgkjias0edjgisa",
    name: "Coca Cola",
    price: 2000,
    tags: ["bebidas"],
    image: "/images/coca-cola.jpg", // CAMBIAR: Ruta real de la imagen
    description: "Bebida gaseosa 500ml"
  },
  {
    id: "jsikadegfjnasioedgad",
    name: "Torta Chocolate",
    price: 3500,
    tags: ["postres"],
    image: "/images/torta-chocolate.jpg", // CAMBIAR: Ruta real de la imagen
    description: "Deliciosa torta de chocolate casera"
  },
  {
    id: "sedojpgsoihgiopsdfh",
    name: "Papas Fritas",
    price: 2500,
    tags: ["snacks"],
    image: "/images/papas-fritas.jpg", // CAMBIAR: Ruta real de la imagen
    description: "Papas fritas crujientes y doradas"
  },
  {
    id: "sajdimgvosiajndgbiopsdhg",
    name: "Hamburguesa",
    price: 5000,
    tags: ["comidas"],
    image: "/images/hamburguesa.jpg", // CAMBIAR: Ruta real de la imagen
    description: "Hamburguesa completa con papas"
  }
];