const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Employee Management API',
            version: '1.0.0',
            description: 'API documentation for Employee Management System',
        },
        servers: [
            {
                url: 'http://localhost:7001/api',
                description: 'Local Server',
            },
        ],
    },
    apis: ['./src/main/api/routes/*.js'], // Point to the routes where you use Swagger comments
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger UI available at /api-docs');
};

module.exports = setupSwagger;
