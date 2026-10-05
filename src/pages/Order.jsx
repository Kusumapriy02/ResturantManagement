import { useState } from "react";

function Orders() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [orders, setOrders] = useState(
    JSON.parse(
      localStorage.getItem("orders") || "[]"
    )
  );

  const customerOrders =
    user?.role === "admin"
      ? orders
      : orders.filter(
          (order) =>
            order.userEmail === user?.email ||
            !order.userEmail
        );

  function cancelOrder(orderId) {
    const updatedOrders = orders.map(
      (order) =>
        order.id === orderId
          ? {
              ...order,
              status: "Cancelled"
            }
          : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );
  }

  return (
    <div className="orders-page">

      <div className="orders-header">

        <div>
          <span className="orders-badge">
            📦 MY ORDERS
          </span>

          <h1>
            Your Orders
          </h1>

          <p>
            Track and manage your restaurant
            orders.
          </p>
        </div>

      </div>

      {customerOrders.length === 0 ? (

        <div className="empty-orders">

          <div className="empty-orders-icon">
            📦
          </div>

          <h2>
            No Orders Yet
          </h2>

          <p>
            You haven't placed any orders yet.
          </p>

        </div>

      ) : (

        <div className="orders-list">

          {customerOrders
            .slice()
            .reverse()
            .map((order) => (

              <div
                className="order-card"
                key={order.id}
              >

                <div className="order-top">

                  <div>
                    <h2>
                      Order #{String(order.id).slice(-6)}
                    </h2>

                    <p>
                      {order.date}
                    </p>
                  </div>

                  <span
                    className={`order-status ${order.status
                      ?.toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {order.status}
                  </span>

                </div>


                <div className="order-items">

                  {order.items?.map(
                    (item, index) => (

                      <div
                        className="order-item"
                        key={`${item.id}-${index}`}
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                        <div>
                          <h3>
                            {item.name}
                          </h3>

                          <p>
                            Quantity:{" "}
                            {item.quantity || 1}
                          </p>
                        </div>

                        <strong>
                          ₹
                          {item.price *
                            (item.quantity || 1)}
                        </strong>

                      </div>

                    )
                  )}

                </div>


                <div className="order-bottom">

                  <div>
                    <span>
                      Total Amount
                    </span>

                    <strong>
                      ₹{order.total}
                    </strong>
                  </div>

                  {order.status !==
                    "Cancelled" &&
                    order.status !==
                      "Delivered" && (
                      <button
                        className="cancel-order-btn"
                        onClick={() =>
                          cancelOrder(order.id)
                        }
                      >
                        Cancel Order
                      </button>
                    )}

                </div>

              </div>

            ))}

        </div>

      )}

    </div>
  );
}

export default Orders;