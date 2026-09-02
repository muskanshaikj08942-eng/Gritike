import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <section className="cart-header">
          <p className="section-label">YOUR SHOPPING BAG</p>
          <h1>Your Cart</h1>
        </section>

        <section className="cart-content">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛍</div>

            <h2>Your cart is empty</h2>

            <p>
              Discover something beautiful and add it
              to your shopping bag.
            </p>

            <Link
              to="/products"
              className="continue-shopping"
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">

      {/* ================= HEADER ================= */}

      <section className="cart-header">
        <p className="section-label">YOUR SHOPPING BAG</p>

        <h1>Your Cart</h1>

        <p className="cart-count-text">
          {cartItems.length}{" "}
          {cartItems.length === 1 ? "item" : "items"} in your bag
        </p>
      </section>

      {/* ================= CART CONTENT ================= */}

      <section className="cart-products">

        {/* ================= CART ITEMS ================= */}

        <div className="cart-items">

          <div className="cart-items-heading">
            <span>PRODUCT</span>
            <span>QUANTITY</span>
            <span>TOTAL</span>
          </div>

          {cartItems.map((item) => {

            const imageUrl = item.imageUrl
              ? item.imageUrl.startsWith("http")
                ? item.imageUrl
                : `http://localhost:8080${item.imageUrl}`
              : null;

            return (
              <div
                className="cart-item"
                key={`${item.id}-${item.selectedSize}`}
              >

                {/* IMAGE */}

                <div className="cart-item-image">

                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";

                        if (
                          e.currentTarget.nextElementSibling
                        ) {
                          e.currentTarget.nextElementSibling.style.display =
                            "flex";
                        }
                      }}
                    />
                  ) : null}

                  <div
                    className="cart-image-placeholder"
                    style={{
                      display: imageUrl ? "none" : "flex",
                    }}
                  >
                    GRITIKE
                  </div>

                </div>

                {/* PRODUCT INFORMATION */}

                <div className="cart-item-info">

                  <p className="cart-item-category">
                    {item.category || "GRITIKE COLLECTION"}
                  </p>

                  <h2>{item.name}</h2>

                  <p className="cart-item-price">
                    {formatPrice(item.price)}
                  </p>

                  <p className="cart-item-size">
                    Size:
                    <strong>
                      {item.selectedSize || "One Size"}
                    </strong>
                  </p>

                </div>

                {/* QUANTITY */}

                <div className="quantity-controls">

                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() =>
                      decreaseQuantity(
                        item.id,
                        item.selectedSize
                      )
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() =>
                      increaseQuantity(
                        item.id,
                        item.selectedSize
                      )
                    }
                  >
                    +
                  </button>

                </div>

                {/* ITEM TOTAL */}

                <div className="cart-item-total">
                  {formatPrice(
                    Number(item.price) * item.quantity
                  )}
                </div>

                {/* REMOVE */}

                <button
                  type="button"
                  className="remove-item"
                  onClick={() =>
                    removeFromCart(
                      item.id,
                      item.selectedSize
                    )
                  }
                >
                  Remove
                </button>

              </div>
            );
          })}

        </div>

        {/* ================= ORDER SUMMARY ================= */}

        <aside className="cart-summary">

          <div className="summary-top">

            <p className="summary-label">
              GRITIKE
            </p>

            <h2>Order Summary</h2>

            <div className="summary-decoration">
              ✦
            </div>

          </div>

          {/* SUMMARY ITEMS */}

          <div className="summary-products">

            {cartItems.map((item, index) => (
              <div
                className="summary-product"
                key={`${item.id}-${item.selectedSize}-${index}`}
              >

                <div className="summary-product-image">

                  {item.imageUrl ? (
                    <img
                      src={
                        item.imageUrl.startsWith("http")
                          ? item.imageUrl
                          : `http://localhost:8080${item.imageUrl}`
                      }
                      alt={item.name}
                    />
                  ) : (
                    <span>G</span>
                  )}

                  <span className="summary-product-qty">
                    {item.quantity}
                  </span>

                </div>

                <div className="summary-product-info">

                  <h3>{item.name}</h3>

                  <p>
                    Size:{" "}
                    {item.selectedSize || "One Size"}
                  </p>

                </div>

                <strong>
                  {formatPrice(
                    Number(item.price) * item.quantity
                  )}
                </strong>

              </div>
            ))}

          </div>

          {/* DIVIDER */}

          <div className="summary-divider"></div>

          {/* SUBTOTAL */}

          <div className="summary-row">

            <span>Subtotal</span>

            <strong>
              {formatPrice(cartTotal)}
            </strong>

          </div>

          {/* SHIPPING */}

          <div className="summary-row">

            <span>Shipping</span>

            <strong className="free">
              Free
            </strong>

          </div>

          {/* TAX INFORMATION */}

          <div className="summary-tax-note">

            <span className="tax-icon">ⓘ</span>

            <p>
              Taxes and final shipping costs will
              be calculated at checkout.
            </p>

          </div>

          {/* TOTAL */}

          <div className="summary-divider"></div>

          <div className="summary-total">

            <div>
              <span>Total</span>
              <small>INCLUSIVE OF SHIPPING</small>
            </div>

            <strong>
              {formatPrice(cartTotal)}
            </strong>

          </div>

          {/* CHECKOUT BUTTON */}

          <Link
            to="/checkout"
            className="checkout-btn"
          >
            <span>Proceed to Checkout</span>
            <strong>→</strong>
          </Link>

          {/* CONTINUE SHOPPING */}

          <Link
            to="/products"
            className="continue-shopping-cart"
          >
            ← Continue Shopping
          </Link>

          {/* SECURITY */}

          <div className="summary-security">
            <span>🔒</span>
            <p>Secure checkout & protected payment</p>
          </div>

        </aside>

      </section>

    </main>
  );
}

export default Cart;