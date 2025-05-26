import { useState } from 'react';
import type { RegisterSchema, LoginSchema, PasswordSchema, EmailSchema } from '../schemas/index';
import { useAuthContext } from './useAuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FirebaseError } from '@firebase/util'

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { registerUser, loginUser, ResetPassword, sendResetPasswordEmail } = useAuthContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Obtener parámetros de la URL

  const submitRegister = async (data: RegisterSchema) => {
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      await registerUser(data.email, data.password);

      // Guardar los datos del usuario en la BD

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setError("Error al registrar el usuario");
      console.log(error)
      setSuccess(false);
      setLoading(false);
    }
  }

  const submitLogin = async (data: LoginSchema) => {
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      await loginUser(data.email, data.password);
      navigate("/profile")
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setError("Error al registrar el usuario");
      console.log(error)
      setSuccess(false);
      setLoading(false);
    }
  }

  const SubmitResetPasswordEmail = async (data: EmailSchema) => {
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      await sendResetPasswordEmail(data.email);
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate('/login')
      }, 1000);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        // Mapeo de errores de Firebase
        switch (error.code) {
          case "auth/user-not-found":
            setError('El usuario no existe. Por favor verifica tu email e intenta nuevamente')
            break;
          case "auth/invalid-email":
            setError('El email ingresado no es válido. Por favor verifica e intenta nuevamente')
            break;
          default:
            setError('Hubo un error al enviar el email. Por favor intenta nuevamente')
        }
      } else {
        setError('Hubo un error al enviar el email. Por favor intenta nuevamente')
      }
      setSuccess(false);
      setLoading(false);
    }
  }

  const submitResetPassword = async (data: PasswordSchema) => {
    setError(null);
    setSuccess(false);
    setLoading(true);
    const oobCode = searchParams.get("oobCode"); // Obtener el token de restablecimiento
    if (!oobCode) {
      setError("Token de restablecimiento no encontrado");
      setLoading(false)
      setTimeout(() => {
        navigate('/login')
      }, 1000);
      return;
    }

    try {
      await ResetPassword(oobCode, data.password);
      setTimeout(() => {
        navigate('/login')
      }, 1000);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        // Mapeo de errores de Firebase
        switch (error.code) {
          case "auth/expired-action-code":
            setError('The reset link has expired. Please request a new one')
            break;
          case "auth/invalid-action-code":
            setError('The reset link is invalid. Please try again')
            break;
          case "auth/user-not-found":
            setError('The user does not exist. Please check your email and try again')
            break;
          case "auth/weak-password":
            setError('The password is too weak. Please try a stronger one')
            break;
          default:
            setError('There was an error logging in. Please try again')
        }
      }
    }
  }

  return {
    error,
    success,
    loading,
    submitRegister,
    submitLogin,
    submitResetPassword,
    SubmitResetPasswordEmail
  };
}