import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import globalErrorHandler from './middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.route'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes

app.use('/api/v1/users/', UserRoutes)

// testing
app.get('/', async (req: Request, res: Response) => {
  res.send('working successfully')
})

// global error handle
app.use(globalErrorHandler)

export default app
