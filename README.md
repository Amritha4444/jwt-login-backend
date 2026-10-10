JWT Authentication Backend

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
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md

Note: The structure above represents the intended organization. Keep it consistent with the actual files in your repository.

Prerequisites

Install the following before running the project:

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

Create a ".env" file in the backend root directory.

Configure the environment variables required by the application:

PORT=3000
JWT_SECRET=your_long_random_secret_here

Use a strong, private JWT secret in your local environment. Never commit your actual ".env" file or secret to GitHub.

If the project uses additional environment variables, add them according to the application's configuration.

Running the Application

Start the development server:

npm run dev

The backend runs at:

"http://localhost:3000"

The exact startup command depends on the scripts configured in "package.json".

API Documentation (Swagger)

Swagger UI provides interactive documentation for the authentication APIs.

Start the backend server and open:

http://localhost:3000/api-docs

Available Endpoints

Method| Endpoint| Description| Authentication
POST| "/api/auth/signup"| Register a new user| Not required
POST| "/api/auth/login"| Log in and receive a JWT token| Not required
GET| "/api/auth/me"| Retrieve the authenticated user's details| Bearer token required

Testing with Swagger

1. Start the backend server.
2. Open the Swagger UI URL.
3. Expand an endpoint and click Try it out.
4. Enter the required request body and execute the request.
5. For protected endpoints, log in and copy the returned JWT token.
6. Click Authorize and enter the token in the format indicated by the Swagger interface.
7. Execute "GET /api/auth/me" to test the protected route.

API Request Examples

1. Signup

Endpoint: "POST /api/auth/signup"

Example request:

{
  "email": "user@example.com",
  "password": "Password123"
}

A successful registration should return an appropriate success response. Registering an email that already exists should return a conflict response.

2. Login

Endpoint: "POST /api/auth/login"

Example request:

{
  "email": "user@example.com",
  "password": "Password123"
}

A successful login returns a JWT token. Use that token to access protected routes.

3. Get Current User

Endpoint: "GET /api/auth/me"

Required header:

Authorization: Bearer <your_jwt_token>

This endpoint returns details for the authenticated user.

Response Format

The API uses a consistent response structure:

{
  "success": true,
  "message": "Operation successful",
  "data": {}
}

Error responses use the same general structure with "success" set to "false", an appropriate message, and "data" set to "null", where applicable.

Common HTTP status codes include:

- "200 OK" — Request successful
- "201 Created" — Resource created successfully
- "400 Bad Request" — Invalid request data
- "401 Unauthorized" — Missing or invalid authentication
- "409 Conflict" — Resource already exists
- "500 Internal Server Error" — Unexpected server error

Actual status codes depend on the endpoint and error condition.

Database

The application uses SQLite to store user information.

- The database connection is managed in the core database module.
- User records are managed through the authentication repository.
- Passwords should be stored as bcrypt hashes, not plain text.
- Database initialization and demo-user creation depend on the configured application logic.

Use only the demo credentials configured by the project when testing locally.

Validation and Security

- Validate incoming authentication requests.
- Hash passwords before storing them.
- Verify passwords during login.
- Sign and verify JWT tokens using a secret stored in environment variables.
- Protect authenticated routes with authentication middleware.
- Do not return password hashes or JWT secrets in API responses.
- Do not commit ".env" files or private credentials.

Testing

Run the automated tests:

npm test

The tests verify the behavior covered by the existing test suite. Passing these tests does not necessarily confirm that every API integration flow has been tested.

Build

Compile the TypeScript code:

npm run build

Run the compiled application using the start script configured in "package.json", if available.

GitHub Repository

Backend repository:

https://github.com/Amritha4444/jwt-login-backend

Author

Developed as a JWT authentication backend project using TypeScript and Express.