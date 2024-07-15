import asyncErrorHandler from '../utils/asyncError.handler.js';
import teacherService from '../services/teacher.sv.js';

class TeeacherController {
    getAllTeachers = asyncErrorHandler(async (_, res) => {
        res.json(await teacherService.getAllTeachers());
    });

    createTeacher = asyncErrorHandler(async (req, res) => {
        const objectToCreate = req.body;

        res.status(201).json(
            await teacherService.createTeacher(objectToCreate)
        );
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
