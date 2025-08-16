import { useUserPassword } from "../hooks"
import { useForm } from "react-hook-form"
import { type PasswordType, passwordSchema } from "../schemas/personalDataSchema"
import { zodResolver } from '@hookform/resolvers/zod'
import { useShowPassword } from "../hooks"
import { Eye, EyeOff } from 'lucide-react'
import { LoadingContent } from "../../shared"

interface UserPasswordSectionProps {
  isExpanded: boolean
}

export const UserPasswordSection = ({ isExpanded }: UserPasswordSectionProps) => {

  const { register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorPassword }
  } = useForm<PasswordType>({ resolver: zodResolver(passwordSchema) })

  const { submitNewPassword, error, message, loading } = useUserPassword()

  const { showCurrentPassword, setShowCurrentPassword, showNewPassword, setShowNewPassword, showConfirmPassword, setShowConfirmPassword } = useShowPassword()

  return (
    <LoadingContent loading={loading}>
      <form onSubmit={handleSubmitPassword(submitNewPassword)} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
          <div className="relative">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              {...registerPassword('current')}
              className="w-full p-2 outline-0 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showCurrentPassword ?
                <Eye className="w-5 h-5 text-gray-400" /> :
                <EyeOff className="w-5 h-5 text-gray-400" />
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
              className="w-full p-2 outline-0 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showNewPassword ?
                <Eye className="w-5 h-5 text-gray-400" /> :
                <EyeOff className="w-5 h-5 text-gray-400" />
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
              className="w-full p-2 outline-0 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ?
                <Eye className="w-5 h-5 text-gray-400" /> :
                <EyeOff className="w-5 h-5 text-gray-400" />
              }
            </button>
          </div>
          {errorPassword.confirm && (
            <p className="text-red-500 text-sm mt-1">{errorPassword.confirm.message}</p>
          )}
        </div>
        {error && isExpanded && (
          <p className="text-red-500 text-md mt-1">{error}</p>
        )}
        {message && isExpanded && (
          <p className="text-green-500 text-xl mt-1">{message}</p>
        )}
        <button
          type='submit'
          className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Cambiar contraseña
        </button>
      </form>
    </LoadingContent>
  )
}