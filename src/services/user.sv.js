import User from '../models/user.mdl.js';
import CustomError from '../utils/customError.class.js';
import {
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
} from '../utils/constants/messages.constants.js';
import { ROLES } from '../utils/constants/roles.constants.js';

class UserService {
    async getAllUsers() {
        return await User.find();
    }

    async deleteUser(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
        }
        if (user.role == ROLES.TEACHER) {
            throw new CustomError(ERROR_MESSAGES.FORBIDDEN, 404);
        }
        await User.findByIdAndDelete(id);

        return { message: SUCCESS_MESSAGES.USER_DELETED };
    }
}

export default new UserService();
