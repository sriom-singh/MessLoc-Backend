# Mess Management REST API

A simple RESTful API built with **Node.js** and **Express.js** for managing mess (hostel dining) information. This project demonstrates CRUD operations, search functionality, and REST API design principles using in-memory data storage.

---

## Features

* Get all messes
* Get a single mess by ID
* Add a new mess
* Update an existing mess
* Delete a mess
* Search messes by name, city, state, or food type
* JSON request/response handling
* CORS enabled

---

## Tech Stack

* Node.js
* Express.js
* CORS

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the project

```bash
cd mess-management-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
npm start
```

or

```bash
node server.js
```

The server will start on:

```
http://localhost:3000
```

---

# API Endpoints

## 1. Get All Messes

**GET**

```
/messes
```

Returns all available messes.

---

## 2. Get Mess by ID

**GET**

```
/messes/:id
```

Example

```
GET /messes/1
```

---

## 3. Add a New Mess

**POST**

```
/messes
```

### Request Body

```json
{
  "name": "ABC Mess",
  "city": "Delhi",
  "state": "Delhi",
  "pinCode": "110001",
  "address": "Sector 15",
  "foodType": "Vegetarian",
  "pricePerMonth": 5500,
  "imageUrl": "https://example.com/image.jpg",
  "rating": 4.6,
  "location": {
    "latitude": 28.61,
    "longitude": 77.20
  }
}
```

---

## 4. Update a Mess

**PUT**

```
/messes/:id
```

Example

```
PUT /messes/1
```

### Request Body

```json
{
  "name": "Updated Mess",
  "pricePerMonth": 6000,
  "rating": 4.8
}
```

---

## 5. Delete a Mess

**DELETE**

```
/messes/:id
```

Example

```
DELETE /messes/2
```

---

## 6. Search Messes

**GET**

```
/messes/search?q=<keyword>
```

Examples

```
GET /messes/search?q=dehradun
```

```
GET /messes/search?q=vegetarian
```

Search is performed on:

* Name
* City
* State
* Food Type

---

# Sample Response

```json
{
  "id": 1,
  "name": "Mess 1",
  "city": "Dehradun",
  "state": "Uttarakhand",
  "pinCode": "248002",
  "address": "123 Main Street",
  "foodType": "Vegetarian",
  "pricePerMonth": 5000,
  "imageUrl": "https://example.com/mess1.jpg",
  "rating": 4.5,
  "location": {
    "latitude": 30.3165,
    "longitude": 78.0322
  }
}
```

---

# Project Structure

```
.
├── app.js
├── server.js
├── package.json
└── README.md
```

---

# Notes

* This project uses **in-memory storage**.
* Data will be reset whenever the server restarts.
* No database is used in this version.

---

# Future Improvements

* MongoDB/PostgreSQL integration
* Authentication & Authorization
* Request validation
* Pagination
* Sorting and filtering
* Error handling middleware
* Swagger/OpenAPI documentation
* Unit and integration testing

---

# Author

**Sri Om Sharan**
