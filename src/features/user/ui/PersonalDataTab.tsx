import React from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { DataField } from './DataField';

interface PersonalDataTabProps {
  userData: {
    name: string;
    email: string;
  };
  expandedSections: {
    name: boolean;
    email: boolean;
    password: boolean;
  };
  toggleSection: (section: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  passwordData: {
    current: string;
    new: string;
    confirm: string;
  };
  handlePasswordChange: (field: string, value: string) => void;
  handleSavePassword: () => void;
}

export const PersonalDataTab: React.FC<PersonalDataTabProps> = ({
  userData,
  expandedSections,
  toggleSection,
  showPassword,
  setShowPassword,
  passwordData,
  handlePasswordChange,
  handleSavePassword
}) => {
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
          value={userData.name}
          isExpanded={expandedSections.name}
          onToggle={() => toggleSection('name')}
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input 
                type="text" 
                defaultValue="Adrian" 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
              <input 
                type="text" 
                defaultValue="De Sousa" 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
              Guardar cambios
            </button>
          </div>
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
                defaultValue={userData.email}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
              Guardar cambios
            </button>
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
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={passwordData.current}
                  onChange={(e) => handlePasswordChange('current', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? 
                    <EyeOff className="w-5 h-5 text-gray-400" /> : 
                    <Eye className="w-5 h-5 text-gray-400" />
                  }
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
              <input 
                type="password"
                value={passwordData.new}
                onChange={(e) => handlePasswordChange('new', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar nueva contraseña</label>
              <input 
                type="password"
                value={passwordData.confirm}
                onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <button 
              onClick={handleSavePassword}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Cambiar contraseña
            </button>
          </div>
        </DataField>
      </div>
    </div>
  );
};
