import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middleware/auth'
import { StudentEnrolledCourseMarkController } from './studentEnrolledCourseMark.controller'
const router = express.Router()

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  StudentEnrolledCourseMarkController.getAllFromDB
)

router.patch(
  '/update-mark',
  StudentEnrolledCourseMarkController.updateStudentMark
)

router.patch(
  '/update-final-mark',
  StudentEnrolledCourseMarkController.updateFinalMark
)

export const StudentEnrolledCourseMarkRoutes = router
