import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { infoLogger, errorLogger } from './shared/logger'
import { Server } from 'http'

let server: Server

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    infoLogger.info('Database is connected successfully')

    server = app.listen(config.port, () => {
      infoLogger.info(`app is listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect database', error)
  }

  process.on('unhandledRejection', error => {
    if (error) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  infoLogger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
