import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { type NewProductSchema, newProductSchema } from "../schemas/productSchema";

interface NewProductCardProps {
  onAdd: (formdata: NewProductSchema) => void
}

export const NewProductCard = ({ onAdd }: NewProductCardProps) => {
  const [imageName, setImageName] = useState<string>("Ningún archivo seleccionado");
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<NewProductSchema>({
    resolver: zodResolver(newProductSchema)
  });

  const formValues = watch(); // <-- acá obtenés todos los valores del form

  // Podés hacer esto en un useEffect para verlos en consola cada vez que cambian:
  useEffect(() => {
    console.log("Valores actuales del form:", formValues);
  }, [formValues]);
  
  // Manejar el cambio de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file); // Guardar el archivo en RHF
      setImageName(file.name);
    } else {
      setImageName("Ningún archivo seleccionado");
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 p-4 rounded-2xl mb-4">
      <h3 className="text-lg font-medium mb-2">Agregar nuevo producto</h3>
      <form className="space-y-2" onSubmit={handleSubmit(onAdd)}>
        <input
          placeholder="Nombre"
          {...register('name')}
          className="w-full border rounded-md p-2"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

        <input
          placeholder="Descripción"
          {...register('description')}
          className="w-full border rounded-md p-2"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}

        <input
          placeholder="Categoría"
          {...register('category')}
          className="w-full border rounded-md p-2"
        />
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}

        <div className="flex flex-col">
          <label
            htmlFor="image-upload"
            className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md inline-block w-max hover:bg-red-700 transition"
          >
            Seleccionar imagen
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <span className="mt-1 text-sm text-gray-600">{imageName}</span>
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message as string}</p>}
        </div>

        <input
          type="number"
          placeholder="Precio"
          {...register('price', { valueAsNumber: true })}
          className="w-full border rounded-md p-2"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('inMenu')}
            className="w-4 h-4"
          />
          <span className="text-sm">¿Está en el menú?</span>
        </div>
        {errors.inMenu && <p className="text-red-500 text-sm mt-1">{errors.inMenu.message}</p>}

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={() => console.log()}
        >
          Agregar producto
        </button>
      </form>
    </div>
  );
};