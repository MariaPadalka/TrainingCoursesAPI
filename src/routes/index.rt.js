import express from 'express';
import teacherRoutes from './teacher.rt.js';
import groupRoutes from './group.rt.js';
import loadRoutes from './load.rt.js';
import subjectRoutes from './subject.rt.js';
import authRoutes from './auth.rt.js';
import userRoutes from './user.rt.js';
import { authenticateToken } from '../middleware/jwt.mddl.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/teachers', authenticateToken, teacherRoutes);
router.use('/groups', authenticateToken, groupRoutes);
router.use('/loads', authenticateToken, loadRoutes);
router.use('/subjects', authenticateToken, subjectRoutes);
router.use('/users', authenticateToken, userRoutes);

export default router;
