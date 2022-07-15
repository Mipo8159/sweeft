import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authReducer from './auth/auth.reducer'
import callReducer from './call/call.reducer'
import contactReducer from './contact/contact.reducer'
import popupReducer from './popup/popup.reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  contact: contactReducer,
  popup: popupReducer,
  call: callReducer,
})

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  })

export type AppState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
