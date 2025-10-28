# 📌 LifeEase – Simple App

## 🎯 Goal

To build a **simple functional app** called LifeEase with:

1. **Task Manager** – Basic to-do list
2. **School Activity Planner** – Simple planning for school tasks
3. **Health & Wellness Tool** – Basic health logging

The app uses a **FastAPI backend** with SQLite for simple storage and a React Native frontend for easy use.

---

## 🛠️ Setup & Project Structure

* UI folder contains the React Native app (Expo).
* Server folder contains the FastAPI backend.
* Documentation folder has setup guides.

---

## 📱 Core UI Development (Frontend)

* Bottom navigation with **3 tabs**:

  1. **Tasks** – List and add tasks
  2. **School Planner** – List and add school activities
  3. **Health** – List and add health entries

* Each screen has:
  * A **list view** for items (from API).
  * A **+ button** to add items (POST to API).
  * A **simple form** for input.

---

## ⚙️ Backend (FastAPI)

* In `server/`:
  * Routes for GET/POST tasks, school, health.
  * SQLite + SQLAlchemy for data.

* Run locally or on a free host like Railway.

---

## 🔗 Integration

* Frontend uses Axios to call backend APIs.
* Fetch data on app start.
* Add items via POST.

---

## 🎨 Basic Polish

* Refine UI with NativeWind.
* Write basic documentation for running app.

---

## 📦 Keep It Simple

No notifications, authentication, or complex features.
