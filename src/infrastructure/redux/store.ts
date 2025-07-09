import { configureStore } from '@reduxjs/toolkit'
import kitchenSlice from '../../features/employees/kitchen/slice'

export const store = configureStore({
  reducer: {
    kitchen: kitchenSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store