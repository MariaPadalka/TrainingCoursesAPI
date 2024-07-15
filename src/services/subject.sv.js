import Subject from '../models/subject.mdl.js';
import {
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
} from '../utils/constants/messages.constants.js';
import CustomError from '../utils/customError.class.js';

class SubjectService {
    getAllSubjects = async () => {
        return await Subject.find();
    };

    createSubject = async (objectToCreate) => {
        const { subjectName, hourlyRate } = objectToCreate;
        const subject = new Subject({ subjectName, hourlyRate });
        return await subject.save();
    };

    getSubjectById = async (id) => {
        const subject = await Subject.findById(id);
        if (!subject) {
            throw new CustomError(ERROR_MESSAGES.SUBJECT_NOT_FOUND, 404);
        }
        return subject;
    };

    putSubject = async (id, objectToUpdate) => {
        const { subjectName, hourlyRate } = objectToUpdate;
        const updatedSubject = await Subject.findByIdAndUpdate(
            id,
            { subjectName, hourlyRate },
            { runValidators: true, new: true }
        );
        if (!updatedSubject)
            throw new CustomError(ERROR_MESSAGES.SUBJECT_NOT_FOUND, 404);

        return updatedSubject;
    };

    patchSubject = async (id, updateObject) => {
        const updatedSubject = await Subject.findByIdAndUpdate(
            id,
            { $set: updateObject },
            { new: true }
        );

        if (!updatedSubject)
            throw new CustomError(ERROR_MESSAGES.SUBJECT_NOT_FOUND, 404);

        return updatedSubject;
    };

    deleteSubject = async (id) => {
        const subject = await Subject.findByIdAndDelete(id);
        if (!subject)
            throw new CustomError(ERROR_MESSAGES.SUBJECT_NOT_FOUND, 404);
        return { message: SUCCESS_MESSAGES.SUBJECT_DELETED };
    };
}

export default new SubjectService();
