import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger.js';
import applyMiddleware from './middleware/index.mddl.js';
import dotenv from 'dotenv';

import connectDB from './db.js';
import routes from './routes/index.rt.js';
import { errorHandler } from './middleware/errorHandler.mddl.js';
import startServer from './server.js';
import CustomError from './utils/errors/customError.class.js';
import logMiddleware from './middleware/log.mddl.js';

dotenv.config();

const app = express();
applyMiddleware(app);

connectDB();

app.use(logMiddleware);

app.use('/api', routes);

// Add Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.all('*', (req, res, next) => {
    const err = new CustomError(
        `Can't find method ${req.method} ${req.originalUrl} on the server!`,
        404
    );
    next(err);
});

// Error handler
app.use(errorHandler);

// Start server
startServer(app);
