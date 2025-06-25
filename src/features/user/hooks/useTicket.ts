import { useCallback, useState } from "react"
import { type Order } from "../profile.d";

export const useTicket = () => {
  const [selectedTicket, setSelectedTicket] = useState<Order | null>(null);
  const [showTicket, setShowTicket] = useState<boolean>(false);

  const showTicketModal = useCallback((order: Order) => {
    setSelectedTicket(order)
    setShowTicket(true)
  }, [])

  const closeTicket = useCallback(() => {
    setShowTicket(false)
    setSelectedTicket(null)
  }, [])

  return { selectedTicket, showTicket, showTicketModal, closeTicket }
}