import express from 'express';
import {
    getAllTeachers,
    getTeacherById,
    createTeacher,
    putTeacher,
    patchTeacher,
    deleteTeacher,
} from '../controllers/teacher.contr.js';

const router = express.Router();

router.get('/', getAllTeachers);
router.post('/', createTeacher);
router.get('/:id', getTeacherById);
router.put('/:id', putTeacher);
router.patch('/:id', patchTeacher);
router.delete('/:id', deleteTeacher);

export default router;
