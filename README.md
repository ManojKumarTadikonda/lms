
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



-----

## 🔙 Backend Guide

This backend is built with **NestJS** and uses **Prisma** with **PostgreSQL**. Follow the steps below to configure the environment, database, and understand the API structure.

### ⚙️ Configuration

1.  Duplicate the example environment file:
    ```bash
    cp .env.example .env
    ```
2.  Update `.env` with your specific configuration:
    ```env
    DATABASE_URL="postgresql://user:Your_db_password@localhost:5432/mydb?schema=public"
    JWT_SECRET="your_secure_secret"
    JWT_EXPIRES_IN=86400
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=Your_db_password
    POSTGRES_DB=library

    ```

### 🗄️ Database Setup (Prisma)

Run the following commands to initialize the database schema and generating the client:

```bash
# 1. Migrate database (creates tables)
npx prisma migrate dev --name init_lms

# 2. Generate Prisma Client
npx prisma generate

# 3. Seed database (Optional - if seed.ts is configured)
npm run seed
```

-----

### 🌐 API Reference

#### 🔐 Authentication & Users

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/signup` | Public | Register new user (`USER` or `ADMIN`). |
| `POST` | `/auth/login` | Public | Login to receive `accessToken`. |
| `GET` | `/auth/me` | **Private** | Retrieve current user profile. |
| `GET` | `/users` | **Admin** | List all registered users. |

> **Note:** For private routes, include the token in the header:
> `Authorization: Bearer <YOUR_JWT_TOKEN>`

#### 📚 Books & Authors

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/books` | Public | List books. Filters: `authorId`, `isBorrowed`, `search`. |
| `GET` | `/books/:id` | Public | Get details of a specific book. |
| `POST` | `/books` | **Admin** | Create a new book entry. |
| `PATCH` | `/books/:id` | **Admin** | Update book details. |
| `DELETE`| `/books/:id` | **Admin** | Remove a book. |
| `GET` | `/authors` | Public | List all authors. |
| `POST` | `/authors` | **Admin** | Create a new author. |
| `PATCH` | `/authors/:id`| **Admin** | Update author details. |
| `DELETE`| `/authors/:id`| **Admin** | Remove author (Cascades delete to books). |

#### 🔄 Borrowing System

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/borrow` | **Private** | Borrow a book (Decrements stock). |
| `POST` | `/borrow/return`| **Private** | Return a book (Increments stock). |
| `GET` | `/borrow/me` | **Private** | View current user's borrowed items. |

-----

### 🧠 Key Design Decisions

  * **Role-Based Access Control (RBAC):**
      * **USER:** Can view library catalog and borrow/return books.
      * **ADMIN:** Full access, including managing inventory (Authors/Books) and viewing all users.
  * **Inventory Logic:**
      * `availableCount` tracks physical copies.
      * Borrowing decreases count; Returning increases count.
      * If `availableCount` is 0, the book is marked as out of stock.
  * **Cascading Deletes:**
      * Deleting an **Author** automatically removes all their **Books** and associated **Borrow Records** to maintain data integrity.
  * **Validation:**
      * All inputs are validated using DTOs and `ValidationPipe` to ensure correct data types and strip malicious fields.

### 📂 Project Structure(backend)

```text
src/
├── auth/           # JWT handling, Strategies, Guards
├── users/          # User management
├── authors/        # Author CRUD logic
├── books/          # Book inventory logic
├── borrow/         # Transaction logic for borrowing/returning
├── prisma/         # Database connection service
├── app.module.ts   # Main module
└── main.ts         # Application entry point
```
