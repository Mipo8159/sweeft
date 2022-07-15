import {ApiError} from '@app/common/errors/api_error'
import {CallDto} from '../dto/create_call.dto'
import CallModel from '../model/call.model'

export class CallService {
  // CREATE CALL
  async createCall(callDto: CallDto) {
    const contact = CallModel.create({name: callDto.name, phone: callDto.phone, user: callDto._id})
    return contact
  }

  // FIND CALLS
  async findCalls(user: string) {
    return await CallModel.find({user})
  }

  // FIND CALL
  async findCall(_id: string) {
    const call = await CallModel.findOne({_id})
    if (!call) {
      throw ApiError.NotFound('Call not found')
    }
    return call
  }

  // REMOVE CALL
  async removeCall(phone: string) {
    const call = await CallModel.findOne({phone})
    if (!call) {
      throw ApiError.NotFound('Call not found')
    }
    return await CallModel.remove(call)
  }
}
