
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  const { cartItems, cartTotal } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // PLACE ORDER
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // =========================
    // CHECK CART
    // =========================

    if (!cartItems || cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // =========================
    // VALIDATION
    // =========================

    if (
      !email.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pinCode.trim() ||
      !phone.trim()
    ) {
      setError("Please fill in all required information.");
      return;
    }

    setLoading(true);

    try {
      // =========================
      // PREPARE ORDER ITEMS
      // =========================

      const items = cartItems.map((item) => ({
        productId: Number(item.id),
        productName: item.name || "",
        imageUrl: item.imageUrl || "",
        selectedSize: item.selectedSize || "One Size",
        quantity: Number(item.quantity),
        price: Number(item.price),
      }));

      // =========================
      // PREPARE ORDER REQUEST
      // =========================

      const orderRequest = {
        email: email.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        pinCode: pinCode.trim(),
        phone: phone.trim(),
        paymentMethod: paymentMethod,
        totalAmount: Number(cartTotal),

        // IMPORTANT:
        // OrderRequest.java now contains items,
        // so send the cart items to the backend.
        items: items,
      };

      console.log("=================================");
      console.log("SENDING ORDER");
      console.log("=================================");
      console.log(orderRequest);
      console.log("Order items:", items);

      // =========================
      // SEND ORDER
      // =========================

      const response = await fetch(
        "http://localhost:8080/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify(orderRequest),
        }
      );

      // =========================
      // READ RESPONSE
      // =========================

      const responseText = await response.text();

      console.log("Backend status:", response.status);
      console.log("Backend response:", responseText);

      // =========================
      // BACKEND ERROR
      // =========================

      if (!response.ok) {
        let backendMessage = responseText;

        // Try to extract Spring Boot JSON error message
        try {
          const errorJson = JSON.parse(responseText);

          backendMessage =
            errorJson.message ||
            errorJson.error ||
            errorJson.detail ||
            responseText;
        } catch {
          // Response was not JSON.
          // Keep original response text.
        }

        throw new Error(
          backendMessage ||
            `Unable to place your order. Server returned ${response.status}.`
        );
      }

      // =========================
      // PARSE CREATED ORDER
      // =========================

      let order = null;

      if (responseText.trim()) {
        try {
          order = JSON.parse(responseText);
        } catch (parseError) {
          console.error(
            "Could not parse backend response as JSON."
          );

          console.error(
            "Raw backend response:",
            responseText
          );

          /*
           * The order may still have been created successfully.
           *
           * This normally happens when Spring Boot creates
           * the order but fails while serializing the
           * bidirectional Order <-> OrderItem relationship.
           *
           * The actual fix for that is in OrderItem.java.
           */
        }
      }

      // =========================
      // SUCCESS
      // =========================

      if (order && order.id) {
        console.log(
          "Order created successfully:",
          order
        );

        localStorage.setItem(
          "gritike-last-order",
          JSON.stringify(order)
        );

        alert(
          `Order #${order.id} placed successfully!`
        );

        navigate("/orders");
        return;
      }

      // =========================
      // SUCCESS BUT INVALID RESPONSE
      // =========================
      //
      // This fallback is mainly useful if the backend
      // successfully saves the order but Jackson fails
      // while serializing Order -> items -> order.
      //
      // The backend annotation shown below should fix this.

      console.warn(
        "Order request succeeded but backend returned no usable order JSON."
      );

      alert(
        "Your order may have been placed successfully. Please check My Account → Orders."
      );

      navigate("/orders");

    } catch (err) {
      console.error("Checkout error:", err);

      setError(
        err.message ||
          "Something went wrong while placing your order."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EMPTY CART
  // =========================

  if (!cartItems || cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-header">
          <div className="checkout-header-inner">

            <div>
              <p className="checkout-label">
                GRITIKE CHECKOUT
              </p>

              <h1>
                Your cart is <span>empty.</span>
              </h1>

              <p className="checkout-subtitle">
                Add something beautiful to your bag before
                continuing to checkout.
              </p>
            </div>

            <button
              type="button"
              className="back-cart-btn"
              onClick={() => navigate("/products")}
            >
              ← Continue Shopping
            </button>

          </div>
        </div>
      </main>
    );
  }

  // =========================
  // CHECKOUT PAGE
  // =========================

  return (
    <div className="checkout-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="checkout-header">

        <div className="checkout-header-inner">

          <div>
            <p className="checkout-label">
              GRITIKE CHECKOUT
            </p>

            <h1>
              Complete your <span>order.</span>
            </h1>

            <p className="checkout-subtitle">
              Almost there. Enter your details to complete
              your purchase.
            </p>
          </div>

          <button
            type="button"
            className="back-cart-btn"
            onClick={() => navigate("/cart")}
          >
            ← Back to Cart
          </button>

        </div>

      </div>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="checkout-container">

        {/* =========================
            LEFT SIDE
        ========================= */}

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          {/* =========================
              CONTACT
          ========================= */}

          <section className="checkout-section">

            <div className="section-heading">

              <span>01</span>

              <div>
                <p>CONTACT</p>

                <h2>
                  Contact information
                </h2>
              </div>

            </div>

            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email address"
                required
              />

            </div>

            <label className="checkbox-row">

              <input type="checkbox" />

              <span>
                Email me with news and exclusive GRITIKE
                offers
              </span>

            </label>

          </section>

          {/* =========================
              DELIVERY
          ========================= */}

          <section className="checkout-section">

            <div className="section-heading">

              <span>02</span>

              <div>
                <p>DELIVERY</p>

                <h2>
                  Shipping information
                </h2>
              </div>

            </div>

            {/* FIRST + LAST NAME */}

            <div className="form-grid">

              <div className="form-group">

                <label htmlFor="firstName">
                  First Name
                </label>

                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) =>
                    setFirstName(e.target.value)
                  }
                  placeholder="First name"
                  required
                />

              </div>

              <div className="form-group">

                <label htmlFor="lastName">
                  Last Name
                </label>

                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) =>
                    setLastName(e.target.value)
                  }
                  placeholder="Last name"
                  required
                />

              </div>

            </div>

            {/* ADDRESS */}

            <div className="form-group">

              <label htmlFor="address">
                Address
              </label>

              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                placeholder="Street address"
                required
              />

            </div>

            {/* CITY + STATE + PIN */}

            <div className="form-grid three-columns">

              <div className="form-group">

                <label htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) =>
                    setCity(e.target.value)
                  }
                  placeholder="City"
                  required
                />

              </div>

              <div className="form-group">

                <label htmlFor="state">
                  State
                </label>

                <input
                  id="state"
                  type="text"
                  value={state}
                  onChange={(e) =>
                    setState(e.target.value)
                  }
                  placeholder="State"
                  required
                />

              </div>

              <div className="form-group">

                <label htmlFor="pin">
                  PIN Code
                </label>

                <input
                  id="pin"
                  type="text"
                  inputMode="numeric"
                  value={pinCode}
                  onChange={(e) =>
                    setPinCode(e.target.value)
                  }
                  placeholder="PIN code"
                  required
                />

              </div>

            </div>

            {/* PHONE */}

            <div className="form-group">

              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="Enter your phone number"
                required
              />

            </div>

          </section>

          {/* =========================
              PAYMENT
          ========================= */}

          <section className="checkout-section">

            <div className="section-heading">

              <span>03</span>

              <div>
                <p>PAYMENT</p>

                <h2>
                  Payment method
                </h2>
              </div>

            </div>

            <div className="payment-options">

              {/* COD */}

              <label
                className={`payment-option ${
                  paymentMethod === "cod"
                    ? "active"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={
                    paymentMethod === "cod"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />

                <div>

                  <strong>
                    Cash on Delivery
                  </strong>

                  <span>
                    Pay when your order arrives at
                    your doorstep.
                  </span>

                </div>

              </label>

              {/* CARD */}

              <label
                className={`payment-option ${
                  paymentMethod === "card"
                    ? "active"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={
                    paymentMethod === "card"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />

                <div>

                  <strong>
                    Credit / Debit Card
                  </strong>

                  <span>
                    Secure online payment.
                  </span>

                </div>

              </label>

              {/* UPI */}

              <label
                className={`payment-option ${
                  paymentMethod === "upi"
                    ? "active"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={
                    paymentMethod === "upi"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />

                <div>

                  <strong>
                    UPI
                  </strong>

                  <span>
                    Pay using your preferred UPI
                    app.
                  </span>

                </div>

              </label>

            </div>

          </section>

          {/* =========================
              ERROR
          ========================= */}

          {error && (
            <div className="checkout-error">
              {error}
            </div>
          )}

          {/* =========================
              PLACE ORDER
          ========================= */}

          <button
            type="submit"
            className="place-order-btn"
            disabled={loading}
          >

            {loading
              ? "Placing Order..."
              : "Place Order"}

            {!loading && (
              <span>→</span>
            )}

          </button>

          <p className="secure-note">
            🔒 Your information is secure and protected.
          </p>

        </form>

        {/* =========================
            RIGHT SIDE
            ORDER SUMMARY
        ========================= */}

        <aside className="checkout-summary">

          <div className="summary-brand">
            GRITIKE
          </div>

          <h2>
            Order Summary
          </h2>

          <div className="summary-star">
            ✦
          </div>

          {/* PRODUCTS */}

          <div className="checkout-items">

            {cartItems.map((item, index) => {

              const imageUrl = item.imageUrl
                ? item.imageUrl.startsWith("http")
                  ? item.imageUrl
                  : `http://localhost:8080${item.imageUrl}`
                : null;

              return (
                <div
                  className="checkout-item"
                  key={`${item.id}-${item.selectedSize}-${index}`}
                >

                  {/* PRODUCT IMAGE */}

                  <div className="checkout-item-image">

                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.name}
                        onError={(e) => {

                          e.currentTarget.style.display =
                            "none";

                          if (
                            e.currentTarget
                              .nextElementSibling
                          ) {
                            e.currentTarget
                              .nextElementSibling.style.display =
                              "flex";
                          }

                        }}
                      />
                    ) : null}

                    <div
                      className="checkout-image-placeholder"
                      style={{
                        display: imageUrl
                          ? "none"
                          : "flex",
                      }}
                    >
                      GRITIKE
                    </div>

                    <span className="checkout-item-quantity">
                      {item.quantity}
                    </span>

                  </div>

                  {/* PRODUCT INFO */}

                  <div className="checkout-item-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {item.category ||
                        "GRITIKE COLLECTION"}
                    </p>

                    <p>
                      Size:{" "}
                      {item.selectedSize ||
                        "One Size"}
                    </p>

                  </div>

                  {/* PRICE */}

                  <strong>
                    ₹
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toLocaleString("en-IN")}
                  </strong>

                </div>
              );
            })}

          </div>

          <div className="summary-divider"></div>

          {/* SUBTOTAL */}

          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              ₹
              {Number(cartTotal).toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

          {/* SHIPPING */}

          <div className="summary-row">

            <span>
              Shipping
            </span>

            <strong className="free">
              Free
            </strong>

          </div>

          <div className="summary-divider"></div>

          {/* TOTAL */}

          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ₹
              {Number(cartTotal).toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

          <div className="checkout-note">
            Taxes and final shipping costs are
            calculated at checkout.
          </div>

        </aside>

      </div>

    </div>
  );
};

export default Checkout;

