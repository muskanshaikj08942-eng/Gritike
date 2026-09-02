import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((currentProduct) => ({
      ...currentProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const productData = {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        category: product.category,
        imageUrl: product.imageUrl,
      };

      const response = await axios.post(
        "http://localhost:8080/api/products",
        productData
      );

      console.log("Product Added:", response.data);

      alert("Product added successfully!");

      navigate("/admin");

    } catch (error) {
      console.error("Add Product Error:", error);

      if (error.response) {
        console.error("Server Response:", error.response.data);

        alert(
          error.response.data?.message ||
          "Unable to add product."
        );
      } else {
        alert("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="add-product-page">

      <section className="add-product-container">

        {/* HEADER */}

        <div className="add-product-header">

          <div>
            <p className="add-product-label">
              GRITIKE ADMINISTRATION
            </p>

            <h1>
              Add <span>Product</span>
            </h1>

            <p className="add-product-subtitle">
              Add a new product to your GRITIKE collection.
            </p>
          </div>

          <Link
            to="/admin"
            className="back-admin-btn"
          >
            ← Back to Dashboard
          </Link>

        </div>


        {/* FORM */}

        <form
          className="add-product-form"
          onSubmit={handleSubmit}
        >

          {/* PRODUCT NAME */}

          <div className="form-group">

            <label>
              Product Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={product.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* DESCRIPTION */}

          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              name="description"
              placeholder="Enter product description"
              value={product.description}
              onChange={handleChange}
              rows="5"
              required
            />

          </div>


          {/* CATEGORY + PRICE */}

          <div className="form-row">

            <div className="form-group">

              <label>
                Category
              </label>

              <input
                type="text"
                name="category"
                placeholder="e.g. Dresses"
                value={product.category}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Price
              </label>

              <div className="price-input">

                <span>₹</span>

                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={product.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />

              </div>

            </div>

          </div>


          {/* IMAGE URL */}

          <div className="form-group">

            <label>
              Image URL
            </label>

            <input
              type="url"
              name="imageUrl"
              placeholder="https://example.com/product-image.jpg"
              value={product.imageUrl}
              onChange={handleChange}
            />

            <small>
              Paste the URL of the product image.
            </small>

          </div>


          {/* IMAGE PREVIEW */}

          {product.imageUrl && (
            <div className="image-preview">

              <p>
                Image Preview
              </p>

              <img
                src={product.imageUrl}
                alt="Product preview"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

            </div>
          )}


          {/* BUTTONS */}

          <div className="form-actions">

            <Link
              to="/admin"
              className="cancel-btn"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="save-product-btn"
              disabled={loading}
            >
              {loading
                ? "Adding Product..."
                : "Add Product"}
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}

export default AddProduct;