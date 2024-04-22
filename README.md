# API for Personal Finance management

## Project Description

This is an chrome extension project with backend build with ExpressJS/NodeJS and database on MySql to manage, retrieve and fetch details of LinkedIn profiles.

## Table of Contents

- [Features](#features)
- [Development Features](#development-features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Routes](#api-routes)
- [API Response](#api-response)
- [Backend](#backend)
- [Database](#database)

## Features

- Open a list of LinkedIn profiles through its prompt
- Fetching details of LinkedIn profiles and post them to the database using the api

## Development Features

- Custom Error handling is done for errors
- Eslint is used for linting and for finding errors with standard rules
- Prettier is used for code formatting
- Lint-staged is used for running prettier and eslint on all changed files in each commit
- Husky is used to provide git hooks for pre-commit and pre-push
- Extension script is written in the script.js file for DOM manipulation, web scraping and API requests. 
- You can find scripts related to linting, formatting and database in the api/package.json

## Technologies Used

- Express.js
- Postgresql
- Node.js
- Sequelize

## Prerequisites

- Node.js [Installation Guide](https://nodejs.org/)

## Installation

### For Server

1. Clone the repository:

   ```bash
   git clone <REPO_URL>
   ```

2. Navigate to the project directory:

   ```bash
   cd ATG-POC2
   ```

3. Navigate to the server directory:

   ```bash
   cd api
   ```


4. Install dependencies for the server:

   ```bash
   npm install
   ```

5. Set up environment variables (a .env file is needed for this expressJS server, instructions provided in `Configuration`).

6. Start the server:

   In root directory:

   - To start the server using Nodemon

   ```bash
   npm run dev
   ```

   - To start the server without Nodemon

   ```bash
   npm start
   ```

7. Run migrations to create models (run migrations only after the server is started):

   ```bash
   npm run migrate
   ```

### For Extension

1. Go to the chrome manage extension tab and turn on the **developer mode**

2. Click on **Load unpacked** button at the top and select the **extensions** folder in the project folder

3. The extension (**LinkedIn Profile Extension**) should now be visible in the _All Extensions_. Reload the extension and Pin it to the toolbar (Details -> Pin to the Toolbar).

4. Click on the extensions icon and give the list of LinkedIn profile URLs (**comma separated**), For Example:

   ```
   https://www.linkedin.com/in/.../, https://www.linkedin.com/in/.../, https://www.linkedin.com/in/.../
   ```

5. Wait for few seconds so that the LinkedIn profile page loads, then it will show a pop with an appropriate message  

## Configuration

- Create a `.env` file in the root directory of the project with the content mentioned in the **.env.example** file:
- Fill the environment variables values

FOR EXAMPLE:

```.env
PORT=

# application deployment status
APP_ENV=

#database credentials
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_NAME=
```

> IMP:

- To setup the database locally, make a connection in you local mysql server and fill the credentials in the .env
- The server will automatically create a database with DB_NAME if it does not already exist.
- APP_ENV variable in the .env should be either **PRODUCTION** or **DEVELOPMENT**

## API Routes

### Profile

- **POST /api/profile**
  - Content-Type: _application/json_
  - Requirement: _none_
  - Description: To save the details of a LinkedIn profile in the database

## Backend

- Router are created for routing the request according to the API URL.
- All migrations are stored in the migrations directory
- Controllers are created for handling routes of these routers.

## Database

- MySql is used as a primary database for this project along with Sequelize as an ORM.
