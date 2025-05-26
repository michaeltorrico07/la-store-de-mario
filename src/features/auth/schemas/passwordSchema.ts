import z from "zod";

export const passwordSchema = z
    .object({
        password: z.string().min(6, "La contraseña debe tener un minimo de 6 caracteres").max(20, "La contraseña no puede tener mas de 20 caracteres"),
        confirmPassword: z.string().min(6, "La contraseña debe tener un minimo de 6 caracteres").max(20, "La contraseña no puede tener mas de 20 caracteres")
    })
    .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
})
export type PasswordSchema = z.infer<typeof passwordSchema>;

export const emailSchema = z.object({
    email: z.string().email("El email no es valido")
})

export type EmailSchema = z.infer<typeof emailSchema>;