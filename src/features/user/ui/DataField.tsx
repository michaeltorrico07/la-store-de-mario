import { ChevronDown, ChevronUp } from 'lucide-react';
import type { DataFieldProps } from '../profile'


export function DataField({ 
  icon: Icon, 
  title, 
  value, 
  isExpanded, 
  onToggle, 
  children 
}: DataFieldProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 transition-all duration-200 hover:bg-gray-100">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between transition-all duration-200"
      >
        <div className="flex items-center">
          <Icon className="w-5 h-5 text-gray-600 mr-3 transition-colors duration-200" />
          <div className="text-left">
            <p className="font-medium text-gray-800 transition-colors duration-200">{title}</p>
            <p className="text-gray-600 transition-colors duration-200">{value}</p>
          </div>
        </div>
        <div className="cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-50 hover:scale-105">
          <div className="transition-transform duration-300">
            {isExpanded ? 
              <ChevronUp className="w-4 h-4 text-gray-600" /> : 
              <ChevronDown className="w-4 h-4 text-gray-600" />
            }
          </div>
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="mt-4 pt-4 border-t border-gray-200 animate-in fade-in duration-300">
          {children}
        </div>
      </div>
    </div>
  );
}