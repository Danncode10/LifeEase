# 1. Introduction to LifeEase

LifeEase is a simple, functional mobile application designed to help users manage daily tasks, plan school activities, and log basic health information. This document provides a comprehensive overview of the LifeEase project, detailing its architecture, technology stack, and implementation specifics across both frontend and backend components, as well as deployment considerations.

## 1.1 Project Goals

The primary objective of LifeEase is to offer a straightforward and intuitive platform for personal organization and tracking. It aims to achieve this through three core functionalities:

1.  **Task Manager:** A basic to-do list feature allowing users to add and track tasks.
2.  **School Activity Planner:** A simple tool for planning and managing school-related activities.
3.  **Health & Wellness Tool:** A basic logging system for health entries.

## 1.2 Architecture Overview

LifeEase follows a client-server architecture:

*   **Frontend (UI):** Developed with React Native (Expo), providing a cross-platform mobile application experience. The UI interacts with the backend via RESTful API calls.
*   **Backend (Server):** Built using FastAPI, a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints. It uses SQLite for lightweight and local data storage, managed through SQLAlchemy.

## 1.3 Technology Stack

*   **Frontend:**
    *   React Native (Expo)
    *   NativeWind (for styling)
    *   Axios (for API interactions)
*   **Backend:**
    *   FastAPI
    *   Python
    *   SQLite
    *   SQLAlchemy (ORM)

## 1.4 Project Structure

The repository is organized into distinct directories to cleanly separate concerns:

*   `UI/`: Contains the entire React Native (Expo) application source code.
*   `server/`: Houses the FastAPI backend application and its related components.
*   `documentation/`: Stores all project documentation, including setup guides and detailed architectural explanations.

## 1.5 Core Features

The application provides the following core features:

*   **Bottom Navigation:** Easy switching between the "Tasks", "School Planner", and "Health" sections.
*   **List Views:** Each section displays a list of existing items fetched from the backend API.
*   **Add Functionality:** A dedicated "+" button on each screen allows users to add new entries via a simple input form, which then makes a POST request to the backend.

## 1.6 Integration Highlights

*   The frontend utilizes `Axios` for making asynchronous HTTP requests to the backend API.
*   Data is fetched upon application start (or screen focus) to ensure up-to-date information.
*   New items are added through POST requests to the respective backend endpoints.

## 1.7 Simplicity Focus

LifeEase is intentionally designed to be simple and functional. It prioritizes core functionality over complex features such as notifications, user authentication, or advanced data analysis. This approach ensures a lean codebase and a clear focus on its primary goal.
