import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { StudentEnrolledCourseMarkController } from './studentEnrolledCourseMark.controller';
import { StudentEnrolledCourseMarkValidation } from './studentEnrolledCourseMark.validations';

const router = express.Router();

router.get(
    '/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
    StudentEnrolledCourseMarkController.getAllFromDB
);

router.get(
    '/my-marks',
    auth(ENUM_USER_ROLE.STUDENT),
    StudentEnrolledCourseMarkController.getMyCourseMarks
);

router.patch(
    '/update-marks',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
    validateRequest(StudentEnrolledCourseMarkValidation.updateStudentMarks),
    StudentEnrolledCourseMarkController.updateStudentMarks
)
router.patch(
    '/update-final-marks',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
    validateRequest(StudentEnrolledCourseMarkValidation.updateStudentMarks),
    StudentEnrolledCourseMarkController.updateFinalMarks
)

export const studentEnrolledCourseMarkRoutes = router;