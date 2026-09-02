import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MessageUs.css";

function MessageUs() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setError("");
    setSuccess("");
  };

  // =========================================
  // SEND MESSAGE
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setError("Please complete all fields.");
      return;
    }

    setSending(true);

    try {
      await axios.post(
        "http://localhost:8080/api/messages",
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim()
        }
      );

      setSuccess(
        "Your message has been sent successfully. We'll be in touch soon."
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (err) {
      console.error("Message Error:", err);

      setError(
        "We couldn't send your message right now. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="message-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="message-hero">

        <div className="message-hero-content">

          <p className="message-eyebrow">
            GRITIKE COMMUNICATION
          </p>

          <h1>
            Let's <span>Connect</span>
          </h1>

          <p className="message-intro">
            Have a question about our collection, an order,
            or a special request? We'd love to hear from you.
          </p>

        </div>

      </section>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <section className="message-content">

        {/* LEFT SIDE */}

        <div className="message-information">

          <p className="message-section-label">
            GET IN TOUCH
          </p>

          <h2>
            We'd love to
            <span> hear from you.</span>
          </h2>

          <p className="message-description">
            Whether you have a question about a GRITIKE piece,
            need assistance with your order, or simply want
            to know more about our collections, send us a message.
          </p>


          <div className="message-details">

            <div className="message-detail">

              <span className="detail-number">
                01
              </span>

              <div>
                <h3>
                  Collection Enquiries
                </h3>

                <p>
                  Ask us about products, availability,
                  styling or our latest collection.
                </p>
              </div>

            </div>


            <div className="message-detail">

              <span className="detail-number">
                02
              </span>

              <div>
                <h3>
                  Order Assistance
                </h3>

                <p>
                  Need help with an order or have a
                  question about your purchase?
                </p>
              </div>

            </div>


            <div className="message-detail">

              <span className="detail-number">
                03
              </span>

              <div>
                <h3>
                  Special Requests
                </h3>

                <p>
                  Tell us about custom requirements or
                  anything else you'd like to discuss.
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* RIGHT SIDE FORM */}

        <div className="message-form-wrapper">

          <form
            className="message-form"
            onSubmit={handleSubmit}
          >

            <div className="form-heading">

              <p>
                SEND A MESSAGE
              </p>

              <h2>
                How can we help?
              </h2>

            </div>


            {/* NAME */}

            <div className="form-group">

              <label htmlFor="name">
                Your Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                autoComplete="name"
              />

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                autoComplete="email"
              />

            </div>


            {/* SUBJECT */}

            <div className="form-group">

              <label htmlFor="subject">
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
              />

            </div>


            {/* MESSAGE */}

            <div className="form-group">

              <label htmlFor="message">
                Your Message
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="6"
              />

            </div>


            {/* ERROR */}

            {error && (
              <div className="message-error">
                {error}
              </div>
            )}


            {/* SUCCESS */}

            {success && (
              <div className="message-success">
                {success}
              </div>
            )}


            {/* SUBMIT */}

            <button
              type="submit"
              className="send-message-btn"
              disabled={sending}
            >

              {sending ? (
                "SENDING..."
              ) : (
                <>
                  SEND MESSAGE
                  <span>→</span>
                </>
              )}

            </button>


            <p className="form-note">
              Your message will be received by the GRITIKE
              administration team.
            </p>

          </form>

        </div>

      </section>


      {/* =========================================
          BACK TO COLLECTION
      ========================================= */}

      <section className="message-bottom">

        <button
          onClick={() => navigate("/products")}
          className="message-back-btn"
        >
          ← Explore Collection
        </button>

      </section>

    </main>
  );
}

export default MessageUs;