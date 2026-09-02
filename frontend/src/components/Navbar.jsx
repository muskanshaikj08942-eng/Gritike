import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../assets/loog.jpeg";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const { cart } = useCart();

  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const isAdmin = user?.role === "ADMIN";
  const isUser = user?.role === "USER";

  // =========================================================
  // CART COUNT
  // =========================================================

  useEffect(() => {
    if (isAdmin) {
      setCartCount(0);
      return;
    }

    try {
      const savedCart = localStorage.getItem("cart");

      if (!savedCart) {
        setCartCount(0);
        return;
      }

      const savedCartData = JSON.parse(savedCart);

      if (!Array.isArray(savedCartData)) {
        setCartCount(0);
        return;
      }

      const totalItems = savedCartData.reduce(
        (total, item) => total + (Number(item.quantity) || 1),
        0
      );

      setCartCount(totalItems);
    } catch (error) {
      console.error("Cart count error:", error);
      setCartCount(0);
    }
  }, [cart, isAdmin]);

  // =========================================================
  // CART UPDATE EVENTS
  // =========================================================

  useEffect(() => {
    if (isAdmin) return;

    const updateCartCount = () => {
      try {
        const savedCart = localStorage.getItem("cart");

        if (!savedCart) {
          setCartCount(0);
          return;
        }

        const cartData = JSON.parse(savedCart);

        if (!Array.isArray(cartData)) {
          setCartCount(0);
          return;
        }

        const totalItems = cartData.reduce(
          (total, item) =>
            total + (Number(item.quantity) || 1),
          0
        );

        setCartCount(totalItems);
      } catch (error) {
        console.error("Cart count error:", error);
        setCartCount(0);
      }
    };

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, [isAdmin]);

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/");
  };

  // =========================================================
  // CLOSE MENU
  // =========================================================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      {/* =====================================================
          LOGO
      ====================================================== */}

      <Link
        to="/"
        className="navbar-logo"
        onClick={closeMenu}
      >
        <img
          src={logo}
          alt="Gritike Fashion Design Studio"
        />
      </Link>


      {/* =====================================================
          MAIN MENU
      ====================================================== */}

      <div
        className={`navbar-menu ${
          menuOpen ? "active" : ""
        }`}
      >

        <Link
          to="/"
          onClick={closeMenu}
        >
          Home
        </Link>

        <Link
          to="/products"
          onClick={closeMenu}
        >
          Collection
        </Link>

        <Link
          to="/about"
          onClick={closeMenu}
        >
          About
        </Link>

        <Link
          to="/contact"
          onClick={closeMenu}
        >
          Contact
        </Link>


        {/* =================================================
            CART — USERS ONLY
        ================================================== */}

        {!isAdmin && (
          <Link
            to="/cart"
            className="nav-cart"
            onClick={closeMenu}
            aria-label={`Shopping cart with ${cartCount} items`}
          >

            <span className="nav-cart-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6"
                />

                <circle
                  cx="10"
                  cy="20"
                  r="1.2"
                />

                <circle
                  cx="18"
                  cy="20"
                  r="1.2"
                />
              </svg>
            </span>

            <span className="nav-cart-text">
              Cart
            </span>

            {cartCount > 0 && (
              <span className="nav-cart-count">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}

          </Link>
        )}

      </div>


      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}

      <div className="navbar-actions">

        {/* NOT LOGGED IN */}

        {!user ? (
          <>

            <Link
              to="/login"
              className="nav-login"
              onClick={closeMenu}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="nav-register"
              onClick={closeMenu}
            >
              Join Us
            </Link>

          </>
        ) : (
          <>

            {/* =================================================
                NORMAL USER
            ================================================== */}

            {isUser && (
              <Link
                to="/user"
                className="nav-profile"
                onClick={closeMenu}
              >
                My Account
              </Link>
            )}


            {/* =================================================
                ADMIN
            ================================================== */}

            {isAdmin && (
              <Link
                to="/admin"
                className="nav-profile"
                onClick={closeMenu}
              >
                Admin
              </Link>
            )}


            {/* =================================================
                LOGOUT
            ================================================== */}

            <button
              className="nav-logout"
              onClick={handleLogout}
            >
              Logout
            </button>

          </>
        )}

      </div>


      {/* =====================================================
          MOBILE MENU BUTTON
      ====================================================== */}

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </nav>
  );
}

export default Navbar;