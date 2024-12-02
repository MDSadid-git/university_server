import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.get(
  '/',

  academicSemesterControllers.getallAcademicSemester,
);

router.post(
  '/create-academicSemester',
  validateRequest(
    AcademicSemesterValidations.createAcdemicSemesterValidationSchema,
  ),
  academicSemesterControllers.createAcademicSemester,
);
router.get(
  '/:semesterId',
  academicSemesterControllers.getSingleAcademicSemester,
);

export const academicSemesterRoutes = router;
