import express from 'express';
import UserController from '../controllers/user.contr.js';
import { checkRole } from '../middleware/jwt.mddl.js';
import { ROLES } from '../utils/constants/roles.constants.js';

const router = express.Router();

router.get('/', checkRole(ROLES.ADMIN), UserController.getAllUsers);
router.delete('/:id', checkRole(ROLES.ADMIN), UserController.deleteUser);

export default router;
