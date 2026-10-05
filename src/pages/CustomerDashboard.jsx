import { Link } from "react-router-dom";

function CustomerDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const location =
    localStorage.getItem("location") ||
    "Select your location";


  const restaurants = [
    {
      id: 1,
      name: "Spice Garden",
      cuisine: "Indian",
      rating: "4.5",
      location: "Visakhapatnam",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    },

    {
      id: 2,
      name: "Pizza House",
      cuisine: "Italian",
      rating: "4.4",
      location: "Visakhapatnam",
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498"
    },

    {
      id: 3,
      name: "Food Palace",
      cuisine: "Multi Cuisine",
      rating: "4.3",
      location: "Visakhapatnam",
      image:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f"
    }
  ];


  return (

    <div className="customer-page">


      {/* =========================
          WELCOME
      ========================= */}

      <section className="customer-hero">

        <div>

          <span className="customer-badge">
            🍽️ RESTAURANT MANAGEMENT
          </span>

          <h1>
            Welcome,
            <span>
              {" "}
              {user?.name || "Customer"}
            </span>
            ! 👋
          </h1>

          <p>
            Discover delicious food and
            restaurants around you.
          </p>


          {/* SEARCH */}

          <div className="customer-search">

            <span>
              🔍
            </span>

            <input
              placeholder="Search restaurants or dishes..."
            />

          </div>


          {/* LOCATION */}

          <div className="location-box">

            <span>
              📍
            </span>

            <div>

              <small>
                Delivering to
              </small>

              <strong>
                {location}
              </strong>

            </div>

            <button>
              Change
            </button>

          </div>

        </div>


        <div className="customer-hero-image">

          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
            alt="Restaurant"
          />

        </div>

      </section>


      {/* =========================
          CATEGORIES
      ========================= */}

      <section className="customer-section">

        <div className="section-title">

          <div>

            <span>
              EXPLORE
            </span>

            <h2>
              What are you craving?
            </h2>

          </div>

        </div>


        <div className="category-grid">

          <div className="category-card">
            <span>🍛</span>
            <h3>Indian</h3>
            <p>Traditional flavors</p>
          </div>

          <div className="category-card">
            <span>🍕</span>
            <h3>Pizza</h3>
            <p>Cheesy favorites</p>
          </div>

          <div className="category-card">
            <span>🍔</span>
            <h3>Burgers</h3>
            <p>Quick & delicious</p>
          </div>

          <div className="category-card">
            <span>🍰</span>
            <h3>Desserts</h3>
            <p>Sweet treats</p>
          </div>

        </div>

      </section>


      {/* =========================
          RESTAURANTS
      ========================= */}

      <section className="customer-section">

        <div className="section-title">

          <div>

            <span>
              NEAR YOU
            </span>

            <h2>
              Recommended Restaurants
            </h2>

          </div>

          <Link to="/restaurants">
            View All →
          </Link>

        </div>


        <div className="customer-restaurant-grid">

          {restaurants.map(
            (restaurant) => (

              <div
                className="customer-restaurant-card"
                key={restaurant.id}
              >

                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                />


                <div className="customer-card-content">

                  <div className="restaurant-rating">
                    ⭐ {restaurant.rating}
                  </div>

                  <h3>
                    {restaurant.name}
                  </h3>

                  <p>
                    🍴 {restaurant.cuisine}
                  </p>

                  <p>
                    📍 {restaurant.location}
                  </p>


                  <Link
                    to={`/restaurants/${restaurant.id}`}
                    className="restaurant-view-btn"
                  >
                    View Restaurant
                  </Link>

                </div>

              </div>

            )
          )}

        </div>

      </section>


      {/* =========================
          WHY CHOOSE US
      ========================= */}

      <section className="customer-benefits">

        <div className="benefit">

          <span>
            🍴
          </span>

          <div>

            <h3>
              Variety of Food
            </h3>

            <p>
              Explore different cuisines
              and restaurants.
            </p>

          </div>

        </div>


        <div className="benefit">

          <span>
            ❤️
          </span>

          <div>

            <h3>
              Save Favorites
            </h3>

            <p>
              Keep your favorite restaurants
              in one place.
            </p>

          </div>

        </div>


        <div className="benefit">

          <span>
            🛒
          </span>

          <div>

            <h3>
              Easy Ordering
            </h3>

            <p>
              Add your favorite dishes
              to your cart easily.
            </p>

          </div>

        </div>

      </section>

    </div>

  );
}

export default CustomerDashboard;