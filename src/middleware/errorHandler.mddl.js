export const errorHandler = (error, _, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    console.error(error);
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
    });
    next();
};
