import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { StudentEnrolledCourseMarkService } from './studentEnrolledCourseMark.service'

const updateStudentMark = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentEnrolledCourseMarkService.updateStudentMark(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student mark updated successfully',
    data: result,
  })
})

export const StudentEnrolledCourseMarkController = {
  updateStudentMark,
}
