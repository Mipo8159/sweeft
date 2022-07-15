require('module-alias/register')
import express, {NextFunction, Request, Response, Router} from 'express'
import cors from 'cors'
import colors from 'colors'
import {EnvConfig} from './config/env.config'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import {AuthRouter} from './modules/auth/auth.routes'
import {ErrorMiddleware} from './common/middlewares/error.middleware'
import {CallRouter} from './modules/call/call.routes'
import {AuthMiddleware} from './common/middlewares/auth.middleware'

class Main extends EnvConfig {
  private app: express.Application = express()
  private port: number = this.getNumEnv('PORT')

  constructor() {
    super()

    this.app.use(express.json())
    this.app.use(express.urlencoded({extended: true}))
    this.app.use(cookieParser())
    this.app.use(morgan('dev'))
    this.app.use(
      cors({
        credentials: true,
        origin: this.getEnv('CLIENT_URL'),
        optionsSuccessStatus: 200,
      }),
    )

    // Auth Middleware
    this.app.use((req: Request, _: Response, next: NextFunction) => new AuthMiddleware().Middleware(req, _, next))

    // => Routes
    this.app.use('/api', this.router())

    // => Error Middleware
    this.app.use((err: Error, _: Request, res: Response, next: NextFunction) =>
      new ErrorMiddleware().Middleware(err, _, res, next),
    )

    this.connectDB().then(() => this.listen())
  }

  private router(): Array<Router> {
    return [new AuthRouter().router, new CallRouter().router]
  }

  private async connectDB() {
    await this.initConn()
      .then(() => console.log(colors.magenta.bold('Database connected')))
      .catch((err) => console.log(colors.red.bold(err)))
  }

  private listen() {
    this.app.listen(this.port, () => console.log(colors.cyan.bold(`Api is running on http://localhost:${this.port}`)))
  }
}

new Main()
