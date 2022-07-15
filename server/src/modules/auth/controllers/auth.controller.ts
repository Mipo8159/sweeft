import {Response, Request, NextFunction} from 'express'
import {validate} from 'class-validator'

import {AuthDto} from '@app/modules/auth/dto/auth.dto'
import {HttpResponse} from '@app/common/classes/http_response.class'
import {ValidationClass} from '@app/shared/utils/validation.class'
import {AuthService} from '../services/auth.service'

export class AuthController {
  constructor(
    private readonly authService: AuthService = new AuthService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  // REGISTER
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      // -> validation
      const {username, password} = req.body.authDto
      const authDto = new AuthDto(username, password)
      const errors = await validate(authDto)
      if (errors.length > 0) {
        return this.httpResponse.BadRequest(res, new ValidationClass(errors).validateErrors())
      }

      const result = await this.authService.register(authDto)

      return this.httpResponse.Created(res, {
        user: result.user,
        access_token: result.access_token,
      })
    } catch (error) {
      return next(error)
    }
  }

  // LOGIN
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // -> validation
      const {username, password} = req.body.authDto
      const authDto = new AuthDto(username, password)
      const errors = await validate(authDto)

      if (errors.length > 0) {
        return this.httpResponse.BadRequest(res, new ValidationClass(errors).validateErrors())
      }

      const result = await this.authService.login(authDto)
      /* Set cookie */
      res.cookie('refresh_token', result.refresh_token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      return this.httpResponse.Ok(res, {
        user: result.user,
        access_token: result.access_token,
      })
    } catch (error) {
      return next(error)
    }
  }

  // LOGOUT
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const {refresh_token} = req.cookies
      const result = await this.authService.logout(refresh_token)
      res.clearCookie('refresh_token')
      return this.httpResponse.Ok(res, result)
    } catch (error) {
      return next(error)
    }
  }

  // REFRESH
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const {refresh_token} = req.cookies
      const result = await this.authService.refresh(refresh_token)

      /* Set cookie */
      res.cookie('refresh_token', result.refresh_token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      return this.httpResponse.Ok(res, {user: result.user, access_token: result.access_token})
    } catch (error) {
      return next(error)
    }
  }

  // IS USERNAME AVAILABLE
  async isAvailable(req: Request, res: Response, next: NextFunction) {
    try {
      const username = req.body.username
      console.log(username)
      const result = await this.authService.available(username)

      return this.httpResponse.Ok(res, {available: result})
    } catch (error) {
      return next(error)
    }
  }
}
