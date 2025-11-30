# 3. Requirements Specification

## 3.1 Functional Requirements (FRs)
* List the primary functions using Use Cases or structured user stories. (e.g., UC-001: User Authentication, UC-002: Item Search)
    *   **UC-001: User Management**
        *   **FR-001:** The system shall allow users to register with a unique email and password.
        *   **FR-002:** The system shall allow registered users to log in.
        *   **FR-003:** The system shall allow users to view and update their profile information (e.g., name, email).
        *   **FR-004:** The system shall allow users to delete their account.
    *   **UC-002: Task Management**
        *   **FR-005:** The system shall allow users to create new tasks with a title, optional description, and optional due date.
        *   **FR-006:** The system shall display a list of all current tasks for a user.
        *   **FR-007:** The system shall allow users to mark a task as completed or incomplete.
        *   **FR-008:** The system shall allow users to edit existing task details.
        *   **FR-009:** The system shall allow users to delete tasks.
    *   **UC-003: School Activity Management**
        *   **FR-010:** The system shall allow users to create new school activities with a subject, optional description, and optional deadline.
        *   **FR-011:** The system shall display a list of all upcoming school activities for a user.
        *   **FR-012:** The system shall allow users to edit existing school activity details.
        *   **FR-013:** The system shall allow users to delete school activities.
    *   **UC-004: Health Entry Management**
        *   **FR-014:** The system shall allow users to create new health entries with an activity, optional description, optional time, and optional date.
        *   **FR-015:** The system shall display a list of all health entries for a user, preferably sorted by date.
        *   **FR-016:** The system shall allow users to edit existing health entry details.
        *   **FR-017:** The system shall allow users to delete health entries.

## 3.2 Non-Functional Requirements (NFRs)
* Document the quality attributes, categorized (e.g., Security, Performance, Usability, Reliability). Use measurable metrics where possible (e.g., Performance: Response time shall not exceed 2 seconds for 90% of searches.).
    *   **Performance:**
        *   **NFR-001:** The system shall respond to user requests (CRUD operations) within 2 seconds for 90% of cases under typical load (up to 50 concurrent users).
        *   **NFR-002:** Page load times for primary views (tasks, school, health) shall not exceed 3 seconds on a standard broadband connection.
    *   **Security:**
        *   **NFR-003:** User authentication credentials (passwords) shall be securely hashed and stored.
        *   **NFR-004:** Data transmission between the client and server shall be encrypted using HTTPS.
        *   **NFR-005:** User data shall be logically separated, ensuring that users can only access their own data.
    *   **Usability:**
        *   **NFR-006:** The user interface shall be intuitive and easy to navigate for first-time users.
        *   **NFR-007:** The system shall provide clear feedback (e.g., success messages, error notifications) for all user actions.
        *   **NFR-008:** The application shall be responsive and adaptive to various screen sizes (desktop, tablet, mobile).
    *   **Reliability:**
        *   **NFR-009:** The backend API shall maintain an uptime of at least 99% during operational hours.
        *   **NFR-010:** Data integrity shall be maintained, preventing data corruption or loss due to system errors or unexpected shutdowns.
    *   **Maintainability:**
        *   **NFR-011:** The codebase shall be modular and well-documented to facilitate future enhancements and debugging.
        *   **NFR-012:** Dependencies shall be managed, and updates applied regularly to minimize security vulnerabilities and ensure compatibility.
