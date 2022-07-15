import {RootRouter} from '@app/common/roots/root.router'
import {NextFunction, Request, Response} from 'express'
import {AuthController} from './controllers/auth.controller'

export class AuthRouter extends RootRouter<AuthController> {
  constructor() {
    super(AuthController)
  }

  routes(): void {
    this.router.post('/register', (req: Request, res: Response, next: NextFunction) =>
      this.constroller.register(req, res, next),
    )

    this.router.post('/login', (req: Request, res: Response, next: NextFunction) =>
      this.constroller.login(req, res, next),
    )

    this.router.post('/logout', (req: Request, res: Response, next: NextFunction) =>
      this.constroller.logout(req, res, next),
    )

    this.router.get('/refresh', (req: Request, res: Response, next: NextFunction) =>
      this.constroller.refresh(req, res, next),
    )

    this.router.post('/available', (req: Request, res: Response, next: NextFunction) =>
      this.constroller.isAvailable(req, res, next),
    )
  }
}
