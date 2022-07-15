import {EnvConfig} from '@app/config/env.config'
import {sign, verify} from 'jsonwebtoken'
import TokenModel from '../models/token.model'
import {JwtPayload} from '../types/jwt_payload.interface'
import {JwtResponseInterface} from '../types/jwt_response.interface'
import {TokenInterface} from '../types/token.interface'

export class TokenService extends EnvConfig {
  // GENERATE TOKENS
  async generateTokens(payload: JwtPayload): Promise<JwtResponseInterface> {
    const access_token = await sign(payload, this.getEnv('JWT_SECRET'), {expiresIn: this.getEnv('JWT_EXPIRE')})
    const refresh_token = await sign(payload, this.getEnv('JWT_REFRESH_SECRET'), {
      expiresIn: this.getEnv('JWT_REFRESH_EXPIRE'),
    })

    return {access_token, refresh_token}
  }

  // SAVE TOKEN
  async saveToken(user_id: string, refresh_token: string) {
    const token = await TokenModel.findOne({user: user_id})

    if (token) {
      token.refresh_token = refresh_token
      return await token.save()
    } else {
      const newToken = await TokenModel.create({user: user_id, refresh_token})
      return newToken
    }
  }

  // REMOVE TOKEN
  async removeToken(refresh_token: string): Promise<string> {
    const token = await TokenModel.findOne({refresh_token})
    await token.remove()
    return 'logged out'
  }

  // FIND TOKEN IN DATABASE
  async findToken(refresh_token: string): Promise<TokenInterface> {
    const tokenExists = await TokenModel.findOne({refresh_token})
    return tokenExists
  }

  // VALIDATE REFRESH TOKEN
  async validateRefreshToken(refresh_token: string): Promise<JwtPayload> {
    try {
      const payload = (await verify(refresh_token, this.getEnv('JWT_REFRESH_SECRET'))) as JwtPayload
      return payload
    } catch (error) {
      return null
    }
  }

  // VALIDATE ACCESS TOKEN
  async validateAccessToken(access_token: string): Promise<JwtPayload> {
    try {
      const payload = (await verify(access_token, this.getEnv('JWT_SECRET'))) as JwtPayload
      return payload
    } catch (error) {
      return null
    }
  }
}
