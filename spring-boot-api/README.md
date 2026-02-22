# Spring Boot REST API

A simple REST API built with Spring Boot that provides endpoints for managing users and products. This API serves as the backend for the Angular UI application.

## Project Description

This Spring Boot application demonstrates a RESTful API with the following features:
- User management endpoints
- Product management endpoints
- CORS configuration for cross-origin requests
- Global exception handling
- Comprehensive logging
- Unit and integration tests

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd angular-starter/spring-boot-api
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080`

## How to Run the Application

### Using Maven

```bash
mvn spring-boot:run
```

### Using the JAR file

1. Build the JAR:
   ```bash
   mvn clean package
   ```

2. Run the JAR:
   ```bash
   java -jar target/demo-0.0.1-SNAPSHOT.jar
   ```

## API Endpoints

### Users Endpoint

- **URL:** `/api/users`
- **Method:** GET
- **Description:** Retrieves a list of all users

**Sample Response:**
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
  }
]
```

### Products Endpoint

- **URL:** `/api/products`
- **Method:** GET
- **Description:** Retrieves a list of all products

**Sample Response:**
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
  }
]
```

For detailed API documentation, see [API.md](API.md).

## How to Run Tests

### Run All Tests

```bash
mvn test
```

### Run Only Unit Tests

```bash
mvn test -Dtest="*Test"
```

### Run Only Integration Tests

```bash
mvn test -Dtest="*IntegrationTest"
```

### Generate Test Coverage Report

```bash
mvn jacoco:report
```

The report will be generated in `target/site/jacoco/index.html`

## Project Structure

```
src/
├── main/
│   ├── java/com/example/demo/
│   │   ├── controller/          # REST controllers
│   │   │   ├── UserController.java
│   │   │   └── ProductController.java
│   │   ├── model/               # Entity classes
│   │   │   ├── User.java
│   │   │   └── Product.java
│   │   ├── config/              # Configuration classes
│   │   │   ├── CorsConfig.java
│   │   │   └── GlobalExceptionHandler.java
│   │   └── DemoApplication.java # Main application class
│   └── resources/
│       └── application.properties # Application configuration
└── test/
    └── java/com/example/demo/
        └── controller/          # Test classes
            ├── UserControllerTest.java
            ├── ProductControllerTest.java
            ├── UserControllerIntegrationTest.java
            └── ProductControllerIntegrationTest.java
```

## Configuration

The application configuration is stored in `src/main/resources/application.properties`:

```properties
server.port=8080
spring.application.name=demo
```

## Logging

The application uses SLF4J with Logback for logging. Logs are configured to output to the console with the following format:
- Timestamp
- Log level
- Logger name
- Message

## Error Handling

The application includes a global exception handler (`GlobalExceptionHandler`) that:
- Catches and logs exceptions
- Returns appropriate HTTP status codes
- Provides consistent error response format

## CORS Configuration

The application is configured to allow Cross-Origin Resource Sharing (CORS) from `http://localhost:4200` to facilitate development with the Angular frontend.

## Dependencies

Key dependencies include:
- Spring Boot Starter Web
- Spring Boot Starter Test
- Jackson Databind
- JUnit Jupiter
- Mockito

For a complete list, see `pom.xml`.