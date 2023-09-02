import express from 'express'
import { SemesterRegistrationController } from './semesterRegistration.controller'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middleware/auth'
import validateRequest from '../../middleware/validateRequest'
import { SemesterRegistrationValidation } from './semesterRegistration.validation'

const router = express.Router()

router.get('/', SemesterRegistrationController.getAllFromDB)

router.get('/:id', SemesterRegistrationController.getByIdFromDB)

router.post('/start-registration', SemesterRegistrationController.startMyRegistration)

router.post(
  '/',
  validateRequest(SemesterRegistrationValidation.create),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.insertIntoDB
)

router.patch(
  '/:id',
  validateRequest(SemesterRegistrationValidation.update),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.updateOneInDB
)

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.deleteByIdFromDB
)

export const SemesterRegistrationRoutes = router