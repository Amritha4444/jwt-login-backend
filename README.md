JWT Authentication Backend

A REST API for user authentication built with Node.js, Express, TypeScript, and SQLite. The application supports user signup, login, JWT-based authentication, and protected user profile access.

Features

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- Request validation
- SQLite database integration
- Centralized error handling
- Environment variable configuration
- Swagger API documentation

Technologies Used

- Node.js
- Express.js
- TypeScript
- SQLite
- JSON Web Token (JWT)
- bcrypt
- Zod (request validation)
- Swagger UI and OpenAPI

Project Structure

backend/
├── src/
│   ├── config/
│   │   └── env.ts
│   ├── core/
│   │   ├── db/
│   │   │   └── db.connection.ts
│   │   └── swagger/
│   │       └── swagger.config.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── modules/
│   │   └── auth/
│   │       ├── auth.controller.ts
│   │       ├── auth.dto.ts
│   │       ├── auth.repository.ts
│   │       ├── auth.routes.ts
│   │       ├── auth.service.ts
│   │       └── user.model.ts
│   ├── utils/
│   │   ├── jwt.ts
│   │   └── password.ts
│   ├── app.ts
│   └── index.ts
├── .env.example
├── package.json
├── package-lock.json
└── tsconfig.json

Prerequisites

Install the following:

- Node.js
- npm
- Git

Installation

Clone the repository:

git clone https://github.com/Amritha4444/jwt-login-backend.git

Navigate to the backend directory:

cd jwt-login-backend

Install the dependencies:

npm install

Environment Configuration

Create a ".env" file in the backend root directory.

Configure the required environment variables according to your project:

PORT=3000
JWT_SECRET=your_secure_secret_key

Use a strong, private JWT secret. Never commit your actual ".env" file or expose your JWT secret on GitHub.

Run the Application

Use the development command configured in your "package.json". For example, if your project uses "tsx":

npm run dev

If your project uses a different development script, use the script defined in "package.json".

The API should be available at:

"http://localhost:3000"

API Endpoints

Base URL: "http://localhost:3000/api"

Method| Endpoint| Description| Access
POST| "/auth/signup"| Register a new user| Public
POST| "/auth/login"| Authenticate a user| Public
GET| "/auth/me"| Retrieve the authenticated user's details| Protected

Signup

Request body:

{
  "email": "user@example.com",
  "password": "your_password"
}

Registers a user after validating the request and securely hashing the password.

Login

Request body:

{
  "email": "user@example.com",
  "password": "your_password"
}

Validates the credentials and returns an authentication token when login succeeds.

Get Current User

Request header:

Authorization: Bearer <your_jwt_token>

Returns the authenticated user's details when the token is valid.

API Documentation

If Swagger is configured, start the backend and open:

"http://localhost:3000/api-docs"

Swagger UI allows you to inspect the documented endpoints and test API requests.

Response Format

The API uses a consistent response structure:

{
  "success": true,
  "message": "Operation successful",
  "data": {}
}

The actual "data" contents depend on the endpoint and result.

Security

- Passwords are hashed before being stored.
- Protected routes require a valid JWT.
- Sensitive configuration is stored in environment variables.
- Input validation is performed before processing requests.
- Authentication errors are handled without exposing password hashes or secrets.

Frontend Repository

"JWT Authentication Frontend" (https://github.com/Amritha4444/jwt-login-frontend)

Author

Amritha