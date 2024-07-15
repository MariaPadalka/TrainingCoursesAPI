import mongoose from 'mongoose';
import validator from 'validator';
import { ROLES } from '../utils/constants/roles.constants.js';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Invalid email address'],
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: [ROLES.ADMIN, ROLES.TEACHER],
    },
    refreshToken: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

export default User;
