import type { Product } from "../management";
import { useState, useCallback, useEffect } from "react";
import { type ProductSchema, productSchema } from "../schemas/productSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { useManagement } from "../hooks/useManagement";
import { LoadingContent } from "../../../shared";

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...product,
    },
  });

  const [open, setOpen] = useState(false);
  const [imageName, setImageName] = useState("Usando imagen actual");
  const { SubmitUpdateProduct, loading } = useManagement()

  // Dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue("image", file, { shouldValidate: true });
      setImageName(file.name);
    }
  }, [setValue]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  useEffect(() => {
    if (acceptedFiles.length === 0) {
      setImageName("Usando imagen actual");
    }
  }, [acceptedFiles]);

  return (
    <div className="bg-white border border-gray-300 rounded-2xl p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={typeof product.image === "string" ? product.image : URL.createObjectURL(product.image)}
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
        <LoadingContent loading={loading}>
          <form className="mt-4 space-y-2" onSubmit={handleSubmit((data) => SubmitUpdateProduct(data, product))}>
            <input type="hidden" {...register("id")} />

            <input
              placeholder="Nombre"
              {...register("name")}
              className="w-full border rounded-md p-2"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            <input
              placeholder="Descripción"
              {...register("description")}
              className="w-full border rounded-md p-2"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

            <input
              placeholder="Categoría"
              {...register("category")}
              className="w-full border rounded-md p-2"
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

            {/* Dropzone para nueva imagen */}
            <div
              {...getRootProps()}
              className={`border-2 p-4 rounded-md text-center cursor-pointer transition ${isDragActive ? "border-red-600 bg-red-50" : "border-gray-300"
                }`}
            >
              <input {...getInputProps()} />
              <p className="text-sm">
                {isDragActive
                  ? "Soltá la nueva imagen aquí..."
                  : "Arrastrá una nueva imagen o hacé click para seleccionar (opcional)"}
              </p>
              <span className="text-xs text-gray-500">{imageName}</span>
            </div>
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message as string}</p>}

            <input
              type="number"
              placeholder="Precio"
              {...register("price", { valueAsNumber: true })}
              className="w-full border rounded-md p-2"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={product.inMenu}
                {...register("inMenu")}
                className="w-4 h-4"
              />
              <span className="text-sm">¿Está en el menú?</span>
            </div>
            {errors.inMenu && <p className="text-red-500 text-sm">{errors.inMenu.message}</p>}

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded-md"
            >
              Guardar cambios
            </button>
          </form>
        </LoadingContent>
      )}
    </div>
  );
};
