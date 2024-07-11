import Subject from '../models/subject.mdl.js';
import asyncErrorHandler from '../utils/errors/asyncError.handler.js';
import { SUCCESS_MESSAGES } from '../utils/errors/messages.constants.js';

export const getAllSubjects = asyncErrorHandler(async (req, res) => {
    const subjects = await Subject.find();
    res.json(subjects);
});

export const createSubject = asyncErrorHandler(async (req, res) => {
    const { subjectName, hourlyRate } = req.body;

    const subject = new Subject({ subjectName, hourlyRate });
    const newSubject = await subject.save();
    res.status(201).json(newSubject);
});

export const getSubjectById = asyncErrorHandler(async (req, res, next) => {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
        const error = new CustomError(ERROR_MESSAGES.SUBJECT_NOT_FOUND, 404);
        return next(error);
    }
    res.json(subject);
});

export const putSubject = asyncErrorHandler(async (req, res, next) => {
    const { subjectName, hourlyRate } = req.body;

    const updatedSubject = await Subject.findByIdAndUpdate(
        req.params.id,
        { subjectName, hourlyRate },
        { runValidators: true, new: true }
    );
    if (!updatedSubject)
        return next(new CustomError(ERROR_MESSAGES.SUBJECT_NOT_FOUND, 404));

    res.json(updatedSubject);
});

export const patchSubject = asyncErrorHandler(async (req, res, next) => {
    const updateObject = req.body;
    const id = req.params.id;

    const updatedSubject = await Subject.findByIdAndUpdate(
        id,
        { $set: updateObject },
        { new: true }
    );

    if (!updatedSubject)
        return next(new CustomError(ERROR_MESSAGES.SUBJECT_NOT_FOUND, 404));

    res.json(updatedSubject);
});

export const deleteSubject = asyncErrorHandler(async (req, res, next) => {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject)
        return next(new CustomError(ERROR_MESSAGES.SUBJECT_NOT_FOUND, 404));

    res.json({ message: SUCCESS_MESSAGES.SUBJECT_DELETED });
});
