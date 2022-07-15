import {ValidationError} from 'class-validator'

export class ValidationClass {
  public errors: ValidationError[]

  constructor(errors: ValidationError[]) {
    this.errors = errors
  }

  validateErrors = () => {
    return this.errors.reduce((prev: any, err: any) => {
      prev[err.property] = Object.entries(err.constraints)[0][1]
      return prev
    }, {})
  }
}
