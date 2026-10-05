import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const [adminOpen, setAdminOpen] = useState(false);

  const adminMenuRef = useRef(null);

  // ================= USER =================

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch {
    user = null;
  }

  const isCustomer = user?.role === "customer";
  const isAdmin = user?.role === "admin";

  // ================= FAVORITES =================

  const favorites = useSelector(
    (state) => state.favorites || []
  );

  // ================= CART =================

  let cart = [];

  try {
    cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
  } catch {
    cart = [];
  }

  const cartCount = cart.reduce(
    (total, item) =>
      total + (Number(item.quantity) || 1),
    0
  );

  // ================= CLOSE ADMIN MENU =================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        adminMenuRef.current &&
        !adminMenuRef.current.contains(event.target)
      ) {
        setAdminOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ================= NAVBAR =================

  return (
    <nav className="navbar">

      {/* ================= LOGO ================= */}

      <div className="navbar-brand">
        <Link to="/">
          🍽️ Restaurant Management
        </Link>
      </div>

      {/* ================= NAV LINKS ================= */}

      <div className="nav-links">

        {/* COMMON */}

        <Link to="/">
          Home
        </Link>

        <Link to="/restaurants">
          Restaurants
        </Link>

        {/* ================= CUSTOMER ================= */}

        {isCustomer && (
          <>
            <Link to="/favorites">
              ❤️ Favorites

              {favorites.length > 0 && (
                <span className="nav-count">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link to="/cart">
              🛒 Cart

              {cartCount > 0 && (
                <span className="nav-count">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              className="profile-link"
            >
              👤 {user.name || "Profile"}
            </Link>

            <Link to="/logout">
              Logout
            </Link>
          </>
        )}

        {/* ================= ADMIN ================= */}

        {isAdmin && (
          <>
            <Link to="/add-restaurant">
              Add Restaurant
            </Link>

            <Link to="/orders">
              Orders
            </Link>

            {/* ADMIN DROPDOWN */}

            <div
              className="admin-menu-wrapper"
              ref={adminMenuRef}
            >

              <button
                type="button"
                className="admin-menu-button"
                onClick={() =>
                  setAdminOpen(!adminOpen)
                }
              >
                👨‍💼 Admin

                <span
                  className={`admin-arrow ${
                    adminOpen ? "open" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {adminOpen && (
                <div className="admin-dropdown">

                  {/* ADMIN HEADER */}

                  <div className="admin-dropdown-header">

                    <div className="admin-avatar">
                      👨‍💼
                    </div>

                    <div>
                      <strong>
                        {user.name || "Admin"}
                      </strong>

                      <span>
                        Administrator
                      </span>
                    </div>

                  </div>

                  <div className="admin-dropdown-divider" />

                  {/* DASHBOARD */}

                  <Link
                    to="/admin-dashboard"
                    onClick={() =>
                      setAdminOpen(false)
                    }
                  >
                    📊
                    <span>
                      Dashboard
                    </span>
                  </Link>

                  {/* RESTAURANTS */}

                  <Link
                    to="/restaurants"
                    onClick={() =>
                      setAdminOpen(false)
                    }
                  >
                    🏪
                    <span>
                      Manage Restaurants
                    </span>
                  </Link>

                  {/* ADD RESTAURANT */}

                  <Link
                    to="/add-restaurant"
                    onClick={() =>
                      setAdminOpen(false)
                    }
                  >
                    ➕
                    <span>
                      Add Restaurant
                    </span>
                  </Link>

                  {/* ORDERS */}

                  <Link
                    to="/orders"
                    onClick={() =>
                      setAdminOpen(false)
                    }
                  >
                    📦
                    <span>
                      Manage Orders
                    </span>
                  </Link>

                  <div className="admin-dropdown-divider" />

                  {/* LOGOUT */}

                  <Link
                    to="/logout"
                    className="admin-logout"
                    onClick={() =>
                      setAdminOpen(false)
                    }
                  >
                    🚪
                    <span>
                      Logout
                    </span>
                  </Link>

                </div>
              )}

            </div>
          </>
        )}

        {/* ================= GUEST ================= */}

        {!isCustomer && !isAdmin && (
          <>
            <Link to="/register">
              Register
            </Link>

            <Link to="/login">
              Login
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;