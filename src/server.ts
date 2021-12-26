import 'reflect-metadata'

import app from './app/app'
import { createConnection } from 'typeorm'

const PORT = 3000

createConnection()
  .then(() => {
    console.log('Connection is successfull')
  })
  .catch((err) => {
    console.log('Something went wrong ', err)
  })

app.listen(PORT, () => {
  console.info('Server is available on http://localhost:' + PORT)
})
