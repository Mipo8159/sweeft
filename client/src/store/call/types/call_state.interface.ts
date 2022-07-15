import {CallInterface} from './call.interface'

export interface CallState {
  isLoading: boolean
  calls: CallInterface[]
  error: string | null
  message: string | null
}
