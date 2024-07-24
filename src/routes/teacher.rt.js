import express from 'express';
import teeacherController from '../controllers/teacher.contr.js';
import { checkRole } from '../middleware/jwt.mddl.js';
import { ROLES } from '../utils/constants/roles.constants.js';

const router = express.Router();

router.get('/', checkRole(ROLES.ADMIN), teeacherController.getAllTeachers);
router.get(
    '/current',
    checkRole(ROLES.TEACHER),
    teeacherController.getTeacherByToken
);
router.post('/', checkRole(ROLES.ADMIN), teeacherController.createTeacher);
router.get('/:id', checkRole(ROLES.ADMIN), teeacherController.getTeacherById); //in controller
router.put('/:id', checkRole(ROLES.ADMIN), teeacherController.putTeacher);
router.patch('/:id', checkRole(ROLES.ADMIN), teeacherController.patchTeacher);
router.delete('/:id', checkRole(ROLES.ADMIN), teeacherController.deleteTeacher);

export default router;
