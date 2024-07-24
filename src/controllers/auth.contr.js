import asyncErrorHandler from '../utils/asyncError.handler.js';
import authService from '../services/auth.sv.js';
import { getMillisecondsFromExpiration } from '../utils/helperFunctions.js';
import {
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
} from '../utils/constants/messages.constants.js';
import CustomError from '../utils/customError.class.js';

const refreshTokenMaxAge = getMillisecondsFromExpiration(
    process.env.REFRESH_TOKEN_EXPIRATION
);

class AuthController {
    loginUser = asyncErrorHandler(async (req, res) => {
        const { email, password } = req.body;

        const { user, accessToken } = await authService.login(email, password);

        res.cookie('refreshToken', user.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: refreshTokenMaxAge,
        });

        res.status(200).json({
            role: user.role,
            accessToken: accessToken,
        });
    });

    logoutUser = asyncErrorHandler(async (req, res) => {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            throw new CustomError(ERROR_MESSAGES.INVALID_REFRESH_TOKEN, 401);
        }

        await authService.logoutUser(refreshToken);

        res.clearCookie('refreshToken');

        res.status(200).json({
            message: SUCCESS_MESSAGES.LOGGED_OUT,
        });
    });

    refreshTokens = asyncErrorHandler(async (req, res) => {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            throw new CustomError(ERROR_MESSAGES.TOKEN_MISSING, 401);
        }

        const tokens = await authService.refreshTokens(refreshToken);

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: refreshTokenMaxAge,
        });

        res.status(200).json({
            accessToken: tokens.accessToken,
        });
    });

    changePassword = asyncErrorHandler(async (req, res) => {
        const userId = req.user.userId;
        const { oldPassword, newPassword } = req.body;

        const user = await authService.changePassword(
            userId,
            oldPassword,
            newPassword
        );

        res.status(200).json({
            message: SUCCESS_MESSAGES.PASSWORD_CHANGED,
            user: user,
        });
    });
}

export default new AuthController();
