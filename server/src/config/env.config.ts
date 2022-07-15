import dotenv from 'dotenv'
import mongoose from 'mongoose'

export abstract class EnvConfig {
  constructor() {
    dotenv.config({
      path: '.env',
    })
  }

  public getEnv(k: string): string | undefined {
    return process.env[k]
  }

  public getNumEnv(k: string): number {
    return Number(this.getEnv(k))
  }

  public async initConn() {
    return mongoose.connect(this.getEnv('MONGO_URI'))
  }
}
