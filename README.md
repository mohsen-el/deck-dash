# Deck Dash

Deck Dash is a minimalistic web application for creating and managing flashcards to improve learning and memory retention.

## Table of Contents
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Clone the Repository](#clone-the-repository)
  - [Set Up the Backend](#set-up-the-backend)
  - [Set Up the Frontend](#set-up-the-frontend)
- [Built With](#built-with)

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing.

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Installation

### Clone the Repository
Clone the repository and navigate into the project directory:
```
git clone https://github.com/mohsen-el/deck-dash.git
cd deck-dash
```

## Set Up the Backend
Navigate to the `server` folder to set up and run the backend server.
### 1. Install Dependencies
```
npm install
```
### 2. Configure Database Connection
* Open the `db.js` file.
* Replace the database password placeholder with your own PostgreSQL database password.

### 3. Set Up JWT Key
* Open the `index.js` file.
* Replace `JWT_Key` with a secure key of your choice for JSON Web Token (JWT) authentication.

### 4. Run the server
```
node index.js
```

## Set Up the Frontend
Navigate to the `client` folder to install dependencies and run the frontend locally.
### 1. Installing dependinces
```
npm install
```

### 2. Run the Frontend Locally
```
npm run dev
```

Your application should now be running locally! Visit `http://localhost:5173` (or the specified port) to view the app.

## Built With

* [React](https://react.dev/) - Front-end framework used
* [Node](https://nodejs.org/en) - Back-end run time enviroment
* [npm](https://www.npmjs.com/) - Libraries management
* [Express](https://expressjs.com/) - Server management
* [PostgreSQL](https://www.postgresql.org/) - Database management
* [Tailwind](https://tailwindcss.com/) - Styling
* [Framer Motion](https://www.framer.com/motion/) - Animation




