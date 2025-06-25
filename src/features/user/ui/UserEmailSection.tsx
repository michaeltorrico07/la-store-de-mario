interface UserEmailSectionProps {
  email?: string
}

export const UserEmailSection = ({ email }: UserEmailSectionProps) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
        <div className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500">{email}</div>
        <div />
      </div>
    </div>
  )
}