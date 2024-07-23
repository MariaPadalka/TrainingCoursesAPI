import Teacher from '../models/teacher.mdl.js';
import CustomError from '../utils/customError.class.js';
import mongoose from 'mongoose';
import {
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
} from '../utils/constants/messages.constants.js';
import authService from '../services/auth.sv.js';
import mailService from '../services/mail.sv.js';
import { ROLES } from '../utils/constants/roles.constants.js';
import { subjectsValid } from '../utils/validation.func.js';
import { convertedFilters } from '../utils/helperFunctions.js';
import User from '../models/user.mdl.js';
import Load from '../models/load.mdl.js';
import { userToDto } from '../dto/user.dto.js';

class TeacherService {
    getAllTeachers = async (filters) => {
        const teachers = await Teacher.find(convertedFilters(filters))
            .populate('subjects')
            .populate('user');
        let teachersDto = teachers.map((teacher) => {
            teacher.user = userToDto(teacher.user);
            return teacher;
        });
        return teachersDto;
    };

    createTeacher = async (objectToCreate) => {
        const {
            firstName,
            lastName,
            patronymic,
            phone,
            experience,
            subjects,
            email,
        } = objectToCreate;

        const isValid = await subjectsValid(subjects);
        if (!isValid)
            throw new CustomError(ERROR_MESSAGES.SUBJECT_IDS_INVALID, 400);

        const teacher = new Teacher({
            firstName,
            lastName,
            patronymic,
            phone,
            experience,
            subjects,
            user: new mongoose.Types.ObjectId(),
        });

        await teacher.validate();

        const { user, generatedPassword } = await authService.registerUser(
            email,
            ROLES.TEACHER
        );

        teacher.user = user._id;
        // Send the email with the password
        await mailService.sendPasswordMail(user.email, generatedPassword);

        return await teacher.save();
    };

    getTeacherByUserId = async (userId) => {
        const teachers = await this.getAllTeachers({ user: userId });

        if (teachers.length > 0) {
            return teachers[0];
        } else {
            const error = new CustomError(
                ERROR_MESSAGES.TEACHER_NOT_FOUND,
                404
            );
            throw error;
        }
    };

    getTeacherById = async (id) => {
        const teacher = await Teacher.findById(id)
            .populate('subjects')
            .populate('user');
        if (!teacher) {
            const error = new CustomError(
                ERROR_MESSAGES.TEACHER_NOT_FOUND,
                404
            );
            throw error;
        }
        let teacherDto = teacher;
        teacherDto.user = userToDto(teacher.user);

        return teacherDto;
    };

    putTeacher = async (id, putObject) => {
        const { firstName, lastName, patronymic, phone, experience, subjects } =
            putObject;
        const isValid = await subjectsValid(subjects);
        if (!isValid) {
            const error = new CustomError(
                ERROR_MESSAGES.SUBJECT_IDS_INVALID,
                400
            );
            throw error;
        }

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            id,
            { firstName, lastName, patronymic, phone, experience, subjects },
            { runValidators: true, new: true }
        );
        if (!updatedTeacher) {
            const error = new CustomError(
                ERROR_MESSAGES.TEACHER_NOT_FOUND,
                404
            );
            throw error;
        }
        return updatedTeacher;
    };

    patchTeacher = async (id, updateObject) => {
        if (updateObject.subjects) {
            const isValid = await subjectsValid(updateObject.subjects);
            if (!isValid) {
                const error = new CustomError(
                    ERROR_MESSAGES.SUBJECT_IDS_INVALID,
                    400
                );
                throw error;
            }
        }

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            id,
            { $set: updateObject },
            { new: true }
        );

        if (!updatedTeacher) {
            const error = new CustomError(
                ERROR_MESSAGES.TEACHER_NOT_FOUND,
                404
            );
            throw error;
        }

        return updatedTeacher;
    };

    deleteTeacher = async (id) => {
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            throw new CustomError(ERROR_MESSAGES.TEACHER_NOT_FOUND, 404);
        }

        await this.deleteUser(teacher.user);

        // Видаляємо вчителя
        const deletedTeacher = await Teacher.findByIdAndDelete(teacher._id);
        if (!deletedTeacher) {
            throw new CustomError(ERROR_MESSAGES.TEACHER_NOT_FOUND, 404);
        }
        await Load.deleteMany({ teacher: deletedTeacher._id });

        return { message: SUCCESS_MESSAGES.TEACHER_DELETED };
    };

    async deleteUser(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
        }
        if (user.role !== ROLES.TEACHER) {
            throw new CustomError(ERROR_MESSAGES.FORBIDDEN, 404);
        }
        await User.findByIdAndDelete(id);

        return { message: SUCCESS_MESSAGES.USER_DELETED };
    }
}

export default new TeacherService();
