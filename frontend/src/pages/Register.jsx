import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("Registration Response:", response.data);

      alert("Registration successful!");

      navigate("/login");

    } catch (error) {
      console.error("Registration Error:", error);

      if (error.response) {
        alert(error.response.data || "Registration failed");
      } else {
        alert("Unable to connect to the server");
      }
    }
  };

  return (
    <main className="auth-page">

      <div className="auth-background-shape"></div>

      <div className="auth-container register-container">

        <div className="brand-mark">
          G
        </div>
        

        <p className="section-label">
          JOIN GRITIKE
        </p>

        <h1>
          Create <span>Account</span>
        </h1>

        <p className="auth-subtitle">
          Begin your journey into effortless style.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Create Account
          </button>

        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <p className="auth-link">
          Already have an account?{" "}
          <Link to="/login">
            Sign In
          </Link>
        </p>

        <p className="auth-footer">
          © 2026 Gritike · Crafted with elegance
        </p>

      </div>

    </main>
  );
}

export default Register;