import express from 'express'
import { Routes } from './routes/Routes'
import bodyParser = require('body-parser')

class App {
  public app: express.Application
  public _routes: Routes

  constructor() {
    this.app = express()

    this.app.use(bodyParser.json())

    this.app.use(bodyParser.urlencoded({ extended: false }))

    this._routes = new Routes()
    this._routes.routes(this.app)
  }
}
export default new App().app
