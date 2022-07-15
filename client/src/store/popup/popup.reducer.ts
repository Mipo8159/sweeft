import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ToastState} from './types/popup_state.interface'

const initialState: ToastState = {
  toast: null,
  popupCreate: false,
  layer: false,
}
const popupReducer = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    // OPENS TOAST
    openToast(state: ToastState, action: PayloadAction<number>) {
      state.toast = action.payload
      state.layer = true
    },

    // OPENS CREATE CONTACT POPUP
    openPopupCreate(state: ToastState) {
      state.popupCreate = true
      state.layer = true
    },

    // CLOSES TOAST
    closeToast(state: ToastState) {
      state.toast = null
      state.layer = false
    },

    // CLOSES CREATE CONTACT POPUP
    closePopupCreate(state: ToastState) {
      state.popupCreate = false
      state.layer = false
    },
  },
})

export const {openToast, openPopupCreate, closeToast, closePopupCreate} =
  popupReducer.actions
export default popupReducer.reducer
