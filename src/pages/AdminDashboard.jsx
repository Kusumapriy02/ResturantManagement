import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const defaultRestaurants = [
  {
    id: 1,
    name: "Spice Garden",
    cuisine: "Indian",
    location: "Bangalore",
  },
  {
    id: 2,
    name: "Pizza House",
    cuisine: "Italian",
    location: "Hyderabad",
  },
  {
    id: 3,
    name: "Food Palace",
    cuisine: "Multi-Cuisine",
    location: "Chennai",
  },
];

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // -----------------------------
  // RESTAURANTS
  // -----------------------------

  let customRestaurants = [];

  try {
    customRestaurants = JSON.parse(
      localStorage.getItem("restaurants") || "[]"
    );
  } catch {
    customRestaurants = [];
  }

  const restaurants = useMemo(() => {
    const combined = [...defaultRestaurants, ...customRestaurants];

    return combined.filter(
      (restaurant, index, self) =>
        index ===
        self.findIndex(
          (item) => String(item.id) === String(restaurant.id)
        )
    );
  }, []);

  // -----------------------------
  // USERS
  // -----------------------------

  let users = [];

  try {
    users = JSON.parse(localStorage.getItem("users") || "[]");
  } catch {
    users = [];
  }

  const customers = users.filter(
    (item) => item.role === "customer"
  );

  // -----------------------------
  // ORDERS
  // -----------------------------

  let orders = [];

  try {
    orders = JSON.parse(localStorage.getItem("orders") || "[]");
  } catch {
    orders = [];
  }

  const totalRevenue = orders.reduce((total, order) => {
    const amount =
      Number(order.total) ||
      Number(order.amount) ||
      Number(order.totalAmount) ||
      0;

    return total + amount;
  }, 0);

  // -----------------------------
  // ORDER STATUS
  // -----------------------------

  const statusCount = {
    Pending: 0,
    Confirmed: 0,
    Preparing: 0,
    "Out for Delivery": 0,
    Delivered: 0,
    Cancelled: 0,
  };

  orders.forEach((order) => {
    const status = order.status || "Pending";

    if (statusCount[status] !== undefined) {
      statusCount[status]++;
    }
  });

  const recentOrders = [...orders].reverse().slice(0, 5);
  const recentRestaurants = [...restaurants].reverse().slice(0, 5);

  // -----------------------------
  // DATE
  // -----------------------------

  const formatDate = (date) => {
    if (!date) return "Recently";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Recently";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="admin-dashboard">

      {/* ================= HEADER ================= */}

      <section className="admin-dashboard-header">

        <div>
          <span className="admin-dashboard-badge">
            ADMIN PANEL
          </span>

          <h1>Dashboard Overview</h1>

          <p>
            Welcome back, {user?.name || "Admin"}.
            Here's what's happening with your restaurant system.
          </p>
        </div>

        <div className="admin-header-actions">
          <Link
            to="/add-restaurant"
            className="admin-primary-btn"
          >
            + Add Restaurant
          </Link>

          <Link
            to="/orders"
            className="admin-secondary-btn"
          >
            View Orders
          </Link>
        </div>

      </section>

      {/* ================= STAT CARDS ================= */}

      <section className="admin-stats-grid">

        <div className="admin-stat-card">

          <div className="admin-stat-icon restaurant-icon">
            🏪
          </div>

          <div>
            <span>Total Restaurants</span>
            <strong>{restaurants.length}</strong>
            <small>Available restaurants</small>
          </div>

        </div>

        <div className="admin-stat-card">

          <div className="admin-stat-icon order-icon">
            📦
          </div>

          <div>
            <span>Total Orders</span>
            <strong>{orders.length}</strong>
            <small>Orders received</small>
          </div>

        </div>

        <div className="admin-stat-card">

          <div className="admin-stat-icon customer-icon">
            👥
          </div>

          <div>
            <span>Total Customers</span>
            <strong>{customers.length}</strong>
            <small>Registered customers</small>
          </div>

        </div>

        <div className="admin-stat-card">

          <div className="admin-stat-icon revenue-icon">
            💰
          </div>

          <div>
            <span>Total Revenue</span>
            <strong>
              ₹{totalRevenue.toLocaleString("en-IN")}
            </strong>
            <small>From all orders</small>
          </div>

        </div>

      </section>

      {/* ================= QUICK ACTIONS ================= */}

      <section className="admin-dashboard-section">

        <div className="admin-section-heading">
          <div>
            <h2>Quick Actions</h2>
            <p>Frequently used management options</p>
          </div>
        </div>

        <div className="admin-quick-grid">

          <Link
            to="/add-restaurant"
            className="admin-quick-card"
          >
            <div className="quick-icon">➕</div>

            <div>
              <h3>Add Restaurant</h3>
              <p>Create a new restaurant listing</p>
            </div>

            <span>→</span>
          </Link>

          <Link
            to="/restaurants"
            className="admin-quick-card"
          >
            <div className="quick-icon">🏪</div>

            <div>
              <h3>Manage Restaurants</h3>
              <p>Edit or remove restaurant listings</p>
            </div>

            <span>→</span>
          </Link>

          <Link
            to="/orders"
            className="admin-quick-card"
          >
            <div className="quick-icon">📦</div>

            <div>
              <h3>Manage Orders</h3>
              <p>View and manage customer orders</p>
            </div>

            <span>→</span>
          </Link>

          <div className="admin-quick-card">

            <div className="quick-icon">👥</div>

            <div>
              <h3>Customers</h3>
              <p>{customers.length} registered customers</p>
            </div>

            <span>→</span>

          </div>

        </div>

      </section>

      {/* ================= MAIN CONTENT ================= */}

      <section className="admin-dashboard-columns">

        {/* RECENT ORDERS */}

        <div className="admin-panel-card">

          <div className="admin-panel-header">

            <div>
              <h2>Recent Orders</h2>
              <p>Latest customer orders</p>
            </div>

            <Link to="/orders">
              View All →
            </Link>

          </div>

          {recentOrders.length > 0 ? (

            <div className="admin-orders-list">

              {recentOrders.map((order, index) => {

                const status = order.status || "Pending";

                return (
                  <div
                    className="admin-order-row"
                    key={order.id || index}
                  >

                    <div className="admin-order-number">
                      <div>📦</div>

                      <section>
                        <strong>
                          #{order.id || `ORD-${index + 1}`}
                        </strong>

                        <span>
                          {order.customerName ||
                            order.userName ||
                            order.customer?.name ||
                            "Customer"}
                        </span>
                      </section>
                    </div>

                    <div className="admin-order-date">
                      {formatDate(
                        order.createdAt ||
                        order.date ||
                        order.createdDate
                      )}
                    </div>

                    <span
                      className={`admin-order-status ${status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {status}
                    </span>

                    <strong className="admin-order-amount">
                      ₹
                      {(
                        Number(order.total) ||
                        Number(order.amount) ||
                        Number(order.totalAmount) ||
                        0
                      ).toLocaleString("en-IN")}
                    </strong>

                  </div>
                );
              })}

            </div>

          ) : (

            <div className="admin-empty-state">
              <div>📦</div>
              <h3>No orders yet</h3>
              <p>
                Customer orders will appear here.
              </p>
            </div>

          )}

        </div>

        {/* ORDER STATUS */}

        <div className="admin-panel-card">

          <div className="admin-panel-header">

            <div>
              <h2>Order Status</h2>
              <p>Current order distribution</p>
            </div>

          </div>

          <div className="admin-status-list">

            <div className="admin-status-item">
              <span>
                <i className="status-dot pending-dot"></i>
                Pending
              </span>

              <strong>{statusCount.Pending}</strong>
            </div>

            <div className="admin-status-item">
              <span>
                <i className="status-dot confirmed-dot"></i>
                Confirmed
              </span>

              <strong>{statusCount.Confirmed}</strong>
            </div>

            <div className="admin-status-item">
              <span>
                <i className="status-dot preparing-dot"></i>
                Preparing
              </span>

              <strong>{statusCount.Preparing}</strong>
            </div>

            <div className="admin-status-item">
              <span>
                <i className="status-dot delivery-dot"></i>
                Out for Delivery
              </span>

              <strong>{statusCount["Out for Delivery"]}</strong>
            </div>

            <div className="admin-status-item">
              <span>
                <i className="status-dot delivered-dot"></i>
                Delivered
              </span>

              <strong>{statusCount.Delivered}</strong>
            </div>

            <div className="admin-status-item">
              <span>
                <i className="status-dot cancelled-dot"></i>
                Cancelled
              </span>

              <strong>{statusCount.Cancelled}</strong>
            </div>

          </div>

        </div>

      </section>

      {/* ================= RECENT RESTAURANTS ================= */}

      <section className="admin-dashboard-section">

        <div className="admin-section-heading">

          <div>
            <h2>Restaurants</h2>
            <p>Recently available restaurants</p>
          </div>

          <Link to="/restaurants">
            Manage Restaurants →
          </Link>

        </div>

        <div className="admin-restaurant-list">

          {recentRestaurants.map((restaurant) => (

            <div
              className="admin-restaurant-row"
              key={restaurant.id}
            >

              <div className="admin-restaurant-avatar">
                🍽️
              </div>

              <div className="admin-restaurant-info">

                <strong>{restaurant.name}</strong>

                <span>
                  {restaurant.cuisine || "Multi-Cuisine"}
                </span>

              </div>

              <span className="admin-restaurant-location">
                📍 {restaurant.location || "Location"}
              </span>

              <Link
                to={`/restaurants/${restaurant.id}`}
                className="admin-view-btn"
              >
                View
              </Link>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default AdminDashboard;