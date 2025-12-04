============================================================
           📚 Library Management System — Run Guide
============================================================

Follow these steps to run the project after cloning the repository.


------------------------------------------------------------
1️⃣  Clone the Repository
------------------------------------------------------------
git clone <repo-url>
cd <project-folder>


============================================================
🗄️  BACKEND SETUP (NestJS + Prisma + PostgreSQL)
============================================================

1. Navigate to backend folder:
   cd library-backend

2. Install dependencies:
   npm install

3. Create a .env file in the backend root:
   ---------------------------------------
   DATABASE_URL="your_postgres_connection_string"
   JWT_SECRET="your_secret_key"
   JWT_EXPIRES_IN=86400
   ---------------------------------------

4. Run Prisma migrations:
   npx prisma migrate dev

5. Start the backend server:
   npm run start:dev

Backend is now running at:
➡️  http://localhost:3000


============================================================
🎨  FRONTEND SETUP (React + Vite + TailwindCSS)
============================================================

1. Navigate to frontend folder:
   cd lms-frontend

2. Install dependencies:
   npm install

3. Start the frontend:
   npm run dev

Frontend is now running at:
➡️  http://localhost:5173


============================================================
✅  PROJECT READY
============================================================

- Keep the backend running on port 3000
- Keep the frontend running on port 5173
- Open the application in your browser:

  👉  http://localhost:5173

Your Library Management System is now up and running 🚀
============================================================
