# 4. Deployment and Local Setup

This section details how to set up and run the LifeEase application locally, covering both the frontend (React Native with Expo) and the backend (FastAPI). It also outlines the environment and runtime commands for the backend.

## 4.1 Frontend Setup (React Native / Expo)

The frontend is an Expo-based React Native application.

### 4.1.1 Prerequisites

*   Node.js and npm/yarn (recommended to use npm) installed.
*   Expo CLI installed globally (`npm install -g expo-cli`).
*   A physical device or emulator with the Expo Go app installed for testing.

### 4.1.2 Installation and Running

1.  **Navigate to the UI directory:**
    ```bash
    cd UI
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the Expo development server:**
    ```bash
    npm start
    ```
    This will open a new tab in your browser with the Expo DevTools and display a QR code in your terminal. You can scan this QR code with the Expo Go app on your device/emulator to run the application.

## 4.2 Backend Setup (FastAPI)

The backend is a FastAPI application.

### 4.2.1 Prerequisites

*   Python 3.7+ installed.
*   `pip` (Python package installer) installed.
*   A virtual environment is recommended to manage dependencies.

### 4.2.2 Installation and Running

1.  **Navigate to the project root directory:**
    ```bash
    cd LifeEase/  # If not already in the root
    ```
2.  **Create and activate a virtual environment (if not already done):**
    ```bash
    python3 -m venv server/venv
    source server/venv/bin/activate
    ```
3.  **Install backend dependencies:**
    ```bash
    pip install -r server/requirements.txt
    ```
    The `server/requirements.txt` file specifies the necessary packages:
    *   `fastapi`: Web framework for building the API.
    *   `uvicorn`: ASGI server to run the FastAPI application.
    *   `sqlalchemy`: Python SQL toolkit and Object-Relational Mapper.
    *   `pydantic`: For data validation and settings management.

4.  **Run the FastAPI server:**
    The project includes a convenience script `start_server.sh` to start the backend:
    ```bash
    ./start_server.sh
    ```
    Alternatively, you can manually run the server if the virtual environment is active:
    ```bash
    uvicorn server.main:app --host 0.0.0.0 --reload
    ```
    *   `server.main:app`: Specifies that the FastAPI application instance named `app` is within the `main.py` module inside the `server` package.
    *   `--host 0.0.0.0`: Makes the server accessible from any IP address the host machine has, which is necessary for the mobile frontend to connect.
    *   `--reload`: Enables auto-reloading of the server when code changes are detected, useful for development.

    The backend server will typically run on `http://0.0.0.0:8000`.

## 4.3 Database Initialization

The SQLite database (`lifeease.db`) will be automatically created in the `LifeEase` directory when the FastAPI application starts for the first time, as configured in `server/database.py` and managed by `models.Base.metadata.create_all(bind=engine)` in `server/main.py`.

## 4.4 Deployment Considerations

For production deployment, consider the following:

*   **Environment Variables:** Replace hardcoded `BASE_URL` in `UI/src/config/apiConfig.js` with environment variables. Configure backend database connection strings securely using environment variables.
*   **Database:** Migrate from SQLite to a more robust, production-ready database like PostgreSQL or MySQL.
*   **Hosting:** Deploy the FastAPI backend on a cloud platform (e.g., AWS EC2, Google Cloud Run, Azure App Service) and the React Native frontend to app stores (Apple App Store, Google Play Store) or an Expo hosting solution.
*   **Security:** Implement user authentication, authorization, input validation, and secure communication (HTTPS). The current CORS configuration (`allow_origins=["*"]`) should be restricted to known frontend origins.
*   **Performance:** Optimize API endpoints, implement caching, and consider using a production-grade ASGI server like Gunicorn with Uvicorn workers.
*   **Logging & Monitoring:** Set up comprehensive logging and monitoring for both frontend and backend to track application health and performance.
