const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SocialHub API',
            version: '1.0.0',
            description: 'Документація API для соціальної мережі SocialHub',
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
                description: 'Сервер розробки',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/routes/*.js', './src/models/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = { swaggerUi, specs };