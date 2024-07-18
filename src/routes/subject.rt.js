import express from 'express';
import subjectController from '../controllers/subject.contr.js';
import { checkRole } from '../middleware/jwt.mddl.js';
import { ROLES } from '../utils/constants/roles.constants.js';

const router = express.Router();

router.get('/', checkRole(ROLES.ADMIN), subjectController.getAllSubjects);
router.post('/', checkRole(ROLES.ADMIN), subjectController.createSubject);
router.get(
    '/current',
    checkRole(ROLES.TEACHER),
    subjectController.getTeacherSubjects
);
router.get('/:id', checkRole(ROLES.ADMIN), subjectController.getSubjectById);
router.put('/:id', checkRole(ROLES.ADMIN), subjectController.putSubject);
router.patch('/:id', checkRole(ROLES.ADMIN), subjectController.patchSubject);
router.delete('/:id', checkRole(ROLES.ADMIN), subjectController.deleteSubject);

export default router;
