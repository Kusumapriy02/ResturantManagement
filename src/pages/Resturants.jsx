import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../features/favoriteSlice";

const defaultRestaurants = [
  {
    id: 1,
    name: "Spice Garden",
    cuisine: "Indian",
    location: "Bangalore",
    rating: 4.6,
    budget: "₹₹",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85",
    description:
      "Authentic Indian dishes prepared with fresh ingredients and traditional spices.",
  },
  {
    id: 2,
    name: "Pizza House",
    cuisine: "Italian",
    location: "Hyderabad",
    rating: 4.5,
    budget: "₹₹",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
    description:
      "Freshly baked pizzas, pasta and delicious Italian favourites.",
  },
  {
    id: 3,
    name: "Food Palace",
    cuisine: "Multi-Cuisine",
    location: "Chennai",
    rating: 4.7,
    budget: "₹₹₹",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85",
    description:
      "A premium multi-cuisine restaurant offering a variety of delicious meals.",
  },
];

function Resturants() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [cuisine, setCuisine] = useState("");
  const [location, setLocation] = useState("");

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites || []);

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  const isAdmin = user?.role === "admin";

  // --------------------------------------------------
  // LOAD RESTAURANTS
  // --------------------------------------------------

  useEffect(() => {
    const storedRestaurants = localStorage.getItem("restaurants");

    if (storedRestaurants) {
      try {
        const customRestaurants = JSON.parse(storedRestaurants);

        const combined = [
          ...defaultRestaurants,
          ...customRestaurants.filter(
            (custom) =>
              !defaultRestaurants.some(
                (defaultRestaurant) =>
                  String(defaultRestaurant.id) === String(custom.id)
              )
          ),
        ];

        setRestaurants(combined);
      } catch {
        setRestaurants(defaultRestaurants);
      }
    } else {
      setRestaurants(defaultRestaurants);
    }
  }, []);

  // --------------------------------------------------
  // SEARCH PARAM
  // --------------------------------------------------

  useEffect(() => {
    const searchFromUrl = searchParams.get("search") || "";
    setSearch(searchFromUrl);
  }, [searchParams]);

  const handleSearch = (value) => {
    setSearch(value);

    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  // --------------------------------------------------
  // FILTER OPTIONS
  // --------------------------------------------------

  const cuisines = useMemo(() => {
    return [...new Set(restaurants.map((restaurant) => restaurant.cuisine))]
      .filter(Boolean)
      .sort();
  }, [restaurants]);

  const locations = useMemo(() => {
    return [...new Set(restaurants.map((restaurant) => restaurant.location))]
      .filter(Boolean)
      .sort();
  }, [restaurants]);

  // --------------------------------------------------
  // FILTER RESTAURANTS
  // --------------------------------------------------

  const filteredRestaurants = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return restaurants.filter((restaurant) => {
      const matchesSearch =
        !searchText ||
        restaurant.name?.toLowerCase().includes(searchText) ||
        restaurant.cuisine?.toLowerCase().includes(searchText) ||
        restaurant.location?.toLowerCase().includes(searchText);

      const matchesCuisine =
        !cuisine || restaurant.cuisine === cuisine;

      const matchesLocation =
        !location || restaurant.location === location;

      return matchesSearch && matchesCuisine && matchesLocation;
    });
  }, [restaurants, search, cuisine, location]);

  // --------------------------------------------------
  // FAVORITES
  // --------------------------------------------------

  const isFavorite = (id) => {
    return favorites.some((item) => String(item.id) === String(id));
  };

  const handleFavorite = (restaurant) => {
    if (isFavorite(restaurant.id)) {
      dispatch(removeFavorite(restaurant.id));
    } else {
      dispatch(addFavorite(restaurant));
    }
  };

  // --------------------------------------------------
  // DELETE RESTAURANT
  // --------------------------------------------------

  const handleDelete = (restaurant) => {
    if (!isAdmin) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${restaurant.name}"?`
    );

    if (!confirmed) return;

    const storedRestaurants = localStorage.getItem("restaurants");

    let customRestaurants = [];

    try {
      customRestaurants = storedRestaurants
        ? JSON.parse(storedRestaurants)
        : [];
    } catch {
      customRestaurants = [];
    }

    const updatedRestaurants = customRestaurants.filter(
      (item) => String(item.id) !== String(restaurant.id)
    );

    localStorage.setItem(
      "restaurants",
      JSON.stringify(updatedRestaurants)
    );

    setRestaurants((current) =>
      current.filter(
        (item) => String(item.id) !== String(restaurant.id)
      )
    );
  };

  // --------------------------------------------------
  // RESET FILTERS
  // --------------------------------------------------

  const clearFilters = () => {
    setSearch("");
    setCuisine("");
    setLocation("");
    setSearchParams({});
  };

  return (
    <div className="restaurants-page">

      {/* ================= HEADER ================= */}

      <section className="restaurants-header">
        <div>
          <span className="restaurants-badge">
            {isAdmin ? "ADMIN MANAGEMENT" : "EXPLORE RESTAURANTS"}
          </span>

          <h1>
            {isAdmin
              ? "Restaurant Management"
              : "Find Your Favourite Restaurant"}
          </h1>

          <p>
            {isAdmin
              ? "Manage restaurants, update details and control your restaurant listings."
              : "Discover the best restaurants and delicious food near you."}
          </p>
        </div>

        {isAdmin && (
          <Link to="/add-restaurant" className="primary-btn">
            + Add Restaurant
          </Link>
        )}
      </section>

      {/* ================= FILTERS ================= */}

      <section className="restaurant-filters">

        <div className="restaurant-search">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search restaurant, cuisine or location..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        >
          <option value="">All Cuisines</option>

          {cuisines.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All Locations</option>

          {locations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {(search || cuisine || location) && (
          <button
            type="button"
            className="clear-filter-btn"
            onClick={clearFilters}
          >
            Clear
          </button>
        )}
      </section>

      {/* ================= RESULTS ================= */}

      <div className="restaurant-results-heading">
        <div>
          <h2>
            {isAdmin ? "All Restaurants" : "Restaurants"}
          </h2>

          <p>
            {filteredRestaurants.length} restaurant
            {filteredRestaurants.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* ================= RESTAURANT GRID ================= */}

      {filteredRestaurants.length > 0 ? (
        <div className="restaurant-grid">

          {filteredRestaurants.map((restaurant) => (
            <article
              className="restaurant-card"
              key={restaurant.id}
            >

              {/* IMAGE */}

              <div className="restaurant-card-image">

                <img
                  src={
                    restaurant.image ||
                    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85"
                  }
                  alt={restaurant.name}
                />

                <div className="restaurant-rating">
                  ⭐ {restaurant.rating || "4.5"}
                </div>

                <div className="restaurant-budget">
                  {restaurant.budget || "₹₹"}
                </div>

              </div>

              {/* CONTENT */}

              <div className="restaurant-card-content">

                <div className="restaurant-title-row">
                  <h3>{restaurant.name}</h3>

                  <button
                    type="button"
                    className={`favorite-btn ${
                      isFavorite(restaurant.id) ? "active" : ""
                    }`}
                    onClick={() => handleFavorite(restaurant)}
                    title={
                      isFavorite(restaurant.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    {isFavorite(restaurant.id) ? "❤️" : "♡"}
                  </button>
                </div>

                <p className="restaurant-cuisine">
                  {restaurant.cuisine}
                </p>

                <p className="restaurant-location">
                  📍 {restaurant.location}
                </p>

                <p className="restaurant-description">
                  {restaurant.description}
                </p>

                {/* ACTIONS */}

                <div className="restaurant-actions">

                  <Link
                    to={`/restaurants/${restaurant.id}`}
                    className="view-btn"
                  >
                    View Restaurant
                  </Link>

                  {isAdmin && (
                    <div className="admin-card-actions">

                      <Link
                        to={`/edit-restaurant/${restaurant.id}`}
                        className="edit-btn"
                      >
                        ✏️ Edit
                      </Link>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(restaurant)
                        }
                      >
                        🗑️ Delete
                      </button>

                    </div>
                  )}

                </div>

              </div>
            </article>
          ))}

        </div>
      ) : (
        <div className="no-restaurants">

          <div className="no-restaurants-icon">
            🔍
          </div>

          <h2>No restaurants found</h2>

          <p>
            Try changing your search or filter options.
          </p>

          <button
            type="button"
            className="primary-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>
      )}
    </div>
  );
}

export default Resturants;