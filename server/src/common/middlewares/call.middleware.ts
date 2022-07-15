import {CallDto} from '@app/modules/call/dto/create_call.dto'
import {NextFunction, Request, Response} from 'express'
import {ApiError} from '../errors/api_error'

export class CallMiddleware {
  // CHECKS FOR ERRORS IN CALL DTO
  CallError(req: Request, _: Response, next: NextFunction) {
    const isNumber = (str: string) => {
      return /^[0-9]*$/.test(str)
    }

    const isString = (str: string) => {
      return /^[A-Za-z]*$/.test(str)
    }

    try {
      const callDto: CallDto = req.body.callDto

      if (!callDto) {
        throw ApiError.BadRequest('No input')
      }

      // NO ALPHABETS IN NUMBER
      if (!isNumber(callDto.phone)) {
        throw ApiError.BadRequest('Invalid Phone number')
      }

      // NO NUMBERS IN NAME
      if (!isString(callDto.name)) {
        throw ApiError.BadRequest('Invalid name')
      }

      return next()
    } catch (error) {
      return next(error)
    }
  }
}
