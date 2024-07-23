import asyncErrorHandler from '../utils/asyncError.handler.js';
import adminService from '../services/admin.sv.js';
import mailService from '../services/mail.sv.js';
import { userToDto } from '../dto/user.dto.js';

class AdminController {
    registerAdmin = asyncErrorHandler(async (req, res) => {
        const { email } = req.body;

        const { user, generatedPassword } =
            await adminService.registerAdmin(email);

        await mailService.sendPasswordMail(user.email, generatedPassword);

        res.status(201).json({
            user: userToDto(user),
        });
    });

    getAllAlmins = asyncErrorHandler(async (_, res) => {
        res.json(await adminService.getAllAdmins());
    });

    deleteAdmin = asyncErrorHandler(async (req, res) => {
        const { id } = req.params;

        const result = await adminService.deleteAdmin(id);

        res.status(200).json({
            message: result.message,
        });
    });
}

export default new AdminController();
