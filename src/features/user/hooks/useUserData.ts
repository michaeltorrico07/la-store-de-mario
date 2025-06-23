import { useState } from 'react';
import type { NameSchema, PasswordType } from '../schemas/personalDataSchema';
import { api } from '../../../infrastructure/services';
import { isAxiosError } from 'axios';
import { updatePassword, getAuth, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

export const useUserData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const submitUserNames = async (data: NameSchema) => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null)
      const response = await api.put('/user/', data);
      setMessage('Nombre y Apellido actualizados correctamente');
      setTimeout(() => {
        setMessage(null)
        window.location.reload();
      }, 2000)
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || 'Error en la petición');
      } else {
        setError('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  const submitNewPassword = async (data: PasswordType) => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null)
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user || !user.email) {
        throw new Error("No se encontró el usuario autenticado");
      }

      // Reautenticación con la contraseña actual
      const credential = EmailAuthProvider.credential(user.email, data.current);
      await reauthenticateWithCredential(user, credential);

      // Si la reautenticación fue exitosa, actualizamos la contraseña
      await updatePassword(user, data.new);
      setMessage('Contraseña actualizada correctamente')
      setTimeout(() => {
        setMessage(null)
        window.location.reload();
      }, 2000)
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/wrong-password':
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
  };

  return {
    loading,
    error,
    message,
    submitUserNames,
    submitNewPassword
  };
};
