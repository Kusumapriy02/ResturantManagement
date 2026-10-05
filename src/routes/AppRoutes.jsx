import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/logout";

import Restaurants from "../pages/Resturants";
import RestaurantDetails from "../pages/ResturantDetails";
import EditRestaurant from "../pages/EditResturant";

import Cart from "../pages/Cart";
import Order from "../pages/Order";
import Favorites from "../pages/Favorites";

// Protected Route
import ProtectedRoute from "./Protectedroute";


function AppRoutes() {
  return (
    <Routes>

      {/* =========================
          PUBLIC ROUTES
      ========================= */}

      {/* Home */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Register */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* Logout */}
      <Route
        path="/logout"
        element={<Logout />}
      />


      {/* =========================
          RESTAURANT ROUTES
      ========================= */}

      {/* All Restaurants */}
      <Route
        path="/restaurants"
        element={<Restaurants />}
      />

      {/* Restaurant Details */}
      <Route
        path="/restaurants/:id"
        element={<RestaurantDetails />}
      />

      {/* Edit Restaurant */}
      <Route
        path="/edit-restaurant/:id"
        element={
          <ProtectedRoute>
            <EditRestaurant />
          </ProtectedRoute>
        }
      />


      {/* =========================
          CUSTOMER ROUTES
      ========================= */}

      {/* Favorites */}
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />

      {/* Cart */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      {/* Orders */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        }
      />


      {/* =========================
          FALLBACK
      ========================= */}

      <Route
        path="*"
        element={
          <div className="not-found">
            <div className="not-found-card">
              <div className="not-found-icon">
                🍽️
              </div>

              <h1>404</h1>

              <h2>Page Not Found</h2>

              <p>
                Sorry, the page you are looking for
                doesn't exist.
              </p>

              <a href="/" className="primary-btn">
                Go Home
              </a>
            </div>
          </div>
        }
      />

    </Routes>
  );
}

export default AppRoutes;