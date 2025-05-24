export interface User {
    id: string,
    email: string,
    nombre: string,
    apellido: string,
    dni?: string,
    isVerified?: boolean
}

export type AuthContextType = {
    user: User | null;
    loading: boolean
    registerUser: (email: string, password: string) => Promise<void>;
    loginUser: (email: string, password: string) => Promise<void>;
    LogOutUser: () => Promise<void>;
}