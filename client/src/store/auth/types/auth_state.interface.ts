import {UserInterface} from './user.interface'

export interface AuthState {
  user: UserInterface | null
  isSubmitting: boolean
  isAuth: boolean
  error: any
  redirect: boolean
  available: boolean | null
}
