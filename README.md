Task Manager Application (MERN Stack)

A full-stack Task Manager application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).
This application enables users to efficiently manage tasks with authentication, filtering, and analytics.

Overview

This project demonstrates a complete full-stack workflow including:

Secure user authentication using JWT
RESTful API design
CRUD operations for task management
Advanced features like filtering, search, and dashboard analytics
Modern UI using Tailwind CSS
 Features
 Authentication
User registration
User login with JWT
Protected routes
Logout functionality
Task Management
Create new tasks
View all tasks
Update task details
Delete tasks
Change task status:
TODO → IN_PROGRESS → DONE
 Advanced Functionality
Filter tasks by status and priority
Search tasks by title
Pagination support (backend)
Dashboard analytics:
Total tasks count
Status distribution
Overdue tasks
Frontend
Built with React.js
Styled using Tailwind CSS
Responsive and clean UI
Component-based architecture
API Documentation
Swagger integration for API documentation
Tech Stack
Frontend
React.js
Axios
Tailwind CSS
Backend
Node.js
Express.js
MongoDB (Mongoose)
JSON Web Token (JWT)
Swagger
Project Structure
task-manager/
│
├── backend/
│   ├── models/
│   ├── middleware/
│   ├── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│
└── README.md
⚙️ Installation & Setup
Clone the repository
git clone https://github.com/your-username/task-manager.git
cd task-manager
 Backend Setup
cd backend
npm install

Create a .env file in the backend directory:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Run the backend server:

node server.js
Frontend Setup
cd ../frontend
npm install
npm start API Endpoints
Authentication
POST /api/v1/auth/register
POST /api/v1/auth/login
Tasks
GET /api/v1/tasks
POST /api/v1/tasks
PUT /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
PATCH /api/v1/tasks/:id/status
Dashboard
GET /api/v1/dashboard
