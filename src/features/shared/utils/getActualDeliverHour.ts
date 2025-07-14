export const getActualDeliverHour = () => {
  const actualHour = new Date()

  const deliveryHours = [
    '09:00',
    '10:40',
    '12:10',
    '12:50',
    '14:50',
    '16:20'
  ];

  const pad = (n: number) => n.toString().padStart(2, '0');

  const today = new Date(
    actualHour.getFullYear(),
    actualHour.getMonth(),
    actualHour.getDate()
  );

  const actualMinutes = actualHour.getHours() * 60 + actualHour.getMinutes();

  let closest = deliveryHours[0];
  let minDiff = Infinity;

  deliveryHours.map(hourStr => {
    const [h, m] = hourStr.split(':').map(Number);
    const minutes = h * 60 + m;
    const diff = Math.abs(minutes - actualMinutes);
    return { hourStr, diff };
  }).forEach(({ hourStr, diff }) => {
    if (diff < minDiff) {
      minDiff = diff;
      closest = hourStr;
    }
  });

  const [closestHour, closestMinute] = closest.split(':');
  const formattedActualDeliveryHour = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}T${closestHour}:${closestMinute}:00`;

  return formattedActualDeliveryHour;
}
