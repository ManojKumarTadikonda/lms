
# 📚 Library Management System

A full-stack Library Management System built with **NestJS** and **React**. This project is designed to manage library resources efficiently, featuring a robust backend API and a modern, responsive frontend interface.

## 🛠 Tech Stack

* **Backend:** NestJS, Prisma, PostgreSQL
* **Frontend:** React, Vite, TailwindCSS
* **Containerization:** Docker & Docker Compose

---

## 🚀 Getting Started

Follow the instructions below to set up the project. You can run the application either **manually (locally)** or using **Docker**.

### 1. Clone the Repository
Open your terminal and run the following commands to download the source code:

```bash
git clone <repo-url>
cd <project-folder>
````

> **Note:** Replace `<repo-url>` and `<project-folder>` with your actual repository details.

-----

## 🧪 Option 1: Running Locally (Without Docker)

### 🔙 Backend Setup (NestJS)

**Step 1: Install Dependencies**
Navigate to the backend directory and install the required packages:

```bash
cd library-backend
npm install
```

**Step 2: Configure Environment Variables**
Create a `.env` file in the root of the `library-backend` folder. Copy and paste the following configuration:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN=86400
```

> ⚠️ **Important:** Replace the `DATABASE_URL` value with your actual PostgreSQL connection string.

**Step 3: Database Migration**
Run the Prisma migration command to generate your database schema:

```bash
npx prisma migrate dev
```

**Step 4: Start the Server**
Launch the backend development server:

```bash
npm run start:dev
```

*The backend API will run at:* `http://localhost:3000`

### 🎨 Frontend Setup (React + Vite)

Open a **new terminal window** (keep the backend terminal running) and follow these steps:

**Step 1: Install Dependencies**
Navigate to the frontend directory:

```bash
cd lms-frontend
npm install
```

**Step 2: Start the Application**
Run the Vite development server:

```bash
npm run dev
```

*The frontend UI will run at:* `http://localhost:5173`

-----

## 🐳 Option 2: Running with Docker (Recommended)

If you have Docker installed, you can spin up the entire application (Frontend, Backend, and Database) with a single command.

### Prerequisites

  * [Docker](https://www.docker.com/) installed
  * Docker Compose installed

### Start All Services

From the **project root folder** (where the `docker-compose.yml` file is located), run:

```bash
docker-compose up --build
```

This command will:

1.  Build the backend and frontend images.
2.  Start the containers.

**To stop the services:**
Press `Ctrl + C` or run:

```bash
docker-compose down
```

-----

## ✅ Accessing the Application

Once the servers are running (via Docker or Locally), you can access the application at the following addresses:

| Service | URL |
| :--- | :--- |
| **Frontend UI** | [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) |
| **Backend API** | [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) |


