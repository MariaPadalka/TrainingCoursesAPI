# TrainingCoursesAPI

## Project Description

TrainingCoursesAPI is a REST API designed to manage course-related data, including groups, teachers, subjects, and loads. It provides functionality for CRUD operations on these entities and supports role-based access control for administrators and teachers.

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **bcryptjs**: A library for hashing passwords.
- **dotenv**: Loads environment variables from a `.env` file.
- **nodemon**: Monitors for file changes and restarts the server automatically.
- **prettier**: An opinionated code formatter.
- **eslint**: A tool for identifying and fixing problems in JavaScript code.
- **jsonwebtoken**: A library for JSON Web Tokens (JWT) for secure authentication.
- **nodemailer**: A module for sending emails (after user creation it is used to send generated password).
- **winston**: One of the best and most widely used Node.js logging modules.

## Documentation

The API documentation is maintained using Swagger. It provides details on available endpoints, request and response formats, and usage examples.


https://github.com/user-attachments/assets/1da0c350-3b07-4801-9eef-7d8b4250f89d


## Prerequisites

Before you start, ensure you have the following installed:

- Node.js
- npm or yarn
- MongoDB

## Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/MariaPadalka/TrainingCoursesAPI.git
    cd TrainingCoursesAPI
    ```

2. **Rename and configure the environment file**

    Rename the `.env.dist` file to `.env` and configure the following variables:

    ```env
    # Server configuration
    URL=localhost
    PORT=
    MONGODB_URI=
    MONGODB_NAME=

    CLIENT_URL=localhost
    CLIENT_PORT=

    # SMTP configuration for mail service
    SMTP_HOST=
    SMTP_PORT=
    SMTP_USER=
    SMTP_PASSWORD=
    SMTP_SECURE=

    # Other configurations
    ACCESS_TOKEN_SECRET=
    ACCESS_TOKEN_EXPIRATION=
    REFRESH_TOKEN_SECRET=
    REFRESH_TOKEN_EXPIRATION=

    NODE_ENV=
    ```

3. **Install dependencies**

    ```bash
    npm install
    ```

## Scripts

- **Start the server**: 

    ```bash
    npm start
    ```

- **Start the server in development mode**:

    ```bash
    npm run dev
    ```

- **Run linter**:

    ```bash
    npm run lint
    ```

- **Fix linter issues**:

    ```bash
    npm run lint:fix
    ```

- **Format code with Prettier**:

    ```bash
    npm run prettier
    ```

- **Check code formatting with Prettier**:

    ```bash
    npm run prettier:check
    ```

- **Seed the database**:

    ```bash
    npm run seed
    ```

## Contributing

Feel free to submit pull requests or open issues if you encounter any problems or have suggestions for improvements.
