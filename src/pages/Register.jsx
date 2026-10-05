import { useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

  const [error, setError] =
    useState("");


  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }


  function handleSubmit(e) {

    e.preventDefault();

    setError("");


    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {

      setError(
        "Please fill in all fields."
      );

      return;
    }


    if (
      formData.password !==
      formData.confirmPassword
    ) {

      setError(
        "Passwords do not match."
      );

      return;
    }


    if (formData.password.length < 6) {

      setError(
        "Password must contain at least 6 characters."
      );

      return;
    }


    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];


    const email =
      formData.email
        .trim()
        .toLowerCase();


    const existingUser =
      users.find(
        (user) =>
          user.email === email
      );


    if (existingUser) {

      setError(
        "An account with this email already exists."
      );

      return;
    }


    const newUser = {

      id: Date.now(),

      name:
        formData.name.trim(),

      email,

      password:
        formData.password,

      role: "customer"

    };


    users.push(newUser);


    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );


    alert(
      "Account created successfully!"
    );


    navigate("/login");

  }


  return (

    <div className="auth-page">

      <div className="auth-wrapper">


        {/* LEFT SIDE */}

        <div className="auth-info">

          <div className="auth-logo">
            🍽️
          </div>

          <h1>
            Join Us Today!
          </h1>

          <p>
            Create your account and start
            discovering amazing restaurants
            and delicious food.
          </p>

          <div className="auth-features">

            <div>
              🍴 Discover Restaurants
            </div>

            <div>
              ❤️ Save Your Favorites
            </div>

            <div>
              📦 Manage Your Orders
            </div>

          </div>

        </div>


        {/* REGISTER CARD */}

        <div className="auth-card">

          <h2>
            Create Account
          </h2>

          <p className="auth-subtitle">
            Register as a customer
          </p>


          {error && (
            <div className="error-message">
              {error}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />

            </div>


            <button
              type="submit"
              className="submit-btn"
            >
              Create Account
            </button>

          </form>


          <p className="auth-link">

            Already have an account?

            {" "}

            <Link to="/login">
              Sign In
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;