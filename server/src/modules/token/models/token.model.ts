import {Schema, model} from 'mongoose'
import {TokenInterface} from '@app/modules/token/types/token.interface'

const TokenSchema = new Schema<TokenInterface>({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  refresh_token: {type: String, required: true},
})

export default model('Token', TokenSchema)
