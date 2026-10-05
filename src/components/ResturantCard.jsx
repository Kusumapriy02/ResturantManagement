import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addFavorite } from "../features/favoriteSlice";

function ResturantCard({ restaurant, onDelete }) {
  const dispatch = useDispatch();

  function handleFavorite() {
    dispatch(addFavorite(restaurant));
  }

  return (
    <div className="card">

      {/* Restaurant Image */}
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="restaurant-image"
      />

      {/* Restaurant Information */}
      <div className="card-content">

        <h3>{restaurant.name}</h3>

        <p>📍 {restaurant.location}</p>

        <p>🍴 {restaurant.cuisine}</p>

        <p>⭐ {restaurant.rating}</p>

        {/* Favorite Button */}
        <button
          className="favorite-btn"
          onClick={handleFavorite}
        >
          ❤️ Add to Favorites
        </button>

        {/* Action Buttons */}
        <div className="card-actions">

          {/* View */}
          <Link
            className="view-btn"
            to={`/restaurants/${restaurant.id}`}
          >
            👁️ View
          </Link>

          {/* Edit */}
          <Link
            className="edit-btn"
            to={`/edit-restaurant/${restaurant.id}`}
          >
            ✏️ Edit
          </Link>

          {/* Delete */}
          <button
            className="delete-btn"
            onClick={() => onDelete(restaurant.id)}
          >
            🗑️ Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default ResturantCard;