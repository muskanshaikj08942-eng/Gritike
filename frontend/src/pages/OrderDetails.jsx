import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./OrderDetails.css";

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    } catch (err) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (!user?.email || !orderId) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:8080/api/orders/user?email=${encodeURIComponent(
            user.email
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }

        const data = await response.json();

        console.log("All user orders:", data);

        const foundOrder = data.find(
          (item) => String(item.id) === String(orderId)
        );

        if (!foundOrder) {
          setError("Order not found.");
          setOrder(null);
          return;
        }

        console.log("Selected order:", foundOrder);

        setOrder(foundOrder);
      } catch (err) {
        console.error("Order details error:", err);
        setError("Unable to load this order. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [user, orderId]);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <main className="order-details-page">
        <div className="order-details-loading">
          <div className="loading-mark">G</div>
          <p>Loading your order...</p>
        </div>
      </main>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (error || !order) {
    return (
      <main className="order-details-page">
        <section className="order-details-error">
          <div className="error-number">404</div>

          <p className="details-eyebrow">GRITIKE ORDERS</p>

          <h1>Order Not Found</h1>

          <p>
            We couldn't find the order you're looking for.
            It may have been removed or the order number may
            be incorrect.
          </p>

          <Link to="/orders" className="back-orders-btn">
            ← Back to My Orders
          </Link>
        </section>
      </main>
    );
  }

  // =========================================
  // FORMAT DATE
  // =========================================

  const formattedDate = order.orderDate
    ? new Date(order.orderDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Date unavailable";

  const formattedTime = order.orderDate
    ? new Date(order.orderDate).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  // =========================================
  // STATUS
  // =========================================

  const currentStatus = (order.status || "PLACED").toUpperCase();

  const statusSteps = [
    {
      key: "PLACED",
      label: "Order Placed",
    },
    {
      key: "CONFIRMED",
      label: "Confirmed",
    },
    {
      key: "SHIPPED",
      label: "Shipped",
    },
    {
      key: "DELIVERED",
      label: "Delivered",
    },
  ];

  const statusIndex = statusSteps.findIndex(
    (step) => step.key === currentStatus
  );

  const activeIndex = statusIndex >= 0 ? statusIndex : 0;

  // =========================================
  // TOTAL
  // =========================================

  const totalAmount = Number(order.totalAmount || 0);

  // =========================================
  // RENDER
  // =========================================

  return (
    <main className="order-details-page">

      {/* =====================================
          TOP NAV / BACK
      ===================================== */}

      <section className="order-details-top">

        <Link
          to="/orders"
          className="details-back-link"
        >
          ← My Orders
        </Link>

        <p className="details-top-label">
          ORDER DETAILS
        </p>

      </section>


      {/* =====================================
          HERO
      ===================================== */}

      <section className="order-details-hero">

        <div className="hero-left">

          <p className="details-eyebrow">
            GRITIKE ORDER
          </p>

          <h1>
            Order <span>#{order.id}</span>
          </h1>

          <p className="hero-date">
            Placed on {formattedDate}
            {formattedTime && ` · ${formattedTime}`}
          </p>

        </div>

        <div className="hero-status">

          <span className="status-dot"></span>

          <div>
            <small>ORDER STATUS</small>
            <strong>{currentStatus}</strong>
          </div>

        </div>

      </section>


      {/* =====================================
          ORDER TRACKING
      ===================================== */}

      <section className="tracking-card">

        <div className="tracking-heading">

          <div>
            <p className="section-label">
              DELIVERY JOURNEY
            </p>

            <h2>
              Track your order
            </h2>
          </div>

          <span className="tracking-current">
            {currentStatus}
          </span>

        </div>


        <div className="tracking">

          {statusSteps.map((step, index) => {

            const isCompleted = index <= activeIndex;
            const isCurrent = index === activeIndex;

            return (
              <div
                className={`tracking-step ${
                  isCompleted ? "completed" : ""
                } ${isCurrent ? "current" : ""}`}
                key={step.key}
              >

                <div className="tracking-point">

                  {isCompleted ? (
                    <span>✓</span>
                  ) : (
                    <span>{index + 1}</span>
                  )}

                </div>

                <div className="tracking-label">
                  <strong>{step.label}</strong>

                  {isCurrent && (
                    <small>Current status</small>
                  )}
                </div>

              </div>
            );
          })}

        </div>

      </section>


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <section className="order-details-grid">


        {/* ===================================
            LEFT COLUMN
        =================================== */}

        <div className="details-main">


          {/* ORDER ITEMS */}

          <section className="items-card">

            <div className="card-heading">

              <div>
                <p className="section-label">
                  YOUR SELECTION
                </p>

                <h2>
                  Order items
                </h2>
              </div>

              <span className="item-count">
                {order.items?.length || 0} ITEMS
              </span>

            </div>


            <div className="order-items">

              {order.items && order.items.length > 0 ? (

                order.items.map((item, index) => {

                  const itemPrice = Number(item.price || 0);
                  const quantity = Number(item.quantity || 1);

                  return (
                    <div
                      className="order-item"
                      key={item.id || index}
                    >

                      <div className="item-image-wrapper">

                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="item-image"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement.classList.add(
                              "image-fallback"
                            );
                          }}
                        />

                      </div>


                      <div className="item-info">

                        <p className="item-number">
                          ITEM {String(index + 1).padStart(2, "0")}
                        </p>

                        <h3>
                          {item.productName}
                        </h3>

                        <div className="item-meta">

                          <span>
                            SIZE
                            <strong>
                              {item.selectedSize || "N/A"}
                            </strong>
                          </span>

                          <span>
                            QUANTITY
                            <strong>
                              {quantity}
                            </strong>
                          </span>

                        </div>

                      </div>


                      <div className="item-price">

                        <small>PRICE</small>

                        <strong>
                          ₹
                          {itemPrice.toLocaleString("en-IN")}
                        </strong>

                      </div>

                    </div>
                  );
                })

              ) : (

                <div className="no-items">
                  No items found for this order.
                </div>

              )}

            </div>

          </section>


          {/* DELIVERY + PAYMENT */}

          <section className="information-card">

            <div className="information-column">

              <p className="section-label">
                DELIVERY ADDRESS
              </p>

              <h3>
                {order.firstName} {order.lastName}
              </h3>

              <p>
                {order.address}
              </p>

              <p>
                {order.city}, {order.state}
              </p>

              <p>
                {order.pinCode}
              </p>

              <p className="phone">
                Phone: {order.phone}
              </p>

            </div>


            <div className="information-divider"></div>


            <div className="information-column">

              <p className="section-label">
                PAYMENT
              </p>

              <h3>
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : order.paymentMethod || "Payment"}
              </h3>

              <p className="payment-note">
                Payment method selected at checkout.
              </p>

              <div className="payment-secure">
                <span>✓</span>
                Secure transaction
              </div>

            </div>

          </section>

        </div>


        {/* ===================================
            RIGHT COLUMN
        =================================== */}

        <aside className="details-sidebar">


          {/* TOTAL CARD */}

          <section className="summary-card">

            <p className="section-label">
              ORDER SUMMARY
            </p>

            <h2>
              Your total
            </h2>


            <div className="summary-row">

              <span>
                Items
              </span>

              <strong>
                {order.items?.length || 0}
              </strong>

            </div>


            <div className="summary-row">

              <span>
                Shipping
              </span>

              <strong className="free">
                FREE
              </strong>

            </div>


            <div className="summary-divider"></div>


            <div className="summary-total">

              <span>
                TOTAL
              </span>

              <strong>
                ₹{totalAmount.toLocaleString("en-IN")}
              </strong>

            </div>

          </section>


          {/* ORDER INFORMATION */}

          <section className="order-info-card">

            <p className="section-label">
              ORDER INFORMATION
            </p>


            <div className="order-info-row">

              <span>
                Order number
              </span>

              <strong>
                #{order.id}
              </strong>

            </div>


            <div className="order-info-row">

              <span>
                Date
              </span>

              <strong>
                {formattedDate}
              </strong>

            </div>


            <div className="order-info-row">

              <span>
                Status
              </span>

              <strong className="gold-status">
                {currentStatus}
              </strong>

            </div>


          </section>


          {/* BACK BUTTON */}

          <Link
            to="/orders"
            className="view-all-orders"
          >
            ← View all orders
          </Link>

        </aside>

      </section>


      {/* =====================================
          FOOTER ACCOUNT STRIP
      ===================================== */}

      <section className="details-account-strip">

        <div>
          <span>ACCOUNT</span>
          <strong>
            {user?.name || `${order.firstName} ${order.lastName}`}
          </strong>
        </div>

        <div>
          <span>EMAIL</span>
          <strong>
            {user?.email || order.email}
          </strong>
        </div>

        <div>
          <span>ORDER</span>
          <strong>
            #{order.id}
          </strong>
        </div>

      </section>

    </main>
  );
}

export default OrderDetails;