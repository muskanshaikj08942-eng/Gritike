import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: email,
          password: password,
        }
      );

      console.log("Login Response:", response.data);

      // Remove password before storing user information
    // Remove password before storing user information
const { password: _, ...userData } = response.data;

localStorage.setItem("user", JSON.stringify(userData));

alert("Welcome to Gritike!");

if (userData.role === "ADMIN") {
  navigate("/admin");
} else {
  navigate("/user");
}

    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        alert(error.response.data || "Invalid email or password");
      } else {
        alert("Unable to connect to the server");
      }
    }
  };

  return (
    <main className="auth-page">

      <div className="auth-background-shape"></div>

      <div className="auth-container">

        <div className="brand-mark">
          G
        </div>

        <p className="section-label">
          WELCOME BACK
        </p>

        <h1>
          Welcome to <span>Gritike</span>
        </h1>

        <p className="auth-subtitle">
          Sign in to discover your style.
        </p>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label>Password</label>

              <Link to="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Sign In
          </button>

        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <p className="auth-link">
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </p>

        <p className="auth-footer">
          © 2026 Gritike · Crafted with elegance
        </p>

      </div>

    </main>
  );
}

export default Login;