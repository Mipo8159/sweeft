import {HttpResponse} from '@app/common/classes/http_response.class'
import {ExpressRequest} from '@app/shared/types/express_request.interface'
import {NextFunction, Request, Response} from 'express'
import {CallDto} from '../dto/create_call.dto'
import {CallService} from '../services/call.service'

export class CallController {
  constructor(
    private readonly callService: CallService = new CallService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async createCall(req: Request, res: Response, next: NextFunction) {
    const callDto: CallDto = req.body.callDto

    try {
      const result = await this.callService.createCall(callDto)
      return this.httpResponse.Created(res, {call: result})
    } catch (error) {
      return next(error)
    }
  }

  async findCalls(req: ExpressRequest, res: Response, next: NextFunction) {
    try {
      const result = await this.callService.findCalls(req.user)
      return this.httpResponse.Ok(res, {calls: result})
    } catch (error) {
      return next(error)
    }
  }

  async findCall(req: Request, res: Response, next: NextFunction) {
    const phone = req.params.phone
    try {
      const result = await this.callService.findCall(phone)
      return this.httpResponse.Ok(res, {call: result})
    } catch (error) {
      return next(error)
    }
  }

  async removeCall(req: Request, res: Response, next: NextFunction) {
    const _id = req.params.phone
    try {
      const result = await this.callService.removeCall(_id)
      return this.httpResponse.Ok(res, {call: result})
    } catch (error) {
      return next(error)
    }
  }
}
