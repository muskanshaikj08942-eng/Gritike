import "./ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const imageUrl = product.imageUrl
    ? product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `http://localhost:8080${product.imageUrl}`
    : null;

  return (
    <article className="product-card">

      {/* PRODUCT IMAGE */}
      <div className="product-image">

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling.style.display = "flex";
            }}
          />
        ) : null}

        <div
          className="image-placeholder"
          style={{ display: imageUrl ? "none" : "flex" }}
        >
          <span>GRITIKE</span>
        </div>

        {/* Image overlay */}
        <div className="image-overlay">
          <span>VIEW COLLECTION</span>
        </div>

      </div>

      {/* PRODUCT INFORMATION */}
      <div className="product-info">

        <p className="product-category">
          GRITIKE COLLECTION
        </p>

        <h3>{product.name}</h3>

        {product.description && (
          <p className="product-description">
            {product.description}
          </p>
        )}

        <div className="product-bottom">

          <p className="product-price">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>

          <Link
            to={`/products/${product.id}`}
            className="view-product-btn"
          >
            View Details
          </Link>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;