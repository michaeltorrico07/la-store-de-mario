export const Roles = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const

export type Roles = keyof typeof Roles