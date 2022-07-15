import {model, Schema} from 'mongoose'

export {Schema, model} from 'mongoose'

const CallSchema = new Schema({
  name: {type: String, required: true},
  phone: {type: String, required: true},
  created_at: {type: Date, default: new Date()},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
})

export default model('Call', CallSchema)
