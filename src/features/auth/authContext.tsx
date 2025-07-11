import { createContext } from "react";
import type { AuthContextType } from "./authProvider";

export const AuthContext = createContext<AuthContextType | null>(null)
