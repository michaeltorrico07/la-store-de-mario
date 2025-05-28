import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { PasswordSchema } from '../schemas/index';
import { passwordSchema } from '../schemas/index';
import { useAuth } from '../hooks/useAuth.ts';
import { InputField } from '../ui/inputField.tsx';

export const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PasswordSchema>({ resolver: zodResolver(passwordSchema) });
  const { submitResetPassword, error, loading, success } = useAuth();

  return (
    <div className="flex h-screen">
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/Mario.jpg')" }}
      />
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          <div className="flex justify-end mb-4">
            <Link to="/" className="text-2xl">&times;</Link>
          </div>
          <div className="flex justify-center mb-12">
            <div className="w-12 h-12 bg-red-600 text-white flex items-center justify-center">
              <div>
                <div className="text-center text-xs">O</div>
                <div className="text-center text-xs">K</div>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">Reinicio de contraseña</h1>

          <form onSubmit={handleSubmit(submitResetPassword)} className="space-y-4">
            <InputField
              type="password"
              placeholder="Contraseña"
              registration={register("password")}
              error={errors.password}
            />

            <InputField
              type="password"
              placeholder="Nueva Contraseña"
              registration={register("confirmPassword")}
              error={errors.confirmPassword}
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">¡Contraseña cambiada! Inicie sesión a continuacion.</p>}

            <button type="submit" className="w-full py-3 bg-red-600 text-white rounded-md cursor-pointer">
              {loading ? "Cargando..." : "Resetear contraseña"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
