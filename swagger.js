// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Helpdesk API',
      version: '1.0.0',
      description: 'API documentation for the Helpdesk Ticketing System',
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Development server',
      },
    ],
  },
  apis: ['./Routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    next();
  }, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
