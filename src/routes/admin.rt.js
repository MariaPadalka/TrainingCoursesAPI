import express from 'express';
import adminController from '../controllers/admin.contr.js';
import { checkRole } from '../middleware/jwt.mddl.js';
import { ROLES } from '../utils/constants/roles.constants.js';

const router = express.Router();

router.post('/', adminController.registerAdmin);
router.get('/', checkRole(ROLES.ADMIN), adminController.getAllAlmins);
router.delete('/:id', checkRole(ROLES.ADMIN), adminController.deleteAdmin);

export default router;
