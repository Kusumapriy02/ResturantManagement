# 🍽️ Restaurant Management System

A frontend web application where customers can discover restaurants, order food and track orders, and an admin can manage restaurant listings and monitor orders.

🔗 **Live Demo:** [https://resturant-management-nu.vercel.app](https://resturant-management-nu.vercel.app/)

> **Note:** This is a **frontend-only** project. There is no backend or database. All data (users, cart, orders and restaurants) is stored in the browser using `localStorage`.

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Demo Admin Login](#-demo-admin-login)
- [Application Routes](#-application-routes)
- [Order Workflow](#-order-workflow)
- [Limitations](#-limitations)
- [Future Scope](#-future-scope)
- [Author](#-author)

---

## ✨ Features

### 👤 Customer
- Register and log in with email and password
- Search restaurants by name, cuisine or location
- Filter restaurants by cuisine and location
- View restaurant details with a category-wise menu
- Add dishes to the cart, change quantity, remove items and see the delivery fee and total
- Place orders and view them on the My Orders page
- Cancel an order before it is delivered
- Save favorite restaurants
- Manage profile information

### 🛠️ Admin
- Admin dashboard with totals for restaurants, customers and orders
- Order summary by status
- Add new restaurants (name, location, cuisine, image, rating, phone and description)
- Edit and delete restaurant listings
- View all customer orders

### 🔐 Access Control
- Role-based protected routes (Customer and Admin)
- Users who are not logged in are redirected to the login page

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based user interface |
| Vite | Fast build tool and development server |
| React Router 7 | Page navigation and protected routes |
| Redux Toolkit | Global state for the favorites feature |
| localStorage | Browser storage for users, cart, orders and restaurants |
| CSS | Custom styling |
| ESLint | Code quality checks |
| Vercel | Deployment |

---

## 📁 Project Structure

```
ResturantManagement/
├── public/                  # Static files (icons)
├── src/
│   ├── app/
│   │   └── store.js         # Redux store
│   ├── assets/              # Images and logos
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ResturantCard.jsx
│   │   ├── ResturantList.jsx
│   │   └── MenuCard.jsx
│   ├── features/
│   │   └── favoriteSlice.js # Favorites state (Redux)
│   ├── pages/               # Application pages
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Logout.jsx
│   │   ├── Resturants.jsx
│   │   ├── ResturantDetails.jsx
│   │   ├── AddResturant.jsx
│   │   ├── EditResturant.jsx
│   │   ├── Cart.jsx
│   │   ├── Order.jsx
│   │   ├── Favorites.jsx
│   │   ├── Profile.jsx
│   │   ├── CustomerDashboard.jsx
│   │   └── AdminDashboard.jsx
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── Protectedroute.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 20.19 or later)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ResturantManagement.git
   ```

2. **Go to the project folder**
   ```bash
   cd ResturantManagement
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open the app** in your browser at the address shown in the terminal (usually `http://localhost:5173`).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 🔑 Demo Admin Login

Use the built-in demo account to explore the admin features:

| Field | Value |
|---|---|
| Email | `admin@restaurant.com` |
| Password | `admin123` |

Customers can create their own account from the **Register** page.

---

## 🗺️ Application Routes

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/restaurants` | All restaurants | Public |
| `/restaurants/:id` | Restaurant details and menu | Public |
| `/customer` | Customer dashboard | Logged-in user |
| `/cart` | Cart | Logged-in user |
| `/orders` | My orders | Logged-in user |
| `/favorites` | Favorite restaurants | Logged-in user |
| `/profile` | Profile | Logged-in user |
| `/admin-dashboard` | Admin dashboard | Admin |
| `/add-restaurant` | Add restaurant | Admin |
| `/edit-restaurant/:id` | Edit restaurant | Admin |

---

## 🔄 Order Workflow

1. Browse or search for a restaurant
2. Open the restaurant and choose dishes from the menu
3. Add dishes to the cart and set the quantity
4. Place the order (it starts with the status **Pending**)
5. Track the order on the My Orders page, or cancel it before delivery

**Order status stages:** Pending → Confirmed → Preparing → Out for Delivery → Delivered (or Cancelled)

---

## ⚠️ Limitations

- No backend or database; data stays in the browser
- Data is lost if the browser storage is cleared
- Passwords are stored as plain text in the browser (for demo purposes only)
- No online payments or live order updates

---

## 🔮 Future Scope

- Add a Node.js / Express backend with a database
- Secure authentication with hashed passwords
- Online payment integration
- Live order status updates for customers
- Reviews, offers and notifications

---

## 👨‍💻 Author

**Your Name**
GitHub: [@your-username](https://github.com/your-username)

---

⭐ If you like this project, please give it a star on GitHub!
