import httpStatus from 'http-status';

import { NextFunction, Request, RequestHandler, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body.body;

  // const zodParsedData = studentValidationSchema.parse(studentData);

  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  });
});
// const createStudent: RequestHandler = async (req, res, next) => {
//   try {
//     const { password, student: studentData } = req.body;

//     // const zodParsedData = studentValidationSchema.parse(studentData);

//     const result = await UserServices.createStudentIntoDB(
//       password,
//       studentData,
//     );

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Student is created succesfully',
//       data: result,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

export const UserControllers = {
  createStudent,
};
