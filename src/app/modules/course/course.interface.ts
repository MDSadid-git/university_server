import { Types } from 'mongoose';

export type TPreReuisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};
export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: [TPreReuisiteCourses];
  isDeleted?: boolean;
};
