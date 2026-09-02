import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // =========================================================
  // CURRENT USER
  // =========================================================

  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const isAdmin = user?.role === "ADMIN";

  // =========================================================
  // FETCH PRODUCT
  // =========================================================

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:8080/api/products/${id}`
      );

      console.log("Product:", response.data);

      setProduct(response.data);
      setError("");
    } catch (err) {
      console.error("Product Details Error:", err);
      setError("Unable to load this product.");
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // IMAGE URL
  // =========================================================

  const imageUrl = product?.imageUrl
    ? product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `http://localhost:8080${product.imageUrl}`
    : null;

  // =========================================================
  // ADD TO CART
  // =========================================================

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      quantity,
    });

    alert("Added to cart successfully!");
  };

  // =========================================================
  // BUY NOW
  // =========================================================

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      quantity,
    });

    navigate("/cart");
  };

  // =========================================================
  // ADMIN DELETE
  // =========================================================

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/api/products/${product.id}`
      );

      alert("Product deleted successfully.");

      navigate("/admin");
    } catch (err) {
      console.error("Delete Product Error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to delete this product."
      );
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="product-details">
        <div className="products-loading">
          Loading product...
        </div>
      </main>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error || !product) {
    return (
      <main className="product-not-found">

        <div className="not-found-content">

          <p className="not-found-label">
            GRITIKE COLLECTION
          </p>

          <h1>
            Product Not Found
          </h1>

          <p>
            {error ||
              "The product you're looking for does not exist."}
          </p>

          <button
            className="back-products-btn"
            onClick={() =>
              navigate(isAdmin ? "/admin" : "/products")
            }
          >
            ← Back to {isAdmin ? "Admin" : "Collection"}
          </button>

        </div>

      </main>
    );
  }

  // =========================================================
  // MAIN
  // =========================================================

  return (
    <main className="product-details">

      <section className="product-details-container">

        {/* =====================================================
            PRODUCT IMAGE
        ====================================================== */}

        <div className="product-details-image">

          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="details-image-placeholder">
              GRITIKE
            </div>
          )}

        </div>


        {/* =====================================================
            PRODUCT INFORMATION
        ====================================================== */}

        <div className="product-details-info">

          {/* ADMIN LABEL */}

          {isAdmin && (
            <p className="admin-view-label">
              ADMIN VIEW
            </p>
          )}


          {/* CATEGORY */}

          <p className="details-category">
            {product.category || "GRITIKE COLLECTION"}
          </p>


          {/* PRODUCT NAME */}

          <h1>
            {product.name}
          </h1>


          {/* PRICE */}

          <p className="details-price">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>


          <div className="details-divider"></div>


          {/* DESCRIPTION */}

          <p className="details-description">
            {product.description}
          </p>


          {/* =================================================
              ADMIN CONTROLS
          ================================================== */}

          {isAdmin ? (

            <div className="admin-product-controls">

              <div className="admin-product-message">

                <span className="admin-icon">
                  ✦
                </span>

                <div>
                  <strong>
                    Administrator Access
                  </strong>

                  <p>
                    You are viewing this product as an
                    administrator.
                  </p>
                </div>

              </div>


              <div className="admin-product-actions">

                <button
                  className="product-edit-btn"
                  onClick={() =>
                    navigate(
                      `/admin/products/edit/${product.id}`
                    )
                  }
                >
                  <span>✦</span>
                  Edit Product
                </button>


                <button
                  className="product-delete-btn"
                  onClick={handleDelete}
                >
                  Delete Product
                </button>

              </div>

            </div>

          ) : (

            /* =================================================
               CUSTOMER CONTROLS
            ================================================== */

            <>

              {/* SIZE */}

              <div className="size-section">

                <h3>
                  Select Size
                </h3>

                <div className="size-options">

                  {["S", "M", "L", "XL"].map(
                    (size) => (
                      <button
                        key={size}
                        className={
                          selectedSize === size
                            ? "selected-size"
                            : ""
                        }
                        onClick={() =>
                          setSelectedSize(size)
                        }
                      >
                        {size}
                      </button>
                    )
                  )}

                </div>

              </div>


              {/* QUANTITY */}

              <div className="quantity-section">

                <h3>
                  Quantity
                </h3>

                <div className="quantity-control">

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((prev) =>
                        Math.max(1, prev - 1)
                      )
                    }
                  >
                    −
                  </button>

                  <span>
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((prev) =>
                        prev + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>

              </div>


              {/* CUSTOMER ACTIONS */}

              <div className="product-actions">

                <button
                  className="add-cart-btn"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>

                <button
                  className="buy-now-btn"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>

              </div>

            </>

          )}


          {/* =================================================
              BACK BUTTON
          ================================================== */}

          <button
            className="back-products-btn"
            onClick={() =>
              navigate(isAdmin ? "/admin" : "/products")
            }
          >
            ← Back to{" "}
            {isAdmin ? "Admin Dashboard" : "Collection"}
          </button>

        </div>

      </section>

    </main>
  );
}

export default ProductDetails;