import jwt from 'jsonwebtoken';
import User from '../models/user.mdl.js';
import CustomError from '../utils/customError.class.js';
import { ERROR_MESSAGES } from '../utils/constants/messages.constants.js';

class TokenService {
    generateAccessToken = (user) => {
        return jwt.sign(
            { userId: user._id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
        );
    };

    generateRefreshToken = (user) => {
        return jwt.sign(
            { userId: user._id, role: user.role },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
        );
    };

    verifyAccessToken = (token) => {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    };

    verifyRefreshToken = (token) => {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    };

    async saveToken(userId, refreshToken) {
        const user = await User.findById(userId);
        if (!user) {
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
        }
        user.refreshToken = refreshToken;
        return await user.save();
    }

    async findToken(refreshToken) {
        const user = await User.findOne({ refreshToken });
        if (!user) {
            throw new CustomError(ERROR_MESSAGES.INVALID_REFRESH_TOKEN, 403);
        }
        return user;
    }

    async removeToken(refreshToken) {
        const user = await User.findOneAndUpdate(
            { refreshToken },
            { refreshToken: '' },
            { new: true }
        );
        if (!user) {
            throw new CustomError(ERROR_MESSAGES.INVALID_REFRESH_TOKEN, 403);
        }
        return user;
    }
}

export default new TokenService();
