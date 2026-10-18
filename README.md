JWT Authentication Backend

A secure REST API built using Node.js, Express.js, TypeScript, SQLite, and JSON Web Tokens (JWT). It supports user registration, login, and protected user profile access.

Features

- User signup and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Request validation using class-validator
- Centralized error handling
- SQLite database
- Swagger API documentation
- Automated tests using Jest and Supertest

Tech Stack

- Node.js
- Express.js
- TypeScript
- SQLite
- JSON Web Token (JWT)
- bcrypt
- class-validator and class-transformer
- Swagger UI and swagger-jsdoc
- Jest and Supertest

Project Structure

backend/
└── src/
    ├── config/
    │   └── env.ts
    ├── core/
    │   ├── db/
    │   │   └── db.connection.ts
    │   ├── errors/
    │   │   └── http.error.ts
    │   └── swagger/
    │       └── swagger.config.ts
    ├── middleware/
    │   ├── auth.middleware.ts
    │   └── error.middleware.ts
    ├── modules/
    │   └── auth/
    │       ├── auth.controller.ts
    │       ├── auth.dto.ts
    │       ├── auth.repository.ts
    │       ├── auth.routes.ts
    │       ├── auth.service.ts
    │       └── user.model.ts
    ├── utils/
    │   ├── jwt.ts
    │   └── password.ts
    ├── app.ts
    └── index.ts

Prerequisites

- Node.js
- npm
- Git

Installation

Clone the repository and install dependencies:

git clone https://github.com/Amritha4444/jwt-login-backend.git
cd jwt-login-backend
npm install

Environment Configuration

Create a ".env" file in the backend root directory.

PORT=3000
JWT_SECRET=your_long_random_secret

Use a strong, private JWT secret. Never upload your real ".env" file to GitHub.

Running the Application

Start the development server:

npm run dev

Build the TypeScript project:

npm run build

Run the tests:

npm test

Use the scripts defined in "package.json" if their names differ.

API Endpoints

Base URL: "http://localhost:3000"

Method| Endpoint| Description
POST| "/api/auth/signup"| Register a new user
POST| "/api/auth/login"| Log in and receive a JWT
GET| "/api/auth/me"| Get the authenticated user's details

Swagger API Documentation

Open the following URL after starting the backend:

"http://localhost:3000/api-docs"

Swagger UI allows you to view and test the API endpoints, request bodies, responses, and authentication requirements.

Authentication

After a successful login, the API returns a JWT token. Use this token to access protected endpoints.

Request header:

Authorization: Bearer YOUR_JWT_TOKEN

Replace "YOUR_JWT_TOKEN" with the token returned by the login endpoint.

API Response Format

Successful response:

{
  "success": true,
  "message": "Request successful",
  "data": {}
}

Common HTTP status codes:

- "200" — Request successful
- "201" — User created successfully
- "400" — Invalid request data
- "401" — Authentication failed
- "409" — Email already exists
- "500" — Internal server error

Security

- Passwords are stored as bcrypt hashes.
- Protected routes require a valid JWT.
- Secret keys are stored in environment variables.
- Password hashes and secret keys must not be exposed in API responses.

Author

JWT Authentication Project — Angular frontend and Node.js, Express.js, TypeScript, and SQLite backend.