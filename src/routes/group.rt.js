import express from 'express';
import {
    getAllGroups,
    createGroup,
    getGroupById,
    putGroup,
    patchGroup,
    deleteGroup,
} from '../controllers/group.contr.js';

const router = express.Router();

router.get('/', getAllGroups);
router.post('/', createGroup);
router.get('/:id', getGroupById);
router.put('/:id', putGroup);
router.patch('/:id', patchGroup);
router.delete('/:id', deleteGroup);

export default router;
