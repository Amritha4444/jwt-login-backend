[18:07, 16/10/2026] Amritha: 
[18:10, 16/10/2026] Amritha: JWT Authentication Backend

A REST API built with Node.js, Express, TypeScript, SQLite, and JSON Web Tokens (JWT). It supports user registration, login, password hashing, and protected API routes.

Features

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes using Bearer tokens
- SQLite database for user storage
- Request validation
- Consistent API response format
- Swagger UI API documentation
- Automated tests
- TypeScript for type safety

Tech Stack

- Node.js
- Express.js
- TypeScript
- SQLite
- bcrypt
- JSON Web Token (JWT)
- Swagger UI and swagger-jsdoc
- Jest (testing)

Project Structure

backend/
├── src/
│   ├── config/
│   │   └── env.ts
│   ├── core/
│   │   ├── db/
│   │   │   └── db.connection.ts
│   │…
[18:12, 16/10/2026] Amritha: JWT Authentication Backend

A REST API built with Node.js, Express.js, TypeScript, SQLite, and JSON Web Tokens (JWT). It supports user registration, login, password hashing, request validation, and protected API routes.

Features

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes using Bearer tokens
- SQLite database for user storage
- Request validation using class-validator
- Consistent API response format
- Centralized error handling
- Interactive Swagger API documentation
- Automated API tests using Jest and Supertest
- TypeScript for type safety

Tech Stack

- Node.js
- Express.js
- TypeScript
- SQLite
- bcrypt
- JSON Web Token (JWT)
- Swagger UI Express
- swagger-jsdoc
- class-validator
- Jest
- Supertest

Project Structure

backend/
├── src/
│   ├── config/
│   │   └── env.ts
│   ├── core/
│   │   ├── db/
│   │   │   └── db.connection.ts
│   │   ├── errors/
│   │   │   └── http.error.ts
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
├── tests/
│   └── auth.test.ts
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── jest.config.ts
└── README.md

Prerequisites

Install the following:

- Node.js
- npm
- Git

Installation

Clone the repository:

git clone https://github.com/Amritha4444/jwt-login-backend.git

Move into the project directory:

cd jwt-login-backend

Install dependencies:

npm install

Environment Configuration

Create a ".env" file in the backend root directory. You can use ".env.example" as a reference.

Example configuration:

PORT=3000
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=1h
ALLOWED_ORIGINS=http://localhost:4200
DATABASE_PATH=./users.db
NODE_ENV=development

- "PORT": Port on which the backend runs.
- "JWT_SECRET": Private secret used to sign and verify JWT tokens.
- "JWT_EXPIRES_IN": Token expiration duration.
- "ALLOWED_ORIGINS": Frontend origins allowed by CORS.
- "DATABASE_PATH": SQLite database file path.
- "NODE_ENV": Application environment.

Use a strong, private JWT secret. Never commit your actual ".env" file or expose secrets in documentation, screenshots, or API responses.

Running the Application

Start the development server:

npm run dev

The backend runs at:

http://localhost:3000

Keep the terminal running while using the API.

API Documentation — Swagger

Swagger provides interactive documentation for the authentication endpoints.

Start the backend and open:

http://localhost:3000/api-docs

You can view the endpoints, inspect request parameters, and execute API requests using the Swagger interface.

API Endpoints

Method| Endpoint| Description| Authentication
POST| "/api/auth/signup"| Register a new user| Not required
POST| "/api/auth/login"| Authenticate a user and receive a JWT| Not required
GET| "/api/auth/me"| Retrieve the authenticated user's details| Bearer token required

API Request Examples

1. User Signup

Endpoint: "POST /api/auth/signup"

Request body:

{
  "email": "user@example.com",
  "password": "Password123"
}

A successful signup returns HTTP "201 Created". Invalid input returns HTTP "400 Bad Request", while an already registered email returns HTTP "409 Conflict".

2. User Login

Endpoint: "POST /api/auth/login"

Request body:

{
  "email": "user@example.com",
  "password": "Password123"
}

Successful authentication returns HTTP "200 OK" and a JWT token. Invalid credentials return HTTP "401 Unauthorized".

3. Get Current User

Endpoint: "GET /api/auth/me"

Required header:

Authorization: Bearer <your_jwt_token>

Send a valid token obtained from the login endpoint. The endpoint returns the authenticated user's details.

Requests without a valid token are rejected with HTTP "401 Unauthorized".

Response Format

The API uses a consistent response structure.

Successful response:

{
  "success": true,
  "message": "Operation successful",
  "data": {}
}

Error response:

{
  "success": false,
  "message": "Invalid input",
  "data": null
}

Common HTTP status codes:

- "200 OK": Request successful.
- "201 Created": Resource created successfully.
- "400 Bad Request": Invalid request data.
- "401 Unauthorized": Missing or invalid authentication.
- "409 Conflict": Resource already exists.
- "500 Internal Server Error": Unexpected server error.

The exact response message and status code depend on the request and the condition encountered.

Database

The application uses SQLite to store user information.

- Database connection and initialization are managed in "src/core/db/db.connection.ts".
- User database operations are handled by "src/modules/auth/auth.repository.ts".
- Passwords are hashed before storage.
- The database path is configurable through "DATABASE_PATH".
- Demo-user initialization depends on the application's database setup.

Use only the demo credentials configured by the project when testing locally. Do not expose password hashes in API responses or documentation.

Validation and Security

- Validate authentication request data.
- Hash passwords before storing them.
- Verify passwords during login.
- Sign and verify JWT tokens using an environment-configured secret.
- Protect authenticated endpoints with authentication middleware.
- Use centralized error handling for consistent API responses.
- Keep environment secrets out of source control.
- Never return password hashes or JWT secrets in API responses.

Automated Testing

Run the test suite:

npm test

The automated tests cover:

- Invalid email validation.
- Password length validation.
- Successful user registration.
- Duplicate email handling.
- Incorrect login credentials.
- Rejection of requests without a token.
- Access to the protected user endpoint with a valid token.

A passing test suite confirms the behavior covered by these tests; it does not guarantee that every possible scenario has been tested.

Build

Compile the TypeScript application:

npm run build

The TypeScript compiler generates the compiled output according to "tsconfig.json".

Use the start script configured in "package.json" to run the compiled application, if available.

GitHub Repository

Backend repository:

https://github.com/Amritha4444/jwt-login-backend

Author

Developed as a JWT authentication backend project using TypeScript, Express.js, SQLite, and JWT.