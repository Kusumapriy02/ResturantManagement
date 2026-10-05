import React from "react";

function MenuCard({ item, onAddToCart }) {
  return (
    <div className="menu-card">
      <img
        src={
          item.image ||
          "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=900&q=85"
        }
        alt={item.name}
        className="menu-image"
      />

      <div className="menu-content">
        <div className="menu-top">
          <h3>{item.name}</h3>

          <span className="menu-price">
            ₹{item.price}
          </span>
        </div>

        <p className="menu-description">
          {item.description ||
            "Delicious food prepared specially for you."}
        </p>

        {item.category && (
          <span className="menu-category">
            {item.category}
          </span>
        )}

        <button
          className="add-cart-btn"
          onClick={() => onAddToCart(item)}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default MenuCard;