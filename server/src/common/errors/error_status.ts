export class ErrorStatus {
  statuses = [
    {404: 'Not Found'},
    {400: 'Bad Request'},
    {401: 'Unauthorized'},
    {403: 'Forbidden'},
    {409: 'Conflict'},
    {500: 'Internal Server Error'},
  ]
  status: number

  constructor(status: number) {
    this.status = status
  }

  _ErrorStatus(): string {
    const result = this.statuses.find((s) => Number(Object.keys(s)) === this.status)
    return Object.values(result)[0]
  }

  static GetStatus(status: number) {
    return new ErrorStatus(status)._ErrorStatus()
  }
}
