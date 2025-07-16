import { User as UserIcon, Mail, Lock } from 'lucide-react'
import { UserDataSection, UserEmailSection, UserPasswordSection, DataField } from './'
import { useExpandedSections } from '../hooks'
import { type User } from '../profile.d'

interface PersonalDataTabProps {
  user: User;
}

export const PersonalDataTab = ({ user } : PersonalDataTabProps) => {
  const { expandedSections, toggleSection } = useExpandedSections()

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">Datos personales</h3>
      </div>

      <div className="p-6 space-y-4">
        {/* Nombre y Apellido */}
        <DataField
          icon={UserIcon}
          title="Nombre y apellido"
          value={`${user?.name} ${user?.lastName}`}
          isExpanded={expandedSections.name}
          onToggle={() => toggleSection('name')}
        >
          <UserDataSection user={user} isExpanded={expandedSections.name} />
        </DataField>

        {/* Correo Electrónico */}
        <DataField
          icon={Mail}
          title="Correo electrónico"
          value={user?.email}
          isExpanded={expandedSections.email}
          onToggle={() => toggleSection('email')}
        >
          <UserEmailSection email={user?.email} />
        </DataField>

        {/* Contraseña */}
        <DataField
          icon={Lock}
          title="Contraseña"
          value="••••••••••"
          isExpanded={expandedSections.password}
          onToggle={() => toggleSection('password')}
        >
          <UserPasswordSection isExpanded={expandedSections.password} />
        </DataField>
      </div>
    </div>
  );
};
