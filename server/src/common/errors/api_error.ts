import {HttpCode} from '@app/shared/types/http_code.enum'

export class ApiError extends Error {
  status: number

  constructor(status: number, error: string) {
    super(error)
    this.status = status
  }

  static Unauthorized(error: string) {
    return new ApiError(HttpCode.UNAUTHORIZED, error)
  }

  static BadRequest(error: string) {
    return new ApiError(HttpCode.BAD_REQUEST, error)
  }

  static NotFound(error: string) {
    return new ApiError(HttpCode.NOT_FOUND, error)
  }

  static Forbidden(error: string) {
    return new ApiError(HttpCode.FORBIDDEN, error)
  }

  static Conflict(error: string) {
    return new ApiError(HttpCode.CONFLICT, error)
  }
}
