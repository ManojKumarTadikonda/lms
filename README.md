📚 Library Management System (LMS)
Full-Stack Application (NestJS + Prisma + PostgreSQL + React + Tailwind)

This is a full-stack Library Management System where users can view books and authors publicly, while authenticated users can borrow/return books. Admins can manage books, authors, and stock counts.

The project includes:

Backend → NestJS + Prisma + PostgreSQL + JWT Auth

Frontend → React + Vite + TypeScript + Tailwind CSS

🚀 Features
🔓 Public (no login required)

View all books

View all authors

🔐 Authenticated USER

Borrow books (if available)

Return borrowed books

View My Borrowed Books

🛠️ ADMIN Panel

Manage Authors (create, update, delete)

Manage Books (create, update, delete)

Update book stock using availableCount

Automatic stock update:

Borrow → availableCount - 1

Return → availableCount + 1

When availableCount === 0, book is out of stock

🧱 Tech Stack
Frontend

React + TypeScript

Vite

Tailwind CSS v3

React Router v6

Backend

NestJS (TypeScript)

Prisma ORM

PostgreSQL (local or Supabase)

JWT Authentication

Role-based access (USER / ADMIN)

📂 Project Folder Structure
/project-root
│
├── library-backend/        # NestJS backend
│   ├── src/
│   ├── prisma/
│   ├── .env
│   └── README.md
│
├── lms-frontend/           # React frontend
│   ├── src/
│   ├── public/
│   └── README.md
│
└── README.md               # This main file

⚙️ Prerequisites

Make sure you have installed:

Node.js (>= 18)

PostgreSQL (local or Supabase DB)

npm or yarn

🗄️ Backend Setup (NestJS + Prisma)
1️⃣ Navigate to backend folder
cd library-backend

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
JWT_SECRET="super-secret-key"
JWT_EXPIRES_IN=86400

4️⃣ Run Prisma migrations
npx prisma migrate dev --name init
npx prisma generate


(Optional) Open database GUI:

npx prisma studio

5️⃣ Start backend server
npm run start:dev

✔ Backend runs at:
http://localhost:3000

🎨 Frontend Setup (React + Vite + Tailwind)
1️⃣ Navigate to frontend folder
cd lms-frontend

2️⃣ Install dependencies
npm install

3️⃣ Start frontend dev server
npm run dev

✔ Frontend runs at:
http://localhost:5173

🔗 Connecting Frontend & Backend

Frontend calls backend via:

const API_BASE_URL = "http://localhost:3000";


Make sure this matches your backend.

CORS is already enabled in backend:

app.enableCors({
  origin: 'http://localhost:5173',
  allowedHeaders: 'Content-Type, Authorization',
  methods: 'GET,POST,PATCH,DELETE',
});

🌐 API Summary
🔐 Auth
Method	Endpoint	Description
POST	/auth/signup	Register user
POST	/auth/login	Login user
GET	/auth/me	Get logged-in user
👤 Users
Method	Endpoint	Description
GET	/users	List users (Admin)
✍️ Authors
Method	Endpoint	Description
GET	/authors	Public
GET	/authors/:id	Public
POST	/authors	Admin only
PATCH	/authors/:id	Admin only
DELETE	/authors/:id	Admin only (deletes author + books + borrow history)
📘 Books
Method	Endpoint	Description
GET	/books	Public list + filters
GET	/books/:id	Public
POST	/books	Admin only
PATCH	/books/:id	Admin only
DELETE	/books/:id	Admin only
🔄 Borrowing
Method	Endpoint	Description
POST	/borrow	Borrow book
POST	/borrow/return	Return book
GET	/borrow/me	User's borrowed books
🧩 Core Business Logic
✔ Stock System with availableCount

Each book has a stock count (availableCount)

On borrow:

availableCount--

If reaches 0 → isBorrowed = true (out of stock)

On return:

availableCount++

If > 0 → isBorrowed = false

✔ Delete Author = Delete Everything Linked

When deleting an author:

All their books are deleted

All borrow records of those books are deleted

Handled via Prisma transaction.

🚀 How to Run the Entire Project
1️⃣ Start backend
cd library-backend
npm run start:dev

2️⃣ Start frontend
cd lms-frontend
npm run dev

3️⃣ Open browser
http://localhost:5173


You can now:

Browse books & authors publicly

Sign up / log in

Borrow / return books

Manage books/authors as ADMIN
