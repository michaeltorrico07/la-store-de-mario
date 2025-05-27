import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { EmailSchema } from '../schemas/index';
import { emailSchema } from '../schemas/index';
import { useAuth } from '../hooks/useAuth.ts';
import { InputField } from '../ui/inputField.tsx';

export const SendEmail = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<EmailSchema>({ resolver: zodResolver(emailSchema) });
  const { SubmitResetPasswordEmail, error, loading, success } = useAuth();

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
          <h1 className="text-2xl font-bold mb-4 text-center">Ingresa tu email</h1>

          <form onSubmit={handleSubmit(SubmitResetPasswordEmail)} className="space-y-4">
            <InputField
              type="email"
              placeholder="Correo electrónico"
              registration={register("email")}
              error={errors.email}
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">¡Correo enviado! Revisa tu bandeja de entrada.</p>}

            <button type="submit" className="w-full py-3 bg-red-600 text-white rounded-md cursor-pointer">
              {loading ? "Cargando..." : "Enviar correo"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
