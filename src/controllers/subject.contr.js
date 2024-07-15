import asyncErrorHandler from '../utils/asyncError.handler.js';
import subjectService from '../services/subject.sv.js';

class SubjectController {
    getAllSubjects = asyncErrorHandler(async (req, res) => {
        res.json(await subjectService.getAllSubjects());
    });

    createSubject = asyncErrorHandler(async (req, res) => {
        const objectToCreate = req.body;

        res.status(201).json(
            await subjectService.createSubject(objectToCreate)
        );
    });

    getSubjectById = asyncErrorHandler(async (req, res) => {
        const id = req.params.id;

        res.json(await subjectService.getSubjectById(id));
    });

    putSubject = asyncErrorHandler(async (req, res) => {
        const objectToUpdate = req.body;
        const id = req.params.id;

        res.json(await subjectService.putSubject(id, objectToUpdate));
    });

    patchSubject = asyncErrorHandler(async (req, res) => {
        const updateObject = req.body;
        const id = req.params.id;

        res.json(await subjectService.patchSubject(id, updateObject));
    });

    deleteSubject = asyncErrorHandler(async (req, res) => {
        const id = req.params.id;

        res.json(await subjectService.deleteSubject(id));
    });
}

export default new SubjectController();
