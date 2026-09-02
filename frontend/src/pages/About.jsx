import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <main className="about-page">

      {/* HERO */}
      <section className="about-hero">

        <div className="about-hero-content">

          <p className="about-label">
            THE GRITIKE STORY
          </p>

          <h1>
            Fashion that feels
            <span> unforgettable.</span>
          </h1>

          <p>
            GRITIKE is a contemporary fashion destination
            created for those who believe style is more than
            what you wear — it is how you carry yourself.
          </p>

        </div>

      </section>

      {/* BRAND INTRO */}
      <section className="about-intro">

        <div className="about-intro-left">

          <p className="about-label">
            WHO WE ARE
          </p>

          <h2>
            Modern elegance,
            <br />
            <span>made personal.</span>
          </h2>

        </div>

        <div className="about-intro-right">

          <p>
            At GRITIKE, we curate fashion that brings
            together timeless elegance and contemporary
            expression.
          </p>

          <p>
            From statement sarees to sophisticated dresses,
            every piece is chosen for the woman who wants
            to look distinctive without trying too hard.
          </p>

          <p>
            Our collections are designed around confidence,
            individuality and effortless sophistication.
          </p>

        </div>

      </section>

      {/* VALUES */}
      <section className="about-values">

        <div className="values-header">

          <p className="about-label">
            THE GRITIKE DIFFERENCE
          </p>

          <h2>
            Designed for
            <span> your moment.</span>
          </h2>

        </div>

        <div className="values-grid">

          <article className="value-card">

            <div className="value-number">
              01
            </div>

            <h3>
              Curated
            </h3>

            <p>
              Every piece is thoughtfully selected to
              bring something distinctive to your wardrobe.
            </p>

          </article>

          <article className="value-card">

            <div className="value-number">
              02
            </div>

            <h3>
              Contemporary
            </h3>

            <p>
              We blend modern silhouettes with timeless
              fashion to create looks that never feel dated.
            </p>

          </article>

          <article className="value-card">

            <div className="value-number">
              03
            </div>

            <h3>
              Confident
            </h3>

            <p>
              GRITIKE is made for women who want their
              style to speak before they do.
            </p>

          </article>

        </div>

      </section>

      {/* QUOTE */}
      <section className="about-quote">

        <p>
          “Elegance isn't about being noticed.
          <br />
          It's about being remembered.”
        </p>

        <span>
          — GRITIKE
        </span>

      </section>

      {/* CTA */}
      <section className="about-cta">

        <p className="about-label">
          FIND YOUR SIGNATURE
        </p>

        <h2>
          Your next
          <span> statement piece.</span>
        </h2>

        <Link
          to="/products"
          className="about-cta-button"
        >
          Explore Collection
        </Link>

      </section>

    </main>
  );
}

export default About;