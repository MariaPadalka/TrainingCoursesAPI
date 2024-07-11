import Group from '../models/group.mdl.js';
import Load from '../models/load.mdl.js';
import Subject from '../models/subject.mdl.js';
import Teacher from '../models/teacher.mdl.js';
import asyncErrorHandler from '../utils/errors/asyncError.handler.js';
import CustomError from '../utils/errors/customError.class.js';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/errors/messages.js';

const checkReferences = async (teacherId, groupId, subjectId) => {
    const teacher = await Teacher.findById(teacherId);
    const group = await Group.findById(groupId);
    const subject = await Subject.findById(subjectId);

    if (!teacher || !group || !subject) {
        let message = 'Invalid id';
        message += !teacher ? '. ' + ERROR_MESSAGES.TEACHER_NOT_FOUND : '';
        message += !group ? '. ' + ERROR_MESSAGES.GROUP_NOT_FOUND : '';
        message += !subject ? '. ' + ERROR_MESSAGES.SUBJECT_NOT_FOUND : '';
        return {
            valid: false,
            error: new CustomError(message, 400),
        };
    }

    if (!teacher.subjects.includes(subjectId)) {
        return {
            valid: false,
            error: new CustomError(
                ERROR_MESSAGES.SUBJECT_NOT_FOUND_IN_TEACHER,
                400
            ),
        };
    }

    return {
        valid: true,
        message: ERROR_MESSAGES.SUCCESS,
    };
};

export const getAllLoads = asyncErrorHandler(async (_, res) => {
    const loads = await Load.find()
        .populate('teacher')
        .populate('group')
        .populate('subject');
    res.json(loads);
});

export const createLoad = asyncErrorHandler(async (req, res, next) => {
    const { teacher, group, subject, lessonType, hours } = req.body;

    console.log(teacher, group, subject, lessonType, hours);

    if (!teacher || !group || !subject || !lessonType || hours == undefined) {
        const error = new CustomError(ERROR_MESSAGES.MISSING_FIELDS, 400);
        return next(error);
    }

    const load = new Load({
        teacher,
        group,
        subject,
        lessonType,
        hours,
    });

    const validationResult = await checkReferences(teacher, group, subject);
    if (!validationResult.valid) {
        return next(validationResult.error);
    }
    const newLoad = await load.save();

    res.status(201).json(newLoad);
});

export const getLoadById = asyncErrorHandler(async (req, res, next) => {
    const load = await Load.findById(req.params.id)
        .populate('teacher')
        .populate('group')
        .populate('subject');
    if (!load) {
        const error = new CustomError(ERROR_MESSAGES.LOAD_NOT_FOUND, 404);
        return next(error);
    }
    res.json(load);
});

export const putLoad = asyncErrorHandler(async (req, res, next) => {
    const { teacher, group, subject, lessonType, hours } = req.body;

    if (!teacher || !group || !subject || !lessonType || !hours) {
        const error = new CustomError(ERROR_MESSAGES.MISSING_FIELDS, 400);
        return next(error);
    }

    const validationResult = await checkReferences(teacher, group, subject);
    if (!validationResult.valid) {
        return next(validationResult.error);
    }

    const updatedLoad = await Load.findByIdAndUpdate(
        req.params.id,
        { teacher, group, subject, lessonType, hours },
        { runValidators: true, new: true }
    );

    if (!updatedLoad) {
        const error = new CustomError(ERROR_MESSAGES.LOAD_NOT_FOUND, 404);
        return next(error);
    }
    res.json(updatedLoad);
});

export const patchLoad = asyncErrorHandler(async (req, res, next) => {
    const updateObject = req.body;
    const id = req.params.id;

    const load = await Load.findById(id);
    if (!load) {
        return next(new CustomError(ERROR_MESSAGES.LOAD_NOT_FOUND, 404));
    }

    const validationResult = await checkReferences(
        updateObject.teacher || load.teacher,
        updateObject.group || load.group,
        updateObject.subject || load.subject
    );
    if (!validationResult.valid) {
        return next(validationResult.error);
    }

    const updatedLoad = await Load.findByIdAndUpdate(
        id,
        { $set: updateObject },
        { new: true }
    );

    if (!updatedLoad) {
        const error = new CustomError(ERROR_MESSAGES.LOAD_NOT_FOUND, 404);
        return next(error);
    }

    res.json(updatedLoad);
});

export const deleteLoad = asyncErrorHandler(async (req, res, next) => {
    const deletedLoad = await Load.findByIdAndDelete(req.params.id);
    if (!deletedLoad) {
        const error = new CustomError(ERROR_MESSAGES.LOAD_NOT_FOUND, 404);
        return next(error);
    }
    res.json({ message: SUCCESS_MESSAGES.LOAD_DELETED });
});
