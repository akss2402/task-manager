# 📝 Task Manager Application (MERN Stack)

A full-stack **Task Manager Application** built using the MERN stack (**MongoDB, Express.js, React.js, Node.js**).
This project allows users to efficiently manage tasks with authentication, filtering, and analytics.

---

## 🚀 Overview

This project demonstrates a complete full-stack workflow including:

* Secure authentication using JWT
* RESTful API design
* CRUD operations for task management
* Advanced features like filtering, search, and analytics dashboard
* Modern responsive UI using Tailwind CSS

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login with JWT
* Protected Routes
* Logout Functionality

### 📋 Task Management

* Create Tasks
* View All Tasks
* Update Task Details
* Delete Tasks
* Task Status Flow:

  ```
  TODO → IN_PROGRESS → DONE
  ```

### ⚡ Advanced Features

* Filter tasks by status and priority
* Search tasks by title
* Pagination support (Backend)
* Dashboard analytics:

  * Total tasks
  * Status distribution
  * Overdue tasks

---

## 🎨 Frontend

* Built with React.js
* Styled using Tailwind CSS
* Responsive & clean UI
* Component-based architecture

---

## ⚙️ Backend

* Node.js & Express.js
* MongoDB with Mongoose
* JWT Authentication
* Swagger API Documentation

---

## 🛠 Tech Stack

### Frontend

* React.js
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JSON Web Token (JWT)
* Swagger

---

## 📁 Project Structure

```
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
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

---

### 🔧 Backend Setup

```
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run the backend server:

```
node server.js
```

---

### 💻 Frontend Setup

```
cd ../frontend
npm install
npm start
```

---

## 🔗 API Endpoints

### Authentication

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`

### Tasks

* `GET /api/v1/tasks`
* `POST /api/v1/tasks`
* `PUT /api/v1/tasks/:id`
* `DELETE /api/v1/tasks/:id`
* `PATCH /api/v1/tasks/:id/status`

### Dashboard

* `GET /api/v1/dashboard`

---

## 📄 API Documentation

Swagger is integrated for interactive API documentation.

---

## 💡 Future Improvements

* Role-based access control
* Real-time updates (WebSockets)
* Drag & drop task management UI
* Notifications system

---

## 👨‍💻 Author

**Akash Chauhan**

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!

