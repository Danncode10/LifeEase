# 3. Backend Design and API

The LifeEase backend is built using FastAPI, a modern, high-performance web framework for Python. It provides a robust and efficient API for the mobile application to interact with, managing data for tasks, school activities, and health entries. SQLite is used as the database for simplicity and ease of setup, with SQLAlchemy serving as the Object-Relational Mapper (ORM).

## 3.1 Technology Stack

*   **Framework:** FastAPI
*   **Language:** Python
*   **Database:** SQLite
*   **ORM:** SQLAlchemy
*   **Dependencies:** Pydantic (for data validation and serialization), Uvicorn (ASGI server)
*   **Middleware:** `fastapi.middleware.cors.CORSMiddleware` for Cross-Origin Resource Sharing.

## 3.2 Main Application (`server/main.py`)

The `server/main.py` file is the core of the FastAPI application, where the API endpoints are defined, and interactions with the database are handled.

### 3.2.1 Application Initialization and Middleware

*   The FastAPI application is initialized, and `CORSMiddleware` is configured to allow requests from all origins (`allow_origins=["*"]`). This is particularly useful for development and testing with a separate frontend application.
*   `models.Base.metadata.create_all(bind=engine)` ensures that all defined SQLAlchemy models are translated into database tables upon application startup if they don't already exist.

### 3.2.2 Pydantic Schemas

FastAPI leverages Pydantic for data validation, serialization, and automatic documentation. The `main.py` defines `BaseModel` classes for each entity (User, Task, School Activity, Health Entry) to structure request bodies (Create, Update) and response models.

*   `UserCreate`, `UserResponse`
*   `TaskCreate`, `TaskResponse`, `TaskUpdate`
*   `SchoolActivityCreate`, `SchoolActivityResponse`, `SchoolActivityUpdate`
*   `HealthEntryCreate`, `HealthEntryResponse`, `HealthEntryUpdate`

These schemas ensure that data conforms to expected types and formats and provide clear API contracts.

### 3.2.3 Database Dependency Injection (`get_db`)

The `get_db` function is a dependency that provides a database session (`SessionLocal`) for each request. This pattern ensures that a new session is created for each request and properly closed afterwards, maintaining resource efficiency and isolation.

```python
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### 3.2.4 API Endpoints

The application exposes RESTful API endpoints for managing users, tasks, school activities, and health entries. Each set of endpoints includes operations for creation, retrieval, updating, and deletion (CRUD).

#### User Endpoints

*   `POST /users/`: Registers a new user. Checks for existing email before creation.
*   `GET /users/`: Retrieves a list of all registered users.

#### Task Endpoints

*   `GET /tasks/`: Retrieves tasks for a specific user, filtered by `user_id`.
*   `POST /tasks/`: Creates a new task associated with a `user_id`.
*   `PUT /tasks/{task_id}`: Updates an existing task by `task_id`.
*   `DELETE /tasks/{task_id}`: Deletes a task by `task_id`.

#### School Activity Endpoints

*   `GET /school/`: Retrieves school activities for a specific user, filtered by `user_id`.
*   `POST /school/`: Creates a new school activity associated with a `user_id`.
*   `PUT /school/{activity_id}`: Updates an existing school activity by `activity_id`.
*   `DELETE /school/{activity_id}`: Deletes a school activity by `activity_id`.

#### Health Entry Endpoints

*   `GET /health/`: Retrieves health entries for a specific user, filtered by `user_id`.
*   `POST /health/`: Creates a new health entry associated with a `user_id`.
*   `PUT /health/{entry_id}`: Updates an existing health entry by `entry_id`.
*   `DELETE /health/{entry_id}`: Deletes a health entry by `entrry_id`.

All POST requests verify the existence of the `user_id` before creating new entries, returning a 404 error if the user is not found. Similarly, update and delete operations return a 404 if the specified item is not found.

## 3.3 Database Models (`server/models.py`)

The `server/models.py` file defines the SQLAlchemy ORM models that map Python classes to database tables. Each class represents a table, and its attributes represent columns.

```python
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    tasks = relationship("Task", back_populates="user")
    school_activities = relationship("SchoolActivity", back_populates="user")
    health_entries = relationship("HealthEntry", back_populates="user")

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    due_date = Column(DateTime, nullable=True)
    completed = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="tasks")

class SchoolActivity(Base):
    __tablename__ = "school_activities"
    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String, nullable=False)
    description = Column(String, nullable=True)
    deadline = Column(DateTime, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="school_activities")

class HealthEntry(Base):
    __tablename__ = "health_entries"
    id = Column(Integer, primary_key=True, index=True)
    activity = Column(String, nullable=False)
    description = Column(String, nullable=True)
    time = Column(String, nullable=True)
    date = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="health_entries")
```

Key aspects of the models:
*   **`Base` Inheritance:** All models inherit from `declarative_base()` defined in `database.py`.
*   **Table Naming:** `__tablename__` defines the corresponding table name in the database.
*   **Columns:** `Column` objects define the data type, constraints (e.g., `primary_key`, `index`, `unique`, `nullable`), and default values for each field.
*   **Foreign Keys:** `ForeignKey("users.id")` establishes a link to the `users` table, indicating a one-to-many relationship where one user can have many tasks, school activities, and health entries.
*   **Relationships:** `relationship()` defines the ORM-level relationships between models, allowing for easy traversal of related objects (e.g., `user.tasks` to get all tasks for a user).

## 3.4 Database Configuration (`server/database.py`)

The `server/database.py` file handles the setup for the SQLite database and SQLAlchemy sessions.

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./lifeease.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
```

*   **`SQLALCHEMY_DATABASE_URL`**: Specifies the connection string for the database. In this case, it points to a local SQLite file named `lifeease.db`. `check_same_thread=False` is necessary for SQLite when using it with multiple threads in FastAPI.
*   **`engine`**: The SQLAlchemy engine is created, which is responsible for database communication.
*   **`SessionLocal`**: A session factory is configured using `sessionmaker`. This factory will be used to create `Session` instances, which are essentially the "staging area" for database operations.
*   **`Base`**: The `declarative_base()` function returns a base class for declarative models, which `models.py` uses to define the ORM structure.
