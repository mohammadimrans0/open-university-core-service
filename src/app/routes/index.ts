import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { BuildingRoutes } from '../modules/building/building.route';
import { RoomRoutes } from '../modules/room/room.route';
import { CourseRoutes } from '../modules/course/course.route';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoutes } from '../modules/offeredCourse/offeredCourse.route';
import { OfferedCourseSectionRoutes } from '../modules/offeredCourseSection/offeredCourseSection.route';
import { OfferedCourseClassScheduleRoutes } from '../modules/offeredCourseClassSchedule/offeredCourseClassSchedule.route';
import { StudentEnrolledCourseMarkRoutes } from '../modules/studentEnrolledCourseMark/studentEnrolledCourseMark.route';
import { StudentEnrolledCourseRoutes } from '../modules/studentEnrolledCourse/studentEnrolledCourse.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/academic-semester",
    routes: AcademicSemesterRoutes
  },
  {
    path: "/academic-department",
    routes: AcademicDepartmentRoutes
  },
  {
    path: "/academic-faculty",
    routes: AcademicFacultyRoutes
  },
  {
    path: "/student",
    routes: StudentRoutes
  },
  {
    path: "/faculty",
    routes: FacultyRoutes
  },
  {
    path: "/building",
    routes: BuildingRoutes
  },
  {
    path: "/room",
    routes: RoomRoutes
  },
  {
    path: "/course",
    routes: CourseRoutes
  },
  {
    path: "/semester-registration",
    routes: SemesterRegistrationRoutes
  },
  {
    path: "/offered-course",
    routes: OfferedCourseRoutes
  },
  {
    path: "/offered-course-section",
    routes: OfferedCourseSectionRoutes
  },
  {
    path: "/offered-course-class-schedule",
    routes: OfferedCourseClassScheduleRoutes
  },
  {
    path: "/student-enrolled-course",
    routes: StudentEnrolledCourseRoutes
  },
  {
    path: "/student-enrolled-course-mark",
    routes: StudentEnrolledCourseMarkRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
