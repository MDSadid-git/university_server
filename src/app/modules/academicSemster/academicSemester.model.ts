import { Schema, model } from 'mongoose';
import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TAcademicSemseter,
  TMonths,
} from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';
const academicSemesterSchema = new Schema<TAcademicSemseter>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    year: {
      type: Date,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      enum: Months,
    },
    endMonth: {
      type: String,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);

export const academicSemesterModel = model<TAcademicSemseter>(
  'AcademicSemester',
  academicSemesterSchema,
);
