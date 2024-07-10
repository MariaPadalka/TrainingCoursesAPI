import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger.js';
import applyMiddleware from './middleware/index.mddl.js';
import dotenv from 'dotenv';

import connectDB from './db.js'; // Import the DB connection function
import routes from './routes/index.rt.js';
import { errorHandler } from './middleware/errorHandler.middl.js';
import startServer from './startServer.js';

dotenv.config();

const app = express();
applyMiddleware(app);

connectDB();

app.use('/api', routes);

// Add Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler
app.use(errorHandler);

// Start server
startServer(app);
