import {IsNotEmpty} from 'class-validator'

export class AuthDto {
  @IsNotEmpty({message: 'username must be provided'})
  readonly username: string

  @IsNotEmpty({message: 'password must be provided'})
  readonly password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
}
