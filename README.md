# Task Management Application - Server Side

## Overview

This project is the **server-side** of a **Task Management Application**, where users can add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into three sections: **To-Do**, **In Progress**, and **Done**. Any changes made to tasks will be instantly saved to the database to ensure persistence.

The application features a clean, minimalistic UI and is fully responsive, ensuring compatibility for both desktop and mobile users. This project will showcase your skills in:

- Frontend interactivity and drag-and-drop functionality
- Backend data management with real-time synchronization
- Structured design system integration

## Features

- **Task Management:** Users can create, update, and delete tasks.
- **Categories:** Tasks are divided into **To-Do**, **In Progress**, and **Done**.
- **Real-Time Sync:** Changes to tasks are updated instantly via **WebSockets**.
- **Persistence:** Task data is saved in a **MongoDB** database.
- **Responsive UI:** Designed to work seamlessly on both **desktop** and **mobile**.

## Technologies

- **Backend:** Express.js
- **Database:** MongoDB
- **Real-Time Sync:** WebSockets using Socket.IO
- **Environment Variables:** dotenv

## Dependencies

The following packages are used in the project:

- **`cors`**: A package to enable Cross-Origin Resource Sharing.
- **`dotenv`**: Loads environment variables from a `.env` file into `process.env`.
- **`express`**: Web framework for Node.js.
- **`mongodb`**: MongoDB driver for database interactions.
- **`socket.io`**: Enables real-time bidirectional event-based communication.
- **`ws`**: WebSocket library for real-time communication.

## Installation

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project folder:

    ```bash
    cd server
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Set up the environment variables by creating a `.env` file in the root directory and add your MongoDB connection string and other necessary configurations.

    Example:
    ```env
    MONGODB_URI=your_mongo_connection_url
    ```

5. Start the server:

    ```bash
    npm start
    ```

The server should now be running, and the application will be ready to interact with the client-side.


