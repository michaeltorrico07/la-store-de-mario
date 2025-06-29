import { useUse } from "./useUpdate"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type ProductFormDataPartial, productSchemaPartial } from "./schemaProduct"
import { useEffect } from "react"

export const UpdatearBalatro = () => {
  const { data, loading, onSubmit } = useUse()

  const {register, handleSubmit, formState: { errors }} = useForm<ProductFormDataPartial>({ resolver: zodResolver(productSchemaPartial)})

  useEffect(()=> {
    console.log(errors)
  },[errors])

  return (
    <div>
      <h2>Actualizar Producto</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>id</label>
        <input type="text" {...register("id")} />

        <div>
          <label>Nombre</label>
          <input className="bg-gray-" type="text" {...register("name")} />
        </div>

        <div>
          <label>Descripción</label>
          <input {...register("description")} />
        </div>

        <div>
          <label>Tags (separados por coma)</label>
          <input
            type="text"
            {...register("tags", {
              setValueAs: (v) =>
                typeof v === "string"
                  ? v.split(",").map((tag) => tag.trim()).filter(Boolean)
                  : []
            })}
          />
        </div>

        <div>
          <label>Imagen (URL)</label>
          <input type="text" {...register("image")} />
        </div>

        <div>
          <label>Precio</label>
          <input type="number" {...register("price", { valueAsNumber: true })} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar Producto"}
        </button>

        {data && (
          <div style={{ marginTop: "1rem" }}>
            <h3>Producto actualizado:</h3>
            <p><strong>Nombre:</strong> {data.name}</p>
            <p><strong>Descripción:</strong> {data.description}</p>
            <p><strong>Precio:</strong> ${data.price}</p>
            <p><strong>Tags:</strong> {data.tags?.join(", ")}</p>
            <img src={data.image} alt={data.name} width={150} />
          </div>
        )}
      </form>
    </div>
  )
}
