# 6. Testing and Evaluation Plan

## 6.1 Testing Strategy Overview
* Describe the overall plan, including the levels of testing (Unit, Integration, System, Acceptance) and chosen testing types.
    The testing strategy for LifeEase will involve several levels to ensure comprehensive coverage and quality:
    *   **Unit Testing:** Focus on individual components (e.g., Python functions, API endpoints, React Native components) in isolation. This will use framework-specific testing tools (e.g., `pytest` for FastAPI, Jest/React Testing Library for React Native).
    *   **Integration Testing:** Verify the interactions between different modules or services (e.g., API endpoints interacting with the database, UI components calling API endpoints). This ensures seamless data flow and communication between layers.
    *   **System Testing:** Evaluate the complete, integrated system to verify that it meets the specified requirements. This includes functional, performance, security, and usability testing. End-to-end scenarios will be tested.
    *   **Acceptance Testing:** Performed by end-users or stakeholders to confirm that the system meets business requirements and user expectations. This will involve user acceptance testing (UAT) sessions.

    Chosen testing types:
    *   **Functional Testing:** To verify that all defined Functional Requirements (FRs) are met.
    *   **Performance Testing:** To assess the system's responsiveness, stability, and scalability under various load conditions (linked to NFR-001, NFR-002).
    *   **Security Testing:** To identify vulnerabilities and ensure data protection and authentication mechanisms are robust (linked to NFR-003, NFR-004, NFR-005).
    *   **Usability Testing:** To evaluate the user-friendliness and intuitiveness of the system (linked to NFR-006, NFR-007, NFR-008).

## 6.2 Detailed Test Cases
* Present the table of at least three detailed test cases for a critical function:
    ***Critical Function: User Task Management - Creating a New Task***

| Test Case ID | Function Tested             | Test Steps                                                   | Input Data                                        | Expected Result                                                           | Pass/Fail Criteria                                                                |
| :----------- | :-------------------------- | :----------------------------------------------------------- | :------------------------------------------------ | :------------------------------------------------------------------------ | :-------------------------------------------------------------------------------- |
| TC-TM-001    | Create New Task (Success)   | 1. Log in as a registered user. <br> 2. Navigate to the "Tasks" section. <br> 3. Click "Add New Task". <br> 4. Enter task details. <br> 5. Click "Save Task". | `title`: "Buy Groceries", `description`: "Milk, eggs, bread", `due_date`: "2025-12-01", `user_id`: 1 | Task "Buy Groceries" appears in the user's task list as incomplete. Server returns 200 OK. | Task is visible in list with correct details. API response is successful.           |
| TC-TM-002    | Create New Task (Missing Title) | 1. Log in as a registered user. <br> 2. Navigate to the "Tasks" section. <br> 3. Click "Add New Task". <br> 4. Leave `title` empty, enter other details. <br> 5. Click "Save Task". | `title`: "", `description`: "Call bank regarding card", `due_date`: "2025-12-05", `user_id`: 1 | An error message "Title cannot be empty" (or similar validation error) is displayed. Task is NOT created. Server returns 400 Bad Request. | Error message is displayed to user. Task is not added to the database. API response indicates error. |
| TC-TM-003    | Create New Task (Invalid User) | 1. Attempt to create a task for a `user_id` that does not exist directly via API (simulated). | `title`: "Invalid User Task", `description`: "This should fail", `due_date`: "2025-12-10", `user_id`: 999 | Server returns 404 Not Found due to "User not found" error. Task is NOT created. | API response is 404 Not Found. Task is not added to the database.                 |

## 6.3 Project Evaluation Metrics
* Define the criteria and metrics that will be used to measure the final success of the system and project (e.g., meeting all critical FRs, satisfying key NFRs).
    *   **Functional Completion Rate:** Percentage of critical Functional Requirements (FRs) successfully implemented and tested (e.g., 100% of FR-001 to FR-017).
    *   **NFR Compliance:** Adherence to defined Non-Functional Requirements, measured through performance tests, security audits, and usability feedback (e.g., 90% of requests within 2 seconds for performance NFRs, zero critical security vulnerabilities from penetration testing).
    *   **User Adoption/Satisfaction:** Measured by user feedback surveys, app store ratings (if applicable), or engagement metrics (e.g., 80% positive feedback on usability, average daily usage of 3+ features per user).
    *   **Defect Density:** Number of critical/major bugs identified per KLOC (thousand lines of code) or per feature, aiming for a low defect rate in production.
    *   **Maintainability Index:** Quantifiable measure of code maintainability (e.g., code complexity, cyclomatic complexity) to ensure NFR-011 and NFR-012 are met.
    *   **Deployment Success Rate:** Percentage of successful deployments without rollbacks or critical issues.
