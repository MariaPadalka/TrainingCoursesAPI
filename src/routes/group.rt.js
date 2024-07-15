import express from 'express';
import groupController from '../controllers/group.contr.js';
import { checkRole } from '../middleware/jwt.mddl.js';
import { ROLES } from '../utils/constants/roles.constants.js';

const router = express.Router();

router.get('/', groupController.getAllGroups);
router.post('/', checkRole(ROLES.ADMIN), groupController.createGroup);
router.get('/:id', groupController.getGroupById);
router.put('/:id', checkRole(ROLES.ADMIN), groupController.putGroup);
router.patch('/:id', checkRole(ROLES.ADMIN), groupController.patchGroup);
router.delete('/:id', checkRole(ROLES.ADMIN), groupController.deleteGroup);

export default router;
