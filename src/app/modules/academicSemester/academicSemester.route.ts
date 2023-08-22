import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middleware/auth'
import validateRequest from '../../middleware/validateRequest'
import { AcademicSemesterController } from './academicSemester.controller'
import { AcademicSemesterValidation } from './academicSemester.validation'
const router = express.Router()

router.get('/', AcademicSemesterController.getAllFromDB)
router.get('/:id', AcademicSemesterController.getDataById)
router.post(
  '/',
  validateRequest(AcademicSemesterValidation.create),
  AcademicSemesterController.insertIntoDB
)

router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.update),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.updateOneInDB
)

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.deleteByIdFromDB
)

export const AcademicSemesterRoutes = router
