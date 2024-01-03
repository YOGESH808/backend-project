# RESTful API for Note Management

## Overview

This project is a secure and scalable RESTful API for note management. Users can create, read, update, and delete notes. Additionally, users can share their notes with others and search for notes based on keywords.

## Table of Contents

- [Technical Stack](#technical-stack)
- [API Endpoints](#api-endpoints)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Security Measures](#security-measures)
- [Performance Optimization](#performance-optimization)
- [Testing Strategy](#testing-strategy)
- [Contribution](#contribution)
- [License](#license)

## Technical Stack

- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) 
- **Authentication Protocol:** [JSON Web Tokens (JWT)](https://jwt.io/)
- **Rate Limiting/Throttling:** Implemented using express-rate-limit
- **Text Indexing:** Utilized [MongoDB text indexing](https://docs.mongodb.com/manual/text-search/) for efficient search
- **Testing Framework:** [Jest](https://jestjs.io/)

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/signup`: Create a new user account.
- `POST /api/auth/login`: Log in to an existing user account and receive an access token.

### Note Endpoints

- `GET /api/notes`: Get a list of all notes for the authenticated user.
- `GET /api/notes/:id`: Get a note by ID for the authenticated user.
- `POST /api/notes`: Create a new note for the authenticated user.
- `PUT /api/notes/:id`: Update an existing note by ID for the authenticated user.
- `DELETE /api/notes/:id`: Delete a note by ID for the authenticated user.
- `POST /api/notes/:id/share`: Share a note with another user for the authenticated user.
- `GET /api/search?q=:query`: Search for notes based on keywords for the authenticated user.

## Setup and Installation

1. Clone the repository: `git clone https://github.com/yourusername/your-repo.git`
2. Install dependencies: `npm install`

## Running the Application

1. Set up the environment variables .
    - PORT=your_port
    - SECRET_KEY=your_secret_key
    - MONGODB_URI=your_mongodb_url
3. Start the server: `npm run start`
4. The API will be accessible at `http://localhost:3000` (or your specified port).

## Running Tests

Execute the following command to run tests:

```bash
npm test
```

## Project Structure

The project follows a modular structure:

- `src/`: Contains the source code of the application.
  - `controllers/`: Handles the business logic for each endpoint.
  - `middlewares/`: Includes middleware functions, such as authentication and rate limiting.
  - `models/`: Defines the data models for MongoDB.
  - `routes/`: Defines the API routes and connects them to the controllers.
  - `tests/`: Holds the unit and integration tests for the application.
- `packages.json`: Includes all pacakges required for the application.


## Security Measures

The following security measures have been implemented:

- **Authentication:** Utilizes JSON Web Tokens (JWT) for secure user authentication.
- **Authorization:** Ensures that only authenticated users have access to specific endpoints.
- **Rate Limiting/Throttling:** Implements rate limiting middleware to prevent abuse and handle high traffic.
- **Secure Database Access:** Connects to the MongoDB database using secure connection strings.
- **Environment Variables:** Sensitive information such as secret keys and database credentials are stored in environment variables.

## Performance Optimization

To optimize performance, the following strategies have been employed:

- **Rate Limiting and Throttling:** Prevents abuse and ensures fair usage of resources.
- **Text Indexing:** Utilizes MongoDB text indexing for efficient keyword-based note searches.

## Testing Strategy

The testing strategy encompasses integration tests, and end-to-end tests for all endpoints. Jest is used as the testing framework.

## Contribution

Contributions are welcome! If you find any issues or have suggestions for improvements, please [open an issue](https://github.com/yourusername/your-repo/issues) or [submit a pull request](https://github.com/yourusername/your-repo/pulls).

## License

This project is licensed under the [MIT License](LICENSE).
