import {ContactInterface} from './contact.interface'

export interface ContactState {
  contacts: ContactInterface[]
  contact: ContactInterface | null
  error: string | null
  filtered: ContactInterface[]
}
