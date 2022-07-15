import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {createCall, findCalls, removeCall} from './call.action'
import {CallInterface} from './types/call.interface'
import {CallState} from './types/call_state.interface'

const initialState: CallState = {
  calls: [],
  isLoading: false,
  error: null,
  message: null,
}

const callReducer = createSlice({
  initialState,
  name: 'call',
  reducers: {
    clearStatus(state: CallState) {
      state.error = null
      state.message = null
    },
  },
  extraReducers: {
    // CREATE CALL
    [createCall.pending.type]: (state: CallState) => {
      state.isLoading = true
    },
    [createCall.fulfilled.type]: (
      state: CallState,
      action: PayloadAction<CallInterface[]>
    ) => {
      state.calls = action.payload
      state.isLoading = false
      state.message = 'Call successful'
    },
    [createCall.rejected.type]: (
      state: CallState,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload
      state.isLoading = false
    },

    // FIND CALLS
    [findCalls.pending.type]: (state: CallState) => {
      state.isLoading = false
    },
    [findCalls.fulfilled.type]: (
      state: CallState,
      action: PayloadAction<CallInterface[]>
    ) => {
      state.isLoading = false
      state.calls = action.payload
      state.error = null
    },
    [findCalls.rejected.type]: (
      state: CallState,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false
      state.error = action.payload
    },

    // REMOVE CALL
    [removeCall.pending.type]: (state: CallState) => {
      state.isLoading = true
    },
    [removeCall.fulfilled.type]: (
      state: CallState,
      action: PayloadAction<CallInterface[]>
    ) => {
      state.isLoading = false
      state.calls = action.payload
      state.error = null
    },
    [removeCall.rejected.type]: (
      state: CallState,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const {clearStatus} = callReducer.actions
export default callReducer.reducer
