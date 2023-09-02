/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Prisma,
  SemesterRegistration,
  SemesterRegistrationStatus,
} from '@prisma/client'
import prisma from '../../../shared/prisma'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { semesterRegistrationSearchableFields, semesterRegistrationRelationalFields, semesterRegistrationRelationalFieldsMapper } from './semesterRegistration.constant'
import { ISemesterRegistrationFilterRequest } from './semesterRegistration.interface'

const insertIntoDB = async (
  data: SemesterRegistration
): Promise<SemesterRegistration> => {
  const isAnySemesterRegUpcomingOrOngoing =
    await prisma.semesterRegistration.findFirst({
      where: {
        OR: [
          {
            status: SemesterRegistrationStatus.UPCOMING,
          },
          {
            status: SemesterRegistrationStatus.ONGOING,
          },
        ],
      },
    })

  if (isAnySemesterRegUpcomingOrOngoing) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isAnySemesterRegUpcomingOrOngoing.status} registration`
    )
  }

  const result = await prisma.semesterRegistration.create({ data })

  return result
}

const getAllFromDB = async (
  filters: ISemesterRegistrationFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<SemesterRegistration[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: semesterRegistrationSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (semesterRegistrationRelationalFields.includes(key)) {
          return {
            [semesterRegistrationRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          }
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          }
        }
      }),
    })
  }

  const whereConditions: Prisma.SemesterRegistrationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.semesterRegistration.findMany({
    include: {
      academicSemester: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  })
  const total = await prisma.semesterRegistration.count({
    where: whereConditions,
  })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

const getByIdFromDB = async (
  id: string
): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
    include: {
      academicSemester: true,
    },
  })
  return result
}

const updateOneInDB = async (id: string, payload: Partial<SemesterRegistration>): Promise<SemesterRegistration> => {
  const isExist = await prisma.semesterRegistration.findUnique({ where: { id } })
  
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'data not found')
  }

  if (payload.status && isExist.status === SemesterRegistrationStatus.UPCOMING && payload.status !== SemesterRegistrationStatus.ONGOING) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Can only move from upcoming to ongoing')
  }

  if (payload.status && isExist.status === SemesterRegistrationStatus.ONGOING && payload.status !== SemesterRegistrationStatus.ENDED) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Can only move from ongoing to ended')
  }

  const result = await prisma.semesterRegistration.update({
    where: { id },
    data: payload,
    include: {
      academicSemester: true
    }
  })
  return result
}

const deleteByIdFromDB = async (id: string): Promise<SemesterRegistration> => {
  const result = await prisma.semesterRegistration.delete({
    where: {
      id,
    },
    include: {
      academicSemester: true,
    },
  })
  return result
}

export const SemesterRegistrationService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
} 
