import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { WritableDraft } from "immer"
import type { RootState } from "../../../infrastructure/redux/store"

interface KitchenProduct {
  name: string
  amount: number
}

export interface Kitchen {
  deliverHour: string
  products: KitchenProduct[]
}

const initialState: Kitchen = {
  deliverHour: '',
  products: []
}

interface AmountConfirmProps {
  name: string
  amount?: number
}

function amountConfirmReducer(state: WritableDraft<Kitchen>, action: PayloadAction<AmountConfirmProps>){
  const name = action.payload.name
  const amount = action.payload.amount

  const order = state.products.find(product => product.name === name)
  if (order) {
    if (amount === -1) {
      order.amount = 0
    } else {
      order.amount -= amount ?? 1
    }
  }
}

interface LoadProductsProps {
  deliverHour: string
  products: KitchenProduct[]
}

function loadProductsReducer(state: WritableDraft<Kitchen>, action: PayloadAction<LoadProductsProps>){
  state.deliverHour = action.payload.deliverHour
  state.products = action.payload.products
}

export const kitchenSlice = createSlice({
  name: 'kitchen',
  initialState,
  reducers: {
    amountConfirm: amountConfirmReducer,
    loadProducts: loadProductsReducer
  }
})

export const { amountConfirm, loadProducts } = kitchenSlice.actions
export const selectKitchenProducts = (state: RootState) => state.kitchen.products
export const selectKitchenHour = (state: RootState) => state.kitchen.deliverHour
export default kitchenSlice.reducer
