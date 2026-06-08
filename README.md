# 💸 Spendly - Smart Expense Tracker

**Spendly** is a full-stack financial management application built with the MERN stack. It allows users to track their daily spending, categorize expenses, and visualize their financial habits through an intuitive, interactive dashboard. Designed with modern security practices and a responsive UI, Spendly helps users understand their spending patterns at a glance.

---

## ✨ Features

### 💻 Frontend Features
* **User Authentication:** Secure login/signup with JWT-based session management
* **Interactive Dashboard:** Real-time overview of spending metrics and insights
* **Expense Management:** Add, edit, delete, and categorize expenses with ease
* **Visual Analytics:** Beautiful pie charts showing spending distribution across categories
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing
* **Top Insights:** Quick cards showing total spent, top category, and highest expense
* **Category-Based Organization:** 30+ predefined expense categories with color-coded icons
* **Real-time Updates:** Instant reflection of changes without page refreshes

### ⚙️ Backend Features
Built with security, scalability, and clean architecture in mind:
* **Secure Authentication:** 
  - Password hashing with **Bcrypt**
  - JWT-based token authentication
  - Session management with HTTP-only cookies
* **API Security:**
  - **CORS** protection for cross-origin requests
  - **Rate Limiting** to prevent brute-force and DDoS attacks
  - Request validation and sanitization
* **Data Validation:** Strict schema validation using **Zod** for data integrity
* **RESTful API:** Clean, organized endpoints following REST conventions
* **Database:** MongoDB with Mongoose ODM for flexible, scalable data storage
* **Error Handling:** Centralized error handling with meaningful error responses
* **Modern Setup:** ES Modules (`"type": "module"`) for clean, modern JavaScript

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js 18+, Vite, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js 5+ |
| **Database** | MongoDB, Mongoose ODM |
| **Validation** | Zod |
| **Security** | Bcrypt, JWT, Express Rate Limit, CORS |
| **Development** | Nodemon, ESLint |

---

## 📂 Project Structure

```
SPENDLY
├── client/                           # Frontend React application (Vite)
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   │   ├── AddExpenseButton.jsx
│   │   │   ├── ExpenseItem.jsx
│   │   │   ├── Greeting.jsx
│   │   │   ├── LoginCard.jsx
│   │   │   ├── SignupCard.jsx
│   │   │   ├── TopCategoryCard.jsx
│   │   │   ├── TopExpenseCard.jsx
│   │   │   ├── TotalSpentCard.jsx
│   │   │   └── Modal.jsx
│   │   ├── pages/                    # Page components
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── assets/                   # Images and static files
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── config.js                 # API base URL configuration
│   ├── public/                       # Static public assets
│   ├── .env                          # Environment variables
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── server/                           # Backend Node.js application
│   ├── config/
│   │   └── db.js                     # MongoDB connection setup
│   ├── controllers/                  # Business logic
│   │   ├── auth.controller.js
│   │   ├── expenses.controller.js
│   │   └── insights.controller.js
│   ├── models/                       # Mongoose schemas
│   │   ├── user.model.js
│   │   └── expense.model.js
│   ├── routes/                       # API endpoints
│   │   ├── auth.routes.js
│   │   ├── expenses.routes.js
│   │   └── insights.routes.js
│   ├── schemas/                      # Zod validation schemas
│   │   ├── auth.schema.js
│   │   └── expenses.schema.js
│   ├── middlewares/                  # Express middleware
│   │   ├── authenticate.middleware.js
│   │   ├── errorHandler.middleware.js
│   │   ├── logger.middleware.js
│   │   └── rateLimit.middleware.js
│   ├── utils/                        # Utility functions
│   ├── constants.js                  # Application constants
│   ├── server.js                     # Entry point
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local or Atlas cloud database)
- **Git**

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/spendly.git
cd spendly
```

#### 2. Setup Backend (Server)

```bash
cd server

# Install dependencies
npm install

# Create .env file with the following variables
cat > .env << EOF
PORT=3000
MONGODB_URI=mongodb://localhost:27017/spendly
# or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spendly

JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

NODE_ENV=development
EOF

# Start the server
npm run dev
```

The server will run on `http://localhost:3000`

#### 3. Setup Frontend (Client)

```bash
cd ../client

# Install dependencies
npm install

# Create .env file with the following variables
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:3000/api
EOF

# Start the development server
npm run dev
```

The client will run on `http://localhost:5173`

---

## 🔐 Security Features

### Authentication & Authorization
- **JWT Tokens:** Stateless authentication using JSON Web Tokens
- **Password Security:** Passwords hashed with Bcrypt (salt rounds: 10)
- **Token Expiration:** Automatic token expiration after 7 days
- **Protected Routes:** All expense and insights endpoints require authentication

### API Security
- **CORS:** Whitelist only trusted origins (configured for `http://localhost:5173`)
- **Rate Limiting:** General rate limit of 15 requests per 15 minutes per IP
- **Input Validation:** Strict Zod schema validation on all endpoints
- **Error Handling:** Generic error messages to prevent information leakage

### Best Practices
- Environment variables for sensitive data (never commit `.env`)
- HTTPS-ready architecture (use in production)
- HTTP-only cookies for token storage
- Request logging for audit trails

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer <accessToken>

