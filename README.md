# 💸 Spendly - Smart Expense Tracker

**Spendly** is a full-stack financial management application built with the MERN stack. It allows users to track their daily spending, categorize expenses, and visualize their financial habits through an intuitive, interactive dashboard.


---

## 🚀 Key Features

### 💻 Frontend (Client)
* **Dynamic Dashboard:** View a summary of total spending, top categories, and recent transactions at a glance.
* **Interactive Visualizations:** Beautiful radial charts to visualize spending distribution across categories.
* **CRUD Operations:** Effortlessly add, edit, and delete expense records.
* **Responsive Design:** Fully optimized for both desktop and mobile viewing.

### ⚙️ Backend (Server)
The backend is designed with a focus on **security, scalability, and data integrity**:
* **Robust Authentication:** Secure user login and registration using **Bcrypt** for password hashing and **JSON Web Tokens (JWT)** for session management.
* **Middleware-Driven Security:** * **Rate Limiting:** Prevents Brute-force attacks using `express-rate-limit`.
    * **CORS & Cookie Parsing:** Secure cross-origin resource sharing and HTTP-only cookie management.
* **Data Validation:** Strict schema validation using **Zod** to ensure only clean data reaches the MongoDB database.
* **RESTful API:** Cleanly structured routes for managing users and financial data.
* **Modern ES Modules:** Built using `"type": "module"` for clean, modern JavaScript syntax.

---

## 🛠️ Tech Stack

**Frontend:** React.js, Vite, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose ODM)  
**Validation & Security:** Zod, Bcrypt, JWT, Express Rate Limit  

---

## 📂 Project Structure

```text
SPENDLY
├── client/                # Frontend React application (Vite)
│   ├── src/               # Components, Hooks, and Pages
│   ├── public/            # Static assets
│   └── vite.config.js     # Vite configuration
├── server/                # Backend Node.js application
│   ├── config/            # Database and environment configurations
│   ├── controllers/       # Route logic
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   ├── middlewares/       # Auth and error handling
│   ├── schemas/           # Zod validation schemas
│   └── server.js          # Entry point
└── README.md