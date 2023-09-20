import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { StudentEnrolledCourseMarkService } from './studentEnrolledCourseMark.service'
import { studentEnrolledCourseMarkFilterableFields } from './studentEnrolledCourseMark.constant'
import pick from '../../../shared/pick'

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentEnrolledCourseMarkFilterableFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await StudentEnrolledCourseMarkService.getAllFromDB(
    filters,
    options
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student course marks fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})

const updateStudentMark = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentEnrolledCourseMarkService.updateStudentMark(
    req.body
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'marks updated!',
    data: result,
  })
})

const updateFinalMark = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentEnrolledCourseMarkService.updateFinalMark(
    req.body
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Final marks updated!',
    data: result,
  })
})

export const StudentEnrolledCourseMarkController = {
  getAllFromDB,
  updateStudentMark,
  updateFinalMark
}