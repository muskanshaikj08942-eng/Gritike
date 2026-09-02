import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Orders.css";

const API_BASE_URL = "http://localhost:8080";

function formatOrderDate(dateString) {
  if (!dateString) return "Date unavailable";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatOrderTime(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

function getImageUrl(imageUrl) {
  if (!imageUrl) {
    return "";
  }

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://") ||
    imageUrl.startsWith("data:")
  ) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/")) {
    return `${API_BASE_URL}${imageUrl}`;
  }

  return imageUrl;
}

function getOrderItemCount(order) {
  if (!Array.isArray(order.items)) {
    return 0;
  }

  return order.items.reduce(
    (total, item) => total + (Number(item.quantity) || 1),
    0
  );
}

function getProductCount(order) {
  if (!Array.isArray(order.items)) {
    return 0;
  }

  const uniqueProducts = new Set(
    order.items.map((item) => item.productName || item.id)
  );

  return uniqueProducts.size;
}

function getMainProductName(order) {
  if (!Array.isArray(order.items) || order.items.length === 0) {
    return "Gritike Collection";
  }

  return order.items[0]?.productName || "Gritike Collection";
}

function Orders() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    let parsedUser;

    try {
      parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    } catch (err) {
      console.error("Invalid saved user:", err);
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    const email = parsedUser?.email;

    if (!email) {
      setLoading(false);
      setError("Your account email could not be found.");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/orders/user?email=${encodeURIComponent(email)}`
        );

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();

        console.log("User orders:", data);

        if (Array.isArray(data)) {
          const sortedOrders = [...data].sort((a, b) => {
            const dateA = new Date(a.orderDate || 0).getTime();
            const dateB = new Date(b.orderDate || 0).getTime();

            return dateB - dateA;
          });

          setOrders(sortedOrders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Orders fetch error:", err);

        setError(
          "We couldn't load your orders right now. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (!user) {
    return (
      <main className="orders-page">
        <div className="orders-loading">
          <div className="orders-spinner"></div>
          <span>Loading your account...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">

      {/* =====================================================
          PAGE HERO
      ====================================================== */}

      <section className="orders-hero">
        <div className="orders-hero-inner">

          <div className="orders-hero-copy">

            <p className="orders-eyebrow">
              GRITIKE ACCOUNT
            </p>

            <h1 className="orders-title">
              My <span>Orders</span>
            </h1>

            <p className="orders-subtitle">
              View your purchases and order history.
            </p>

          </div>

          <Link
            to="/user"
            className="orders-panel-button"
          >
            <span>←</span>
            User Panel
          </Link>

        </div>
      </section>


      {/* =====================================================
          ORDER HISTORY
      ====================================================== */}

      <section className="orders-section">

        <div className="orders-section-heading">

          <div>

            <p className="orders-section-eyebrow">
              ORDER HISTORY
            </p>

            <h2>
              Your Purchases
            </h2>

            <div className="orders-heading-line"></div>

          </div>

          {!loading && !error && orders.length > 0 && (
            <div className="orders-count">

              <span>
                {orders.length}
              </span>

              {orders.length === 1
                ? " Order"
                : " Orders"}

            </div>
          )}

        </div>


        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading && (
          <div className="orders-loading-card">

            <div className="orders-spinner"></div>

            <p>
              Preparing your order history...
            </p>

          </div>
        )}


        {/* =====================================================
            ERROR
        ====================================================== */}

        {!loading && error && (
          <div className="orders-error-card">

            <div className="orders-error-icon">
              !
            </div>

            <p className="orders-error-eyebrow">
              GRITIKE ACCOUNT
            </p>

            <h3>
              Something went wrong
            </h3>

            <p>
              {error}
            </p>

            <button
              type="button"
              className="orders-retry-button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>

          </div>
        )}


        {/* =====================================================
            EMPTY STATE
        ====================================================== */}

        {!loading && !error && orders.length === 0 && (
          <div className="orders-empty-card">

            <div className="orders-empty-decoration">

              <span></span>

              <div className="orders-bag-icon">
                G
              </div>

              <span></span>

            </div>

            <p className="orders-empty-eyebrow">
              YOUR GRITIKE JOURNEY
            </p>

            <h3>
              No Orders Yet
            </h3>

            <p className="orders-empty-description">
              Your purchase history will appear here once
              you place your first order. Discover pieces
              curated to make every occasion unforgettable.
            </p>

            <Link
              to="/products"
              className="orders-shop-button"
            >
              Explore Collection
              <span>→</span>
            </Link>

          </div>
        )}


        {/* =====================================================
            ORDER LIST
        ====================================================== */}

        {!loading && !error && orders.length > 0 && (

          <div className="orders-list">

            {orders.map((order, index) => {

              const itemCount = getOrderItemCount(order);
              const productCount = getProductCount(order);
              const mainProduct = getMainProductName(order);

              return (
                <article
                  className="order-card"
                  key={order.id || index}
                >

                  {/* LEFT — ORDER NUMBER */}

                  <div className="order-card-number">

                    <p>
                      ORDER
                    </p>

                    <h3>
                      #{order.id}
                    </h3>

                    <span className="order-date">
                      {formatOrderDate(order.orderDate)}
                    </span>

                    {formatOrderTime(order.orderDate) && (
                      <span className="order-time">
                        <span>•</span>
                        {formatOrderTime(order.orderDate)}
                      </span>
                    )}

                  </div>


                  {/* PRODUCT IMAGE PREVIEW */}

                  <div className="order-preview">

                    {Array.isArray(order.items) &&
                    order.items.length > 0 ? (

                      <div className="order-image-stack">

                        {order.items
                          .slice(0, 3)
                          .map((item, itemIndex) => {

                            const imageUrl = getImageUrl(
                              item.imageUrl
                            );

                            return (
                              <div
                                className="order-preview-image"
                                key={item.id || itemIndex}
                              >

                                {imageUrl ? (
                                  <img
                                    src={imageUrl}
                                    alt={
                                      item.productName ||
                                      "Ordered product"
                                    }
                                    onError={(event) => {
                                      event.currentTarget.style.display =
                                        "none";

                                      event.currentTarget.parentElement.classList.add(
                                        "preview-image-failed"
                                      );
                                    }}
                                  />
                                ) : (
                                  <div className="preview-placeholder">
                                    G
                                  </div>
                                )}

                              </div>
                            );
                          })}

                        {order.items.length > 3 && (
                          <div className="order-more-images">
                            +{order.items.length - 3}
                          </div>
                        )}

                      </div>

                    ) : (

                      <div className="order-preview-empty">
                        G
                      </div>

                    )}

                  </div>


                  {/* CENTER — ORDER INFORMATION */}

                  <div className="order-main-info">

                    <p className="order-collection-label">
                      GRITIKE COLLECTION
                    </p>

                    <h3 className="order-product-name">
                      {mainProduct}
                    </h3>

                    <div className="order-product-meta">

                      <span>
                        {itemCount}{" "}
                        {itemCount === 1
                          ? "item"
                          : "items"}
                      </span>

                      <span className="meta-dot">
                        •
                      </span>

                      <span>
                        {productCount}{" "}
                        {productCount === 1
                          ? "product"
                          : "products"}
                      </span>

                    </div>

                  </div>


                  {/* TOTAL */}

                  <div className="order-total-block">

                    <span>
                      ORDER TOTAL
                    </span>

                    <strong>
                      {formatPrice(order.totalAmount)}
                    </strong>

                  </div>


                  {/* STATUS */}

                  <div className="order-status-block">

                    <span className="order-status-dot"></span>

                    <span>
                      {(order.status || "PLACED").toUpperCase()}
                    </span>

                  </div>


                  {/* VIEW DETAILS */}

                  <Link
                    to={`/orders/${order.id}`}
                    className="order-details-button"
                  >
                    <span>
                      View Details
                    </span>

                    <strong>
                      →
                    </strong>
                  </Link>

                </article>
              );
            })}

          </div>
        )}

      </section>


      {/* =====================================================
          ACCOUNT STRIP
      ====================================================== */}

      <section className="orders-account-strip">

        <div className="account-strip-item">

          <div className="account-strip-icon">

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="7"
                r="4"
              />

              <path
                d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7"
              />
            </svg>

          </div>

          <div>

            <span>
              ACCOUNT
            </span>

            <strong>
              {user.name || "Gritike Customer"}
            </strong>

          </div>

        </div>


        <div className="account-strip-item">

          <div className="account-strip-icon">

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="1"
              />

              <path
                d="m4 7 8 6 8-6"
              />
            </svg>

          </div>

          <div>

            <span>
              EMAIL
            </span>

            <strong>
              {user.email || "Not available"}
            </strong>

          </div>

        </div>


        <div className="account-strip-item">

          <div className="account-strip-icon">

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z"
              />

              <path
                d="m8.5 12 2.2 2.2 4.8-5"
              />
            </svg>

          </div>

          <div>

            <span>
              STATUS
            </span>

            <strong>
              Active
            </strong>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Orders;