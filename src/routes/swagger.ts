import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swaggerDefinition';

const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
