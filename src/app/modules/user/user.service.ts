import mongoose from 'mongoose'
import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import { Student } from '../student/student.model'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import httpStatus from 'http-status'

// create student
const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null | undefined> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_password as string
  }
  // set role
  user.role = 'student'

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  )

  // start session
  const session = await mongoose.startSession()

  try {
    // start transaction
    session.startTransaction()

    // generate Student Id
    let newUserAllData = null
    const id = await generateStudentId(academicSemester as IAcademicSemester)
    user.id = id
    student.id = id

    // creating student
    const newStudent = await Student.create([student], { session })

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    // set student _id (reference) into user.student
    user.student = newStudent[0]._id

    // creating user
    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]

    if (newUserAllData) {
      newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
        path: 'student',
        populate: [
          { path: 'academicSemester' },
          { path: 'academicDepartment' },
          { path: 'academicFaculty' },
        ],
      })

      return newUserAllData
    }

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

// create faculty
const createFaculty = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null | undefined> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_password as string
  }
  // set role
  user.role = 'student'

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  )

  // start session
  const session = await mongoose.startSession()

  try {
    // start transaction
    session.startTransaction()

    // generate Student Id
    let newUserAllData = null
    const id = await generateStudentId(academicSemester as IAcademicSemester)
    user.id = id
    student.id = id

    // creating student
    const newStudent = await Student.create([student], { session })

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    // set student _id (reference) into user.student
    user.student = newStudent[0]._id

    // creating user
    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]

    if (newUserAllData) {
      newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
        path: 'student',
        populate: [
          { path: 'academicSemester' },
          { path: 'academicDepartment' },
          { path: 'academicFaculty' },
        ],
      })

      return newUserAllData
    }

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

// create admin
const createAdmin = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null | undefined> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_password as string
  }
  // set role
  user.role = 'student'

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  )

  // start session
  const session = await mongoose.startSession()

  try {
    // start transaction
    session.startTransaction()

    // generate Student Id
    let newUserAllData = null
    const id = await generateStudentId(academicSemester as IAcademicSemester)
    user.id = id
    student.id = id

    // creating student
    const newStudent = await Student.create([student], { session })

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    // set student _id (reference) into user.student
    user.student = newStudent[0]._id

    // creating user
    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]

    if (newUserAllData) {
      newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
        path: 'student',
        populate: [
          { path: 'academicSemester' },
          { path: 'academicDepartment' },
          { path: 'academicFaculty' },
        ],
      })

      return newUserAllData
    }

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

export const UserService = { createStudent, createFaculty, createAdmin }
