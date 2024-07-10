import express from 'express';
import teacherRoutes from './teacher.rt.js';
import groupRoutes from './group.rt.js';
import loadRoutes from './load.rt.js';
import subjectRoutes from './subject.rt.js';

const router = express.Router();

router.use('/teachers', teacherRoutes);
router.use('/groups', groupRoutes);
router.use('/loads', loadRoutes);
router.use('/subjects', subjectRoutes);

export default router;
