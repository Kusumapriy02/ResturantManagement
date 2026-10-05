import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [selectedLocation, setSelectedLocation] =
    useState(
      localStorage.getItem("location") ||
        "Visakhapatnam"
    );

  const locations = [
    "Visakhapatnam",
    "Vijayawada",
    "Hyderabad",
    "Bengaluru",
    "Chennai",
  ];

  const restaurants = [
    {
      id: "1",
      name: "Spice Garden",
      cuisine: "Indian",
      rating: "4.5",
      location: "Visakhapatnam",
      budget: "₹₹",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
    },
    {
      id: "2",
      name: "Pizza House",
      cuisine: "Italian",
      rating: "4.4",
      location: "Visakhapatnam",
      budget: "₹₹",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85",
    },
    {
      id: "3",
      name: "Food Palace",
      cuisine: "Multi Cuisine",
      rating: "4.3",
      location: "Vijayawada",
      budget: "₹₹₹",
      image:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=85",
    },
  ];

  useEffect(() => {
    localStorage.setItem(
      "location",
      selectedLocation
    );
  }, [selectedLocation]);

  function handleSearch(e) {
    e.preventDefault();

    if (!search.trim()) {
      navigate("/restaurants");
      return;
    }

    navigate(
      `/restaurants?search=${encodeURIComponent(
        search
      )}`
    );
  }

  function handleLocationChange(e) {
    const location = e.target.value;

    setSelectedLocation(location);

    localStorage.setItem(
      "location",
      location
    );
  }

  const recommendedRestaurants =
    restaurants.filter(
      (restaurant) =>
        restaurant.location ===
        selectedLocation
    );

  return (
    <div className="home-page">

      {/* ================= HERO ================= */}

      <section className="home-hero">

        <div className="home-hero-content">

          <span className="home-badge">
            🍽️ RESTAURANT MANAGEMENT
          </span>

          <h1>
            Discover Great Food.
            <br />
            <span>
              Enjoy Great Experiences.
            </span>
          </h1>

          <p>
            Find the best restaurants around
            you, explore their menus and enjoy
            delicious food with a simple dining
            experience.
          </p>

          {/* SEARCH */}

          <form
            className="home-search"
            onSubmit={handleSearch}
          >
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search restaurants or cuisine..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <button type="submit">
              Search
            </button>
          </form>


          {/* LOCATION */}

          <div className="home-location">

            <span className="location-icon">
              📍
            </span>

            <div className="location-content">
              <small>
                Your location
              </small>

              <strong>
                {selectedLocation}
              </strong>
            </div>

            <select
              value={selectedLocation}
              onChange={handleLocationChange}
              className="location-select"
            >
              {locations.map(
                (location) => (
                  <option
                    key={location}
                    value={location}
                  >
                    {location}
                  </option>
                )
              )}
            </select>

          </div>


          {/* ONLY ONE BUTTON */}

          <div className="home-actions">

            <Link
              to="/restaurants"
              className="home-primary-btn"
            >
              Explore Restaurants →
            </Link>

          </div>

        </div>


        {/* HERO IMAGE */}

        <div className="home-hero-image">

          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxKmAi4oj_pAs2jIczB_8JTmUIxzFOZiAl_IPHTEwbCA&s=10"
            alt="Delicious restaurant food"
          />

          <div className="hero-image-card">
            <span>⭐</span>

            <div>
              <strong>
                Great Food
              </strong>

              <small>
                Fresh & delicious
              </small>
            </div>
          </div>

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section className="home-section">

        <div className="home-section-heading">

          <span>
            EXPLORE
          </span>

          <h2>
            What are you craving?
          </h2>

          <p>
            Explore different cuisines and
            discover something delicious.
          </p>

        </div>


        <div className="home-category-grid">

          <div className="home-category-card">
            <div>🍛</div>
            <h3>Indian</h3>
            <p>
              Traditional flavors
            </p>
          </div>

          <div className="home-category-card">
            <div>🍕</div>
            <h3>Pizza</h3>
            <p>
              Cheesy favorites
            </p>
          </div>

          <div className="home-category-card">
            <div>🍔</div>
            <h3>Burgers</h3>
            <p>
              Quick & delicious
            </p>
          </div>

          <div className="home-category-card">
            <div>🍰</div>
            <h3>Desserts</h3>
            <p>
              Sweet treats
            </p>
          </div>

        </div>

      </section>


      {/* ================= RESTAURANTS ================= */}

      <section className="home-section restaurants-preview">

        <div className="home-section-heading-row">

          <div>
            <span>
              POPULAR PLACES
            </span>

            <h2>
              Restaurants Near You
            </h2>

            <p>
              Showing restaurants in{" "}
              <strong>
                {selectedLocation}
              </strong>
            </p>
          </div>

          <Link to="/restaurants">
            View All →
          </Link>

        </div>


        <div className="home-restaurant-grid">

          {(recommendedRestaurants.length > 0
            ? recommendedRestaurants
            : restaurants
          ).map((restaurant) => (

            <div
              className="home-restaurant-card"
              key={restaurant.id}
            >

              {/* IMAGE */}

              <div className="home-card-image">

                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                />

                <span className="home-card-rating">
                  ⭐ {restaurant.rating}
                </span>

              </div>


              {/* CONTENT */}

              <div className="home-restaurant-content">

                <div className="home-card-top">

                  <h3>
                    {restaurant.name}
                  </h3>

                  <span>
                    {restaurant.budget}
                  </span>

                </div>

                <p>
                  🍴 {restaurant.cuisine}
                </p>

                <p>
                  📍 {restaurant.location}
                </p>


                <Link
                  to={`/restaurants/${restaurant.id}`}
                  className="restaurant-view-link"
                >
                  View Restaurant
                  <span>→</span>
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="how-section">

        <div className="home-section-heading">

          <span>
            SIMPLE & EASY
          </span>

          <h2>
            How It Works
          </h2>

        </div>


        <div className="how-grid">

          <div className="how-card">
            <div className="how-number">
              01
            </div>

            <h3>
              Find a Restaurant
            </h3>

            <p>
              Search and explore restaurants
              based on cuisine, rating and
              location.
            </p>
          </div>


          <div className="how-card">
            <div className="how-number">
              02
            </div>

            <h3>
              Explore the Menu
            </h3>

            <p>
              Open a restaurant and browse
              its available food items.
            </p>
          </div>


          <div className="how-card">
            <div className="how-number">
              03
            </div>

            <h3>
              Add to Cart
            </h3>

            <p>
              Select your favorite dishes
              and add them to your cart.
            </p>
          </div>


          <div className="how-card">
            <div className="how-number">
              04
            </div>

            <h3>
              Enjoy Your Food
            </h3>

            <p>
              Place your order and enjoy
              a simple dining experience.
            </p>
          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="home-cta">

        <div>

          <h2>
            Ready to discover your next
            favorite restaurant?
          </h2>

          <p>
            Explore restaurants and find
            something delicious today.
          </p>

        </div>

        <Link
          to="/restaurants"
          className="home-primary-btn"
        >
          Browse Restaurants
        </Link>

      </section>

    </div>
  );
}

export default Home;