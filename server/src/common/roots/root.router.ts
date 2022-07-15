import {Router} from 'express'

export abstract class RootRouter<T> {
  router: Router
  constroller: T

  constructor(TController: {new (): T}) {
    this.router = Router()
    this.constroller = new TController()
    this.routes()
  }

  routes() {}
}
