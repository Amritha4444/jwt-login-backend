
# JWT Login System — Node.js Backend

## Project Overview

This project provides the backend API for a full-stack JWT Login System. It uses Node.js, Express.js, TypeScript, SQLite, bcrypt, and JSON Web Tokens (JWT) to handle user registration, login, and protected routes.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- SQLite
- bcrypt
- JSON Web Token (JWT)
- Zod for request validation
- CORS
- dotenv
- Jest and ts-jest for automated tests

## Features

- User signup and login using email and password
- Password hashing with bcrypt
- SQLite database integration
- JWT generation after successful login
- JWT verification middleware for protected routes
- Request validation using Zod
- Duplicate email handling
- Centralized error-handling middleware
- Environment-based configuration
- Restricted CORS configuration

## Project Structure

text
backend/
├── src/
│   ├── config/
│   │   └── env.ts
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
│   ├── database.ts
│   └── index.ts
├── tests/
│   └── auth.test.ts
├── jest.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── .env.example
└── .gitignore


## Prerequisites

Install Node.js and npm before running the project.

## Installation and Setup

1. Open a terminal in the backend directory.
2. Install dependencies:

   bash
   npm install
   

3. Create a .env file by copying .env.example:

   powershell
   Copy-Item .env.example .env
   

4. Open .env and configure the environment variables:

   dotenv
   PORT=3000
   JWT_SECRET=replace_with_a_long_random_secret
   JWT_EXPIRES_IN=1h
   ALLOWED_ORIGINS=http://localhost:4200
   

   Use a strong, private JWT secret. Never commit your actual .env file or production secrets to GitHub.

## Running the Project

Start the development server:

bash
npm run dev


Build the TypeScript project:

bash
npm run build


Start the compiled application:

bash
npm start


## API Endpoints

### 1. Login

*Endpoint:* POST /api/auth/login

Request body:

json
{
  "email": "demo@gmail.com",
  "password": "demo123"
}


A successful login returns a JWT token. Invalid request data returns HTTP 400; incorrect credentials return HTTP 401.

### 2. Signup

*Endpoint:* POST /api/auth/signup

Request body:

json
{
  "email": "newuser@gmail.com",
  "password": "password123"
}


The email must be valid and the password must contain at least six characters. Successful registration returns HTTP 201. Invalid input returns HTTP 400, and a duplicate email returns HTTP 409.

### 3. Get Current User

*Endpoint:* GET /api/auth/me

This route requires a valid JWT.

Request header:

text
Authorization: Bearer <JWT_TOKEN>


Requests without a valid token are rejected.

## Demo Credentials

For local testing:

- *Email:* demo@gmail.com
- *Password:* demo123

The demo user's password is stored as a bcrypt hash in the SQLite database. Do not use demo credentials in production.

##Testing

Run the automated tests:

npm test

To build the TypeScript backend, run:

npm run build

To start the development server, run:

npm run dev

The current automated tests check basic email-format and password-length validation. They do not yet test the complete login or signup API flow.

Before submitting, verify that the build completes successfully and the tests pass.
