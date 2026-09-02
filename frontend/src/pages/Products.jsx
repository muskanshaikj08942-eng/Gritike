import { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/products"
      );

      console.log("Products:", response.data);

      setProducts(response.data);
      setError("");
    } catch (err) {
      console.error("Product Fetch Error:", err);
      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from database
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter((category) => category)
    ),
  ];

  // Filter products
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  // Loading
  if (loading) {
    return (
      <main className="products-page">
        <div className="products-loading">
          Loading our collection...
        </div>
      </main>
    );
  }

  return (
    <main className="products-page">

      {/* ================= HEADER ================= */}

      <section className="products-header">

        <p className="products-label">
          THE GRITIKE COLLECTION
        </p>

        <h1>
          Discover <span>Elegance</span>
        </h1>

        <p className="products-subtitle">
          Curated pieces designed for timeless style,
          confidence and sophistication.
        </p>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section className="categories-section">

        <p className="categories-label">
          EXPLORE BY STYLE
        </p>

        <h2>
          Find Your <span>Signature</span>
        </h2>

        <div className="category-buttons">

          {categories.map((category) => (

            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>

          ))}

        </div>

      </section>


      {/* ================= ERROR ================= */}

      {error && (
        <div className="products-error">
          {error}
        </div>
      )}


      {/* ================= EMPTY ================= */}

      {!error && filteredProducts.length === 0 && (

        <div className="empty-products">

          <h2>
            No products in this category
          </h2>

          <p>
            More beautiful pieces are coming soon.
          </p>

          <button
            className="category-btn active"
            onClick={() => setSelectedCategory("All")}
          >
            View All Products
          </button>

        </div>

      )}


      {/* ================= PRODUCTS ================= */}

      {!error && filteredProducts.length > 0 && (

        <section className="products-grid">

          {filteredProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </section>

      )}

    </main>
  );
}

export default Products;