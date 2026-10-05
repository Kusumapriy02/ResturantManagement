import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../features/favoriteslice";

function Favorites() {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state) => state.favorites || []
  );

  return (
    <div className="favorites-container">

      <h1>❤️ Favorite Restaurants</h1>

      {favorites.length === 0 ? (

        <div className="empty-favorites">
          <h2>No Favorite Restaurants</h2>

          <p>
            Add restaurants from the Restaurants page.
          </p>
        </div>

      ) : (

        <div className="favorites-grid">

          {favorites.map((restaurant) => (

            <div
              className="favorite-card"
              key={restaurant.id}
            >

              <img
                src={
                  restaurant.image ||
                  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85"
                }
                alt={restaurant.name}
              />

              <div className="favorite-content">

                <h2>{restaurant.name}</h2>

                <p>
                  📍 {restaurant.location}
                </p>

                <p>
                  🍴 {restaurant.cuisine}
                </p>

                <p>
                  ⭐ {restaurant.rating}
                </p>

                <button
                  type="button"
                  className="remove-favorite-btn"
                  onClick={() =>
                    dispatch(removeFavorite(restaurant.id))
                  }
                >
                  Remove Favorite
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Favorites;