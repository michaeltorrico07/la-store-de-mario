import z from 'zod'

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'El nombre del producto es obligatorio').max(30, 'El nombre del producto no puede exceder los 30 caracteres'),
  description: z.string().min(1, 'La descripción es obligatoria').max(60, 'La descripción no puede exceder los 60 caracteres'),
  price: z.number().nonnegative('El precio no puede ser negativo'),
  image: z
    .custom<File>()
    .refine((file) => file instanceof File, { message: "Se requiere una imagen válida" }),
  category: z.enum(['Comida', 'Bebida', 'Snack']),
  inMenu: z.boolean()
})

export type ProductSchema = z.infer<typeof productSchema>

export const newProductSchema = productSchema.omit({ id: true })

export type NewProductSchema = z.infer<typeof newProductSchema>
