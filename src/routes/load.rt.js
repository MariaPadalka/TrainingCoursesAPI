import express from 'express';
import {
    getAllLoads,
    createLoad,
    getLoadById,
    putLoad,
    patchLoad,
    deleteLoad,
} from '../controllers/load.contr.js';

const router = express.Router();

router.get('/', getAllLoads);
router.post('/', createLoad);
router.get('/:id', getLoadById);
router.put('/:id', putLoad);
router.patch('/:id', patchLoad);
router.delete('/:id', deleteLoad);

export default router;
