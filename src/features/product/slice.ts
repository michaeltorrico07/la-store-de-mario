import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "./product"

interface ListProducts {
  products: Product[]
}

export const initialState: ListProducts = {
  products: []
}

export const listProductsSlice = createSlice({
  name: 'listProduct',
  initialState,
  reducers: {
    createListProducts: (_state, action: PayloadAction<ListProducts>) => action.payload,
    modifyListProducts: (state, action) => ({ ...state, ...action.payload }),
    resetListProducts: () => initialState
  }
})

export const { createListProducts, modifyListProducts, resetListProducts } = listProductsSlice.actions

export default listProductsSlice.reducer
