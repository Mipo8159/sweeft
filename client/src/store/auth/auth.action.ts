import {createAsyncThunk} from '@reduxjs/toolkit'
import $axios from '../../http'
import {AuthDto} from './dto/auth.dto'

export const register = createAsyncThunk(
  'register',
  async (authDto: AuthDto, thunkApi) => {
    try {
      const res = await $axios.post('/register', authDto)

      return thunkApi.fulfillWithValue(res.data.data.user)
    } catch (error: any) {
      if (error.response.status === 400) {
        return thunkApi.rejectWithValue(error.response.data.error)
      } else {
        return thunkApi.rejectWithValue({
          username: error.response.data.error,
        })
      }
    }
  }
)

export const login = createAsyncThunk(
  'login',
  async (authDto: AuthDto, thunkApi) => {
    try {
      const res = await $axios.post('/login', authDto)

      if (res.data.data.access_token) {
        localStorage.setItem('access_token', res.data.data.access_token)
      }
      return thunkApi.fulfillWithValue(res.data.data.user)
    } catch (error: any) {
      if (error.response.status === 400) {
        return thunkApi.rejectWithValue(error.response.data.error)
      } else {
        return thunkApi.rejectWithValue({
          message: error.response.data.error,
        })
      }
    }
  }
)

export const logout = createAsyncThunk('logout', async (_, thunkApi) => {
  try {
    const res = await $axios.post('/logout')
    localStorage.removeItem('access_token')

    return thunkApi.fulfillWithValue(res.data.data.user)
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const refresh = createAsyncThunk('refresh', async (_, thunkApi) => {
  const res = await $axios.get('/refresh')
  localStorage.setItem('access_token', res.data.data.access_token)
  return thunkApi.fulfillWithValue(res.data.data.user)
})

export const isAvailable = createAsyncThunk(
  'isAvailable',
  async (username: string, thunkApi) => {
    const res = await $axios.post(`/available/`, {username})

    return thunkApi.fulfillWithValue(res.data.data.available)
  }
)
