import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'myBusiness API',
      version: '1.0.0',
      description: 'API documentation for myBusiness',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);


const setupSwagger = (app: Express): void => {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;




