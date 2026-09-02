import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import logo from "../assets/loog.jpeg";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/products"
      );

      setProducts(response.data.slice(0, 4));
    } catch (error) {
      console.error("Featured Products Error:", error);
    }
  };

  return (
    <main className="home-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero-section">

        <div className="hero-circle hero-circle-one"></div>
        <div className="hero-circle hero-circle-two"></div>

        <div className="hero-content">

          <div className="hero-logo">
            <img
              src={logo}
              alt="GRITIKE Fashion Design Studio"
            />
          </div>

          <p className="hero-label">
            THE ART OF ELEGANCE
          </p>

          <h1>
            Discover Your
            <span>Signature Style</span>
          </h1>

          <p className="hero-description">
            Timeless fashion, refined details, and effortless
            elegance crafted for those who appreciate the
            finer things.
          </p>

          <div className="hero-buttons">

            <Link
              to="/products"
              className="primary-btn"
            >
              Explore Collection
            </Link>

            <Link
              to="/about"
              className="secondary-btn"
            >
              Discover GRITIKE
            </Link>

          </div>

        </div>

        <div className="hero-scroll">
          <span></span>
          SCROLL TO DISCOVER
        </div>

      </section>


      {/* =====================================================
          BRAND INTRO
      ===================================================== */}

      <section className="brand-intro">

        <p className="section-label">
          WELCOME TO GRITIKE
        </p>

        <h2>
          Elegance is not a trend.
          <span> It is an attitude.</span>
        </h2>

        <p className="intro-description">
          GRITIKE brings together sophisticated design,
          timeless aesthetics and modern fashion to create
          pieces that feel uniquely yours.
        </p>

        <Link
          to="/about"
          className="text-link"
        >
          Discover Our Story →
        </Link>

      </section>


      {/* =====================================================
          COLLECTION CATEGORIES
      ===================================================== */}

      <section className="collections-section">

        <div className="collections-header">

          <div>

            <p className="section-label">
              EXPLORE THE WORLD OF GRITIKE
            </p>

            <h2>
              Curated for
              <span> every occasion.</span>
            </h2>

          </div>

          <Link
            to="/products"
            className="view-all-link"
          >
            View All Collection →
          </Link>

        </div>


        <div className="collections-grid">

          <Link
            to="/products"
            className="collection-card collection-dresses"
          >

            <div className="collection-overlay"></div>

            <div className="collection-content">

              <p>
                01
              </p>

              <h3>
                Modern Dresses
              </h3>

              <span>
                Discover Collection →
              </span>

            </div>

          </Link>


          <Link
            to="/products"
            className="collection-card collection-sarees"
          >

            <div className="collection-overlay"></div>

            <div className="collection-content">

              <p>
                02
              </p>

              <h3>
                Designer Sarees
              </h3>

              <span>
                Discover Collection →
              </span>

            </div>

          </Link>


          <Link
            to="/products"
            className="collection-card collection-evening"
          >

            <div className="collection-overlay"></div>

            <div className="collection-content">

              <p>
                03
              </p>

              <h3>
                Evening Edit
              </h3>

              <span>
                Discover Collection →
              </span>

            </div>

          </Link>

        </div>

      </section>


      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}

      <section className="featured-section">

        <div className="featured-header">

          <p className="section-label">
            THE LATEST EDIT
          </p>

          <h2>
            Pieces worth
            <span> remembering.</span>
          </h2>

          <p>
            Discover some of our most distinctive pieces,
            selected to bring effortless sophistication
            to your wardrobe.
          </p>

        </div>


        <div className="featured-products">

          {products.map((product) => {

            const imageUrl = product.imageUrl
              ? product.imageUrl.startsWith("http")
                ? product.imageUrl
                : `http://localhost:8080${product.imageUrl}`
              : null;

            return (
              <article
                className="featured-product"
                key={product.id}
              >

                <Link
                  to={`/products/${product.id}`}
                  className="featured-image"
                >

                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                    />
                  ) : (
                    <div className="featured-placeholder">
                      GRITIKE
                    </div>
                  )}

                  <div className="featured-overlay">
                    View Product
                  </div>

                </Link>

                <div className="featured-info">

                  <p>
                    {product.category || "GRITIKE COLLECTION"}
                  </p>

                  <h3>
                    {product.name}
                  </h3>

                  <span>
                    ₹
                    {Number(product.price).toLocaleString("en-IN")}
                  </span>

                </div>

              </article>
            );
          })}

        </div>


        <div className="featured-button">

          <Link
            to="/products"
            className="primary-btn"
          >
            Explore All Pieces
          </Link>

        </div>

      </section>


      {/* =====================================================
          EDITORIAL SECTION
      ===================================================== */}

      <section className="editorial-section">

        <div className="editorial-image">
          <div className="editorial-image-inner"></div>
        </div>

        <div className="editorial-content">

          <p className="section-label">
            THE GRITIKE EDIT
          </p>

          <h2>
            Where tradition
            <span> meets tomorrow.</span>
          </h2>

          <p>
            Fashion should never ask you to choose between
            heritage and individuality.
          </p>

          <p>
            Our collections reinterpret timeless silhouettes
            through a contemporary lens — creating pieces
            that feel rooted, yet completely your own.
          </p>

          <Link
            to="/products"
            className="text-link"
          >
            Explore The Edit →
          </Link>

        </div>

      </section>


      {/* =====================================================
          WHY GRITIKE
      ===================================================== */}

      <section className="why-section">

        <div className="why-header">

          <p className="section-label">
            WHY GRITIKE
          </p>

          <h2>
            More than fashion.
            <span> A feeling.</span>
          </h2>

        </div>


        <div className="why-grid">

          <article>

            <span>
              01
            </span>

            <h3>
              Thoughtfully Curated
            </h3>

            <p>
              Every piece is selected with an eye for
              sophistication, individuality and timeless
              appeal.
            </p>

          </article>


          <article>

            <span>
              02
            </span>

            <h3>
              Contemporary Luxury
            </h3>

            <p>
              Modern silhouettes, refined details and
              distinctive colour stories designed to
              elevate your everyday style.
            </p>

          </article>


          <article>

            <span>
              03
            </span>

            <h3>
              Designed To Impress
            </h3>

            <p>
              From intimate celebrations to grand occasions,
              discover pieces made for moments that matter.
            </p>

          </article>


          <article>

            <span>
              04
            </span>

            <h3>
              Your Individuality
            </h3>

            <p>
              Because the best style doesn't follow a
              formula. It reflects who you are.
            </p>

          </article>

        </div>

      </section>


      {/* =====================================================
          QUOTE
      ===================================================== */}

      <section className="home-quote">

        <div>

          <p>
            "Style is the way you
            <br />
            tell the world who you are
            <br />
            without saying a word."
          </p>

          <span>
            — GRITIKE
          </span>

        </div>

      </section>


      {/* =====================================================
          NEWSLETTER
      ===================================================== */}

      <section className="newsletter-section">

        <p className="section-label">
          THE GRITIKE JOURNAL
        </p>

        <h2>
          Stay in the
          <span> know.</span>
        </h2>

        <p>
          Be the first to discover new collections,
          exclusive edits and stories from GRITIKE.
        </p>

        <form
          className="newsletter-form"
          onSubmit={(e) => e.preventDefault()}
        >

          <input
            type="email"
            placeholder="Your email address"
            required
          />

          <button type="submit">
            Subscribe
          </button>

        </form>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="home-cta">

        <p className="section-label">
          YOUR STYLE AWAITS
        </p>

        <h2>
          Make an entrance.
          <span> Leave an impression.</span>
        </h2>

        <p>
          Find the piece that feels unmistakably you.
        </p>

        <Link
          to="/products"
          className="primary-btn"
        >
          Shop The Collection
        </Link>

      </section>

    </main>
  );
}

export default Home;