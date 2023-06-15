import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'
import { NextFunction, Request, Response } from 'express'

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body
    const result = await UserService.createUser(user)
    next()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Created Successfully',
      data: result,
    })
  }
)

export const UserController = { createUser }
