import { ChevronDown, ChevronUp } from 'lucide-react';
import { type LucideIcon } from 'lucide-react'
import { type ReactNode } from 'react';

interface DataFieldProps {
  icon: LucideIcon;
  title: string;
  value: string | undefined;
  isExpanded: boolean;
  onToggle: () => void;
  children?: ReactNode;
}

export const DataField = ({ icon: Icon, title, value, isExpanded, onToggle, children }: DataFieldProps) => {

  return (
    <div className="bg-gray-50 rounded-lg p-4 transition-all duration-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-center w-full max-w-[90%]">
          <Icon className="w-5 h-5 text-gray-600 mr-3 transition-colors duration-200" />
          <div className="text-left max-w-[80%]">
            <p className="font-medium text-gray-800 transition-colors duration-200">{title}</p>
            <p className="text-gray-600 transition-colors duration-200 overflow-ellipsis whitespace-nowrap overflow-hidden">{value}</p>
          </div>
        </div>
        <div className="cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-200 hover:scale-105">
          <div className="transition-transform duration-300">
            {isExpanded ?
              <ChevronUp className="w-5 h-5 text-gray-600" /> :
              <ChevronDown className="w-5 h-5 text-gray-600" />
            }
          </div>
        </div>
      </button>

      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="mt-4 pt-4 border-t border-gray-200 animate-in fade-in duration-300">
          {isExpanded && children}
        </div>
      </div>
    </div>
  );
}