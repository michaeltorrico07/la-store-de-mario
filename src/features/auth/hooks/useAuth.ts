import { useState } from 'react'
import type { RegisterSchema, LoginSchema, PasswordSchema, EmailSchema } from '../schemas/index'
import { useAuthContext } from './useAuthContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FirebaseError } from '@firebase/util'
import { api } from '../../../infrastructure/services'

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
      const userId = await registerUser(data.email, data.password);
      const userData = {
        id: userId,
        name: data.name,
        lastName: data.lastName,
        email: data.email,
      }

      await api.post('/user', userData)

      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate('/')
      }, 3000);
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
      const userCredential = await loginUser(data.email, data.password);
      if (!userCredential.user.emailVerified) {
        setError('Por favor verifica tu email antes de iniciar sesión');
        setLoading(false);
        return;
      }
      setSuccess(true);
      window.location.reload()
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log(error.code)
        // Mapeo de errores de Firebase
        switch (error.code) {
          case "auth/invalid-credential":
            setError('Email o contraseña incorrectos. Por favor verifica e intenta nuevamente')
            break;
          case "auth/too-many-requests":
            setError('Demasiados intentos fallidos. Por favor espere un momento e intente nuevamente')
            break;
          default:
            setError('Hubo un error al enviar el email. Por favor intenta nuevamente')
        }
      } else {
        setError('Hubo un error al enviar el email. Por favor intenta nuevamente')
      }
      setSuccess(false);
    }
    setLoading(false);
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
        navigate('/')
      }, 2500);
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
      return;
    }

    try {
      await ResetPassword(oobCode, data.password);
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    } catch (error: unknown) {
      // Mapeo de errores de Firebase
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-action-code":
            setError('El enlace de restablecimiento no es válido. Inténtalo de nuevo.')
            break;
          case "auth/weak-password":
            setError('La contraseña es demasiado débil. Intente una más segura.')
            break;
          default:
            setError('Se produjo un error al reestablecer la contraseña. Inténtalo de nuevo.')
        }
      }
    }
    setSuccess(false);
    setLoading(false);
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