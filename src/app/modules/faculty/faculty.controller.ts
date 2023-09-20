/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { facultyFilterableFields } from './faculty.constant'
import { FacultyService } from './faculty.service'

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.insertIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await FacultyService.getAllFromDB(filters, options)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await FacultyService.getByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty fetched successfully',
    data: result,
  })
})

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await FacultyService.updateOneInDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  })
})

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await FacultyService.deleteByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty delete successfully',
    data: result,
  })
})

const assignCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.assignCourse(
    req.params.id,
    req.body.course
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course assigned successfully',
    data: result,
  })
})

const removeCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.removeCourse(
    req.params.id,
    req.body.course
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course removed successfully',
    data: result,
  })
})

const myCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user
  const filter = pick(req.query, ['academicSemesterId', 'courseId'])

  const result = await FacultyService.myCourse(user, filter)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My courses data fetched successfully!',
    data: result,
  })
})

export const FacultyController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
  assignCourse,
  removeCourse,
  myCourse,
}
