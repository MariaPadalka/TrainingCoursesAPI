import asyncErrorHandler from '../utils/asyncError.handler.js';
import loadService from '../services/load.sv.js';

class LoadController {
    getAllLoads = asyncErrorHandler(async (_, res) => {
        res.json(await loadService.getAllLoads());
    });

    createLoad = asyncErrorHandler(async (req, res) => {
        const objectToCreate = req.body;

        res.status(201).json(await loadService.createLoad(objectToCreate));
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
