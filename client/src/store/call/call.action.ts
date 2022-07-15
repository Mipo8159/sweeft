import {createAsyncThunk} from '@reduxjs/toolkit'
import $axios from '../../http'
import {CallDto} from './dto/call.dto'

export const createCall = createAsyncThunk(
  'create/call',
  async (callDto: CallDto, thunkApi) => {
    try {
      const saved = await $axios.post('/calls', callDto)

      if (saved) {
        const res = await $axios.get('/calls')
        return thunkApi.fulfillWithValue(res.data.data.calls)
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error)
    }
  }
)

export const findCalls = createAsyncThunk(
  'find/calls',
  async (_, thunkApi) => {
    try {
      const res = await $axios.get('/calls')
      return thunkApi.fulfillWithValue(res.data.data.calls)
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error)
    }
  }
)

export const removeCall = createAsyncThunk(
  'find/calls',
  async (phone: string, thunkApi) => {
    try {
      await $axios.delete(`/call/${phone}`)

      const res = await $axios.get('/calls')
      return thunkApi.fulfillWithValue(res.data.data.calls)
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error)
    }
  }
)
