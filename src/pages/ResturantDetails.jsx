import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MenuCard from "../components/MenuCard";

function RestaurantDetails() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  const defaultRestaurants = [
    {
      id: "1",
      name: "Spice Garden",
      location: "Visakhapatnam",
      cuisine: "Indian",
      rating: "4.5",
      budget: "₹₹",
      phone: "+91 98765 43210",
      openingHours: "11:00 AM - 10:30 PM",
      address: "Beach Road, Visakhapatnam",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=90",
      description:
        "Authentic Indian dishes prepared with traditional spices, fresh ingredients and rich flavors.",
      menu: {
        Starters: [
          {
            id: "1-s1",
            name: "Garlic Bread",
            price: 150,
            category: "Starters",
            description:
              "Freshly baked garlic bread with herbs and butter.",
            image:
              
  "https://images.unsplash.com/photo-1556008531-57e6eefc7be4?auto=format&fit=crop&w=900&q=85"
          },
          {
            id: "1-s2",
            name: "Paneer Tikka",
            price: 220,
            category: "Starters",
            description:
              "Soft paneer marinated with Indian spices and grilled to perfection.",
            image:
              "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=85",
          },
        ],

        "Main Course": [
          {
            id: "1-m1",
            name: "Butter Chicken",
            price: 320,
            category: "Main Course",
            description:
              "Creamy tomato-based chicken curry with aromatic Indian spices.",
            image:
              "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85",
          },
          {
            id: "1-m2",
            name: "Paneer Butter Masala",
            price: 280,
            category: "Main Course",
            description:
              "Paneer cooked in a rich, creamy and mildly spiced gravy.",
            image:
              "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=85",
          },
        ],

        Rice: [
          {
            id: "1-r1",
            name: "Chicken Biryani",
            price: 300,
            category: "Rice",
            description:
              "Fragrant basmati rice cooked with chicken and traditional biryani spices.",
            image:
              "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=85",
          },
          {
            id: "1-r2",
            name: "Veg Biryani",
            price: 240,
            category: "Rice",
            description:
              "Aromatic basmati rice cooked with fresh vegetables and spices.",
            image:
              "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=85",
          },
        ],

        Desserts: [
          {
            id: "1-d1",
            name: "Gulab Jamun",
            price: 120,
            category: "Desserts",
            description:
              "Soft and warm gulab jamuns served with sweet syrup.",
            image:
              "https://images.unsplash.com/photo-1666190094767-7e6c6f5f9e6a?auto=format&fit=crop&w=900&q=85",
          },
          {
            id: "1-d2",
            name: "Ice Cream",
            price: 100,
            category: "Desserts",
            description:
              "Creamy and refreshing ice cream for a perfect finish.",
            image:
              "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=900&q=85",
          },
        ],
      },
    },

    {
      id: "2",
      name: "Pizza House",
      location: "Visakhapatnam",
      cuisine: "Italian",
      rating: "4.4",
      budget: "₹₹",
      phone: "+91 98765 12345",
      openingHours: "11:00 AM - 11:00 PM",
      address: "MVP Colony, Visakhapatnam",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=90",
      description:
        "Freshly baked pizzas, pasta and delicious Italian favorites made with quality ingredients.",
      menu: {
        Starters: [
          {
            id: "2-s1",
            name: "Bruschetta",
            price: 180,
            category: "Starters",
            description:
              "Toasted bread topped with tomato, basil and olive oil.",
            image:
              "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=900&q=85",
          },
        ],

        "Main Course": [
          {
            id: "2-m1",
            name: "Margherita Pizza",
            price: 280,
            category: "Main Course",
            description:
              "Classic pizza with tomato sauce, mozzarella and fresh basil.",
            image:
              "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
          },
          {
            id: "2-m2",
            name: "Farmhouse Pizza",
            price: 350,
            category: "Main Course",
            description:
              "Loaded pizza with fresh vegetables, cheese and herbs.",
            image:
              "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
          },
        ],

        Rice: [
          {
            id: "2-r1",
            name: "Italian Herb Rice",
            price: 220,
            category: "Rice",
            description:
              "Fragrant rice tossed with Italian herbs and vegetables.",
            image:
              "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=900&q=85",
          },
        ],

        Desserts: [
          {
            id: "2-d1",
            name: "Tiramisu",
            price: 220,
            category: "Desserts",
            description:
              "Classic Italian dessert layered with coffee and cream.",
            image:
              "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85",
          },
        ],
      },
    },

    {
      id: "3",
      name: "Food Palace",
      location: "Vijayawada",
      cuisine: "Multi Cuisine",
      rating: "4.3",
      budget: "₹₹₹",
      phone: "+91 98765 67890",
      openingHours: "10:30 AM - 11:00 PM",
      address: "MG Road, Vijayawada",
      image:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=90",
      description:
        "Enjoy a wide variety of Indian, Chinese and continental dishes in a comfortable atmosphere.",
      menu: {
        Starters: [
          {
            id: "3-s1",
            name: "Spring Rolls",
            price: 180,
            category: "Starters",
            description:
              "Crispy rolls filled with fresh vegetables.",
            image:
              "https://images.unsplash.com/photo-1548507200-bbe7e8a3e6b1?auto=format&fit=crop&w=900&q=85",
          },
        ],

        "Main Course": [
          {
            id: "3-m1",
            name: "Chicken Noodles",
            price: 250,
            category: "Main Course",
            description:
              "Stir-fried noodles with chicken and fresh vegetables.",
            image:
              "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=900&q=85",
          },
        ],

        Rice: [
          {
            id: "3-r1",
            name: "Fried Rice",
            price: 220,
            category: "Rice",
            description:
              "Flavorful fried rice with vegetables and aromatic seasoning.",
            image:
              "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=85",
          },
        ],

        Desserts: [
          {
            id: "3-d1",
            name: "Chocolate Cake",
            price: 180,
            category: "Desserts",
            description:
              "Rich and moist chocolate cake with creamy frosting.",
            image:
              "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
          },
        ],
      },
    },
  ];

  useEffect(() => {
    const savedRestaurants = JSON.parse(
      localStorage.getItem("restaurants") || "[]"
    );

    const allRestaurants = [
      ...defaultRestaurants,
      ...savedRestaurants,
    ];

    const selectedRestaurant = allRestaurants.find(
      (item) => String(item.id) === String(id)
    );

    setRestaurant(selectedRestaurant || null);
  }, [id]);

  function addToCart(item) {
    const existingCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingItem = existingCart.find(
      (cartItem) =>
        String(cartItem.id) === String(item.id)
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map(
        (cartItem) =>
          String(cartItem.id) === String(item.id)
            ? {
                ...cartItem,
                quantity:
                  (cartItem.quantity || 1) + 1,
              }
            : cartItem
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...item,
          quantity: 1,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCartMessage(
      `${item.name} added to cart successfully!`
    );

    setTimeout(() => {
      setCartMessage("");
    }, 2500);
  }

  if (!restaurant) {
    return (
      <div className="restaurant-not-found">
        <div className="restaurant-not-found-card">
          <div className="restaurant-not-found-icon">
            🍽️
          </div>

          <h1>Restaurant Not Found</h1>

          <p>
            Sorry, we couldn't find the restaurant
            you're looking for.
          </p>

          <Link
            to="/restaurants"
            className="primary-btn"
          >
            ← Back to Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-details-page">

      {/* HERO */}
      <section className="restaurant-details-hero">

        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-details-image"
        />

        <div className="restaurant-details-overlay">
          <div className="restaurant-details-hero-content">

            <Link
              to="/restaurants"
              className="back-to-restaurants"
            >
              ← Back to Restaurants
            </Link>

            <span className="restaurant-details-badge">
              🍽️ {restaurant.cuisine}
            </span>

            <h1>{restaurant.name}</h1>

            <div className="restaurant-details-meta">
              <span>
                ⭐ {restaurant.rating}
              </span>

              <span>
                💰 {restaurant.budget}
              </span>

              <span>
                📍 {restaurant.location}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* RESTAURANT INFORMATION */}
      <section className="restaurant-info-section">

        <div className="restaurant-info-main">

          <span className="section-label">
            ABOUT THE RESTAURANT
          </span>

          <h2>
            A great place to enjoy delicious food
          </h2>

          <p className="restaurant-about">
            {restaurant.description}
          </p>

        </div>

        <div className="restaurant-info-grid">

          <div className="restaurant-info-card">
            <span className="restaurant-info-icon">
              📍
            </span>

            <div>
              <small>Address</small>

              <strong>
                {restaurant.address}
              </strong>
            </div>
          </div>

          <div className="restaurant-info-card">
            <span className="restaurant-info-icon">
              🕐
            </span>

            <div>
              <small>Opening Hours</small>

              <strong>
                {restaurant.openingHours}
              </strong>
            </div>
          </div>

          <div className="restaurant-info-card">
            <span className="restaurant-info-icon">
              📞
            </span>

            <div>
              <small>Phone</small>

              <strong>
                {restaurant.phone}
              </strong>
            </div>
          </div>

          <div className="restaurant-info-card">
            <span className="restaurant-info-icon">
              🍴
            </span>

            <div>
              <small>Cuisine</small>

              <strong>
                {restaurant.cuisine}
              </strong>
            </div>
          </div>

        </div>
      </section>

      {/* MENU */}
      <section className="restaurant-menu-section">

        <div className="restaurant-menu-heading">

          <span className="section-label">
            OUR MENU
          </span>

          <h2>
            Made for You
          </h2>

          <p>
            Explore our carefully selected
            dishes and add your favorites to
            the cart.
          </p>

        </div>

        {Object.entries(
          restaurant.menu || {}
        ).map(([category, items]) => (

          <div
            className="menu-category-section"
            key={category}
          >

            <div className="menu-category-heading">
              <h2>{category}</h2>

              <span>
                {items.length}{" "}
                {items.length === 1
                  ? "item"
                  : "items"}
              </span>
            </div>

            <div className="menu-grid">

              {items.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onAddToCart={addToCart}
                />
              ))}

            </div>

          </div>

        ))}

      </section>

      {/* CART MESSAGE */}
      {cartMessage && (
        <div className="cart-success-message">
          ✅ {cartMessage}
        </div>
      )}

      {/* BOTTOM ACTION */}
      <section className="restaurant-bottom-action">

        <div>
          <h3>
            Ready to order?
          </h3>

          <p>
            Add your favorite dishes to the
            cart and continue when you're ready.
          </p>
        </div>

        <Link
          to="/cart"
          className="primary-btn"
        >
          🛒 View Cart
        </Link>

      </section>

    </div>
  );
}

export default RestaurantDetails;