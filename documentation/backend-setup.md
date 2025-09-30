# Backend Setup Guide for LifeEase

This guide explains how to set up and run the backend server for the LifeEase project. It's written for complete beginners – think of it like a recipe for building a simple web server that stores data.

## What Did We Do?

We created a "backend" for your app. The backend is like the behind-the-scenes brain that stores and handles data (e.g., user info). We're using:
- **FastAPI**: A tool to build fast web APIs (the parts your app talks to for data).
- **SQLite**: A simple database to store data in a file (no need for a big database server).
- **SQLAlchemy**: Helps FastAPI talk to the database easily.

Everything is in the `server/` folder. You need Python installed on your computer (most people have it).

## Step-by-Step: What's in the Server Folder?

1. **server/venv/**: This is a "virtual environment" – like a sandbox for Python stuff specific to this project. It keeps projects separate so they don't mess each other up.
   - We installed tools here: FastAPI, Uvicorn (to run the server), SQLAlchemy (for database), Pydantic (for data handling).

2. **server/database.py**: Sets up the connection to your database.
   - It uses a file called `lifeease.db` (created automatically when you run the server).
   - SQLite is easy because it's just a file – no setup needed.

3. **server/models.py**: Defines what your data looks like.
   - Right now, it has a "User" model: stores an ID (auto-generated), name, and email.
   - Emails must be unique (can't have two users with the same email).

4. **server/main.py**: The heart of the server!
   - Creates the FastAPI app.
   - Automatically makes the database table when you start the server.
   - Has two simple endpoints (web addresses your app can call):
     - **POST /users/**: Add a new user. Send name and email; it checks if email exists.
     - **GET /users/**: Get a list of all users.

## How to Run the Server (Like Starting a Game)

1. Open your terminal (on Mac: search for "Terminal").
2. Go to the project folder: `cd "/Users/lesterdannlopez/Desktop/Dann Folder/MyProjects/LifeEase"`
3. Activate the virtual environment: `cd server && source venv/bin/activate`
4. Run the server: `uvicorn main:app --reload`
   - This starts the server on http://localhost:8000.
   - `--reload`: Auto-restarts if you change code (handy for development).
5. Open your browser and go to http://localhost:8000/docs – it's an automatic guide! There you can test adding users or viewing them.

## Example: Adding a User

- Use the /docs page: Click "POST /users/", then "Try it out".
- Enter: `{"name": "John Doe", "email": "john@example.com"}`
- Click "Execute" – if it works, you'll see the new user with an ID.

## Example: Viewing Users

- Go to /docs, find "GET /users/", click "Try it out" and "Execute".
- It lists all users in JSON format.

## Stopping the Server

- Press Ctrl+C in the terminal.

## What's Next?

- Add more models (e.g., for tasks in LifeEase) in models.py.
- Add more endpoints in main.py (e.g., update or delete users).
- Your frontend (UI/ folder) can now connect to this server using something like Axios to send requests.
- If you make changes, restart the server.

If something breaks, check the terminal for errors or ask for help. Happy coding! 🚀
