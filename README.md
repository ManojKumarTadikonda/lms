# 📚 Library Management System

A full-stack Library Management System built with **NestJS** and **React**. Follow the guide below to set up and run the project locally.

## 🛠 Tech Stack
* **Backend:** NestJS, Prisma, PostgreSQL
* **Frontend:** React, Vite, TailwindCSS

---

## 🚀 Getting Started

### 1. Clone the Repository
Open your terminal and run the following commands to clone the project:

```bash
git clone <repo-url>
cd <project-folder> 
```

# Backend Setup
Step 1: Install Dependencies
Navigate to the backend directory and install the required packages:

```bash
cd library-backend
npm install
```
Step 2: Configure Environment Variables
Create a .env file in the root of the library-backend folder. Paste the following configuration into it:
```
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN=86400
```
Note: Replace the DATABASE_URL with your actual PostgreSQL connection string.

Step 3: Database Migration
Run the Prisma migration to set up your database schema:
```
npx prisma migrate dev
```

Step 4: Start the Server
Start the backend development server:
```
npm run start:dev
```
The backend API will be running at: http://localhost:3000

🎨 Frontend Setup
Open a new terminal window (do not close the backend terminal) and follow these steps:

Step 1: Install Dependencies
Navigate to the frontend directory and install the packages: 
```
cd lms-frontend
npm install
```
Step 2: Start the Application
Run the Vite development server:
```
npm run dev
```

The frontend UI will be running at: http://localhost:5173

✅ Project Ready
Ensure both terminals are running. You can now access the application in your browser:

👉 http://localhost:5173

