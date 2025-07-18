import { useEffect } from "react"
import { useAuthContext } from "../../auth/hooks/useAuthContext"
import { useGetInitPoint } from "./useGetInitPoint"
import type { CartItem } from "../product"
import { useCart } from "./useCart"

const getFormattedDeliveryTimeFromSelected = (selectedTime: { hour: number, minute: number }) => {
  const actualDate = new Date();

  const pad = (n: number) => n.toString().padStart(2, '0');

  const formatted = `${actualDate.getFullYear()}-${pad(actualDate.getMonth() + 1)}-${pad(actualDate.getDate())}T${pad(selectedTime.hour)}:${pad(selectedTime.minute)}:00`;

  return formatted;
};


export const useInitPointRedirect = (items: CartItem[]) => {
  const { user } = useAuthContext()
  const { data, loading, error, onSubmit } = useGetInitPoint()
  const { getSelectedTimeSlot } = useCart()

  const generateInitPoint = () => {
    const selectedTime = getSelectedTimeSlot()
    
    if (!selectedTime) {
      console.error('No se ha seleccionado un horario de entrega')
      return
    }
    const date = getFormattedDeliveryTimeFromSelected(selectedTime)

    const bodyItems = items.map((item) => ({
      id: item.id,
      title: item.name,
      quantity: item.quantity,
      description: item.description,
      picture_url: item.image,
      unit_price: item.price,
      category_id: item.category
    }))

    const formdata = {
      items: bodyItems,
      payer: {
        name: user.name,
        surname: user.lastName,
        email: user.email
      },
      metadata: {
        date: date,
        idUser: user.id
      }
    }
    onSubmit(formdata)
  }

  useEffect(() => {
    if (data) {
      window.location.href = data
    }
  }, [data])

  return {
    generateInitPoint,
    loading,
    error
  }
}