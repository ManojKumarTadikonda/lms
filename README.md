🚀 Run the Project (Frontend + Backend)

Follow these steps after cloning the repository:

1️⃣ Clone the Project
git clone <repo-url>
cd <project-folder>

🗄️ Backend Setup (NestJS + Prisma)
cd library-backend
npm install

Create .env
DATABASE_URL="your_postgres_url_here"
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN=86400

Run Prisma migrations
npx prisma migrate dev

Start backend
npm run start:dev


Backend runs at:

http://localhost:3000

🎨 Frontend Setup (React + Vite + Tailwind)
cd lms-frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

✅ Done

Keep backend running on port 3000

Keep frontend running on port 5173

Open browser → http://localhost:5173

Your LMS is ready 🚀
