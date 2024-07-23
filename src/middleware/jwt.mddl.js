import tokenService from '../services/token.sv.js';
import CustomError from '../utils/customError.class.js';
import { ERROR_MESSAGES } from '../utils/constants/messages.constants.js';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(new CustomError(ERROR_MESSAGES.TOKEN_MISSING, 401));
    }

    try {
        const decodedToken = tokenService.verifyAccessToken(token);
        req.user = decodedToken;
        next();
    } catch {
        return next(new CustomError(ERROR_MESSAGES.TOKEN_INVALID, 401));
    }
};

export const checkRole = (role) => {
    return (req, _, next) => {
        if (req.user.role !== role) {
            return next(new CustomError(ERROR_MESSAGES.FORBIDDEN, 403));
        }
        next();
    };
};
