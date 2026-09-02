import { useState } from "react";
import "./Contact.css";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Form:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">

      {/* HERO */}

      <section className="contact-hero">

        <p className="contact-label">
          GET IN TOUCH
        </p>

        <h1>
          Let's talk
          <span> fashion.</span>
        </h1>

        <p>
          Have a question about an order, a product,
          or simply want to say hello? We'd love to
          hear from you.
        </p>

      </section>


      {/* CONTACT CONTENT */}

      <section className="contact-content">

        {/* INFORMATION */}

        <div className="contact-info">

          <p className="contact-label">
            CONTACT GRITIKE
          </p>

          <h2>
            We're here
            <br />
            <span>to help.</span>
          </h2>

          <div className="contact-details">

            <div>
              <span>Email</span>
              <a href="mailto:hello@gritike.com">
                hello@gritike.com
              </a>
            </div>

            <div>
              <span>Phone</span>
              <a href="tel:+919999999999">
                +91 99999 99999
              </a>
            </div>

            <div>
              <span>Hours</span>
              <p>
                Monday — Saturday
                <br />
                10:00 AM — 7:00 PM
              </p>
            </div>

          </div>

        </div>


        {/* FORM */}

        <div className="contact-form-container">

          {submitted ? (

            <div className="contact-success">

              <div className="success-icon">
                ✓
              </div>

              <h2>
                Thank you.
              </h2>

              <p>
                Your message has been received.
                Our team will get back to you soon.
              </p>

              <button
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>

            </div>

          ) : (

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />

                </div>

              </div>


              <div className="form-group">

                <label>
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="7"
                  required
                />

              </div>


              <button
                type="submit"
                className="contact-submit"
              >
                Send Message
              </button>

            </form>

          )}

        </div>

      </section>


      {/* FAQ STRIP */}

      <section className="contact-bottom">

        <p className="contact-label">
          NEED QUICK HELP?
        </p>

        <h2>
          We're only a message away.
        </h2>

        <p>
          For order updates, sizing questions or
          styling assistance, reach out to our team.
        </p>

      </section>

    </main>
  );
}

export default Contact;