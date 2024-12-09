import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Student } from './student.model';
import { User } from '../user/user.model';
import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { studentSearchableFields } from './student.constant';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };
  // let searchTerm = '';

  // // IF searchTerm  IS GIVEN SET IT
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // // serachQuery start
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((el) => {
  //   delete queryObj[el];
  // });
  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // // sorting Functionalty
  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);

  // // pagination use
  // let page = 1; // SET DEFAULT VALUE FOR PAGE
  // let limit = 1; // SET DEFAULT VALUE FOR LIMIT
  // let skip = 0; // SET DEFAULT VALUE FOR SKIP
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const painateQuery = sortQuery.skip(skip);
  // const limiQuery = painateQuery.limit(limit);

  // // fields use
  // let field = '-__v';
  // if (query.field) {
  //   field = (query.field as string).split(',').join(' ');
  // }

  // const fieldQuery = await limiQuery.select(field);

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const updateStudentIntoDB = async (
  id: string,
  payload: Partial<TStudent>,
) => {};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
