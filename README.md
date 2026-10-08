# JWT Login System - Node.js Backend

This project is the backend API for a full-stack JWT Login System. It uses Node.js, Express.js, TypeScript, SQLite, bcrypt, and JSON Web Token (JWT) for authentication.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- SQLite
- JSON Web Token (JWT)
- bcrypt
- CORS
- dotenv

## Features

- User login using email and password
- User signup
- Password hashing using bcrypt
- SQLite database integration
- JWT token generation after successful login
- JWT token verification middleware
- Protected /api/auth/me route
- Input validation for required fields
- Duplicate email handling
- Environment variable configuration
- Restricted CORS configuration

## Project Structure

```text
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
├── package.json
├── package-lock.json
├── tsconfig.json
├── .env.example
└── .gitignore

API Endpoints

Login:
POST /api/auth/login


Request:
{
  "email": "demo@gmail.com",
  "password": "demo123"
}


Signup
POST /api/auth/signup

Request:
{
  "email": "newuser@gmail.com",
  "password": "password123"
}


Protected User Details
GET /api/auth/me
Requires:

Authorization: Bearer <JWT_TOKEN>


Demo Login

Email:
demo@gmail.com
Password:
demo123

The demo user's password is stored as a bcrypt hash in the SQLite database.


Environment Variables
Create a .env file using .env.example as a reference.

PORT=3000
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=1h
ALLOWED_ORIGINS=http://localhost:4200

Do not commit the actual .env file to GitHub.


Run the Project

Install dependencies:
npm install

Build the TypeScript project:
npm run build

Start the backend:
npm start

For development:
npm run dev