import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import globalErrorHandler from './app/middleware/globalErrorHandler'
import routes from './app/routes'
import httpStatus from 'http-status'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', routes)

// testing
app.get('/', async (req: Request, res: Response) => {
  res.send('working successfully')
})

// global error handle
app.use(globalErrorHandler)

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Data NOt Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Invalid Api Request',
      },
    ],
  })
  next()
})

export default app
