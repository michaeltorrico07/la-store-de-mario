import type { Product } from "../management"
import { useState } from "react"
import { type ProductSchema, productSchema } from "../schemas/productSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

interface ProductCardProps {
  product: Product
  index: number
  onUpdate: () => void
}

export const ProductCard = ({ product, onUpdate }: ProductCardProps) => {
  const { register: registerProductUpdate, handleSubmit, formState: { errors } } = useForm<ProductSchema>({ resolver: zodResolver(productSchema) })

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-300 rounded-2xl p-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-xl"
          />
          <div>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="text-sm text-gray-500 font-semibold">${product.price}</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 font-semibold bg-red-600 rounded-md text-sm text-white hover:bg-red-700 cursor-pointer"
        >
          {open ? "Cerrar" : "Editar"}
        </button>
      </div>
      {open && (
        <form className="mt-4 space-y-2" onSubmit={handleSubmit(onUpdate)}>
          <input type="text" defaultValue={product.id} {...registerProductUpdate('id')} hidden={true} />
          <input
            placeholder="Nombre"
            defaultValue={product.name}
            {...registerProductUpdate('name')}
            className="w-full border rounded-md p-2"
          />
          <input
            placeholder="Descripción"
            defaultValue={product.description}
            {...registerProductUpdate('description')}
            className="w-full border rounded-md p-2"
          />
          <input
            placeholder="Categoría"
            defaultValue={product.category}
            {...registerProductUpdate('category')}
            className="w-full border rounded-md p-2"
          />
          <input
            placeholder="URL de imagen"
            defaultValue={product.image}
            {...registerProductUpdate('image')}
            className="w-full border rounded-md p-2"
          />
          <input
            type="number"
            placeholder="Precio"
            defaultValue={product.price}
            {...registerProductUpdate('price')}
            className="w-full border rounded-md p-2"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={product.inMenu}
              {...registerProductUpdate('inMenu')}
              className="w-4 h-4"
            />
            <span className="text-sm">¿Está en el menú?</span>
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded-md"
          >
            Guardar cambios
          </button>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </form>
      )}
    </div>
  );
};