# 📌 LifeEase – App Master Plan (Prototype with FastAPI)

## 🎯 Goal

To build a **prototype app** of LifeEase with:

1. **Task Manager**
2. **School Activity Planner**
3. **Health & Wellness Tool**

Instead of Firebase, we’ll use a **FastAPI backend** with a lightweight database (e.g., SQLite) to handle storage.

---

## 🛠️ Phase 1 – Setup & Project Structure

* Clone starter repo into `UI/` folder.
* Uninitialize Git (`rm -rf .git`).
* Create `documentation/` folder.
* Install frontend dependencies: Expo, NativeWind, React Navigation, Axios, Expo Notifications.
* Create backend folder `server/` with FastAPI + SQLite.

---

## 📱 Phase 2 – Core UI Development (Frontend)

* Implement bottom navigation with **3 tabs**:

  1. **Tasks**
  2. **School Planner**
  3. **Health**

* Each screen should have:

  * A **list view** for displaying items (fetched from API).
  * A **+ button** to add items (sends POST request to API).
  * A **form modal** for input (e.g., task name, due date).

---

## ⚙️ Phase 3 – Backend (FastAPI)

* Create a `server/` folder with FastAPI.

* Define routes:

  * `GET /tasks` – Fetch tasks.
  * `POST /tasks` – Add task.
  * `GET /school` – Fetch school activities.
  * `POST /school` – Add activity.
  * `GET /health` – Fetch health logs.
  * `POST /health` – Add health entry.

* Use **SQLite** with SQLAlchemy for persistence.

* Run backend locally (localhost:8000) or host on free service (e.g., Railway, Render).

---

## 🔗 Phase 4 – Frontend ↔ Backend Integration

* Use **Axios** in React Native to call FastAPI routes.
* On app start, fetch data from API.
* When user adds new task/activity/medication, send it to FastAPI via POST.

---

## 🔔 Phase 5 – Notifications & Reminders

* Use **Expo Notifications** for local reminders.
* Logic:

  * Fetch deadlines/times from API.
  * Schedule notifications locally on device.

---

## 🎨 Phase 6 – Polish & Demo-Ready

* Refine UI with NativeWind.
* Add onboarding screen.
* Write documentation in `/documentation` folder:

  * How to run backend.
  * How to run frontend.
  * Prototype features available.

---

## 📦 Out of Scope (for Prototype)

* Full authentication.
* Cloud deployment at scale.
* Store publishing.