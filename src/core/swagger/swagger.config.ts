import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JWT Authentication API',
      version: '1.0.0',
      description:
        'API documentation for login, signup, and authenticated user details.'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        AuthRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'demo@gmail.com'
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'demo123'
            }
          }
        },
        ApiResponse: {
          type: 'object',
          required: ['success', 'message', 'data'],
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Request successful' },
            data: {
              type: 'object',
              nullable: true,
              additionalProperties: true
            }
          }
        }
      }
    }
  },
  apis: ['./src/modules/auth/*.ts']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;