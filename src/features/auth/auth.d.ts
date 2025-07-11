import { Roles } from "./roles"

export interface User {
  id: string,
  email: string,
  name: string,
  lastName: string,
  dni: string,
  isVerified: boolean,
  rol?: Roles
}
