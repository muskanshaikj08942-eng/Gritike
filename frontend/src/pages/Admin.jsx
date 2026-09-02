import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

const API_BASE_URL = "http://localhost:8080";

function Admin() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      if (user.role !== "ADMIN") {
        navigate("/");
        return;
      }

      fetchProducts();
    } catch (error) {
      console.error("Invalid user data:", error);
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/products`
      );

      setProducts(response.data || []);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `${API_BASE_URL}/api/products/${id}`
      );

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== id
        )
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Unable to delete product.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <main className="admin-page">
        <div className="admin-loading">
          <div className="admin-loader"></div>

          <p>Preparing your dashboard</p>

          <span>GRITIKE ADMINISTRATION</span>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">

      {/* =====================================================
          TOP BRAND BAR
      ====================================================== */}

      <div className="admin-brand-bar">

        <div className="admin-brand">
          <span className="admin-brand-mark">G</span>

          <div>
            <strong>GRITIKE</strong>
            <span>ADMINISTRATION</span>
          </div>
        </div>

        <div className="admin-brand-right">
          <span className="admin-live-dot"></span>
          Store Online
        </div>

      </div>


      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="admin-hero">

        <div className="admin-hero-inner">

          <div className="admin-hero-copy">

            <p className="admin-eyebrow">
              PRIVATE CONTROL ROOM
            </p>

            <h1>
              Admin
              <span> Dashboard</span>
            </h1>

            <div className="admin-title-line"></div>

            <p className="admin-hero-description">
              Manage the GRITIKE collection, monitor your
              store and oversee every part of your luxury
              fashion business.
            </p>

          </div>

          <div className="admin-hero-actions">

            <Link
              to="/"
              className="admin-view-store"
            >
              <span>↗</span>
              View Store
            </Link>

            <button
              className="admin-logout"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <section className="admin-stats">

        <div className="admin-stat-card">

          <div className="admin-stat-top">
            <span>01</span>

            <div className="admin-stat-icon">
              ◇
            </div>
          </div>

          <p>Total Products</p>

          <h2>
            {products.length}
          </h2>

          <small>
            Products in collection
          </small>

        </div>


        <div className="admin-stat-card admin-stat-featured">

          <div className="admin-stat-top">
            <span>02</span>

            <div className="admin-stat-icon">
              G
            </div>
          </div>

          <p>Collection</p>

          <h2>
            GRITIKE
          </h2>

          <small>
            Luxury fashion studio
          </small>

        </div>


        <div className="admin-stat-card">

          <div className="admin-stat-top">
            <span>03</span>

            <div className="admin-stat-icon">
              ✓
            </div>
          </div>

          <p>Store Status</p>

          <h2 className="admin-status">
            Active
          </h2>

          <small>
            Store is currently online
          </small>

        </div>

      </section>


      {/* =====================================================
          QUICK ACCESS
      ====================================================== */}

      <section className="admin-quick-section">

        <div className="admin-section-heading">

          <div>
            <p className="admin-section-eyebrow">
              CONTROL CENTRE
            </p>

            <h2>
              Quick Access
            </h2>
          </div>

          <span className="admin-section-number">
            01 / 02
          </span>

        </div>


        <div className="admin-quick-grid">

          <Link
            to="/admin/products/add"
            className="admin-quick-card"
          >

            <div className="admin-quick-number">
              01
            </div>

            <div className="admin-quick-content">

              <span>
                COLLECTION
              </span>

              <h3>
                Add New Product
              </h3>

              <p>
                Introduce a new piece to the GRITIKE
                collection.
              </p>

            </div>

            <div className="admin-quick-arrow">
              →
            </div>

          </Link>


          <Link
            to="/products"
            className="admin-quick-card"
          >

            <div className="admin-quick-number">
              02
            </div>

            <div className="admin-quick-content">

              <span>
                STOREFRONT
              </span>

              <h3>
                View Collection
              </h3>

              <p>
                See how your products appear to
                customers.
              </p>

            </div>

            <div className="admin-quick-arrow">
              →
            </div>

          </Link>

        </div>

      </section>


      {/* =====================================================
          PRODUCT COLLECTION
      ====================================================== */}

      <section className="admin-products-section">

        <div className="admin-section-heading">

          <div>

            <p className="admin-section-eyebrow">
              INVENTORY MANAGEMENT
            </p>

            <h2>
              Product Collection
            </h2>

          </div>

          <div className="admin-product-heading-right">

            <span>
              {products.length}{" "}
              {products.length === 1
                ? "PRODUCT"
                : "PRODUCTS"}
            </span>

            <Link
              to="/admin/products/add"
              className="admin-add-product"
            >
              <span>+</span>
              Add Product
            </Link>

          </div>

        </div>


        {/* =================================================
            TABLE
        ================================================== */}

        <div className="admin-table-shell">

          <div className="admin-table-top">

            <div>
              <span className="admin-table-label">
                CURRENT INVENTORY
              </span>

              <p>
                Manage every piece in your collection.
              </p>
            </div>

            <div className="admin-table-decoration">
              GRITIKE
            </div>

          </div>


          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>ID</th>
                  <th>Actions</th>
                </tr>

              </thead>


              <tbody>

                {products.map((product) => (

                  <tr key={product.id}>

                    {/* PRODUCT */}

                    <td>

                      <div className="admin-product">

                        <div className="admin-product-image">

                          {product.imageUrl ? (

                            <img
                              src={product.imageUrl}
                              alt={product.name}
                            />

                          ) : (

                            <div className="admin-image-placeholder">
                              G
                            </div>

                          )}

                        </div>


                        <div className="admin-product-info">

                          <strong>
                            {product.name}
                          </strong>

                          <small>
                            {product.description ||
                              "GRITIKE Collection"}
                          </small>

                        </div>

                      </div>

                    </td>


                    {/* CATEGORY */}

                    <td>

                      <span className="admin-category">
                        {product.category ||
                          "Collection"}
                      </span>

                    </td>


                    {/* PRICE */}

                    <td className="admin-price">

                      ₹
                      {Number(
                        product.price
                      ).toLocaleString("en-IN")}

                    </td>


                    {/* ID */}

                    <td>

                      <span className="admin-product-id">
                        #{product.id}
                      </span>

                    </td>


                    {/* ACTIONS */}

                    <td>

                      <div className="admin-actions">

                        <Link
                          to={`/products/${product.id}`}
                          className="admin-action view"
                        >
                          View
                        </Link>

                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="admin-action edit"
                        >
                          Edit
                        </Link>

                        <button
                          className="admin-action delete"
                          onClick={() =>
                            handleDelete(
                              product.id,
                              product.name
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>


            {/* EMPTY */}

            {products.length === 0 && (

              <div className="admin-empty">

                <div className="admin-empty-mark">
                  G
                </div>

                <p>
                  YOUR COLLECTION
                </p>

                <h3>
                  No Products Yet
                </h3>

                <span>
                  Your product collection is currently
                  waiting for its first piece.
                </span>

                <Link
                  to="/admin/products/add"
                  className="admin-add-product"
                >
                  <span>+</span>
                  Add First Product
                </Link>

              </div>

            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="admin-footer">

        <div className="admin-footer-mark">
          G
        </div>

        <div>
          <strong>
            GRITIKE
          </strong>

          <span>
            Luxury Fashion Design Studio
          </span>
        </div>

        <p>
          ADMINISTRATION • PRIVATE ACCESS
        </p>

      </footer>

    </main>
  );
}

export default Admin;