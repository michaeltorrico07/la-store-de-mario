import { useEffect, useState } from "react"
import { ProductCard, NewProductCard } from "../ui"
import type { Product } from "../management"
import { useGetAllProduct } from "../../../product/hooks";

export const Management = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [showAll, setShowAll] = useState(false);
  const { data: allProducts } = useGetAllProduct();

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      setProducts(allProducts);
    }
  }, [allProducts])

  const displayedProducts = showAll ? products : products?.slice(0, 8);

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col gap-2">
      <h1 className="text-2xl font-bold mb-4">Administrar Productos</h1>
      {displayedProducts?.map((product, i) => (
        <ProductCard
          key={i}
          index={i}
          product={product}
        />
      ))}

      {products?.length > 8 && (
        <button onClick={() => setShowAll(!showAll)} className="mt-2 mb-6 p-2 font-semibold bg-red-600 rounded-md text-sm text-white hover:bg-red-700 cursor-pointer">
          {showAll ? "Ver menos" : "Ver más"}
        </button>
      )}
      <NewProductCard />
    </div>
  );
};
