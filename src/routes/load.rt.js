import express from 'express';
import loadController from '../controllers/load.contr.js';
import { checkRole } from '../middleware/jwt.mddl.js';
import { ROLES } from '../utils/constants/roles.constants.js';

const router = express.Router();

router.get('/', loadController.getAllLoads); //contr
router.post('/', checkRole(ROLES.ADMIN), loadController.createLoad);
router.get('/:id', loadController.getLoadById); //contr
router.put('/:id', checkRole(ROLES.ADMIN), loadController.putLoad);
router.patch('/:id', checkRole(ROLES.ADMIN), loadController.patchLoad);
router.delete('/:id', checkRole(ROLES.ADMIN), loadController.deleteLoad);

export default router;
