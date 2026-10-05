import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    const enteredEmail = email.trim().toLowerCase();
    const enteredPassword = password.trim();

    /* =========================================
       DEMO ADMIN LOGIN
    ========================================= */

    if (
      enteredEmail === "admin@restaurant.com" &&
      enteredPassword === "admin123"
    ) {
      const adminUser = {
        id: "admin-001",
        name: "Admin",
        email: "admin@restaurant.com",
        role: "admin",
      };

      localStorage.setItem("user", JSON.stringify(adminUser));

      // IMPORTANT: exact route
      navigate("/admin-dashboard", { replace: true });

      return;
    }

    /* =========================================
       REGISTERED USERS
    ========================================= */

    let users = [];

    try {
      users = JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      users = [];
    }

    const foundUser = users.find(
      (user) =>
        String(user.email || "").toLowerCase() === enteredEmail &&
        String(user.password || "") === enteredPassword
    );

    if (!foundUser) {
      setError("Invalid email or password.");
      return;
    }

    const loggedInUser = {
      id: foundUser.id || Date.now().toString(),
      name: foundUser.name || "Customer",
      email: foundUser.email,
      role: foundUser.role === "admin" ? "admin" : "customer",
    };

    localStorage.setItem("user", JSON.stringify(loggedInUser));

    if (loggedInUser.role === "admin") {
      navigate("/admin-dashboard", { replace: true });
    } else {
      navigate("/customer", { replace: true });
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">

        <div className="login-visual">
          <div className="login-visual-overlay"></div>

          <div className="login-visual-content">
            <div className="login-brand">
              🍽️ Restaurant Management
            </div>

            <div className="login-welcome-badge">
              WELCOME BACK
            </div>

            <h1>
              Manage your restaurants
              <br />
              with ease.
            </h1>

            <p>
              Access your restaurant management system,
              explore restaurants and manage your orders
              from one place.
            </p>

            <div className="login-features">
              <div className="login-feature">
                <span>✓</span>
                <div>
                  <strong>Easy Management</strong>
                  <small>Manage restaurants effortlessly</small>
                </div>
              </div>

              <div className="login-feature">
                <span>✓</span>
                <div>
                  <strong>Quick Access</strong>
                  <small>Access your dashboard instantly</small>
                </div>
              </div>

              <div className="login-feature">
                <span>✓</span>
                <div>
                  <strong>Secure System</strong>
                  <small>Your account stays protected</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="login-form-section">
          <div className="login-form-card">

            <div className="login-mobile-logo">
              🍽️
            </div>

            <div className="login-heading">
              <span className="login-small-title">
                ACCOUNT LOGIN
              </span>

              <h2>Welcome back!</h2>

              <p>
                Login to continue to Restaurant Management.
              </p>
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>

              <div className="login-form-group">
                <label>Email Address</label>

                <div className="login-input-wrapper">
                  <span className="login-input-icon">
                    ✉️
                  </span>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="login-form-group">
                <label>Password</label>

                <div className="login-input-wrapper">
                  <span className="login-input-icon">
                    🔒
                  </span>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="login-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                className="login-submit-btn"
              >
                Login
              </button>
            </form>

            <div className="login-register">
              Don't have an account?{" "}
              <Link to="/register">
                Create account
              </Link>
            </div>

            <div className="login-demo">
              <strong>Demo Admin Login</strong>

              <p>
                Email: admin@restaurant.com
              </p>

              <p>
                Password: admin123
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;