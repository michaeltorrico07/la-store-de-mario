import { type User } from '../profile.d'
import { useUserData } from '../hooks'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type NameSchema, nameSchema } from '../schemas/personalDataSchema'
import { useEffect } from 'react'
import { useAppDispatch } from '../../../infrastructure/redux/hooks'
import { modifyAuth } from '../../auth/slice'
import { LoadingContent } from '../../shared'

interface UserDataSectionProps {
  user?: User,
  isExpanded: boolean
}

export const UserDataSection = ({ user, isExpanded }: UserDataSectionProps) => {
  const { register: registerNames, handleSubmit, formState: { errors: errorNames } } = useForm<NameSchema>({ resolver: zodResolver(nameSchema) })
  const { data, error, onSubmit, loading } = useUserData()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (data) {
      dispatch(modifyAuth(data))
    }
  }, [data, dispatch])

  return (
    <LoadingContent loading={loading}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            defaultValue={user?.name}
            {...registerNames('name')}
            className="w-full p-2 border outline-0 border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
          <p className="text-red-500 text-md mt-1">{error.message}</p>
        )}
        {data && isExpanded && (
          <p className="text-green-500 text-xl mt-1">Cambio realizado con éxito</p>
        )}
        <button type='submit' className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
          Guardar cambios
        </button>
      </form>
    </LoadingContent>
  )
}