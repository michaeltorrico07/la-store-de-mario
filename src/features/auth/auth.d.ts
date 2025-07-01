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
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  registerUser: (email: string, password: string) => Promise<string>;
  loginUser: (email: string, password: string) => Promise<void>;
  LogOutUser: () => Promise<void>;
  ResetPassword: (oobCode: string, newPassword: string) => Promise<boolean>;
  sendResetPasswordEmail: (email: string) => Promise<boolean>;
  reauthenticateUser: (password: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
}