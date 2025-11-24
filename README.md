# TradeSync

> Professional crypto trading journal for analysts to track trades, manage portfolios, and document market insights.

---

## Features

- **Secure Authentication** — JWT-based login/register with bcrypt password hashing
- **Interactive Dashboard** — Real-time trading insights and journal management
- **CRUD Operations** — Full control over trading notes and signals
- **Modern UI** — Monochromatic "Zinc" design system with Tailwind CSS
- **Protected Routes** — Middleware-enforced authentication for private data
- **Real-time Feedback** — Instant UI updates with loading states

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js (Vite), Tailwind CSS, Lucide React |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Auth** | JWT, Bcryptjs |

---

## Project Structure

```
/crypto-trading-app
├── /client                # React Frontend (Vite)
│   └── /src
│       ├── /components    # Reusable UI components
│       ├── /pages         # View components
│       └── App.jsx        # Main application logic
│
├── /server                # Node.js Backend
│   ├── /models            # Mongoose schemas
│   ├── /routes            # API endpoints
│   ├── /middleware        # Authentication middleware
│   └── server.js          # Application entry point
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v14+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/trade_sync_db
JWT_SECRET=your_super_secret_key_here
```

Start server:

```bash
npm start
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Open browser at `http://localhost:5173`

---

## Quick Start Guide

1. **Register** — Create account on "Get Started" page
2. **Login** — Access dashboard with credentials
3. **Create Note** — Log trades with ticker, price, and analysis
4. **Manage** — Edit or delete notes from cards

---

## Documentation

- **API Documentation** — Complete endpoint reference with examples
- **Scalability Report** — Production deployment strategies

---

## License

Open-source for educational purposes.
