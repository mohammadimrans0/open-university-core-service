/* eslint-disable no-console */
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { Server } from 'http'

let server: Server

process.on('uncaughtException', error => {
  console.log(error)
  process.exit(1)
})

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database is connected successfully')

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('Failed to connect database', error)
  }

  process.on('unhandledRejection', error => {
    if (error) {
      server.close(() => {
        console.log(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  console.log('SIGTERM is received')
  if (server) {
    server.close()
  }
})