Response (200):
{
  "success": true,
  "user": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Expense Endpoints

#### Get All Expenses
```
GET /expenses
Authorization: Bearer <accessToken>

Response (200):
{
  "success": true,
  "expenses": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "Grocery Shopping",
      "amount": 5000,
      "category": "Groceries",
      "date": "2024-06-08T10:30:00.000Z",
      "userId": "64f1a2b3c4d5e6f7g8h9i0j1"
    }
  ]
}
```

#### Create Expense
```
POST /expenses
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "Coffee at local cafe",
  "amount": 600,
  "category": "Coffee & Snacks",
  "date": "2024-06-08"
}

Response (201):
{
  "success": true,
  "message": "Expense created successfully",
  "expense": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Coffee at local cafe",
    "amount": 600,
    "category": "Coffee & Snacks",
    "date": "2024-06-08T00:00:00.000Z",
    "userId": "64f1a2b3c4d5e6f7g8h9i0j1"
  }
}
```

#### Update Expense
```
PUT /expenses/:expenseId
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "Coffee at fancy cafe",
  "amount": 750,
  "category": "Dining Out",
  "date": "2024-06-08"
}

Response (200):
{
  "success": true,
  "message": "Expense updated successfully",
  "updatedExpense": { ... }
}
```

#### Delete Expense
```
DELETE /expenses/:expenseId
Authorization: Bearer <accessToken>

Response (200):
{
  "success": true,
  "message": "Expense deleted successfully"
}
```

### Insights Endpoints

#### Get Dashboard Insights
```
GET /insights/dashboard
Authorization: Bearer <accessToken>

Response (200):
{
  "success": true,
  "mostSpentCategory": {
    "category": "Groceries",
    "totalSpent": 15000
  },
  "highestExpense": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Imtiaz Groceries",
    "amount": 3000,
    "category": "Groceries",
    "date": "2024-06-08T00:00:00.000Z"
  },
  "categoriesBreakdown": [
    {
      "category": "Groceries",
      "totalSpent": 15000
    },
    {
      "category": "Entertainment",
      "totalSpent": 5000
    }
  ]
}
```

---

## 📊 Expense Categories

The application supports 30+ predefined categories:

**Food & Dining:** Food, Dining Out, Groceries, Coffee & Snacks  
**Transport:** Transport, Fuel, Parking  
**Home:** Rent, Utilities, Home Maintenance, Furniture  
**Bills & Digital:** Mobile Recharge, Internet, Subscriptions  
**Education & Work:** Education, Books, Work/Freelancing  
**Health:** Health, Medicine, Gym/Fitness, Insurance  
**Shopping:** Shopping, Clothing, Personal Care, Electronics  
**Entertainment:** Entertainment, Events, Tickets  
**Travel:** Travel, Flights  
**Social:** Gifts, Charity, Donations  
**Financial:** Loan Payment, Taxes/Fees  
**Savings:** Savings, Emergency  
**Other:** Other, Miscellaneous

Each category has a unique color and icon for visual identification.

---

## 🎨 UI/UX Highlights

- **Responsive Design:** Mobile-first approach using Tailwind CSS
- **Color-Coded Categories:** Each expense category has a distinct color and icon
- **Real-time Charts:** Interactive pie charts using MUI X-Charts
- **Smooth Animations:** Hover effects and transitions for better UX
- **Modal Forms:** Clean, modal-based forms for adding/editing expenses
- **Error Feedback:** User-friendly error messages and validations

---

## 🔧 Development Workflow

### Running Both Client and Server
1. Open two terminal windows
2. In terminal 1, navigate to `server/` and run `npm run dev`
3. In terminal 2, navigate to `client/` and run `npm run dev`
4. Access the app at `http://localhost:5173`

### Environment Variables Checklist

**Server (.env):**
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRE` - Token expiration time
- `NODE_ENV` - Environment (development/production)

**Client (.env):**
- `VITE_API_BASE_URL` - Backend API base URL

---

## 📝 Development Best Practices

### Code Organization
- Components are modular and reusable
- Controllers handle business logic separately from routes
- Middleware provides cross-cutting concerns (auth, logging, error handling)
- Clear separation of concerns across layers

### Error Handling
- Centralized error handler middleware on backend
- User-friendly error messages on frontend
- Proper HTTP status codes for different scenarios
- Validation errors are informative and actionable

### Performance
- Efficient API calls with proper error handling
- No unnecessary re-renders with React hooks
- Optimized database queries
- Rate limiting to prevent abuse

---

## 🚢 Deployment

### Production Checklist
- [ ] Update `.env` with production database URI
- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Update CORS origin to production domain
- [ ] Set up environment variables on hosting platform
- [ ] Configure MongoDB Atlas IP whitelist
- [ ] Use process manager (PM2) for Node.js
- [ ] Set up monitoring and logging

### Hosting Recommendations
- **Backend:** Heroku, Railway, Render, DigitalOcean
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Database:** MongoDB Atlas (cloud), self-hosted MongoDB

---

## 🐛 Troubleshooting

### Backend Issues

**Port Already in Use:**
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
# or change PORT in .env
```

**MongoDB Connection Error:**
- Verify MongoDB is running
- Check connection string in `.env`
- For Atlas, whitelist your IP address

**JWT Errors:**
- Ensure JWT_SECRET is set
- Check token hasn't expired
- Verify Authorization header format: `Bearer <token>`

### Frontend Issues

**CORS Errors:**
- Verify server CORS configuration
- Check client API_BASE_URL is correct
- Ensure server is running

**API Connection Failed:**
- Check backend is running on correct port
- Verify network connectivity
- Check browser console for detailed error

---

## 📚 Learn More

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Mongoose](https://mongoosejs.com)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zod Validation](https://zod.dev)

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👤 Author

**Huzaifa Anwar** - Backend Focused Full Stack Developer

---