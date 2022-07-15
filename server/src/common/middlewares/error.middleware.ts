import {HttpCode} from '@app/shared/types/http_code.enum'
import {NextFunction, Response, Request} from 'express'
import {ApiError} from '../errors/api_error'
import {ErrorStatus} from '../errors/error_status'

export class ErrorMiddleware {
  // HANDLES ERRORS IN REQUESTS (GLOBAL MIDDLEWARE)
  Middleware(err: Error, _: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
      res
        .status(err.status)
        .json({status: err.status, statusMsg: ErrorStatus.GetStatus(err.status), error: err.message})

      return next()
    }

    // UNPREDICTED ERROR
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .json({status: HttpCode.INTERNAL_SERVER_ERROR, error: 'Unpredicted Error'})
    return next()
  }
}
