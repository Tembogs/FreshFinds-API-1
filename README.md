

# FreshFinds API

## Overview

FreshFinds API is a backend service powering the **FreshFinds e-commerce platform**.
It provides secure RESTful endpoints for user authentication, product management, orders, and administrative operations.

The API is built using **Node.js**, **Express**, and **MongoDB**, following modern backend development practices.

---

## Features

* User Authentication (Register / Login)
* JWT-based Authorization
* Product Management
* Shopping Cart System
* Order Processing
* Admin Dashboard APIs
* Role-based access control
* Secure password hashing using bcrypt
* RESTful API structure
* Unit testing with Jest

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Jest

---

## Project Structure

```
FreshFinds-API
│
├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── middleware
│   └── config
│
├── test
│
├── package.json
├── jest.config.js
└── .gitignore
```

---

## Installation

Clone the repository:

```
git clone https://github.com/doyinsola-coder/FreshFinds-API.git
```

Navigate into the project:

```
cd FreshFinds-API
```

Install dependencies:

```
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## Running the Server

Development mode:

```
npm run dev
```

Production mode:

```
npm start
```

---

## API Endpoints (Example)

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Products

```
GET /api/products
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

### Orders

```
POST /api/orders
GET /api/orders
```

---

## Testing

Run tests using:

```
npm test
```

---

## Future Improvements

* Payment gateway integration (Flutterwave)
* Email notifications
* Inventory tracking
* Analytics dashboard

---

## Author

**Mubeen Doyinsola Abdulateef**
Full Stack Developer

GitHub: [https://github.com/doyinsola-coder](https://github.com/doyinsola-coder)
