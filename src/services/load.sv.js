import Load from '../models/load.mdl.js';
import CustomError from '../utils/customError.class.js';
import {
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
} from '../utils/constants/messages.constants.js';
import { checkReferences } from '../utils/validation.func.js';

class LoadService {
    getAllLoads = async () => {
        const loads = await Load.find()
            .populate('teacher')
            .populate('group')
            .populate('subject');
        return loads;
    };

    createLoad = async (objectToCreate) => {
        const { teacher, group, subject, lessonType, hours } = objectToCreate;
        if (
            !teacher ||
            !group ||
            !subject ||
            !lessonType ||
            hours == undefined
        ) {
            const error = new CustomError(ERROR_MESSAGES.MISSING_FIELDS, 400);
            throw error;
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
            throw validationResult.error;
        }
        const newLoad = await load.save();

        return newLoad;
    };

    getLoadById = async (id) => {
        const load = await Load.findById(id)
            .populate('teacher')
            .populate('group')
            .populate('subject');
        if (!load) {
            const error = new CustomError(ERROR_MESSAGES.LOAD_NOT_FOUND, 404);
            throw error;
        }
        return load;
    };

    putLoad = async (id, objectToUpdate) => {
        const { teacher, group, subject, lessonType, hours } = objectToUpdate;

        if (!teacher || !group || !subject || !lessonType || !hours) {
            const error = new CustomError(ERROR_MESSAGES.MISSING_FIELDS, 400);
            throw error;
        }

        const validationResult = await checkReferences(teacher, group, subject);
        if (!validationResult.valid) {
            throw validationResult.error;
        }

        const updatedLoad = await Load.findByIdAndUpdate(
            id,
            { teacher, group, subject, lessonType, hours },
            { runValidators: true, new: true }
        );

        if (!updatedLoad) {
            const error = new CustomError(ERROR_MESSAGES.LOAD_NOT_FOUND, 404);
            throw error;
        }
        return updatedLoad;
    };

    patchLoad = async (id, updateObject) => {
        const load = await Load.findById(id);
        if (!load) {
            throw new CustomError(ERROR_MESSAGES.LOAD_NOT_FOUND, 404);
        }
        const validationResult = await checkReferences(
            updateObject.teacher || load.teacher,
            updateObject.group || load.group,
            updateObject.subject || load.subject
        );
        if (!validationResult.valid) {
            throw validationResult.error;
        }

        const updatedLoad = await Load.findByIdAndUpdate(
            id,
            { $set: updateObject },
            { new: true }
        );

        if (!updatedLoad) {
            const error = new CustomError(ERROR_MESSAGES.LOAD_NOT_FOUND, 404);
            throw error;
        }

        return updatedLoad;
    };

    deleteLoad = async (id) => {
        const deletedLoad = await Load.findByIdAndDelete(id);
        if (!deletedLoad) {
            const error = new CustomError(ERROR_MESSAGES.LOAD_NOT_FOUND, 404);
            throw error;
        }
        return { message: SUCCESS_MESSAGES.LOAD_DELETED };
    };
}

export default new LoadService();
