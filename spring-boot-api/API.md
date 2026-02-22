# API Documentation

This document provides detailed specifications for the REST API endpoints provided by the Spring Boot application.

## Base URL

```
http://localhost:8080
```

## Content Type

All requests and responses use JSON content type:

```
Content-Type: application/json
```

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

## Endpoints

### 1. Users API

#### Get All Users

Retrieves a list of all users in the system.

- **Endpoint:** `/api/users`
- **Method:** `GET`
- **Description:** Fetches all available users
- **Authentication:** None required

#### Request

No request body or parameters required.

#### Response

**Success Response (200 OK)**

Returns an array of user objects:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-0101"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "+1-555-0102"
  },
  {
    "id": 3,
    "name": "Bob Johnson",
    "email": "bob.johnson@example.com",
    "phone": "+1-555-0103"
  },
  {
    "id": 4,
    "name": "Alice Brown",
    "email": "alice.brown@example.com",
    "phone": "+1-555-0104"
  },
  {
    "id": 5,
    "name": "Charlie Wilson",
    "email": "charlie.wilson@example.com",
    "phone": "+1-555-0105"
  }
]
```

**Error Response (500 Internal Server Error)**

If an unexpected error occurs:

```json
{
  "timestamp": "2023-11-15T10:30:45.123+00:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Error occurred while fetching users",
  "path": "/api/users"
}
```

#### User Object Schema

| Field | Type | Description |
|-------|------|-------------|
| id | Long | Unique identifier for the user |
| name | String | Full name of the user |
| email | String | Email address of the user |
| phone | String | Phone number of the user |

### 2. Products API

#### Get All Products

Retrieves a list of all products in the system.

- **Endpoint:** `/api/products`
- **Method:** `GET`
- **Description:** Fetches all available products
- **Authentication:** None required

#### Request

No request body or parameters required.

#### Response

**Success Response (200 OK)**

Returns an array of product objects:

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM and 512GB SSD",
    "price": 1299.99
  },
  {
    "id": 2,
    "name": "Smartphone",
    "description": "Latest smartphone with 5G connectivity and 128GB storage",
    "price": 899.99
  },
  {
    "id": 3,
    "name": "Headphones",
    "description": "Wireless noise-cancelling headphones with 30-hour battery life",
    "price": 249.99
  },
  {
    "id": 4,
    "name": "Smartwatch",
    "description": "Fitness tracking smartwatch with heart rate monitor",
    "price": 199.99
  },
  {
    "id": 5,
    "name": "Tablet",
    "description": "10-inch tablet with stylus support and 64GB storage",
    "price": 449.99
  }
]
```

**Error Response (500 Internal Server Error)**

If an unexpected error occurs:

```json
{
  "timestamp": "2023-11-15T10:30:45.123+00:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Error occurred while fetching products",
  "path": "/api/products"
}
```

#### Product Object Schema

| Field | Type | Description |
|-------|------|-------------|
| id | Long | Unique identifier for the product |
| name | String | Name of the product |
| description | String | Detailed description of the product |
| price | Double | Price of the product |

## HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 OK | Request was successful |
| 500 Internal Server Error | Server encountered an unexpected error |

## Error Response Format

All error responses follow a consistent format:

```json
{
  "timestamp": "2023-11-15T10:30:45.123+00:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Error description",
  "path": "/api/endpoint"
}
```

| Field | Type | Description |
|-------|------|-------------|
| timestamp | String | Timestamp of when the error occurred |
| status | Integer | HTTP status code |
| error | String | HTTP status description |
| message | String | Detailed error message |
| path | String | API endpoint that caused the error |

## CORS Headers

The API includes CORS headers to support cross-origin requests:

```
Access-Control-Allow-Origin: http://localhost:4200
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 3600
```

## Rate Limiting

Currently, there is no rate limiting implemented on the API endpoints.

## Pagination

The current implementation returns all records without pagination. Future versions may implement pagination for large datasets.

## Versioning

The current API version is v1. Future versions may include versioning in the URL path (e.g., `/api/v1/users`).