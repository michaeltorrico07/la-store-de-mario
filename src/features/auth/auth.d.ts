export interface User {
  id: string,
  email: string,
  name: string,
  lastName: string,
  dni: string,
  isVerified: boolean
}

export type AuthContextType = {
  user: User | null;
  loading: boolean
  registerUser: (email: string, password: string) => Promise<string>;
  loginUser: (email: string, password: string) => Promise<void>;
  LogOutUser: () => Promise<void>;
  ResetPassword: (oobCode: string, newPassword: string) => Promise<boolean>;
  sendResetPasswordEmail: (email: string) => Promise<boolean>;
}