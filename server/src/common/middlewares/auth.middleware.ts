import {NextFunction, Response} from 'express'

import {TokenService} from '@app/modules/token/services/token.service'
import {ExpressRequest} from '@app/shared/types/express_request.interface'

export class AuthMiddleware {
  constructor(private readonly tokenService: TokenService = new TokenService()) {}

  async Middleware(req: ExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null
      return next()
    }

    try {
      const access_token = req.headers.authorization.split(' ')[1]
      const userData = await this.tokenService.validateAccessToken(access_token)

      req.user = userData._id

      next()
    } catch (error) {
      req.user = null
      return next()
    }
  }
}
