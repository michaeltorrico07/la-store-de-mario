import type { FunctionComponent } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { DataField } from './DataField';
import type { PersonalDataTabProps } from '../profile'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { nameSchema, passwordSchema } from '../schemas/personalDataSchema';
import type { NameSchema, PasswordType } from '../schemas/personalDataSchema';
import { useUserData } from '../hooks/useUserData';

export const PersonalDataTab: FunctionComponent<PersonalDataTabProps> = ({
  userData,
  expandedSections,
  toggleSection,
  showCurrentPassword,
  showNewPassword,
  showConfirmPassword,
  setShowNewPassword,
  setShowCurrentPassword,
  setShowConfirmPassword
}) => {
  const { register: registerNames, handleSubmit: handleSubmitNames, formState: { errors: errorNames } } = useForm<NameSchema>({
    resolver: zodResolver(nameSchema) // Assuming you have a zod schema defined
  })
  const { register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorPassword }
  } = useForm<PasswordType>({ resolver: zodResolver(passwordSchema) })
  const { submitUserNames, submitNewPassword, error, message } = useUserData()

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">Datos personales</h3>
      </div>

      <div className="p-6 space-y-4">
        {/* Nombre y Apellido */}
        <DataField
          icon={User}
          title="Nombre y apellido"
          value={`${userData.name} ${userData.lastName}`}
          isExpanded={expandedSections.name}
          onToggle={() => toggleSection('name')}
        >
          <form onSubmit={handleSubmitNames(submitUserNames)} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                defaultValue={userData.name}
                {...registerNames('name')}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errorNames.name && (
                <p className="text-red-500 text-sm mt-1">{errorNames.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
              <input
                type="text"
                defaultValue={userData.lastName}
                {...registerNames('lastName')}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errorNames.name && (
                <p className="text-red-500 text-sm mt-1">{errorNames.name.message}</p>
              )}
            </div>
            {error && expandedSections.name && (
              <p className="text-red-500 text-md mt-1">{error}</p>
            )}
            {message && expandedSections.name && (
              <p className="text-green-500 text-xl mt-1">{message}</p>
            )}
            <button type='submit' className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
              Guardar cambios
            </button>
          </form>
        </DataField>
        {/* Correo Electrónico */}
        <DataField
          icon={Mail}
          title="Correo electrónico"
          value={userData.email}
          isExpanded={expandedSections.email}
          onToggle={() => toggleSection('email')}
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input
                type="email"
                disabled
                defaultValue={userData.email}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </DataField>

        {/* Contraseña */}
        <DataField
          icon={Lock}
          title="Contraseña"
          value="••••••••••"
          isExpanded={expandedSections.password}
          onToggle={() => toggleSection('password')}
        >
          <form onSubmit={handleSubmitPassword(submitNewPassword)} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  {...registerPassword('current')}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showCurrentPassword ?
                    <EyeOff className="w-5 h-5 text-gray-400" /> :
                    <Eye className="w-5 h-5 text-gray-400" />
                  }
                </button>
              </div>
              {errorPassword.current && (
                <p className="text-red-500 text-sm mt-1">{errorPassword.current.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  {...registerPassword('new')}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showNewPassword ?
                    <EyeOff className="w-5 h-5 text-gray-400" /> :
                    <Eye className="w-5 h-5 text-gray-400" />
                  }
                </button>
              </div>
              {errorPassword.new && (
                <p className="text-red-500 text-sm mt-1">{errorPassword.new.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...registerPassword('confirm')}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ?
                    <EyeOff className="w-5 h-5 text-gray-400" /> :
                    <Eye className="w-5 h-5 text-gray-400" />
                  }
                </button>
              </div>
              {errorPassword.confirm && (
                <p className="text-red-500 text-sm mt-1">{errorPassword.confirm.message}</p>
              )}
            </div>
            {error && expandedSections.password && (
              <p className="text-red-500 text-md mt-1">{error}</p>
            )}
            {message && expandedSections.password && (
              <p className="text-green-500 text-xl mt-1">{message}</p>
            )}
            <button
              type='submit'
              className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Cambiar contraseña
            </button>
          </form>
        </DataField>
      </div>
    </div>
  );
};
