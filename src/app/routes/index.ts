import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';

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
    path: "/student",
    routes: StudentRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
