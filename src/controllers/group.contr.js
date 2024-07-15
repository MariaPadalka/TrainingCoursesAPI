import asyncErrorHandler from '../utils/asyncError.handler.js';
import groupService from '../services/group.sv.js';

class GroupController {
    getAllGroups = asyncErrorHandler(async (req, res) => {
        res.json(await groupService.getAllGroups());
    });

    createGroup = asyncErrorHandler(async (req, res) => {
        const objectToCreate = req.body;

        res.status(201).json(await groupService.createGroup(objectToCreate));
    });

    getGroupById = asyncErrorHandler(async (req, res) => {
        const id = req.params.id;

        res.json(await groupService.getGroupById(id));
    });

    putGroup = asyncErrorHandler(async (req, res) => {
        const objectToUpdate = req.body;
        const id = req.params.id;

        res.json(await groupService.putGroup(id, objectToUpdate));
    });

    patchGroup = asyncErrorHandler(async (req, res) => {
        const updateObject = req.body;
        const id = req.params.id;

        res.json(await groupService.patchGroup(id, updateObject));
    });

    deleteGroup = asyncErrorHandler(async (req, res) => {
        const id = req.params.id;
        res.json(await groupService.deleteGroup(id));
    });
}

export default new GroupController();
