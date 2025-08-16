import { useLocation, useNavigate } from "react-router-dom";
import type { Product } from "../product";
import ArrowBackIcon from '../../../../assets/svgs/arrow-back.svg?react'
import { useCart } from "../hooks";

export const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = (location.state as { product: Product })?.product;
  const { handleAddCart } = useCart()
  if (!product) {
    return <div>No se encontró el producto</div>;
  }

  return (
    <div>
      <div className="relative top-3 left-2">
        <button onClick={() => navigate(-1)}>
          <ArrowBackIcon width={24} height={24} fill="black" />
        </button>
      </div>
      <div className="flex flex-col items-start px-4">
        <div className="h-36 w-36 self-center p-4">
          <img
            className="w-full h-full object-contain object-center "
            src="/s.png"
            alt={product.name}
          />
        </div>
        <div className="text-2xl font-bold">{product.name}</div>
        <div className="text-[#826F82] text-sm my-4">$  {new Intl.NumberFormat('es-AR').format(product.price)}</div>
        <div className="text-[#826F82] text-md mb-2">{product.category}</div>
        <div className="text-[#826F82] text-sm mb-5">{product.description}</div>
        <div className="bg-[#303030] rounded-lg self-center mt-20">
          <button
            onClick={ handleAddCart(product)}
            className="backdrop-blur-sm border shadow-[0_0_10px_rgba(0,0,0,0.3)] border-white/30 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-white/30 transition-all duration-200 text-xs sm:text-sm font-medium hover:scale-105 active:scale-95 cursor-pointer"
          >
            Añadir al carrito
          </button>
        </div>
      </div>


    </div>
  );
}
