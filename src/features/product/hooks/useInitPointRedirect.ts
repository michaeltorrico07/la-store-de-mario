import { useEffect } from "react"
import { useAuthContext } from "../../auth/hooks/useAuthContext"
import { useGetInitPoint } from "./useGetInitPoint"
import type { CartItem } from "../product"
import { getActualDeliverHour } from "../../shared"
import { useCart } from "./useCart"

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
        date: getActualDeliverHour(),
        deliveryTime: selectedTime.time, // Incluir el horario seleccionado
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