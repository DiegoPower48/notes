# 🚀 Notes App

This is a web application that allows users to create, edit, archive, and organize notes. It features a modern frontend and a REST API backend, all within a reproducible development environment managed by a single script.

---

## 📋 Table of Contents

- [Features](https://www.google.com/search?q=%23features)
- [Technologies Used](https://www.google.com/search?q=%23technologies-used)
- [Requirements](https://www.google.com/search?q=%23requirements)
- [Installation and Execution](https://www.google.com/search?q=%23installation-and-execution)
- [Default Credentials](https://www.google.com/search?q=%23default-credentials)
- [Live Deployment URL](https://www.google.com/search?q=%23live-deployment-url)

---

## ✨ Features

### 🎯 Phase 1: Note Management (Mandatory)

- **Create, edit, and delete** notes.
- **Archive and unarchive** notes.
- **List** active and archived notes separately.

### 🏷️ Phase 2: Tagging and Filtering (Extra Points)

- **Add and remove tags** (or categories) from notes.
- **Filter notes** notes by one or more tags.

---

## 🛠️ Technologies Used

### Frontend

- **Framework:** Next.js v15.4.5
- **Language:** TypeScript
- **Package Manager:** npm

### Backend

- **Framework:** NestJS v11.0.0
- **Language:** TypeScript
- **ORM:** Prisma v6.13.0
- **Database:** MySQL v8.0
- **Package Manager:** npm

---

## ⚙️ Requirements

To run the application, you need the following installed on your system:

- **Node.js** (LTS version, 18.x or newer, is recommended).
- **MySQL Server** (version 8.0 or newer).
- A **Linux or macOS environment** to run the setup script.

---

## 🚀 Installation and Execution

### 🧑‍💻 One-Time Setup

To get started, run the following commands in the project's root directory. This script will install all dependencies and set up the database.

```bash
chmod +x setup.sh
./setup.sh
```

**Note:** This script only needs to be run **once** for the initial setup.

### ▶️ Running the Application

After the initial setup is complete, you can start the application at any time by running the following command:

```bash
chmod +x setup.sh
./start.sh
```

This alias will automatically run both the backend and frontend simultaneously.

---

## 🔑 Default Credentials

### Login

- **Email:** `admin@example.com`
- **Password:** `admin123`

### Database

- **Host:** `mysql`
- **Database Name:** `notesdb`
- **Port:** `3306`
- **User:** `user`
- **Password:** `1234`

---

## 🌐 Live Deployment URL

### Frontend

- **URL:** `https://my-notes-app.vercel.app`
