import { Request, Response } from "express";
import { AcademicSemesterService } from "./academicSemester.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AcademicSemester } from "@prisma/client";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { AcademicSemesterFilterableFields } from "./academicSemester.constant";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
const result = await AcademicSemesterService.insertIntoDB(req.body)
        sendResponse<AcademicSemester>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Semester Created',
            data: result
        })
})


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, AcademicSemesterFilterableFields)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

const result = await AcademicSemesterService.getAllFromDB(filters, options)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Semester Data Fetched',
            meta: result.meta,
            data: result.data
        })
})

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getByIdFromDB(req.params.id);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Fetched',
    data: result,
  });
});

export const AcademicSemesterController = {insertIntoDB, getAllFromDB, getByIdFromDB}