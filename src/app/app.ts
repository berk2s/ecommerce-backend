import express from 'express'
import { createConnection } from 'typeorm'

import bodyParser = require('body-parser')

class App {
  public app: express.Application

  constructor() {
    createConnection()
      .then((connection) => {
        console.log('Connection is established')
      })
      .catch((error) => console.log(error))

    this.app = express()

    this.app.use(bodyParser.json())

    this.app.use(bodyParser.urlencoded({ extended: false }))
  }
}

export default new App().app
