import z from 'zod'

export const productSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, "El nombre del producto es obligatorio")
    .max(30, "El nombre del producto no puede exceder los 30 caracteres"),
  description: z
    .string()
    .min(1, "La descripción es obligatoria")
    .max(200, "La descripción no puede exceder los 200 caracteres"),
  price: z
    .number({ invalid_type_error: "Debe ser un número" })
    .nonnegative("El precio no puede ser negativo"),

  // ✅ Aquí aceptamos File o URL (string)
  image: z.union([
    z
      .instanceof(File, { message: "Se requiere una imagen válida" })
      .refine((file) => file.size > 0, { message: "La imagen no puede estar vacía" })
      .refine((file) => file.type.startsWith("image/"), {
        message: "El archivo debe ser una imagen",
      }),
    z
      .string()
      .url("La URL de la imagen no es válida")
  ]),

  category: z.enum(["Comida", "Bebida", "Snack"], {
    errorMap: () => ({ message: "Debe seleccionar una categoría válida" }),
  }),
  inMenu: z.boolean(),
});


export type ProductSchema = z.infer<typeof productSchema>

export const newProductSchema = productSchema.omit({ id: true })

export type NewProductSchema = z.infer<typeof newProductSchema>
