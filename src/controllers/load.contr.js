import asyncErrorHandler from '../utils/asyncError.handler.js';
import loadService from '../services/load.sv.js';
import teacherService from '../services/teacher.sv.js';

class LoadController {
    getAllLoads = asyncErrorHandler(async (req, res) => {
        const filters = req.query; // Отримання query parameters з запиту
        res.json(await loadService.getAllLoads(filters));
    });

    createLoad = asyncErrorHandler(async (req, res) => {
        const objectToCreate = req.body;

        res.status(201).json(await loadService.createLoad(objectToCreate));
    });

    getTeacherLoads = asyncErrorHandler(async (req, res) => {
        const userId = req.user.userId;
        const teacher = await teacherService.getTeacherByUserId(userId);

        res.json(await loadService.getTeacherLoads(teacher._id));
    });

    getLoadById = asyncErrorHandler(async (req, res) => {
        const id = req.params.id;
        res.json(await loadService.getLoadById(id));
    });

    putLoad = asyncErrorHandler(async (req, res) => {
        const objectToUpdate = req.body;
        const id = req.params.id;

        res.json(await loadService.putLoad(id, objectToUpdate));
    });

    patchLoad = asyncErrorHandler(async (req, res) => {
        const updateObject = req.body;
        const id = req.params.id;

        res.json(await loadService.patchLoad(id, updateObject));
    });

    deleteLoad = asyncErrorHandler(async (req, res) => {
        const id = req.params.id;

        res.json(await loadService.deleteLoad(id));
    });
}

export default new LoadController();
