import { type User } from '../profile.d'
import { useUserData } from '../hooks'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type NameSchema, nameSchema } from '../schemas/personalDataSchema'

interface UserDataSectionProps {
  user?: User,
  isExpanded: boolean
}

export const UserDataSection = ({ user, isExpanded }: UserDataSectionProps) => {
  const { submitUserNames, error, message } = useUserData()
  const { register: registerNames, handleSubmit: handleSubmitNames, formState: { errors: errorNames } } = useForm<NameSchema>({
    resolver: zodResolver(nameSchema) // Assuming you have a zod schema defined
  })

  return (
    <form onSubmit={handleSubmitNames(submitUserNames)} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input
          type="text"
          defaultValue={user?.name}
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
          defaultValue={user?.lastName}
          {...registerNames('lastName')}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
        {errorNames.name && (
          <p className="text-red-500 text-sm mt-1">{errorNames.name.message}</p>
        )}
      </div>
      {error && isExpanded && (
        <p className="text-red-500 text-md mt-1">{error}</p>
      )}
      {message && isExpanded && (
        <p className="text-green-500 text-xl mt-1">{message}</p>
      )}
      <button type='submit' className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
        Guardar cambios
      </button>
    </form>
  )
}