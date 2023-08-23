import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
