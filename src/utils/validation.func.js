import mongoose from 'mongoose';
import Group from '../models/group.mdl.js';
import Subject from '../models/subject.mdl.js';
import Teacher from '../models/teacher.mdl.js';
import { ERROR_MESSAGES } from './constants/messages.constants.js';
import CustomError from './customError.class.js';

export const checkReferences = async (teacherId, groupId, subjectId) => {
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

export const subjectsValid = async (subjects) => {
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

export const validatePassword = (password) => {
    // Minimum 8 characters
    const regex = /^.{8,}$/;
    return regex.test(password);
};
