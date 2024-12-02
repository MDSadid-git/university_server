import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemseter } from './academicSemester.interface';
import { academicSemesterModel } from './academicSemester.model';

const createacademicSemesterIntoDb = async (payload: TAcademicSemseter) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }
  const result = await academicSemesterModel.create(payload);
  return result;
};
const getallAcademicSemesterIntoDB = async () => {
  const result = await academicSemesterModel.find();
  return result;
};
const getSingleAcademicSemesterIntoDB = async (semesterId: string) => {
  const result = await academicSemesterModel.findById(semesterId);
  return result;
};
export const academicSemesterService = {
  createacademicSemesterIntoDb,
  getSingleAcademicSemesterIntoDB,
  getallAcademicSemesterIntoDB,
};
