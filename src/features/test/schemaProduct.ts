import { z } from "zod";

export const productSchemaPartial = z.object({
  id: z
    .string()
    .nonempty("id cannot be empty")
    .optional()
    .or(z.literal("")), // acepta string vacío también

  name: z
    .string()
    .max(30, "name is too long (max 30 characters)")
    .optional()
    .or(z.literal("")), // acepta vacío

  description: z
    .string()
    .max(200, "description is too long (max 200 characters)")
    .optional()
    .or(z.literal("")), // acepta vacío

  tags: z
    .array(z.string())
    .optional(),
  image: z
    .string()
    .url("image_path must be a valid URL")
    .optional()
    .or(z.literal("")), // acepta vacío

  price: z
    .number()
    .nonnegative("price cannot be negative")
    .int("price must be integer")
    .optional()
    .or(z.nan()), // para aceptar no enviado (podés quitar esto si siempre lo pasás)
});

// Alias para el tipo TS inferido
export type ProductFormDataPartial = z.infer<typeof productSchemaPartial>;
