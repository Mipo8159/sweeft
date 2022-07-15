import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {isAvailable, login, logout, refresh, register} from './auth.action'
import {UserInterface} from './types/user.interface'
import {AuthState} from './types/auth_state.interface'

const initialState: AuthState = {
  user: null,
  isSubmitting: true,
  error: null,
  redirect: false,
  isAuth: false,
  available: null,
}

const authReducer = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setErrors(state: AuthState) {
      state.error = null
    },
    resetRedirect(state: AuthState) {
      state.redirect = false
    },
    resetAvailable(state: AuthState) {
      state.available = null
    },
  },
  extraReducers: {
    // REGISTER
    [register.pending.type]: (state: AuthState) => {
      state.isSubmitting = true
    },
    [register.rejected.type]: (
      state: AuthState,
      action: PayloadAction<any>
    ) => {
      state.isSubmitting = false
      state.error = action.payload
    },
    [register.fulfilled.type]: (state: AuthState) => {
      state.isSubmitting = false
      state.redirect = true
    },

    // LOGIN
    [login.pending.type]: (state: AuthState) => {
      state.isSubmitting = true
    },
    [login.rejected.type]: (
      state: AuthState,
      action: PayloadAction<any>
    ) => {
      state.isSubmitting = false
      state.error = action.payload
    },
    [login.fulfilled.type]: (
      state: AuthState,
      action: PayloadAction<UserInterface>
    ) => {
      state.isSubmitting = false
      state.user = action.payload
      state.isAuth = true
    },

    // LOGOUT
    [logout.pending.type]: (state: AuthState) => {
      state.isSubmitting = true
    },
    [logout.rejected.type]: (
      state: AuthState,
      action: PayloadAction<any>
    ) => {
      state.isSubmitting = false
      state.error = action.payload
    },
    [logout.fulfilled.type]: (state: AuthState) => {
      state.isSubmitting = false
      state.user = null
      state.isAuth = false
    },

    // REFRESH
    [refresh.fulfilled.type]: (
      state: AuthState,
      action: PayloadAction<UserInterface>
    ) => {
      state.user = action.payload
      state.isAuth = true
      state.isSubmitting = false
    },
    [refresh.rejected.type]: (state: AuthState) => {
      state.isSubmitting = false
    },

    // AVAILABLE
    [isAvailable.fulfilled.type]: (
      state: AuthState,
      action: PayloadAction<boolean>
    ) => {
      state.available = action.payload
    },
  },
})

export const {setErrors, resetRedirect, resetAvailable} =
  authReducer.actions
export default authReducer.reducer
