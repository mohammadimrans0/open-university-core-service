import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import userRouter from '../src/app/modules/users/users.route'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes

app.use('/api/v1/users/', userRouter)

// testing
app.get('/', async (req: Request, res: Response) => {
  res.send('working successfully')
})

export default app
