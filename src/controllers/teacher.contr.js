import Teacher from '../models/teacher.mdl.js';
import Subject from '../models/subject.mdl.js';
import asyncErrorHandler from '../utils/errors/asyncError.handler.js';
import CustomError from '../utils/errors/customError.class.js';
import mongoose from 'mongoose';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/errors/messages.js';

const subjectsValid = async (subjects) => {
    if (!subjects || subjects.length === 0) return true;

    const validObjectIds = subjects.every((subject) =>
        mongoose.Types.ObjectId.isValid(subject)
    );
    if (!validObjectIds) return false;

    const validSubjectsCount = await Subject.countDocuments({
        _id: { $in: subjects },
    });
    return validSubjectsCount === subjects.length;
};

export const getAllTeachers = asyncErrorHandler(async (req, res) => {
    const teachers = await Teacher.find().populate('subjects');
    res.json(teachers);
});

export const createTeacher = asyncErrorHandler(async (req, res, next) => {
    const { firstName, lastName, patronymic, phone, experience, subjects } =
        req.body;

    const isValid = await subjectsValid(subjects);
    if (!isValid) {
        const error = new CustomError(ERROR_MESSAGES.SUBJECT_IDS_INVALID, 400);
        return next(error);
    }

    const teacher = new Teacher({
        firstName,
        lastName,
        patronymic,
        phone,
        experience,
        subjects,
    });
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
});

export const getTeacherById = asyncErrorHandler(async (req, res, next) => {
    const teacher = await Teacher.findById(req.params.id).populate('subjects');
    if (!teacher) {
        const error = new CustomError(ERROR_MESSAGES.TEACHER_NOT_FOUND, 404);
        return next(error);
    }
    res.json(teacher);
});

export const putTeacher = asyncErrorHandler(async (req, res, next) => {
    const { firstName, lastName, patronymic, phone, experience, subjects } =
        req.body;

    const isValid = await subjectsValid(subjects);
    if (!isValid) {
        const error = new CustomError(ERROR_MESSAGES.SUBJECT_IDS_INVALID, 400);
        return next(error);
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
        req.params.id,
        { firstName, lastName, patronymic, phone, experience, subjects },
        { runValidators: true, new: true }
    );
    if (!updatedTeacher) {
        const error = new CustomError(ERROR_MESSAGES.TEACHER_NOT_FOUND, 404);
        return next(error);
    }
    res.json(updatedTeacher);
});

export const patchTeacher = asyncErrorHandler(async (req, res, next) => {
    const updateObject = req.body;
    const id = req.params.id;

    if (updateObject.subjects) {
        const isValid = await subjectsValid(updateObject.subjects);
        if (!isValid) {
            const error = new CustomError(
                ERROR_MESSAGES.SUBJECT_IDS_INVALID,
                400
            );
            return next(error);
        }
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
        id,
        { $set: updateObject },
        { new: true }
    );

    if (!updatedTeacher) {
        const error = new CustomError(ERROR_MESSAGES.TEACHER_NOT_FOUND, 404);
        return next(error);
    }

    res.json(updatedTeacher);
});

export const deleteTeacher = asyncErrorHandler(async (req, res, next) => {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
        const error = new CustomError(ERROR_MESSAGES.TEACHER_NOT_FOUND, 404);
        return next(error);
    }
    res.json({ message: SUCCESS_MESSAGES.TEACHER_DELETED });
});
