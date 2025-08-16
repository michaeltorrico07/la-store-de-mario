import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "./product"

interface ListProducts {
  products: Product[]
  productsRecentlyPurchase: Product[]
}

export const initialState: ListProducts = {
  products: [],
  productsRecentlyPurchase: []
}

export const listProductsSlice = createSlice({
  name: 'listProduct',
  initialState,
  reducers: {
    createListProducts: (state, action: PayloadAction<Product[]>) => {
      state.products  = action.payload
    },
    createProductsRecentlyPurchase: (state, action: PayloadAction<Product[]>) => {
      state.productsRecentlyPurchase = action.payload
    },
    modifyListProducts: (state, action) => ({ ...state, ...action.payload }),
    resetListProducts: () => initialState
  }
})

export const { createListProducts, createProductsRecentlyPurchase, modifyListProducts, resetListProducts } = listProductsSlice.actions

export default listProductsSlice.reducer
