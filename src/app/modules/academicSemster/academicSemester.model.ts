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
      type: String,
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

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await academicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new Error('Semester is already exists !');
  }
  next();
});

export const academicSemesterModel = model<TAcademicSemseter>(
  'AcademicSemester',
  academicSemesterSchema,
);
