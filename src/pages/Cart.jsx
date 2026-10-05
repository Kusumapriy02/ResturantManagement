import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );


  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);
  }, []);


  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);


  function increaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                (item.quantity || 1) + 1,
            }
          : item
      )
    );
  }


  function decreaseQuantity(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  (item.quantity || 1) - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  }


  function removeItem(id) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );
  }


  function clearCart() {
    setCart([]);

    localStorage.removeItem("cart");
  }


  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        (item.quantity || 1),
    0
  );


  const deliveryFee =
    cart.length > 0 ? 40 : 0;


  const total =
    subtotal + deliveryFee;


  function placeOrder() {

    if (!user) {
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }


    const existingOrders =
      JSON.parse(
        localStorage.getItem("orders") || "[]"
      );


    const newOrder = {
      id: Date.now(),

      userEmail: user.email,

      userName: user.name,

      items: cart,

      subtotal: subtotal,

      deliveryFee: deliveryFee,

      total: total,

      status: "Pending",

      date:
        new Date().toLocaleString(),
    };


    localStorage.setItem(
      "orders",
      JSON.stringify([
        ...existingOrders,
        newOrder,
      ])
    );


    localStorage.removeItem("cart");

    setCart([]);


    alert(
      "Order placed successfully! 🎉"
    );

    navigate("/profile");
  }


  /* ================= EMPTY CART ================= */

  if (cart.length === 0) {

    return (

      <div className="empty-cart">

        <div className="empty-cart-icon">
          🛒
        </div>

        <h1>
          Your Cart is Empty
        </h1>

        <p>
          You haven't added any food items yet.
        </p>

        <Link
          to="/restaurants"
          className="primary-btn"
        >
          Explore Restaurants
        </Link>

      </div>

    );
  }


  return (

    <div className="cart-page">

      <div className="cart-header">

        <div>

          <span className="cart-badge">
            🛒 YOUR CART
          </span>

          <h1>
            Your Cart
          </h1>

          <p>
            Review your selected dishes
            before placing your order.
          </p>

        </div>


        <button
          className="clear-cart-btn"
          onClick={clearCart}
        >
          Clear Cart
        </button>

      </div>


      <div className="cart-layout">

        {/* ================= CART ITEMS ================= */}

        <div className="cart-items">

          {cart.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />


              <div className="cart-item-details">

                <span className="cart-item-category">
                  {item.category || "Food"}
                </span>

                <h2>
                  {item.name}
                </h2>

                <p>
                  {item.description ||
                    "Delicious food prepared for you."}
                </p>

                <strong>
                  ₹{item.price}
                </strong>

              </div>


              <div className="cart-item-right">

                <div className="quantity-controls">

                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity || 1}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>

                </div>


                <strong className="item-total">
                  ₹
                  {Number(item.price) *
                    (item.quantity || 1)}
                </strong>


                <button
                  className="remove-btn"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>


        {/* ================= SUMMARY ================= */}

        <div className="order-summary">

          <h2>
            Order Summary
          </h2>


          <div className="summary-row">

            <span>
              Items
            </span>

            <span>
              {cart.reduce(
                (count, item) =>
                  count +
                  (item.quantity || 1),
                0
              )}
            </span>

          </div>


          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <span>
              ₹{subtotal}
            </span>

          </div>


          <div className="summary-row">

            <span>
              Delivery
            </span>

            <span>
              ₹{deliveryFee}
            </span>

          </div>


          <div className="summary-row summary-total">

            <span>
              Total
            </span>

            <strong>
              ₹{total}
            </strong>

          </div>


          <button
            className="checkout-btn"
            onClick={placeOrder}
          >
            Place Order
          </button>


          {/* IMPORTANT:
              Restaurants, NOT /menu
          */}

          <Link
            to="/restaurants"
            className="continue-shopping"
          >
            ← Continue Exploring Restaurants
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Cart;