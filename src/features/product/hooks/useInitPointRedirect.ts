import { useEffect } from "react"
import { useAuthContext } from "../../auth/hooks/useAuthContext"
import { useGetInitPoint } from "./useGetInitPoint"
import type { CartItem } from "../product"

export const useInitPointRedirect = (items: CartItem[]) => {
  const { user } = useAuthContext()
  const { data, loading, error, onSubmit } = useGetInitPoint()

  const generateInitPoint = () => {
    const bodyItems = items.map((item) => ({
      id: item.id,
      title: item.name,
      quantity: item.quantity,
      description: item.description,
      picture_url: item.image,
      unit_price: item.price,
      category_id: item.tags[0]
    }))

    const deliveryDate = new Date()
    deliveryDate.setHours(16, 20, 0, 0)

    const formattedDate = deliveryDate.toLocaleString('es-AR', {
      dateStyle: 'long',
      timeStyle: 'medium',
      timeZoneName: 'short'
    });

    const formdata = {
      items: bodyItems,
      payer: {
        name: user.name,
        surname: user.lastName,
        email: user.email
      },
      metadata: {
        date: formattedDate,
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
