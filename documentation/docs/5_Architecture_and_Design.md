# 5. Architecture and Design

## 5.1 Architectural Style and Rationale
* State the chosen architectural style (e.g., Three-Tier, Client-Server).
    The LifeEase system employs a **Client-Server (N-Tier) Architectural Style**, specifically a **Three-Tier Architecture**.

* Justify why this architecture is suitable for the system, relating it back to the NFRs.
    This three-tier architecture is chosen for its suitability in supporting the Non-Functional Requirements (NFRs) outlined:
    *   **Scalability:** Each tier (Presentation, Application, Data) can be developed, deployed, and scaled independently. This allows for easier handling of increased user load (NFR-001 Performance).
    *   **Maintainability:** The clear separation of concerns between tiers enhances modularity (NFR-011 Maintainability). Developers can work on the UI (frontend), business logic (backend API), or database without significantly impacting other layers.
    *   **Security:** The logical separation allows for implementing distinct security measures at each layer. For instance, the Application Tier can act as a gatekeeper, protecting direct access to the Data Tier, thereby supporting NFR-004 and NFR-005.
    *   **Usability:** By separating the Presentation Tier, the UI can be made highly responsive and adaptable to various devices, crucial for NFR-008.

* Include the Architectural Diagram illustrating the setup.
    ```mermaid
    graph TD
        subgraph Client [Presentation Tier]
            A[Web Browser / Mobile App]
        end

        subgraph Server [Application Tier (Backend)]
            B(FastAPI Application)
        end

        subgraph Database [Data Tier]
            C[SQLite Database]
        end

        A -- HTTP/HTTPS Requests --> B
        B -- SQL Queries --> C
        C -- Query Results --> B
        B -- API Responses --> A
    ```

## 5.2 Component Design
* List the major system components (e.g., Presentation Layer, Business Logic Handler, Persistence Module).
    *   **Presentation Layer (UI/Frontend):**
        *   **Purpose:** Provides the user interface for interaction. Handles user input, displays data, and communicates with the backend API.
        *   **Responsibility:** Rendering screens (Tasks, School, Health), form handling, user navigation, displaying data received from the API.
        *   **Technology:** React Native/Expo.
    *   **Application Layer (API/Backend):**
        *   **Purpose:** Contains the core business logic, handles API requests, processes data, and interacts with the Data Layer.
        *   **Responsibility:** User authentication, task management (CRUD), school activity management (CRUD), health entry management (CRUD), data validation, and error handling.
        *   **Technology:** FastAPI (Python), uvicorn.
    *   **Persistence Layer (Database Interaction):**
        *   **Purpose:** Manages data storage and retrieval operations.
        *   **Responsibility:** Defines data models, handles database connections, executes SQL queries, and maps objects to database records.
        *   **Technology:** SQLAlchemy (ORM), SQLite database.

## 5.3 Data Design
* Include the Entity-Relationship Diagram (ERD) Sketch showing the main entities and their relationships.
    ```mermaid
    erDiagram
        USER ||--o{ TASK : has
        USER ||--o{ SCHOOL_ACTIVITY : has
        USER ||--o{ HEALTH_ENTRY : has

        USER {
            INTEGER id PK
            VARCHAR name
            VARCHAR email UK
        }

        TASK {
            INTEGER id PK
            VARCHAR title
            VARCHAR description
            DATETIME due_date
            BOOLEAN completed
            INTEGER user_id FK
        }

        SCHOOL_ACTIVITY {
            INTEGER id PK
            VARCHAR subject
            VARCHAR description
            DATETIME deadline
            INTEGER user_id FK
        }

        HEALTH_ENTRY {
            INTEGER id PK
            VARCHAR activity
            VARCHAR description
            VARCHAR time
            DATETIME date
            INTEGER user_id FK
        }
