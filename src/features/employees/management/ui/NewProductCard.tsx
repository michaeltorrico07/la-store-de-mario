import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { type NewProductSchema, newProductSchema } from "../schemas/productSchema";
import { useManagement } from "../hooks/useManagement";
import { LoadingContent } from "../../../shared";

export const NewProductCard = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<NewProductSchema>({
    resolver: zodResolver(newProductSchema)
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue("image", file, { shouldValidate: true }); // RHF + validación
    }
  }, [setValue]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  const { SubmitNewProduct, loading } = useManagement();

  const imageName = acceptedFiles[0]?.name || "Ningún archivo seleccionado";

  return (
    <LoadingContent loading={loading}>
      <div className="border-2 border-dashed border-gray-400 p-4 rounded-2xl mb-4">
        <h3 className="text-lg font-medium mb-2">Agregar nuevo producto</h3>
        <form className="space-y-2" onSubmit={handleSubmit(SubmitNewProduct)}>
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

          {/* Imagen con Dropzone */}
          <div
            {...getRootProps()}
            className={`border-2 p-4 rounded-md text-center cursor-pointer transition ${isDragActive ? "border-red-600 bg-red-50" : "border-gray-400"
              }`}
          >
            <input {...getInputProps()} />
            <p className="text-sm">
              {isDragActive
                ? "Suelta la imagen aquí..."
                : "Arrastra y suelta una imagen, o hacé click para seleccionar"}
            </p>
            <span className="text-xs text-gray-500">{imageName}</span>
          </div>
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message as string}</p>}

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
    </LoadingContent>
  );
};