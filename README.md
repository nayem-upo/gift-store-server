# Gift Shop Management Dashboard server

![Project Logo](https://i.ibb.co/THP8MW2/Add-a-heading.png)

## Overview

This project is the backend server that powers the Gift Shop Management application. It is built with Node.js, Express, and MongoDB, providing the necessary APIs for managing data, authentication, and more.

### Live Demo

Check out the live demo [here](https://gift-shop-management-server-psi.vercel.app).

This server is typically meant to run in a development or production environment so you have to set required environment variables to run the server application.

## Features

- **Express Server:** Utilizes the Express framework to handle HTTP requests and routing.
- **MongoDB Integration:** Uses MongoDB through Mongoose for efficient data storage and retrieval.
- **Authentication:** Implements JWT-based authentication for securing API endpoints.
- **Error Handling:** Provides consistent HTTP status codes and error handling using the http-status library.
- **Linting and Formatting:** Includes ESLint, Prettier, and Husky for code linting and formatting.

## Technology Used

- **Node.js:** A JavaScript runtime for building scalable network applications.
- **Express:** A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB:** A NoSQL database for efficient data storage.
- **Mongoose:** An elegant MongoDB object modeling tool for Node.js.
- **JWT (JSON Web Tokens):** A standard for securely transmitting information between parties.
- **Other Libraries:** Bcrypt, Body Parser, Cors, Dotenv, Http-Status, Moment, Query String, and Zod.


## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) (Ensure MongoDB server is running)

## Getting Started

### 1. Clone the repository:

```bash
git clone https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-server-side-nayem-upo.git

```

### 2. Navigate to the project directory:
```bash 
cd gift-shop-management-server
```

### 3. Install dependencies:
```bash 
npm install
```

### 4. Set up the environment variables:
Create a .env file in the root of the project and add the following:
```bash 

PORT = 5000
NODE_ENV = development
BCRYPT_SALT_ROUNDS = 12
DATABASE_URL = mongodb://localhost:27017/your-database
JTW_ACCESS_SECRET = your access secret
JTW_REFRESH_SECRET = your refresh secret
JWT_ACCESS_EXPIRES_IN = 2h
JWT_REFRESH_EXPIRES_IN = 7d

```

### 4. Run the application:
```bash 
ts-node-dev --respawn --transpile-only src/server.ts
```
OR
```bash 
npm run start:dev
```
The application will be running at http://localhost:5000 by default. You can access it through your web browser.


## About API Endpoints:

### Authentication:

- **POST /api/auth/register**  
  User Registration

- **GET /api/auth/login**  
  User Login

- **POST /api/auth/change-password**  
  Change Password (Requires JWT, User Authentication)

### Gifts:

- **POST /api/gifts**  
  Create a Gift (Requires JWT, User Authentication)

- **GET /api/gifts**  
  Get All Gifts (Requires JWT)

- **GET /api/gifts/:giftId**  
  Get Single Gift (Requires JWT)

- **DELETE /api/gifts/bulk-delete**  
  Delete Multiple Gifts (Requires JWT)

- **PUT /api/gifts/:giftId**  
  Update a Gift (Requires JWT, User Authentication)

- **DELETE /api/gifts/:giftId**  
  Delete a Gift (Requires JWT, User Authentication)

### Sales History:

- **POST /api/history**  
  Create a Sales History (Requires JWT, User Authentication)

- **GET /api/history**  
  Get Sales Histories (Requires JWT, User Authentication)
