import express from 'express';
import {
    getAllSubjects,
    createSubject,
    getSubjectById,
    putSubject,
    patchSubject,
    deleteSubject,
} from '../controllers/subject.contr.js';

const router = express.Router();

router.get('/', getAllSubjects);
router.post('/', createSubject);
router.get('/:id', getSubjectById);
router.put('/:id', putSubject);
router.patch('/:id', patchSubject);
router.delete('/:id', deleteSubject);

export default router;
