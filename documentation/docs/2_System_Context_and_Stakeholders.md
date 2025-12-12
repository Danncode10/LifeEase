# 2. System Context and Stakeholders

## 2.1 System Context Analysis
* Describe the operating environment of the proposed system.
    The LifeEase system operates as a web-based application, designed to be accessible across various devices (desktops, tablets, mobile phones) through a modern web browser. The backend is a Python-based API (FastAPI) running on a server, potentially a cloud instance. The frontend is built using React Native/Expo, which compiles to a web application (or potentially native mobile applications, though web is the primary focus for accessibility). The system interacts with a local SQLite database for data persistence. It is designed to be self-contained in terms of core functionality, with minimal direct external system interactions beyond standard web protocols (HTTP/HTTPS) and user-facing email for account recovery (though actual email integration is out of scope for the initial phase).

* Identify any existing systems or external processes the new system must interact with.
    *   **User Devices:** Web browsers on various platforms (desktop, mobile).
    *   **Operating Systems:** The server will run on a Linux-based OS; client devices will use their respective OS (Windows, macOS, Android, iOS).
    *   **Database System:** SQLite (embedded within the server environment).
    *   **Potential Future Integrations (Currently Out of Scope):**
        *   Calendar applications (Google Calendar, Outlook Calendar).
        *   Email services (for notifications, reminders).
        *   Third-party health tracking apps (e.g., Apple Health, Google Fit).
        *   Student information systems (for school activity synchronization).

## 2.2 Stakeholder Analysis
* Present the Stakeholder Register (table format recommended):

    | Stakeholder Role                 | Interest/Influence Level | Expected Involvement                                                                              |
    | :------------------------------- | :----------------------- | :------------------------------------------------------------------------------------------------- |
    | **End User**                     | High / High              | Directly uses the application for daily management tasks. Provides explicit feedback on usability and feature requests. |
    | **Project Owner/Lead**           | High / High              | Defines project vision, prioritizes features, and approves deliverables. Guides overall direction. |
    | **Developer**                    | Medium / High            | Designs, develops, tests, and maintains the system. Involved in technical decisions and implementation. |
    | **Database Administrator**       | Low / Medium             | Ensures data integrity, performance, and security of the database. Involved in setup and maintenance aspects. |
    | **System Administrator**         | Low / Medium             | Manages server infrastructure, deployment, and overall system health. Ensures uptime and performance. |
    | **Tester**                       | Medium / Medium          | Verifies system functionality against requirements, identifies bugs, and ensures quality. |
