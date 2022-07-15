import {Schema, model} from 'mongoose'
import {UserInterface} from '@app/modules/auth/types/user.interface'

const UserSchema = new Schema<UserInterface>({
  username: {type: String, unique: true, required: true},
  password: {type: String, require: true},
  created_at: {type: Date, default: new Date()},
})

export default model<UserInterface>('User', UserSchema)
