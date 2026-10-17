import swaggerJsdoc from 'swagger-jsdoc';
import { env } from '../../config/env';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JWT Authentication API',
      version: '1.0.0',
      description:
        'API documentation for user login, signup, and authenticated user details.'
    },
    servers: [
      {
        url: `http://localhost:${env.port}`,
        description: 'Local development server'
      }
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication endpoints'
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
              minLength: 6,
              example: 'demo123'
            }
          }
        },

        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'demo@gmail.com'
            }
          }
        },

        LoginData: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'JWT access token',
              example: 'your.jwt.token'
            },
            user: {
              $ref: '#/components/schemas/User'
            }
          }
        },

        SignupData: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'demo@gmail.com'
            }
          }
        },

        MeData: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User'
            }
          }
        },

        ApiResponse: {
          type: 'object',
          required: ['success', 'message', 'data'],
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Request successful'
            },
            data: {
              nullable: true,
              oneOf: [
                { $ref: '#/components/schemas/LoginData' },
                { $ref: '#/components/schemas/SignupData' },
                { $ref: '#/components/schemas/MeData' }
              ]
            }
          }
        },

        ErrorResponse: {
          type: 'object',
          required: ['success', 'message', 'data'],
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Invalid email or password'
            },
            data: {
              type: 'object',
              nullable: true,
              example: null
            }
          }
        }
      }
    }
  },

  apis: ['./src/modules/auth/*.controller.ts']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;