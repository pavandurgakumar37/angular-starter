# Angular Starter Project

A full-stack web application consisting of a Spring Boot REST API backend and an Angular frontend. This project demonstrates a typical client-server architecture with a clean separation of concerns.

## Project Structure

```
angular-starter/
├── spring-boot-api/          # Spring Boot REST API
│   ├── src/
│   │   ├── main/java/        # Java source code
│   │   └── test/java/        # Unit and integration tests
│   ├── pom.xml               # Maven configuration
│   └── README.md             # API documentation
│
└── angular-ui/               # Angular frontend application
    ├── src/
    │   ├── app/              # Angular application code
    │   └── ...               # Other Angular resources
    ├── package.json          # npm configuration
    └── README.md             # UI documentation
```

## Technology Stack

### Backend (Spring Boot API)
- **Java 17**
- **Spring Boot 3.2.5**
- **Maven** for dependency management
- **JUnit 5** for testing
- **Mockito** for mocking in tests

### Frontend (Angular UI)
- **Angular 21.1.0**
- **TypeScript** for type-safe JavaScript
- **Angular CLI** for development tooling
- **RxJS** for reactive programming
- **Karma & Jasmine** for testing

## Features

- RESTful API endpoints for users and products
- Responsive Angular UI with navigation
- Component-based architecture
- CORS configuration for cross-origin requests
- Comprehensive unit and integration tests
- Error handling and logging

## Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- npm or yarn

### Running the Application

1. **Start the Spring Boot API:**
   ```bash
   cd spring-boot-api
   mvn spring-boot:run
   ```
   The API will be available at `http://localhost:8080`

2. **Start the Angular UI:**
   ```bash
   cd angular-ui
   npm install
   npm start
   ```
   The UI will be available at `http://localhost:4200`

## API Endpoints

- **Users:** `GET /api/users` - Retrieves a list of users
- **Products:** `GET /api/products` - Retrieves a list of products

For detailed API documentation, see [spring-boot-api/README.md](spring-boot-api/README.md) and [spring-boot-api/API.md](spring-boot-api/API.md).

## Development

### Backend Development
- Navigate to `spring-boot-api`
- Run tests: `mvn test`
- Run the application: `mvn spring-boot:run`

### Frontend Development
- Navigate to `angular-ui`
- Install dependencies: `npm install`
- Run tests: `ng test`
- Start development server: `ng serve`

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License.