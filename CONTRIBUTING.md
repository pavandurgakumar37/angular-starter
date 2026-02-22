# Contributing to Angular Starter Project

Thank you for your interest in contributing to the Angular Starter Project! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

Before contributing, ensure you have the following installed:

- Java 17 or higher
- Maven 3.6 or higher
- Node.js 18 or higher
- npm or yarn package manager
- Git

### Setting Up the Development Environment

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/angular-starter.git
   cd angular-starter
   ```

3. Add the original repository as a remote:
   ```bash
   git remote add upstream https://github.com/original-owner/angular-starter.git
   ```

4. Set up the Spring Boot API:
   ```bash
   cd spring-boot-api
   mvn clean install
   ```

5. Set up the Angular UI:
   ```bash
   cd ../angular-ui
   npm install
   ```

## How to Contribute

### Reporting Bugs

If you find a bug, please:

1. Check if the issue has already been reported
2. Create a new issue with a descriptive title
3. Provide detailed information about:
   - The environment (OS, browser, versions)
   - Steps to reproduce the issue
   - Expected behavior
   - Actual behavior
   - Any error messages or screenshots

### Suggesting Enhancements

To suggest an enhancement:

1. Check if the enhancement has already been suggested
2. Create a new issue with a descriptive title
3. Provide a clear description of the enhancement
4. Explain why this enhancement would be valuable
5. Consider providing implementation suggestions

### Submitting Changes

#### Branch Naming

Use descriptive branch names that follow this pattern:

- For bug fixes: `bugfix/description-of-fix`
- For new features: `feature/description-of-feature`
- For documentation: `docs/description-of-change`

#### Making Changes

1. Create a new branch from the main branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the coding standards below

3. Test your changes thoroughly:
   - Run all tests for both backend and frontend
   - Ensure the application builds successfully
   - Test the functionality manually

4. Commit your changes with descriptive commit messages:
   ```bash
   git commit -m "feat: add user authentication feature"
   ```

5. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a pull request to the main branch

## Coding Standards

### Backend (Spring Boot)

- Follow Java naming conventions
- Use meaningful variable and method names
- Keep methods small and focused
- Add appropriate Javadoc comments
- Write unit tests for new functionality
- Use proper exception handling
- Follow Spring Boot best practices

### Frontend (Angular)

- Follow Angular style guide
- Use TypeScript for type safety
- Use meaningful component, service, and variable names
- Keep components small and focused
- Use proper Angular lifecycle hooks
- Write unit tests for new components and services
- Follow Angular best practices

### General

- Write clear, concise code
- Add comments for complex logic
- Remove unused code and imports
- Format code consistently
- Use meaningful commit messages

## Testing

### Backend Testing

- Run all tests before submitting:
  ```bash
  cd spring-boot-api
  mvn test
  ```

- Write unit tests for new functionality
- Write integration tests for API endpoints
- Ensure test coverage is maintained or improved

### Frontend Testing

- Run all tests before submitting:
  ```bash
  cd angular-ui
  ng test
  ```

- Write unit tests for new components and services
- Ensure test coverage is maintained or improved
- Test the application manually in the browser

## Documentation

- Update documentation for any new features
- Update API documentation for endpoint changes
- Update README files if necessary
- Add inline code comments for complex logic

## Pull Request Process

1. Ensure your code follows the coding standards
2. Ensure all tests pass
3. Update documentation as needed
4. Create a pull request with:
   - Clear title describing the change
   - Detailed description of the change
   - Reference to any related issues
   - Screenshots if the change affects the UI

5. Respond to code review feedback in a timely manner
6. Make requested changes if necessary

## Release Process

Releases are managed by the project maintainers. The process typically involves:

1. Reviewing and merging pull requests
2. Updating version numbers
3. Creating release notes
4. Tagging the release
5. Publishing the release

## Community

- Join our discussions for questions and ideas
- Help others by answering questions
- Share your experiences and suggestions
- Participate in code reviews

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

## Questions?

If you have any questions about contributing, please:

1. Check existing documentation
2. Search for similar issues or discussions
3. Create a new issue with the "question" label

Thank you for contributing to the Angular Starter Project!