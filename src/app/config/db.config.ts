import { createConnection } from 'typeorm'

createConnection()
  .then((connection) => {
    console.log('Connection is established')
  })
  .catch((error) => console.log(error))
