import { useContext } from "react";
import { AuthContext } from "../authContext";
import type { AuthContextType } from "../auth";

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  }
  return context;
}
