import express from 'express'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'
import validateRequest from '../../../middlewares/ValidateRequest'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
)

export const UserRoutes = router
