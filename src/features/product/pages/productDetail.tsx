import { useLocation, useNavigate } from "react-router-dom";
import type { Product } from "../product";
import ArrowBackIcon from '../../../../assets/svgs/arrow-back.svg?react'
import { useCart } from "../hooks";
import { Background } from "../../shared";

export const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = (location.state as { product: Product })?.product;
  const { handleAddCart } = useCart()
  if (!product) {
    return <div>No se encontró el producto</div>;
  }

  return (
    <Background className="bg-white">
      <div className="absolute top-3 left-2">
        <button onClick={() => navigate(-1)}>
          <ArrowBackIcon width={24} height={24} fill="black" />
        </button>
      </div>
      <div className="flex flex-col items-start mx-auto w-[90%]">
        <div className="h-40 w-40 self-center my-6">
          <img
            className="w-full h-full object-cover object-center"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="text-2xl font-bold">{product.name}</div>
        <div className="text-black font-semibold text-lg my-4">${product.price}</div>
        <div className="text-gray-500 text-sm mb-5">{product.description}</div>
        <button
          onClick={handleAddCart(product)}
          className="text-white bg-red-500 mx-auto mt-4 p-3 sm:px-4 sm:py-2 rounded-lg hover:bg-white/30 transition-all duration-200 text-xs sm:text-sm font-medium"
        >
          Añadir al carrito
        </button>
      </div>


    </Background>
  );
}
