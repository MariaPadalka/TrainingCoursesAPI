import bcrypt from 'bcryptjs';
import User from '../models/user.mdl.js';
import tokenService from './token.sv.js';
import CustomError from '../utils/customError.class.js';
import { ERROR_MESSAGES } from '../utils/constants/messages.constants.js';
import { validatePassword } from '../utils/validation.func.js';
import { userToDto } from '../dto/user.dto.js';

class AuthService {
    async registerUser(email, role) {
        const password = Math.random().toString(36).slice(-8); // Generate a random password
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const user = new User({
            email: email,
            password: hashedPassword,
            role: role,
            refreshToken: 'temporaryToken',
        });

        await user.save();

        return {
            user,
            generatedPassword: password,
        };
    }

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS, 401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS, 401);
        }

        const accessToken = tokenService.generateAccessToken(user);
        const refreshToken = tokenService.generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        return {
            user: userToDto(user),
            accessToken,
        };
    }
    async logoutUser(refreshToken) {
        const user = await tokenService.removeToken(refreshToken);
        return userToDto(user);
    }

    async refreshTokens(refreshToken) {
        const user = await tokenService.findToken(refreshToken);
        if (!user) {
            throw new CustomError(ERROR_MESSAGES.INVALID_REFRESH_TOKEN, 403);
        }

        tokenService.verifyRefreshToken(refreshToken);

        const newAccessToken = tokenService.generateAccessToken(user);
        const newRefreshToken = tokenService.generateRefreshToken(user);

        user.refreshToken = newRefreshToken;
        await user.save();

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }

    async changePassword(userId, oldPassword, newPassword) {
        const user = await User.findById(userId);
        if (!user) {
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
        }

        const isPasswordValid = await bcrypt.compare(
            oldPassword,
            user.password
        );
        if (!isPasswordValid) {
            throw new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS, 401);
        }

        if (!validatePassword(newPassword)) {
            throw new CustomError(ERROR_MESSAGES.WEAK_PASSWORD, 400);
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return userToDto(user);
    }
}

export default new AuthService();
