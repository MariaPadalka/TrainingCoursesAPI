import asyncErrorHandler from '../utils/asyncError.handler.js';
import userService from '../services/user.sv.js';

class UserController {
    getAllUsers = asyncErrorHandler(async (_, res) => {
        res.json(await userService.getAllUsers());
    });

    deleteUser = asyncErrorHandler(async (req, res) => {
        const { id } = req.params;

        const result = await userService.deleteUser(id);

        res.status(200).json({
            message: result.message,
        });
    });
}

export default new UserController();
