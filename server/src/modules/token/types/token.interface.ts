import {Schema} from 'mongoose'

export interface TokenInterface {
  _id: string
  user: Schema.Types.ObjectId
  refresh_token: string
}
