import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>🍽️ Restaurant Management</h2>
          <p>
            Discover delicious food, explore restaurants and enjoy
            a simple dining experience.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>📧 support@restaurant.com</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 Andhra Pradesh, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Restaurant Management. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;