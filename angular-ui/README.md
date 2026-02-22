# Angular UI

A modern web application built with Angular that serves as the frontend for the Angular Starter project. This application provides a user interface to interact with the Spring Boot REST API.

## Project Description

The Angular UI application provides a clean and responsive interface for viewing users and products data from the backend API. It demonstrates:

- Component-based architecture
- Reactive programming with RxJS
- HTTP client integration for API communication
- Routing and navigation
- Responsive design
- Unit testing with Jasmine and Karma

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## Setup Instructions

1. Navigate to the angular-ui directory:
   ```bash
   cd angular-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:4200/`

## How to Run the Application

### Development Server

To start a local development server with hot reloading:

```bash
ng serve
```

Or using the npm script:

```bash
npm start
```

The application will automatically reload whenever you modify any of the source files.

### Production Build

To build the project for production:

```bash
ng build
```

Or using the npm script:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Available Features and Navigation

The application consists of the following main features:

### Navigation

- **Home Page**: Landing page with overview information
- **Users Page**: Displays a list of users fetched from the API
- **Products Page**: Displays a list of products fetched from the API

### Navigation Structure

```
/ (Home)
├── /users (Users List)
└── /products (Products List)
```

### Components

- **AppComponent**: Root component with router outlet
- **NavComponent**: Navigation bar with links to different sections
- **HomeComponent**: Landing page component
- **UsersComponent**: Displays users data in a table format
- **ProductsComponent**: Displays products data in a table format

## How to Run Tests

### Unit Tests

To execute unit tests with the Karma test runner:

```bash
ng test
```

Or using the npm script:

```bash
npm test
```

This will run all unit tests and provide coverage reports.

### Test Coverage

To generate a test coverage report:

```bash
ng test --code-coverage
```

The coverage report will be generated in the `coverage/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/           # Application components
│   │   ├── home/            # Home component
│   │   ├── nav/             # Navigation component
│   │   ├── users/           # Users component
│   │   └── products/        # Products component
│   ├── models/              # TypeScript interfaces
│   │   ├── user.model.ts
│   │   └── product.model.ts
│   ├── services/            # Services for API communication
│   │   ├── user.service.ts
│   │   └── product.service.ts
│   ├── app.config.ts        # Application configuration
│   ├── app.routes.ts        # Application routing
│   ├── app.css              # Global styles
│   ├── app.html             # Root component template
│   └── app.ts               # Root component
├── index.html               # Main HTML file
├── main.ts                  # Application entry point
├── styles.css               # Global styles
└── test.ts                  # Test configuration
```

## API Integration

The application integrates with the Spring Boot API through:

- **User Service**: Communicates with `/api/users` endpoint
- **Product Service**: Communicates with `/api/products` endpoint
- **Proxy Configuration**: Configured in `proxy.conf.json` to forward API requests to the backend

## Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Configuration

### Proxy Configuration

The application uses a proxy configuration (`proxy.conf.json`) to forward API requests to the Spring Boot backend during development:

```json
{
  "/api/*": {
    "target": "http://localhost:8080",
    "secure": true,
    "changeOrigin": true
  }
}
```

### Angular Configuration

The application is configured in `angular.json` with:
- Build configurations for development and production
- Test configuration with Karma
- Default project settings

## Dependencies

Key dependencies include:
- @angular/core, @angular/common, @angular/platform-browser
- @angular/router for navigation
- @angular/forms for form handling
- RxJS for reactive programming
- TypeScript for type safety

For a complete list, see `package.json`.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
