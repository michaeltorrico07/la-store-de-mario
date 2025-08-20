import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { LoginSchema } from '../schemas/index';
import { loginSchema } from '../schemas/index';
import { useAuth } from '../hooks/useAuth.ts';
import { InputField } from '../ui/inputField.tsx';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset, } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });
  const { submitLogin, error, loading, success } = useAuth();

  useEffect(() => {
    reset({
      email: "",
      password: ""
    });
  }, [reset]);

  return (
    <>
      <div className="flex h-screen">
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/Mario.jpg')" }}
        />
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <div className="w-full max-w-md px-8">
            <div className="flex justify-center mb-6 w-full h-20">
              <img src="/EscudoOttoKrause.jpg" alt="Escudo Otto Krause" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-center">Inicia sesión o regístrate</h1>
            <p className="text-center mb-6">
              Ingresa con tu correo electrónico si tienes cuenta. En caso de no tener,
              <Link to="/register" className="text-red-600 ml-1">regístrate aquí</Link>
            </p>

            <form onSubmit={handleSubmit(submitLogin)} className="space-y-4">
              <InputField
                type="email"
                placeholder="Correo electrónico"
                registration={register("email")}
                error={errors.email}
              />

              <InputField
                type="password"
                placeholder="Contraseña"
                registration={register("password")}
                error={errors.password}
              />

              {error && <p className="text-red-600 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">¡Sesión iniciada! Redirigiendo a Perfil...</p>}

              <Link to='/forgot-password' className="text-blue-600 ml-1">Recuperar Contraseña</Link>
              <button type="submit" className="w-full py-3 bg-red-600 text-white rounded-md cursor-pointer mt-4" disabled={loading}>
                {loading ? "Cargando..." : "Iniciar sesión"}
              </button>
            </form>
          </div>
          <Link to={'/auth'} className='absolute top-3 left-3 text-white bg-red-500 hover:bg-red-700 p-3 rounded-md font-semibold'><ArrowLeft /></Link>
        </div>
      </div>
    </>
  );
};
