import { createContext } from "react";
import type { AuthContextType } from "./auth";

export const AuthContext = createContext<AuthContextType | null>(null)
