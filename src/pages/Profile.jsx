import { Link } from "react-router-dom";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );


  if (!user) {
    return null;
  }


  const location =
    localStorage.getItem("location") ||
    "Visakhapatnam";


  return (

    <div className="profile-page">

      <div className="profile-wrapper">

        {/* ================= PROFILE HEADER ================= */}

        <section className="profile-header">

          <div className="profile-avatar">

            {user.name
              ? user.name
                  .charAt(0)
                  .toUpperCase()
              : "U"}

          </div>


          <div>

            <span className="profile-badge">
              CUSTOMER ACCOUNT
            </span>

            <h1>
              {user.name}
            </h1>

            <p>
              Welcome back! Manage your
              account and orders here.
            </p>

          </div>

        </section>


        {/* ================= PERSONAL INFO ================= */}

        <section className="profile-section">

          <div className="profile-section-title">

            <div>
              <span>ACCOUNT</span>

              <h2>
                Personal Information
              </h2>
            </div>

          </div>


          <div className="profile-info-grid">

            <div className="profile-info-card">

              <span>
                👤 Full Name
              </span>

              <strong>
                {user.name}
              </strong>

            </div>


            <div className="profile-info-card">

              <span>
                📧 Email Address
              </span>

              <strong>
                {user.email}
              </strong>

            </div>


            <div className="profile-info-card">

              <span>
                📍 Delivery Location
              </span>

              <strong>
                {location}
              </strong>

            </div>


            <div className="profile-info-card">

              <span>
                ⭐ Account Type
              </span>

              <strong>
                Customer
              </strong>

            </div>

          </div>

        </section>


        {/* ================= QUICK ACTIONS ================= */}

        <section className="profile-section">

          <div className="profile-section-title">

            <div>

              <span>
                QUICK ACCESS
              </span>

              <h2>
                Your Activity
              </h2>

            </div>

          </div>


          <div className="profile-actions-grid">

            <Link
              to="/orders"
              className="profile-action-card"
            >

              <div className="profile-action-icon">
                📦
              </div>

              <div>

                <h3>
                  My Orders
                </h3>

                <p>
                  View your previous orders
                  and order status.
                </p>

              </div>

              <span>
                →
              </span>

            </Link>


            <Link
              to="/favorites"
              className="profile-action-card"
            >

              <div className="profile-action-icon">
                ❤️
              </div>

              <div>

                <h3>
                  My Favorites
                </h3>

                <p>
                  View your favorite restaurants.
                </p>

              </div>

              <span>
                →
              </span>

            </Link>


            <Link
              to="/restaurants"
              className="profile-action-card"
            >

              <div className="profile-action-icon">
                🍽️
              </div>

              <div>

                <h3>
                  Explore Restaurants
                </h3>

                <p>
                  Discover restaurants and
                  explore their menus.
                </p>

              </div>

              <span>
                →
              </span>

            </Link>

          </div>

        </section>


        {/* ================= ACCOUNT ACTION ================= */}

        <section className="profile-bottom">

          <div>

            <h3>
              Ready for something delicious?
            </h3>

            <p>
              Explore restaurants and discover
              your next favorite dish.
            </p>

          </div>


          <Link
            to="/restaurants"
            className="primary-btn"
          >
            Explore Restaurants
          </Link>

        </section>

      </div>

    </div>

  );
}

export default Profile;