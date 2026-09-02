import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditProduct.css";


function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(savedUser);

    if (user.role !== "ADMIN") {
      navigate("/");
      return;
    }

    fetchProduct();
  }, [id, navigate]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/${id}`
      );

      setProduct(response.data);
    } catch (error) {
      console.error("Error loading product:", error);
      setError("Unable to load product.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((currentProduct) => ({
      ...currentProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      await axios.put(
        `http://localhost:8080/api/products/${id}`,
        {
          name: product.name,
          description: product.description,
          price: Number(product.price),
          category: product.category,
          imageUrl: product.imageUrl,
        }
      );

      alert("Product updated successfully.");

      navigate("/admin");

    } catch (error) {
      console.error("Update Product Error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to update product."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="admin-page">
        <div className="admin-loading">
          Loading Product...
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">

      {/* ================= HEADER ================= */}

      <section className="admin-header">

        <div>

          <p className="admin-label">
            GRITIKE ADMINISTRATION
          </p>

          <h1>
            Edit <span>Product</span>
          </h1>

          <p className="admin-subtitle">
            Refine the details of your GRITIKE collection.
          </p>

        </div>

        <Link
          to="/admin"
          className="add-product-btn"
        >
          ← Dashboard
        </Link>

      </section>


      {/* ================= FORM ================= */}

      <section className="admin-products-section">

        <div className="admin-section-header">

          <div>

            <p className="admin-section-label">
              PRODUCT MANAGEMENT
            </p>

            <h2>
              Update Product #{id}
            </h2>

          </div>

        </div>


        <div className="admin-form-wrapper">

          {error && (
            <div className="products-error">
              {error}
            </div>
          )}


          <form
            className="admin-product-form"
            onSubmit={handleSubmit}
          >

            {/* PRODUCT NAME */}

            <div className="admin-form-group">

              <label>
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />

            </div>


            {/* DESCRIPTION */}

            <div className="admin-form-group">

              <label>
                Description
              </label>

              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Describe the product"
                rows="5"
                required
              />

            </div>


            {/* CATEGORY + PRICE */}

            <div className="admin-form-row">

              <div className="admin-form-group">

                <label>
                  Category
                </label>

                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Category
                  </option>

                  <option value="Dresses">
                    Dresses
                  </option>

                  <option value="Evening Wear">
                    Evening Wear
                  </option>

                  <option value="Sarees">
                    Sarees
                  </option>

                  <option value="Kurtis">
                    Kurtis
                  </option>

                  <option value="Tops">
                    Tops
                  </option>

                  <option value="Bottoms">
                    Bottoms
                  </option>

                  <option value="Accessories">
                    Accessories
                  </option>

                  <option value="New Arrivals">
                    New Arrivals
                  </option>

                </select>

              </div>


              <div className="admin-form-group">

                <label>
                  Price (₹)
                </label>

                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="4999"
                  min="0"
                  required
                />

              </div>

            </div>


            {/* IMAGE URL */}

            <div className="admin-form-group">

              <label>
                Image URL
              </label>

              <input
                type="text"
                name="imageUrl"
                value={product.imageUrl}
                onChange={handleChange}
                placeholder="/images/product.jpg"
              />

              <small>
                Use the path of the product image stored in
                your public/images folder.
              </small>

            </div>


            {/* IMAGE PREVIEW */}

            {product.imageUrl && (
              <div className="edit-image-preview">

                <p>
                  IMAGE PREVIEW
                </p>

                <img
                  src={
                    product.imageUrl.startsWith("http")
                      ? product.imageUrl
                      : product.imageUrl
                  }
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

              </div>
            )}


            {/* BUTTONS */}

            <div className="admin-form-actions">

              <Link
                to="/admin"
                className="cancel-product-btn"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="save-product-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving Changes..."
                  : "Save Changes"}
              </button>

            </div>

          </form>

        </div>

      </section>

    </main>
  );
}

export default EditProduct;