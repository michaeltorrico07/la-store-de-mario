import { configureStore, combineReducers  } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import kitchenSlice from '../../features/employees/kitchen/slice'
import listProductsSlice from '../../features/product/slice'
import authSlice from '../../features/auth/slice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['products', 'auth']
}

const rootReducer = combineReducers({
  kitchen: kitchenSlice,
  products: listProductsSlice,
  auth: authSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer ,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store