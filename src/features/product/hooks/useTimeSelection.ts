import { useState, useMemo } from 'react';

export interface TimeSlot {
  id: string;
  time: string;
  hour: number;
  minute: number;
  disabled: boolean;
}

export const useTimeSelection = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const availableTimeSlots: TimeSlot[] = [
    { id: '1', time: '9:05', hour: 9, minute: 5, disabled: false },
    { id: '2', time: '10:40', hour: 24, minute: 40, disabled: false },
    { id: '3', time: '12:00', hour: 12, minute: 0, disabled: false },
    { id: '4', time: '12:50', hour: 12, minute: 50, disabled: false },
    { id: '5', time: '14:50', hour: 14, minute: 50, disabled: false },
    { id: '6', time: '16:20', hour: 16, minute: 20, disabled: false }
  ];

  const pad = (n: number) => n.toString().padStart(2, '0');

  const getTimeSlotsWithAvailability = useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Solo aplicar restricción de tiempo si la fecha seleccionada es hoy
    const isToday = selectedDate.toDateString() === now.toDateString();

    return availableTimeSlots.map(slot => {
      if (!isToday) {
        return { ...slot, disabled: false };
      }

      const slotTotalMinutes = slot.hour * 60 + slot.minute;
      const currentTotalMinutes = currentHour * 60 + currentMinute;
      const timeDifferenceMinutes = slotTotalMinutes - currentTotalMinutes;

      // Debe tener al menos 90 minutos (1 hora y 30 minutos) de antelación
      const isDisabled = timeDifferenceMinutes < 90;

      return {
        ...slot,
        disabled: isDisabled
      };
    });
  }, [selectedDate]);

  const handleTimeSelect = (timeId: string) => {
    // Si timeId está vacío, deselecciona
    if (timeId === '') {
      setSelectedTime(null);
      return;
    }
    
    const slot = getTimeSlotsWithAvailability.find(s => s.id === timeId);
    if (slot && !slot.disabled) {
      setSelectedTime(timeId);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Limpiar selección de tiempo al cambiar fecha
    setSelectedTime(null);
  };

  const getSelectedTimeSlot = () => {
    return getTimeSlotsWithAvailability.find(slot => slot.id === selectedTime);
  };

  const isTimeSelected = () => {
    return selectedTime !== null;
  };

  const clearSelection = () => {
    setSelectedTime(null);
  };

  const clearDateSelection = () => {
    setSelectedDate(new Date());
    setSelectedTime(null);
  };

  // Función para generar el string formateado para el backend
  // Usa la fecha y hora SELECCIONADAS por el usuario para la entrega
  const getFormattedDateTime = (): string | null => {
    if (!selectedTime) return null;
    
    const selectedSlot = getSelectedTimeSlot();
    if (!selectedSlot) return null;

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // getMonth() retorna 0-11
    const day = selectedDate.getDate();
    
    const formattedDateTime = `${year}-${pad(month)}-${pad(day)}T${pad(selectedSlot.hour)}:${pad(selectedSlot.minute)}:00`;
    
    return formattedDateTime;
  };

  // Función para obtener la hora más cercana automáticamente para HOY
  const getClosestAvailableTimeForToday = (): string => {
    const now = new Date();
    const actualMinutes = now.getHours() * 60 + now.getMinutes();
    
    let closest = availableTimeSlots[0];
    let minDiff = Infinity;

    availableTimeSlots.forEach(slot => {
      const slotMinutes = slot.hour * 60 + slot.minute;
      const diff = Math.abs(slotMinutes - actualMinutes);
      
      if (diff < minDiff) {
        minDiff = diff;
        closest = slot;
      }
    });

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const formattedDateTime = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}T${pad(closest.hour)}:${pad(closest.minute)}:00`;
    
    return formattedDateTime;
  };

  return {
    availableTimeSlots: getTimeSlotsWithAvailability,
    selectedTime,
    selectedDate,
    handleTimeSelect,
    handleDateSelect,
    getSelectedTimeSlot,
    isTimeSelected,
    clearSelection,
    clearDateSelection,
    getFormattedDateTime,
    getClosestAvailableTimeForToday
  };
};