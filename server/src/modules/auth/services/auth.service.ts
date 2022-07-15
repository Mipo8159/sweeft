import {ApiError} from '@app/common/errors/api_error'
import {AuthDto} from '../dto/auth.dto'
import UserModel from '../models/user.model'
import {hash, compare} from 'bcrypt'
import {AuthResponseInterface} from '../types/auth_response.interface'
import {TokenService} from '@app/modules/token/services/token.service'

export class AuthService {
  constructor(private readonly tokenService: TokenService = new TokenService()) {}

  // REGISTER
  async register(authDto: AuthDto): Promise<AuthResponseInterface> {
    const {username, password} = authDto

    /* username is taken */
    const exists = await UserModel.findOne({username})
    if (exists) {
      throw ApiError.Conflict('Username is taken')
    }

    /* initialize user */
    const user = new UserModel()
    user.username = username
    user.password = await hash(password, 10)
    await user.save()
    delete user.password

    /* generate tokens and saving refreshToken */
    const tokens = await this.tokenService.generateTokens({_id: user._id, username: user.username})
    await this.tokenService.saveToken(user.id, tokens.refresh_token)

    return {user, access_token: tokens.access_token, refresh_token: tokens.refresh_token}
  }

  // LOGIN
  async login(authDto: AuthDto): Promise<AuthResponseInterface> {
    const {username, password} = authDto

    const user = await UserModel.findOne({username})
    /* user does not exists */
    if (!user) {
      throw ApiError.NotFound('Incorrect credentials')
    }

    /* check password validity */
    const isMatch = await compare(password, user.password)
    if (!isMatch) {
      throw ApiError.NotFound('incorrect credentials')
    } else {
      delete user.password
    }

    /* generate tokens and saving refreshToken */
    const tokens = await this.tokenService.generateTokens({_id: user._id, username: user.username})
    await this.tokenService.saveToken(user.id, tokens.refresh_token)

    return {user, access_token: tokens.access_token, refresh_token: tokens.refresh_token}
  }

  // LOGOUT
  async logout(refresh_token: string): Promise<string> {
    if (!refresh_token) {
      throw ApiError.Unauthorized('Unauthorized')
    }
    return await this.tokenService.removeToken(refresh_token)
  }

  // REFRESH
  async refresh(refresh_token: string) {
    if (!refresh_token) {
      throw ApiError.Unauthorized('Unauthorized')
    }

    // -> Validate tokens
    const tokenFromDb = await this.tokenService.findToken(refresh_token)
    const userData = await this.tokenService.validateRefreshToken(refresh_token)
    if (!userData || !tokenFromDb) {
      throw ApiError.Unauthorized('Unauthorized')
    }

    const user = await UserModel.findOne({_id: userData._id})
    const tokens = await this.tokenService.generateTokens({_id: user._id, username: user.username})

    await this.tokenService.saveToken(user.id, tokens.refresh_token)
    return {user, access_token: tokens.access_token, refresh_token: tokens.refresh_token}
  }

  // IS USERNAME AVAILABLE
  async available(username: string): Promise<boolean> {
    const user = await UserModel.findOne({username})
    if (user) {
      return false
    } else {
      return true
    }
  }
}
