import z from "zod";

export const registerSchema = z
  .object({
    nombre: z.string().min(3, "El nombre debe tener un minimo de 3 caracteres"),
    apellido: z.string().min(3, "El apellido debe tener un minimo de 3 caracteres"),
    email: z.string().email("El email no es valido"),
    dni: z.string().min(8, "El DNI debe contener 8 caracteres").max(8, "El DNI no puede mas de 8 caracteres"),
    password: z.string().min(6, "La contraseña debe tener un minimo de 6 caracteres").max(20, "La contraseña no puede tener mas de 20 caracteres"),
    confirmPassword: z.string().min(6, "La contraseña debe tener un minimo de 6 caracteres").max(20, "La contraseña no puede tener mas de 20 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
})

export type RegisterSchema = z.infer<typeof registerSchema>;
