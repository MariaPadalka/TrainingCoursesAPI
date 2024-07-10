import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: "Documentation for your project's REST API",
    },
    servers: [
      {
        url: `http://${process.env.URL}:${process.env.PORT}/api`,
        description: 'Local server',
      },
    ],
  },
  apis: [join(__dirname, 'docs/*.js')],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;