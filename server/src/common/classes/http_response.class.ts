import {Response} from 'express'
import {HttpCode} from '@app/shared/types/http_code.enum'

export class HttpResponse {
  Ok(res: Response, data?: any) {
    return res.status(HttpCode.OK).json({
      status: HttpCode.OK,
      statusMsg: 'Success',
      data,
    })
  }

  Created(res: Response, data?: any) {
    return res.status(HttpCode.CREATED).json({
      status: HttpCode.CREATED,
      statusMsg: 'Created',
      data,
    })
  }

  BadRequest(res: Response, error?: any) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: HttpCode.BAD_REQUEST,
      statusMsg: 'Bad Request',
      error,
    })
  }
}
