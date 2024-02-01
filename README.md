# CRUD task-managment

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (Version 18.17.0 recommended)

## Setup

1. Clone the repository:
   git@github.com:DenysSergeev/CRUD-task-management.git

2. Switch to Node.js version 18.17.0 using [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm):
   `nvm use 18.17.0`

3. Create an `.env` file in the project root. Ask the repository owner for environment variables and use them in the `.env` file.

Example `.env` file:
`REACT_APP_API_HOST`
`REACT_APP_API_PORT`

## Running the Server

To start the server, run the following commands:

`npx json-server --watch db.json --port 3001`

# or

`json-server --watch db.json --port 3001`

## In the project directory, you can run:

`npm start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.
