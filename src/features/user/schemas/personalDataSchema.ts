import z from 'zod'

export const nameSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').max(30, 'El nombre no puede exceder los 30 caracteres'),
  lastName: z.string().min(1, 'El apellido es obligatorio').max(30, 'El apellido no puede exceder los 30 caracteres')
})

export type NameSchema = z.infer<typeof nameSchema>

export const passwordSchema = z.object({
  current: z.string().min(1, 'La contraseña actual es obligatoria'),
  new: z.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres').max(30, 'La nueva contraseña no puede exceder los 30 caracteres'),
  confirm: z.string().max(30, 'La confirmación de la contraseña no puede exceder los 30 caracteres')
}).refine((data) => data.new === data.confirm, {
    message: "Las contraseñas no coinciden",
    path: ["confirm"]
})

export type PasswordType = z.infer<typeof passwordSchema>