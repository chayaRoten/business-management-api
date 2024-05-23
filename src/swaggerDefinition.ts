import swaggerJSDoc, { Options } from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Attorney API',
    version: '1.0.0',
    description: 'Documentation for Attorney API',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options: Options = {
  swaggerDefinition,
  apis: ['./routes/*.ts', './controllers/*.ts'], // נתיבים לקבצים שמכילים תיעוד JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
