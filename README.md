# Mango Test

This project is a take-home challenge for a frontend position, implemented using Next.js, TypeScript, CSS Modules, and testing with Jest and Cypress.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Testing](#testing)
  - [Unit Tests](#unit-tests)
  - [Integration Tests](#integration-tests)
  - [End-to-End (E2E) Tests](#end-to-end-e2e-tests)
- [APIs and Mock Data](#apis-and-mock-data)
- [Contact](#contact)

## Installation

To install the necessary dependencies, run the following command:

```bash
npm install
```

## Running the Project

To start the development server on port 8080, run:

```bash
npm run dev
```

The application should now be running at [http://localhost:8080](http://localhost:8080).

## Testing

### Unit Tests / Integration Tests

To run unit and integration tests with Jest, use the following command:

```bash
npm run test
```

To run tests in watch mode:

```bash
npm run test:watch
```

To generate a test coverage report:

```bash
npm run test:coverage
```

### End-to-End (E2E) Tests

End-to-end tests are also handled by Cypress. You can run the tests in headless mode using:

```bash
npm run cypress:open
```

## APIs and Mock Data

### API Endpoints

- `/minmax` - Returns min and max values for the NormalRange component.
- `/fixed` - Returns fixed range values for the FixedRange component.

### Mock Data

Mock data for testing is provided in the `cypress/fixtures` directory:

- `minmax.json` - Contains mock min and max values.
- `fixedRange.json` - Contains mock fixed range values.

### Mockable.io

This project uses [Mockable.io](https://www.mockable.io/) to provide mock API endpoints. The endpoints used in this project are:

- `http://demo3363325.mockable.io/minmax` - Returns min and max values.
- `http://demo3363325.mockable.io/fixed` - Returns fixed range values.
