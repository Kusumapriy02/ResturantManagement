import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Resturants from "./pages/Resturants";
import RestaurantDetails from "./pages/ResturantDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/logout";

import CustomerDashboard from "./pages/CustomerDashboard";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import Orders from "./pages/Order";
import Profile from "./pages/Profile";

import AdminDashboard from "./pages/AdminDashboard";
import AddRestaurant from "./pages/AddResturant";
import EditRestaurant from "./pages/EditResturant";

import ProtectedRoute from "./routes/Protectedroute";

function App() {
  const location = useLocation();

  // Footer should appear only on Home page
  const showFooter = location.pathname === "/";

  return (
    <>
      <Navbar />

      <main>
        <Routes>

          {/* =========================
              PUBLIC ROUTES
          ========================= */}

          <Route path="/" element={<Home />} />

          <Route
            path="/restaurants"
            element={<Resturants />}
          />

          <Route
            path="/restaurants/:id"
            element={<RestaurantDetails />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/logout"
            element={<Logout />}
          />


          {/* =========================
              CUSTOMER ROUTES
          ========================= */}

          <Route
            path="/customer"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Favorites />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Profile />
              </ProtectedRoute>
            }
          />


          {/* =========================
              ORDERS
              CUSTOMER + ADMIN
          ========================= */}

          <Route
            path="/orders"
            element={
              <ProtectedRoute allowedRoles={["customer", "admin"]}>
                <Orders />
              </ProtectedRoute>
            }
          />


          {/* =========================
              ADMIN ROUTES
          ========================= */}

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-restaurant"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddRestaurant />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-restaurant/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditRestaurant />
              </ProtectedRoute>
            }
          />


          {/* =========================
              404 PAGE
          ========================= */}

          <Route
            path="*"
            element={
              <div className="not-found">
                <div className="not-found-card">

                  <div className="not-found-icon">
                    🔍
                  </div>

                  <h1>404</h1>

                  <h2>Page Not Found</h2>

                  <p>
                    The page you are looking for does not exist.
                  </p>

                  <a
                    href="/"
                    className="primary-btn"
                  >
                    Go Home
                  </a>

                </div>
              </div>
            }
          />

        </Routes>
      </main>

      {showFooter && <Footer />}
    </>
  );
}

export default App;