# SaaS Application

A full-stack SaaS application built using React.js, TypeScript, Node.js, Express.js, MongoDB and Docker.

## Features

- User registration and login
- Role-based authentication
- Admin dashboard
- User management
- Project management
- Task management
- Real-time updates using WebSockets
- Free, Pro and Enterprise subscription plans
- Simulated payments
- Billing and invoice generation
- Email notifications
- Analytics dashboard
- Docker containerization
- GitHub Actions CI

## Tech Stack

### Frontend
- React.js
- TypeScript
- Vite
- CSS

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Socket.IO
- Nodemailer

### DevOps
- Docker
- GitHub Actions
- GitHub

## Project Structure

```text
saas-project/
├── client/
├── server/
├── shared/
├── .github/
│   └── workflows/
├── .gitignore
└── README.md
```
## User Roles

- **Admin** – Manage users and projects, view analytics
- **User** – Manage projects, tasks and subscriptions
- **Guest** – Basic application access

## Database

MongoDB is used as the primary database.

Main collections:

- Users
- Projects
- Tasks
- Subscriptions
- Payments

## API

The backend provides REST APIs for:

- Authentication
- Users
- Projects
- Tasks
- Subscriptions
- Payments
- Admin management
- Analytics
- Email notifications

## Docker

The application includes Dockerfiles for both frontend and backend.

## CI

GitHub Actions is configured to build the frontend and backend automatically on pushes and pull requests to the `main` branch.