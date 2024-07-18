import express from 'express';
import AdminController from '../controllers/admin.contr.js';
import { checkRole } from '../middleware/jwt.mddl.js';
import { ROLES } from '../utils/constants/roles.constants.js';

const router = express.Router();

router.get('/', checkRole(ROLES.ADMIN), AdminController.getAllAlmins);
router.delete('/:id', checkRole(ROLES.ADMIN), AdminController.deleteAdmin);

export default router;
