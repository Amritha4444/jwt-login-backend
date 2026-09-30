JWT Login System

A full-stack login system built using Angular, Node.js, Express, SQLite, and JSON Web Token (JWT) authentication.

Technologies Used

Frontend

- Angular
- TypeScript
- HTML
- CSS

Backend

- Node.js
- Express.js
- JWT
- SQLite
- CORS

Features

- User login using email and password
- Database-based credential validation
- JWT token generation after successful login
- Protected Dashboard API
- Angular route guard
- Logout functionality
- Unauthorized users are redirected to the Login page

Project Structure

JWT-LOGIN-TASK
│
├── backend
│   ├── server.js
│   ├── database.js
│   ├── package.json
│   └── .gitignore
│
└── frontend
    ├── src
    ├── package.json
    └── .gitignore

How to Run the Backend

Open a terminal inside the "backend" folder.

npm install
node server.js

The backend runs at:

http://localhost:3000

How to Run the Frontend

Open another terminal inside the "frontend" folder.

npm install
ng serve

Open the application at:

http://localhost:4200/login

Login Flow

1. User enters email and password in the Angular Login page.
2. Angular sends the credentials to the Node.js "/api/login" endpoint.
3. Node.js checks the credentials against the SQLite database.
4. If valid, the server generates a JWT token.
5. Angular stores the token.
6. The token is sent with requests to protected APIs.
7. The Dashboard is accessible only when a valid token is available.
8. Logout removes the token and returns the user to the Login page.

API Endpoints

Login

POST /api/login

Dashboard

GET /api/dashboard

The Dashboard endpoint requires a JWT token in the Authorization header.

Authorization: Bearer <token>

Database

The project uses SQLite.

The "users" table contains:

- "id"
- "email"
- "password"

The database is created automatically when the backend starts.

Note

This project is a training/demo implementation. For a production application, passwords should be securely hashed and the JWT secret should be stored in environment variables rather than directly in the source code.
