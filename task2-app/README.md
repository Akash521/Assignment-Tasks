# Task 2

## Overview

This project is a Node.js application that includes models for `User`, `Project`, and `Timesheet`, along with CRUD API endpoints for each model. The application includes authentication to protect the endpoints, and it uses Sequelize for ORM with a MySQL database.

```bash
                +-----------+            +------------------+            +-------------------+
                |   Client   |            |   API Gateway    |            |   Auth Service    |
                |  (Postman  |----------->| (Routing Layer)  |<---------->| (JWT Validation   |
                |            |            |                  |            | & Token Issuance) |
                +-----------+            +--------+---------+            +---------+---------+
                                                       |                                |
                                                       |                                |
                                           +-----------+-----------+                    |
                                           |                       |                    |
                           +---------------v-----------+    +------v-----------+        |
                           |       Middleware           |    |  Timesheet       |       |
                           | (Logging, Auth, Validation)|    |  Project         |       |
                           |                           |    |  User Services    |       |
                           +--------------+------------+    +-------------------+       |
                                              |                                         |
                                              +------------------------------------------+
                                                               |
                                                               v
                                                           +-------+
                                                           |  DB    |
                                                           +-------+
```
## Features

- **Models**:
  - `User`: firstName, lastName, dateOfBirth, gender, email, password.
  - `Project`: name, department, startDate, endDate, status.
  - `Timesheet`: taskName, date, hours.
- **Relationships**:
  - Users can be assigned to multiple projects.
  - Each project can have multiple users.
  - Each user can log timesheets for multiple projects.
  - Each timesheet is linked to one user and one project.
- **API Endpoints**:
  - Create, Read, Update, Delete (CRUD) operations for each model.
  - Filtering for "Read all records" endpoint.
  - Authentication for accessing endpoints.

## Requirements

- **Node.js** (v18.18.0)
- **MySQL** (for the database)
- **npm** (Node Package Manager)

## Setup
### 1. Install MYSQL and create databse.

```bash
mysql -u root -p
create database TaskManagement;
```

### 1. Clone the Repository

```bash
git clone git@github.com:Akash521/Project-Task2.git
cd Project-Task2
```

### 2. Update Database Configuration in this file.
```bash
vm Project-Task2/task2-app/config/db.config.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
   "TaskManagement", //DB Name
    "root", //DB Username
    "", // DB Password
    {
        host: "127.0.0.1",
        dialect: 'mysql',
        port: 3306,
    }
);

module.exports = sequelize;
```
### 2. Run this project all tables will create by this project only.
```bash
npm start
```

# Auth Endpoints

```bash
Register user: POST /api/users/create

Request Body: { 
  "firstName": "John", 
  "lastName": "Doe", 
  "dateOfBirth": "1990-01-01", 
  "gender": "Male", 
  "email": "john.doe@example.com", 
  "password": "password" 
}

Login: POST /api/auth/login

Request Body: { 
  "email": "john.doe@example.com", 
  "password": "password" 
}
Response: { 
  "auth": true, 
  "token": "jwt_token" 
}

Logout: POST /api/logout
```

# User Endpoints
```bash
Create User: POST /api/users/create

Request Body: { 
  "firstName": "John", 
  "lastName": "Doe", 
  "dateOfBirth": "1990-01-01", 
  "gender": "Male", 
  "email": "john.doe@example.com", 
  "password": "password" 
}
Response: { 
  "id": 1, 
  "firstName": "John", 
  "lastName": "Doe", 
  ... 
}

Read User: GET /api/users/:id

Request Header: headers = {'x-access-token': 'jwt_token'}
Response: { 
  "id": 1, 
  "firstName": "John", 
  "lastName": "Doe", 
  ... 
}

Read All Users: GET /api/users

Request Header: headers = {'x-access-token': 'jwt_token'}
Query Parameters: firstName=John&gender=Male
Response: [ 
  { "id": 1, "firstName": "John", "lastName": "Doe", ... }, 
  ... 
]

Update User: POST /api/users/update

Request Body: { 
  "id": 1, 
  "firstName": "John", 
  "lastName": "Smith", 
  ... 
}
Response: { 
  "id": 1, 
  "firstName": "John", 
  "lastName": "Smith", 
  ... 
}

Delete User: POST /api/users/delete

Request Body: { 
  "id": 1 
}
Response: { 
  "message": "User deleted successfully" 
}
```

# Project Endpoints
```bash
Create Project: POST /api/projects/create

Request Header: headers = {'x-access-token': 'jwt_token'}
Request Body: { 
  "name": "Project A", 
  "department": "Engineering", 
  "startDate": "2024-01-01", 
  "endDate": "2024-12-31", 
  "status": "Active" 
}
Response: { 
  "id": 1, 
  "name": "Project A", 
  ... 
}

Read Project: GET /api/projects/:id

Request Header: headers = {'x-access-token': 'jwt_token'}
Response: { 
  "id": 1, 
  "name": "Project A", 
  ... 
}

Read All Projects: GET /api/projects

Request Header: headers = {'x-access-token': 'jwt_token'}
Response: [ 
  { "id": 1, "name": "Project A", ... }, 
  ... 
]

Update Project: POST /api/projects/update

Request Header: headers = {'x-access-token': 'jwt_token'}
Request Body: { 
  "id": 1, 
  "name": "Project A", 
  "status": "Completed", 
  ... 
}
Response: { 
  "id": 1, 
  "name": "Project A", 
  "status": "Completed", 
  ... 
}


User Assign to Project: POST /api/projects/assign

Request Header: headers = {'x-access-token': 'jwt_token'}
Request Body: {
  "userId": 2,
  "projectId": 2
}
Response: {
  "message": "User assigned to project"
}

Delete Project: POST /api/projects/delete

Request Header: headers = {'x-access-token': 'jwt_token'}
Request Body: { 
  "id": 1 
}
Response: { 
  "message": "Project deleted successfully" 
}
```
# Timesheet Endpoints
```bash
Create Timesheet: POST /api/timesheets/create

Request Header: headers = {'x-access-token': 'jwt_token'}
Request Body: { 
  "taskName": "Task 1", 
  "date": "2024-01-15", 
  "hours": 8, 
  "userId": 1, 
  "projectId": 1 
}
Response: { 
  "id": 1, 
  "taskName": "Task 1", 
  ... 
}

Read Timesheet: GET /api/timesheets/:id

Request Header: headers = {'x-access-token': 'jwt_token'}
Response: { 
  "id": 1, 
  "taskName": "Task 1", 
  ... 
}

Read All Timesheets: GET /api/timesheets

Request Header: headers = {'x-access-token': 'jwt_token'}
Response: [ 
  { "id": 1, "taskName": "Task 1", ... }, 
  ... 
]

Update Timesheet: POST /api/timesheets/update

Request Header: headers = {'x-access-token': 'jwt_token'}
Request Body: { 
  "id": 1, 
  "taskName": "Updated Task", 
  "hours": 6 
}
Response: { 
  "id": 1, 
  "taskName": "Updated Task", 
  "hours": 6 
}

Delete Timesheet: POST /api/timesheets/delete

Request Header: headers = {'x-access-token': 'jwt_token'}
Request Body: { 
  "id": 1 
}
Response: { 
  "message": "Timesheet deleted successfully" 
}
```