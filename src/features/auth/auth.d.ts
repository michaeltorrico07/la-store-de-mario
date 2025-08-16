import { Roles } from "./roles"

export interface User {
  id: string,
  email: string,
  name: string,
  lastName: string,
  isVerified: boolean,
  isLoggedin: boolean,
  rol?: Roles
}
