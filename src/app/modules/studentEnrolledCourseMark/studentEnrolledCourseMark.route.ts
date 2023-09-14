import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middleware/auth'
import { StudentEnrolledCourseMarkController } from './studentEnrolledCourseMark.controller'
const router = express.Router()

router.patch(
  '/update-mark',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentEnrolledCourseMarkController.updateStudentMark
)

export const StudentEnrolledCourseMarkRoutes = router
