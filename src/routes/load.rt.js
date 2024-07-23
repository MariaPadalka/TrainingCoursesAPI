import express from 'express';
import loadController from '../controllers/load.contr.js';
import { checkRole } from '../middleware/jwt.mddl.js';
import { ROLES } from '../utils/constants/roles.constants.js';

const router = express.Router();

router.get('/', checkRole(ROLES.ADMIN), loadController.getAllLoads);
router.post('/', checkRole(ROLES.ADMIN), loadController.createLoad);
router.get(
    '/current',
    checkRole(ROLES.TEACHER),
    loadController.getTeacherLoads
);
router.get('/:id', checkRole(ROLES.ADMIN), loadController.getLoadById);
router.put('/:id', checkRole(ROLES.ADMIN), loadController.putLoad);
router.patch('/:id', checkRole(ROLES.ADMIN), loadController.patchLoad);
router.delete('/:id', checkRole(ROLES.ADMIN), loadController.deleteLoad);

export default router;
