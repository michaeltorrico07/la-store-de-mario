import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "./auth"

export const initialState: User = {
  id: '',
  email: '',
  name: '',
  lastName: '',
  dni: '',
  isLoggedin: false,
  isVerified: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createAuth: (_state, action: PayloadAction<User>) => action.payload,
    modifyAuth: (state, action) => ({ ...state, ...action.payload }),
    resetAuth: () => initialState
  }
})

export const { createAuth, modifyAuth, resetAuth } = authSlice.actions

export default authSlice.reducer
