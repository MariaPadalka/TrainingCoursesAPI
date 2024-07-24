import logger from '../utils/logger.js';

const logMiddleware = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const { method, originalUrl } = req;
        const { statusCode, statusMessage } = res;

        if (statusCode >= 400) {
            logger.error(
                `ERROR: [${method} ${originalUrl}] -> [${statusCode} ${statusMessage}] - ${duration}ms`
            );
        } else {
            logger.info(
                `INFO: [${method} ${originalUrl}] -> [${statusCode} ${statusMessage}] - ${duration}ms`
            );
        }
    });

    next();
};

export default logMiddleware;
