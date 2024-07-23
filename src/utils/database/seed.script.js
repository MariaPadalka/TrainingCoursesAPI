import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../../models/user.mdl.js';
import Group from '../../models/group.mdl.js';
import Subject from '../../models/subject.mdl.js';
import bcrypt from 'bcryptjs';
import { ROLES } from '../constants/roles.constants.js';
import Teacher from '../../models/teacher.mdl.js';
import Load from '../../models/load.mdl.js';

dotenv.config();

async function seedDB() {
    try {
        await mongoose.connect(
            `${process.env.MONGODB_URI}${process.env.MONGODB_NAME}`,
            {}
        );
        console.log('Connected to Database. Ready to seed data.');

        await Teacher.deleteMany();
        await User.deleteMany({ email: { $ne: 'admin@gmail.com' } });

        await Load.deleteMany();
        await Subject.deleteMany();
        await Group.deleteMany();

        const groups = [
            {
                specialty: 'Computer Science',
                department: 'Engineering',
                studentCount: 30,
            },
            {
                specialty: 'Electrical Engineering',
                department: 'Engineering',
                studentCount: 25,
            },
            {
                specialty: 'Mechanical Engineering',
                department: 'Engineering',
                studentCount: 28,
            },
            {
                specialty: 'Civil Engineering',
                department: 'Engineering',
                studentCount: 32,
            },
            {
                specialty: 'Mathematics',
                department: 'Science',
                studentCount: 20,
            },
        ];

        const subjects = [
            {
                subjectName: 'Mathematics',
                hourlyRate: { practice: 20, lecture: 30 },
            },
            {
                subjectName: 'Physics',
                hourlyRate: { practice: 25, lecture: 35 },
            },
            {
                subjectName: 'Computer Science',
                hourlyRate: { practice: 30, lecture: 40 },
            },
            {
                subjectName: 'Chemistry',
                hourlyRate: { practice: 22, lecture: 32 },
            },
            {
                subjectName: 'Biology',
                hourlyRate: { practice: 23, lecture: 33 },
            },
        ];

        const hashedPassword = async (password) => {
            return await bcrypt.hash(password, 10);
        };

        const users = [
            {
                email: 'teacher1@gmail.com',
                password: await hashedPassword('teacherPass123'),
                role: ROLES.TEACHER,
                refreshToken: 'temporaryToken',
            },
            {
                email: 'teacher2@gmail.com',
                password: await hashedPassword('teacherPass456'),
                role: ROLES.TEACHER,
                refreshToken: 'temporaryToken',
            },
            {
                email: 'teacher3@gmail.com',
                password: await hashedPassword('adminPass456'),
                role: ROLES.TEACHER,
                refreshToken: 'temporaryToken',
            },
            {
                email: 'admin1@gmail.com',
                password: await hashedPassword('adminPass123'),
                role: ROLES.ADMIN,
                refreshToken: 'temporaryToken',
            },
        ];

        const insertedGroups = await Group.insertMany(groups);
        const insertedSubjects = await Subject.insertMany(subjects);
        const insertedUsers = await User.insertMany(users);

        const teachers = [
            {
                lastName: 'Doe',
                firstName: 'John',
                patronymic: 'A.',
                phone: '+38 123 445 6789',
                experience: 5,
                subjects: insertedSubjects
                    .slice(0, 3)
                    .map((subject) => subject._id),
                user: insertedUsers[0]._id,
            },
            {
                lastName: 'Smith',
                firstName: 'Jane',
                patronymic: 'B.',
                phone: '+38 987 654 4321',
                experience: 8,
                subjects: insertedSubjects
                    .slice(1, 3)
                    .map((subject) => subject._id),
                user: insertedUsers[1]._id,
            },
            {
                lastName: 'Brown',
                firstName: 'Michael',
                patronymic: 'C.',
                phone: '+38 063 986 7756',
                experience: 10,
                subjects: insertedSubjects
                    .slice(2, 4)
                    .map((subject) => subject._id),
                user: insertedUsers[2]._id, // Assuming you want to link by user ID
            },
        ];

        const insertedTeachers = await Teacher.insertMany(teachers);
        const loads = [
            {
                teacher: insertedTeachers[0]._id,
                group: insertedGroups[0]._id,
                subject: insertedSubjects[0]._id,
                lessonType: 'lecture',
                hours: 30,
            },
            {
                teacher: insertedTeachers[0]._id,
                group: insertedGroups[0]._id,
                subject: insertedSubjects[0]._id,
                lessonType: 'practice',
                hours: 23,
            },
            {
                teacher: insertedTeachers[0]._id,
                group: insertedGroups[1]._id,
                subject: insertedSubjects[1]._id,
                lessonType: 'lecture',
                hours: 20,
            },
            {
                teacher: insertedTeachers[0]._id,
                group: insertedGroups[1]._id,
                subject: insertedSubjects[1]._id,
                lessonType: 'practice',
                hours: 17,
            },
            {
                teacher: insertedTeachers[1]._id,
                group: insertedGroups[2]._id,
                subject: insertedSubjects[2]._id,
                lessonType: 'lecture',
                hours: 25,
            },
            {
                teacher: insertedTeachers[1]._id,
                group: insertedGroups[2]._id,
                subject: insertedSubjects[2]._id,
                lessonType: 'practice',
                hours: 21,
            },
            {
                teacher: insertedTeachers[1]._id,
                group: insertedGroups[3]._id,
                subject: insertedSubjects[3]._id,
                lessonType: 'lecture',
                hours: 15,
            },
            {
                teacher: insertedTeachers[1]._id,
                group: insertedGroups[3]._id,
                subject: insertedSubjects[3]._id,
                lessonType: 'practice',
                hours: 25,
            },
            {
                teacher: insertedTeachers[2]._id,
                group: insertedGroups[4]._id,
                subject: insertedSubjects[4]._id,
                lessonType: 'lecture',
                hours: 35,
            },
            {
                teacher: insertedTeachers[2]._id,
                group: insertedGroups[4]._id,
                subject: insertedSubjects[4]._id,
                lessonType: 'practice',
                hours: 25,
            },
        ];

        await Load.insertMany(loads);

        console.log('Database seeded! :)');
        process.exit(0);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit process with failure
    }
}

seedDB();
