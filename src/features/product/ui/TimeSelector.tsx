import React from 'react';
import type { TimeSlot } from '../hooks/useTimeSelection';

interface TimeSelectorProps {
  onTimeSelect: (timeId: string) => void;
  selectedTime: string | null;
  availableTimeSlots: TimeSlot[];
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({
  onTimeSelect,
  selectedTime,
  availableTimeSlots
}) => {
  const handleTimeClick = (timeId: string) => {
    // Si ya está seleccionado, lo deselecciona
    if (selectedTime === timeId) {
      onTimeSelect(''); // Envía string vacío para deseleccionar
    } else {
      onTimeSelect(timeId);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Selecciona horario de entrega
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {availableTimeSlots.map(slot => (
          <button
            key={slot.id}
            onClick={() => handleTimeClick(slot.id)}
            disabled={slot.disabled}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${slot.disabled 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50' 
                : selectedTime === slot.id
                  ? 'bg-red-500 text-white border-2 border-red-500 shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600'
              }
            `}
          >
            {slot.time}
          </button>
        ))}
      </div>
      {selectedTime && (
        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700 font-medium">
            ✓ Horario seleccionado: {availableTimeSlots.find(s => s.id === selectedTime)?.time}
          </p>
        </div>
      )}
      {availableTimeSlots.every(slot => slot.disabled) && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            ⚠️ No hay horarios disponibles para hoy. Todos los horarios requieren al menos 1 hora y 30 minutos de antelación.
          </p>
        </div>
      )}
    </div>
  );
};