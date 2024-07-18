import asyncErrorHandler from '../utils/asyncError.handler.js';
import adminService from '../services/admin.sv.js';

class AdminController {
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
