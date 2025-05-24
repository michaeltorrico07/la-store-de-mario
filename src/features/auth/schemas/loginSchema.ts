import z from "zod";

export const loginSchema = z
  .object({
    email: z.string().email("El email no es valido"),
    password: z.string()
})

export type LoginSchema = z.infer<typeof loginSchema>;