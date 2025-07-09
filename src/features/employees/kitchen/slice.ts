import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { WritableDraft } from "immer"
import type { RootState } from "../../../infrastructure/redux/store"

interface KitchenProduct {
  id: string
  name: string
  amount: number
  deliveredAmount: number
}

export interface KitchenProducts {
  deliverHour: string
  kitchenProducts: KitchenProduct[]
}

const initialState: KitchenProducts = {
  deliverHour: '',
  kitchenProducts: []
}

interface AmountConfirmProps {
  id: string
  amount?: number
}

function amountConfirmReducer(state: WritableDraft<KitchenProducts>, action: PayloadAction<AmountConfirmProps>){
  const id = action.payload.id
  const amount = action.payload.amount

  const order = state.kitchenProducts.find(product => product.id === id)
  if (order) {
    if (amount === -1) {
      order.deliveredAmount = order.amount
    } else {
      order.deliveredAmount += amount ?? 1
    }
  }
}

export const kitchenSlice = createSlice({
  name: 'kitchen',
  initialState,
  reducers: {
    amountConfirm: amountConfirmReducer
  }
})

export const { amountConfirm } = kitchenSlice.actions
export const selectKitchenProducts = (state: RootState) => state.kitchen.kitchenProducts
export const selectKitchenHour = (state: RootState) => state.kitchen.deliverHour
export default kitchenSlice.reducer