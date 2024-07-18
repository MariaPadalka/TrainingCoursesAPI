import User from '../models/user.mdl.js';
import CustomError from '../utils/customError.class.js';
import {
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
} from '../utils/constants/messages.constants.js';
import { ROLES } from '../utils/constants/roles.constants.js';
import { userToDto } from '../dto/user.dto.js';

class AdminService {
    async getAllAdmins() {
        const users = await User.find({ role: ROLES.ADMIN });
        return users.map(userToDto);
    }

    async deleteAdmin(id) {
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

export default new AdminService();
