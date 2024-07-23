import asyncErrorHandler from '../utils/asyncError.handler.js';
import teacherService from '../services/teacher.sv.js';
import { userToDto } from '../dto/user.dto.js';

class TeeacherController {
    getAllTeachers = asyncErrorHandler(async (req, res) => {
        const filters = req.query; // Отримання query parameters з запиту
        res.json(await teacherService.getAllTeachers(filters));
    });

    createTeacher = asyncErrorHandler(async (req, res) => {
        const objectToCreate = req.body;

        res.status(201).json(
            await teacherService.createTeacher(objectToCreate)
        );
    });

    getTeacherByToken = asyncErrorHandler(async (req, res) => {
        const userId = req.user.userId;
        const teacher = await teacherService.getTeacherByUserId(userId);
        teacher.user = userToDto(teacher.user);
        res.json(teacher);
    });

    getTeacherById = asyncErrorHandler(async (req, res) => {
        const id = req.params.id;

        res.json(await teacherService.getTeacherById(id));
    });

    putTeacher = asyncErrorHandler(async (req, res) => {
        const updateObject = req.body;
        const id = req.params.id;

        res.json(await teacherService.putTeacher(id, updateObject));
    });

    patchTeacher = asyncErrorHandler(async (req, res) => {
        const updateObject = req.body;
        const id = req.params.id;

        res.json(await teacherService.patchTeacher(id, updateObject));
    });

    deleteTeacher = asyncErrorHandler(async (req, res) => {
        const id = req.params.id;

        res.json(await teacherService.deleteTeacher(id));
    });
}

export default new TeeacherController();
