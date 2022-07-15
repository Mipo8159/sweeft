import {UserInterface} from '@app/modules/auth/types/user.interface'

export interface AuthResponseInterface {
  user: UserInterface
  access_token: string
  refresh_token?: string
}
