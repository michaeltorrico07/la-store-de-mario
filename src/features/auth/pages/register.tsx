import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schemas/index';
import type { RegisterSchema } from '../schemas/index';
import { useAuth } from '../hooks/useAuth';
import { InputField } from '../ui/inputField';
import { ArrowLeft } from 'lucide-react';

export const Register = () => {
  const { submitRegister, success, error, loading } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  return (
    <div className="flex h-screen">
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/Mario.jpg')" }}
      />
      <div className="w-full md:w-1/2 flex items-center justify-center relative">
        <div className="w-full max-w-md px-8">
          <h1 className="text-3xl font-bold mb-2">Tus datos</h1>
          <p className="mb-8">
            Ingresa tus datos para registrarte y disfruta de Mario
          </p>
          <form onSubmit={handleSubmit(submitRegister)} className="space-y-4">
            <InputField
              type="text"
              placeholder="Nombre"
              registration={register("name")}
              error={errors.name}
            />

            <InputField
              type="text"
              placeholder="Apellido"
              registration={register("lastName")}
              error={errors.lastName}
            />

            <InputField
              type="email"
              placeholder="E-mail"
              registration={register("email")}
              error={errors.email}
            />

            <InputField
              type="password"
              placeholder="Contraseña"
              registration={register("password")}
              error={errors.password}
            />

            <InputField
              type="password"
              placeholder="Confirmar contraseña"
              registration={register("confirmPassword")}
              error={errors.confirmPassword}
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && (
              <p className="text-green-600 text-sm">
                Registro exitoso! Verifica tu cuenta en tu Mail.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-red-600 text-white rounded-md cursor-pointer"
            >
              {loading ? "Cargando..." : "Registrarse"}
            </button>
          </form>
        </div>
        <Link to={'/auth'} className='absolute top-3 left-3 text-white bg-red-500 hover:bg-red-700 p-3 rounded-md font-semibold'><ArrowLeft /></Link>
      </div>
    </div>
  );
};
