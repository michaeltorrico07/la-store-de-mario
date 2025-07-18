import { useState } from "react";
import { type PasswordType } from "../schemas/personalDataSchema";
import { FirebaseError } from 'firebase/app'
import { useAuthContext } from "../../auth/hooks/useAuthContext";


export const useUserPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { reauthenticateUser, changePassword } = useAuthContext();

  const submitNewPassword = async (data: PasswordType) => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null)
      
      await reauthenticateUser(data.current)

      // Si la reautenticación fue exitosa, actualizamos la contraseña
      await changePassword(data.new);
      setMessage('Contraseña actualizada correctamente')
      setTimeout(() => {
        setMessage(null)
        window.location.reload();
      }, 2000)
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-credential':
            setError("La contraseña actual es incorrecta");
            break;
          case 'auth/weak-password':
            setError("La nueva contraseña es demasiado débil (mínimo 6 caracteres)");
            break;
          default:
            setError(error.message || "Ocurrió un error al cambiar la contraseña");
        }
      } else {
        setError("Error inesperado");
      }
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, message, submitNewPassword }
}