# 4. System Modeling and Visualization

## 4.1 System Context Diagram
* Include the Context Diagram visualization.
    ```mermaid
    graph TD
        User((User)) -->|Manages Tasks, Activities, Health| LifeEase[LifeEase System]
        LifeEase -->|Stores/Retrieves Data| Database[(SQLite Database)]
        OperatingSystem[Operating System] -->|Hosts Application| LifeEase
    ```
* Briefly explain the entities and data flows shown.
    The System Context Diagram illustrates LifeEase as a central system interacting with its primary external entities. The "User" manages their personal data through the system. The "SQLite Database" is where the system stores and retrieves all persistent data. Finally, the "Operating System" represents the environment where LifeEase is hosted and executed.

## 4.2 Data Flow Diagrams (DFDs)
* Level 0 DFD: Include the diagram and explanation of the main processes.
    ```mermaid
    graph TD
        A[User] --> |Input Data| System(LifeEase System)
        System --> |Processed Data| B[Database]
        B --> |Stored Data| System
    ```
    *Explanation of Level 0 DFD:*
    This Level 0 Data Flow Diagram (DFD) provides a high-level overview of the LifeEase system. It shows the primary external entity, "User," interacting with the central process, "LifeEase System," by providing input data (e.g., tasks, activities, health entries). The "LifeEase System" processes this data and interacts with an external data store, the "Database," for storing and retrieving information.

* Level 1 DFD: Include at least one detailed Level 1 diagram and explanation. (Example: User Task Management)
    ```mermaid
    graph TD
        A[User] --> |Create Task Request| P1(Process Task Data)
        P1 --> |New Task Data| D1[Task Database]
        D1 --> |Existing Tasks| P1
        P1 --> |Task Data Display| A
        A --> |Update Task Request| P2(Update Task)
        P2 --> |Updated Task Data| D1
        A --> |Delete Task Request| P3(Delete Task)
        P3 --> |Task ID| D1
    ```
    *Explanation of User Task Management Level 1 DFD:*
    This Level 1 DFD focuses on the "User Task Management" subsystem.
    *   **User (External Entity):** Initiates requests for creating, updating, and deleting tasks, and receives task data for display.
    *   **P1 (Process Task Data):** Handles the creation of new tasks, validating input and storing it in the Task Database. Also retrieves existing tasks to display to the user.
    *   **P2 (Update Task):** Manages modifications to existing tasks, taking updated information from the User and applying it to the Task Database.
    *   **P3 (Delete Task):** Processes requests to remove tasks, identifying the task by ID and removing it from the Task Database.
    *   **D1 (Task Database):** A data store specifically for user tasks.

## 4.3 UML Diagrams
* Include the two selected UML diagrams (e.g., Use Case, Class, or Sequence Diagram).
    *   **UML Use Case Diagram:**
        ```mermaid
            graph TD
    User["User"]
    subgraph LifeEase
        ManageTasks["Manage Tasks"]
        ManageSchool["Manage School Activities"]
        ManageHealth["Manage Health Entries"]
        ManageProfile["Manage Profile"]
    end

    User --> ManageTasks
    User --> ManageSchool
    User --> ManageHealth
    User --> ManageProfile
        ```
        *Short justification:* The Use Case Diagram provides a high-level view of the system's functionality from the end-user's perspective. It clearly delineates the primary interactions a user can have with the LifeEase system, such as managing tasks, school activities, health entries, and their profile. This diagram is excellent for understanding the system's boundaries and main functions without delving into implementation details.

    *   **UML Class Diagram (Conceptual):**
        ```mermaid
        classDiagram
            class User {
                +int id
                +string name
                +string email
            }
            class Task {
                +int id
                +string title
                +string description
                +datetime due_date
                +bool completed
                +int user_id
            }
            class SchoolActivity {
                +int id
                +string subject
                +string description
                +datetime deadline
                +int user_id
            }
            class HealthEntry {
                +int id
                +string activity
                +string description
                +string time
                +datetime date
                +int user_id
            }

            User "1" -- "*" Task : has
            User "1" -- "*" SchoolActivity : has
            User "1" -- "*" HealthEntry : has
        ```
        *Short justification:* The Class Diagram (conceptual) illustrates the main entities within the LifeEase system and their relationships. It helps in understanding the static structure of the system's data model, showing attributes and associations between key objects like User, Task, SchoolActivity, and HealthEntry. This is crucial for both database design and object-oriented programming approaches.
