import logger from '../utils/logger.js';

export const errorHandler = (error, _, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    logger.error(error.stack);
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
    });
    next();
};
