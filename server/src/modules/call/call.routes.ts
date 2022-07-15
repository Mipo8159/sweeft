import {CallMiddleware} from '@app/common/middlewares/call.middleware'
import {RootRouter} from '@app/common/roots/root.router'
import {NextFunction, Request, Response} from 'express'
import {CallController} from './controllers/call.controller'

export class CallRouter extends RootRouter<CallController> {
  constructor() {
    super(CallController)
  }

  routes(): void {
    this.router.post(
      '/calls',
      (req: Request, res: Response, next: NextFunction) => new CallMiddleware().CallError(req, res, next),
      (req: Request, res: Response, next: NextFunction) => this.constroller.createCall(req, res, next),
    )

    this.router.get('/calls', (req: Request, res: Response, next: NextFunction) =>
      this.constroller.findCalls(req, res, next),
    )

    this.router.get('/call/:phone', (req: Request, res: Response, next: NextFunction) =>
      this.constroller.findCall(req, res, next),
    )

    this.router.delete('/call/:phone', (req: Request, res: Response, next: NextFunction) =>
      this.constroller.removeCall(req, res, next),
    )
  }
}
