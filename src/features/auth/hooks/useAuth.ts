import { useState } from 'react';
import type { RegisterSchema, LoginSchema } from '../schemas/index';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { registerUser, loginUser } = useAuthContext();
  const navigate = useNavigate();
  
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

  return {
    error,
    success,
    loading,
    submitRegister,
    submitLogin
  };
}